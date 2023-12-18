"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import Weave from "../models/weave.model";
import Community from "../models/community.model";
import { connectToDB } from "../mongoose";
import { WeaveValidation } from "../validations/weave";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();
  
    // Calculate the number of posts to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;
  
    // Create a query to fetch the posts that have no parent (top-level weaves) (a weave that is not a comment/reply).
    const postsQuery = Weave.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "community",
        model: Community,
      })
      .populate({
        path: "children", // Populate the children field
        populate: {
          path: "author", // Populate the author field within children
          model: User,
          select: "_id name parentId image", // Select only _id and username fields of the author
        },
      });
  
    // Count the total number of top-level posts (weaves) i.e., weaves that are not comments.
    const totalPostsCount = await Weave.countDocuments({
      parentId: { $in: [null, undefined] },
    }); // Get the total count of posts
  
    const posts = await postsQuery.exec();
  
    const isNext = totalPostsCount > skipAmount + posts.length;
  
    return { posts, isNext };
  }
  
  interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
  }
  
  export async function createWeave({ text, author, communityId, path }: Params
  ) {
    try {
      connectToDB();
  
      const communityIdObject = await Community.findOne(
        { id: communityId },
        { _id: 1 }
      );
  
      const createdWeave = await Weave.create({
        text,
        author,
        community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
      });
  
      // Update User model
      await User.findByIdAndUpdate(author, {
        $push: { weaves: createdWeave._id },
      });
  
      if (communityIdObject) {
        // Update Community model
        await Community.findByIdAndUpdate(communityIdObject, {
          $push: { weaves: createdWeave._id },
        });
      }
  
      revalidatePath(path);
    } catch (error: any) {
      throw new Error(`Failed to create weave: ${error.message}`);
    }
  }
  
  async function fetchAllChildWeaves(weaveId: string): Promise<any[]> {
    const childWeaves= await Weave.find({ parentId: weaveId });
  
    const descendantWeaves = [];
    for (const childWeave of childWeaves) {
      const descendants = await fetchAllChildWeaves(childWeave._id);
      descendantWeaves.push(childWeave, ...descendants);
    }
  
    return descendantWeaves;
  }
  
  export async function deleteWeave(id: string, path: string): Promise<void> {
    try {
      connectToDB();
  
      // Find the weave to be deleted (the main weave)
      const mainWeave = await Weave.findById(id).populate("author community");
  
      if (!mainWeave) {
        throw new Error("Weave not found");
      }
  
      // Fetch all child weaves and their descendants recursively
      const descendantWeaves = await fetchAllChildWeaves(id);
  
      // Get all descendant weave IDs including the main weave ID and child weave IDs
      const descendantWeaveIds = [
        id,
        ...descendantWeaves.map((weave) => weave._id),
      ];
  
      // Extract the authorIds and communityIds to update User and Community models respectively
      const uniqueAuthorIds = new Set(
        [
          ...descendantWeaves.map((weave) => weave.author?._id?.toString()), // Use optional chaining to handle possible undefined values
          mainWeave.author?._id?.toString(),
        ].filter((id) => id !== undefined)
      );
  
      const uniqueCommunityIds = new Set(
        [
          ...descendantWeaves.map((weave) => weave.community?._id?.toString()), // Use optional chaining to handle possible undefined values
          mainWeave.community?._id?.toString(),
        ].filter((id) => id !== undefined)
      );
  
      // Recursively delete child weave and their descendants
      await Weave.deleteMany({ _id: { $in: descendantWeaveIds } });
  
      // Update User model
      await User.updateMany(
        { _id: { $in: Array.from(uniqueAuthorIds) } },
        { $pull: { weaves: { $in: descendantWeaveIds } } }
      );
  
      // Update Community model
      await Community.updateMany(
        { _id: { $in: Array.from(uniqueCommunityIds) } },
        { $pull: { weaves: { $in: descendantWeaveIds } } }
      );
  
      revalidatePath(path);
    } catch (error: any) {
      throw new Error(`Failed to delete weave: ${error.message}`);
    }
  }
  
  export async function fetchWeaveById(weaveId: string) {
    connectToDB();
  
    try {
      const weave = await Weave.findById(weaveId)
        .populate({
          path: "author",
          model: User,
          select: "_id id name image",
        }) // Populate the author field with _id and username
        .populate({
          path: "community",
          model: Community,
          select: "_id id name image",
        }) // Populate the community field with _id and name
        .populate({
          path: "children", // Populate the children field
          populate: [
            {
              path: "author", // Populate the author field within children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
            {
              path: "children", // Populate the children field within children
              model: Weave, // The model of the nested children (assuming it's the same "Weave" model)
              populate: {
                path: "author", // Populate the author field within nested children
                model: User,
                select: "_id id name parentId image", // Select only _id and username fields of the author
              },
            },
          ],
        })
        .exec();
  
      return weave;
    } catch (err) {
      console.error("Error while fetching weave:", err);
      throw new Error("Unable to fetch weave");
    }
  }
  
  export async function addCommentToWeave(
    weaveId: string,
    commentText: string,
    userId: string,
    path: string
  ) {
    connectToDB();
  
    try {
      // Find the original weave by its ID
      const originalWeave = await Weave.findById(weaveId);
  
      if (!originalWeave) {
        throw new Error("Weave not found");
      }
  
      // Create the new comment weave
      const commentWeave = new Weave({
        text: commentText,
        author: userId,
        parentId: weaveId, // Set the parentId to the original weave's ID
      });
  
      // Save the comment weave to the database
      const savedCommentWeave = await commentWeave.save();
  
      // Add the comment weave's ID to the original weave's children array
      originalWeave.children.push(savedCommentWeave._id);
  
      // Save the updated original weave to the database
      await originalWeave.save();
  
      revalidatePath(path);
    } catch (err) {
      console.error("Error while adding comment:", err);
      throw new Error("Unable to add comment");
    }
  }
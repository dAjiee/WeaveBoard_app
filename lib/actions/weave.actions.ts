"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import Weave from "../models/weave.model";
import { connectToDB } from "../mongoose";
import { WeaveValidation } from "../validations/weave";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createWeave({ text, author, communityId, path }: Params) {
    try {
        connectToDB();

        const createdWeave = await Weave.create({
            text,
            author,
            community: null,
        });

        //Update user model
        await User.findByIdAndUpdate(author, {
            $push: { weaves: createdWeave._id }
        })

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error creating weave: ${error.message}`)
    }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    //Calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    //Fetch the posts that have no parents (top-level weaves...)
    const postsQuery = Weave.find({ parentId: { $in: [null, undefined]}})
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path: 'author', model: User})
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            }
    })

    const totalPostsCount = await Weave.countDocuments({parentId: { $in: [null, undefined]}})

    const posts = await postsQuery.exec()

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
}

export async function fetchWeaveById(id: string){
    connectToDB();

    try {
        //Populate Community
        const weave = await Weave.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: "_id id name image"
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    },
                    {
                        path: 'children',
                        model: Weave,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name parentId iamge"
                        }
                    }
                ]
            }).exec();

            return weave;
    } catch (error: any) {
        throw new Error(`Error fetching the weave: ${error.message}`)
    }
}

export async function addCommentToWeave(
    weaveId: string,
    commentText: string,
    userId: string,
    path: string,
    ) {
        connectToDB();
            
        try {
            const originalWeave = await Weave.findById(weaveId);

            if(!originalWeave){
                throw new Error("Weave not found")
            }

            const commentWeave = new Weave({
                text: commentText,
                author: userId,
                parentId: weaveId,
            })

            const savedCommentWeave = await commentWeave.save();

            originalWeave.children.push(savedCommentWeave._id);

            await originalWeave.save();

            revalidatePath(path);
        } catch (error: any) {
            throw new Error(`Error adding comment to weave: ${error.message}`)
        }
    }
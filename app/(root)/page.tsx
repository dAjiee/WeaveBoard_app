import WeaveCard from "@/components/cards/WeaveCard";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchPosts } from "@/lib/actions/weave.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  // if (!user) redirect("/landing-page"); this is for landing page, checks if user is logged in alrd
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(1, 30);
  

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className = "mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No weaves found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <WeaveCard 
                key = {post._id}
                id = {post._id}
                currentUserId = {user?.id || ""}
                parentId = {post.parentId}
                content = {post.text}
                author = {post.author}
                community = {post.community}
                createdAt = {post.createdAt}
                comments = {post.children}
              />
            ))}
          </>
        )
      }

      </section>

    </>
  )
}

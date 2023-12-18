import WeaveCard from "@/components/cards/WeaveCard";
import Comment from "@/components/forms/Comment";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchWeaveById } from "@/lib/actions/weave.actions";
import { currentUser } from '@clerk/nextjs';
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding')

    const weave = await fetchWeaveById(params.id);

    return (
        <section className="relative">
            <div>
                <WeaveCard
                    key={weave._id}
                    id={weave._id}
                    currentUserId={user?.id || ""}
                    parentId={weave.parentId}
                    content={weave.text}
                    author={weave.author}
                    community={weave.community}
                    createdAt={weave.createdAt}
                    comments={weave.children}
                />
            </div>

            <div className="mt-7">
                <Comment 
                    weaveId={weave.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className="mt-10">
                {weave.children.map((childItem: any) => (
                    <WeaveCard
                        key={childItem._id}
                        id={childItem._id}
                        currentUserId={childItem?.id || ""}
                        parentId={childItem.parentId}
                        content={childItem.text}
                        author={childItem.author}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                        isComment
                    />
                ))}
            </div>
        </section>
    )
}

export default Page;
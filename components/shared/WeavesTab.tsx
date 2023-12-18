import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import WeaveCard from "../cards/WeaveCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

const WeavesTab = async({currentUserId, accountId, accountType} : Props) => {
    let result: any;

    if(accountType === 'Community') {
        result = await fetchCommunityPosts(accountId);
    } else {
        result = await fetchUserPosts(accountId);
    }
    
    if(!result) redirect('/')

    return(
        <section className="mt-9 flex flex-col gap-10">
            {result.weaves.map((weave: any) => (
                <WeaveCard
                    key={weave._id}
                    id={weave._id}
                    currentUserId={currentUserId}
                    parentId={weave.parentId}
                    content={weave.text}
                    author={
                        accountType === 'User'
                            ? {name: result.name, image: result.image, id:result.id}:{name: weave.author.name, image: weave.author.image, id: weave.author.id}
                    }
                    community={weave.community} //Update
                    createdAt={weave.createdAt}
                    comments={weave.children}
                />
            ))}
        </section>
    )
}

export default WeavesTab;
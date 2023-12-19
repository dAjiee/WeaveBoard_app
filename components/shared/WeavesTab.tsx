import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import WeaveCard from "../cards/WeaveCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Result {
    name: string;
    image: string;
    id: string;
    weaves: {
      _id: string;
      text: string;
      parentId: string | null;
      author: {
        name: string;
        image: string;
        id: string;
      };
      community: {
        id: string;
        name: string;
        image: string;
      } | null;
      createdAt: string;
      children: {
        author: {
          image: string;
        };
      }[];
    }[];
  }

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

async function WeavesTab({currentUserId, accountId, accountType} : Props) {
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
                    community={
                        accountType === "Community"
                          ? { name: result.name, id: result.id, image: result.image }
                          : weave.community
                      }
                    createdAt={weave.createdAt}
                    comments={weave.children}
                />
            ))}
        </section>
    )
}

export default WeavesTab;
import { fetchUser, fetchUsers, getActivity } from '@/lib/actions/user.actions';
import { timeSince } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';


async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    const activity = await getActivity(userInfo._id);

    return (
        <section>
            <h1 className="head-text mb-10">Activity</h1>

            <section className="mt-10 flex flex-col gap-5">
                {activity.length > 0 ? (
                    <>
                        {activity.map((activity) => (
                            <Link key={activity._id} href={`/weave/${activity.parentId}`}>
                                <article className="activity-card" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Image
                                        src={activity.author.image}
                                        alt="Profile Picture"
                                        width={30}
                                        height={30}
                                        className="rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="!text-medium-regular text-light-1" style={{ marginRight: '16px' }}>
                                            <span className="mr-1 text-primary-500">
                                                {activity.author.name}
                                            </span>{" "}
                                            replied to your weave
                                        </p>
                                    </div>
                                    <div className="!text-small-regular text-gray-1" style={{ marginLeft: 'auto' }}>
                                        <p className="time-text">{timeSince(activity.createdAt)}</p>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </>
                ) : (<p className="!text-base-regular text-light-3">No activity yet</p>)}
            </section>
        </section>
    )
}

export default Page
import ProfileHeader from '@/components/shared/ProfileHeader';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from '@/constants';
import Image from 'next/image';
import WeavesTab from '@/components/shared/WeavesTab';


async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(params.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />

            <div className="mt-9">
                <Tabs defaultValue="weaves" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />

                                <p className="max-sm:hidden">{tab.label}</p>

                                {tab.label === 'Weaves' && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {userInfo?.weaves?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>


                    <TabsContent value="weaves" className="w-full text-light-1">
                        <WeavesTab
                            currentUserId={user.id}
                            accountId={userInfo.id}
                            accountType="User"
                        />
                    </TabsContent>

                    <TabsContent value="replies" className="w-full text-light-1">
                        <p className="mt-20 text-center text-heading3 font-bold text-light-1">
                            To be added!
                        </p>
                    </TabsContent>

                    <TabsContent value="tagged" className="w-full text-light-1">
                        <p className="mt-20 text-center text-heading3 font-bold text-light-1">
                            To be added!
                        </p>
                    </TabsContent>


                </Tabs>
            </div>
        </section>
    )
}

export default Page;
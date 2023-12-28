https://weave-board-app.vercel.app/

# WeaveBoard

Your digital haven for authentic expression.
Dive into a supportive community where you can freely share your thoughts, vent, and connect with like-minded individuals. Embrace the power of unfiltered reflection and discover a space where your voice truly matters.

## Hashmap Implementation

In the backbone of Weaveboard's infrastructure, to enhance user experience and mitigate spamming within the WeaveBoare application, a robust anti-spam mechanism has been implemented.

```
type UserPostInfo = {
  count: number;
  firstPostTime: number;
};

const postLimiterMap = new Map<string, UserPostInfo>();
const postLimit = 10;
const timeLimit = 1800000;

export function updatePostCount(userId: string): boolean {
  const currentTime = Date.now();
  const postInfo = postLimiterMap.get(userId);


  if (!postInfo || currentTime - postInfo.firstPostTime > timeLimit) {
    postLimiterMap.set(userId, { count: 1, firstPostTime: currentTime });
    return true;
  }

  if (postInfo.count >= postLimit) {
    return false;
  }

  postInfo.count += 1;
  postLimiterMap.set(userId, postInfo);
  return true;
}

export function getRemainingTime(userId: string): number {
  const postInfo = postLimiterMap.get(userId);
  if (!postInfo) {
    return 0;
  }

  const currentTime = Date.now();
  const timePassed = currentTime - postInfo.firstPostTime;

  if (postInfo.count >= postLimit && timePassed < timeLimit) {
    const remainingTimeInMinutes = Math.ceil((timeLimit - timePassed) / 60000);
    return remainingTimeInMinutes;
  }

  return 0;
}
```

The anti-spam function works by defining a type UserPostInfo that holds two properties: count, which tracks the number of posts made by the user, and firstPostTime, which records the timestamp of the first post within a given timeframe. The postLimit constant defines the maximum number of posts allowed per user, and timeLimit defines the duration in milliseconds during which the post count is considered (in this case, it seems to be set to 1800000 ms, which is 30 minutes).


The updatePostCount function is exported and is responsible for managing the post count for a specific user where it first gets the current time, then attempts to retrieve the UserPostInfo for the given userId from postLimiterMap. If there is no info for the user or the time since the first post exceeds the timeLimit, it resets the user's post count to 1 and sets the current time as the firstPostTime. If the user's post count exceeds the postLimit, it returns false, indicating that the user cannot post. The Boolean is then processed and if returns a false value, it shows a prompt stating that the user cannot post and needs to retry after a certain amount of time.


## Stack Used
[![My Skills](https://skillicons.dev/icons?i=mongodb,express,react,nodejs,tailwind,nextjs,&theme=dark)](https://skillicons.dev)

WeaveBoard is crafted using a robust Full Stack MERN architecture enhanced with Next.js 14, leveraging its Server-Side Rendering capabilities to deliver a high-performance application. The backend is powered by MongoDB, chosen for its flexibility in handling intricate schemas and its adeptness at managing multiple data relations. On the frontend, Tailwind CSS provides a utility-first approach to styling, ensuring a responsive and visually coherent layout.

Form state management is elegantly orchestrated using React Hook Form, which provides a performant and flexible solution to handle form data. Lastly, deployment and hosting of WeaveBoard are executed through Vercel, ensuring a smooth CI/CD pipeline and scalable distribution to users.

![image](https://github.com/dAjiee/WeaveBoard_app/assets/109501895/3483107d-49da-4473-b2d9-2e8e2cccd626)

For secure and efficient user authentication, WeaveBoard integrates Clerk API, streamlining the sign-in and sign-up processes while maintaining high-security standards.

![image](https://github.com/dAjiee/WeaveBoard_app/assets/109501895/82eec608-fd18-4bca-85d4-edcb1e893f29)

File management, including the upload and storage of profile images, is seamlessly handled by the UploadThing API.

![image](https://github.com/dAjiee/WeaveBoard_app/assets/109501895/68891402-95a5-499a-8942-986cbc1b87f9) ![image](https://github.com/dAjiee/WeaveBoard_app/assets/109501895/beebe9ef-df6a-4743-affa-063f823cfc50)

The UI/UX aspect of form interaction is bolstered by the use of Shadcn's component library, which offers a suite of pre-built form elements optimized for Next.js applications. Data integrity and validation are enforced by Zod, enabling the development of safe input validation schemas with ease.

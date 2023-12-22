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
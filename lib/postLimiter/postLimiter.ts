type UserPostInfo = {
  count: number;
  firstPostTime: number;
};

const postLimiterMap = new Map<string, UserPostInfo>();

export async function updatePostCount(userId: string): Promise<{ canPost: boolean }> {
  const currentTime = Date.now();
  const postInfo = postLimiterMap.get(userId);

  if (!postInfo || currentTime - postInfo.firstPostTime > 1800000) {
    postLimiterMap.set(userId, { count: 1, firstPostTime: currentTime });
    return { canPost: true };
  }

  if (postInfo.count >= 10) {
    return { canPost: false };
  }

  postInfo.count += 1;
  postLimiterMap.set(userId, postInfo);
  return { canPost: true };
}

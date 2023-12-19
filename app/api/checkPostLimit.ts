
import { updatePostCount } from '@/lib/postLimiter/postLimiter';
import { NextApiRequest, NextApiResponse } from 'next';



export default function route(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userId } = req.body;
    const canPost = updatePostCount(userId);
    res.status(200).json({ canPost });
  } else {
    // 405 Method Not Allowed if not a POST request
    res.status(405).end();
  }
}

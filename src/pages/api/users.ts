import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/types/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users: User[] = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];
    return res.status(200).json(users);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../db';
import getUser from '@/services/getUser.service';

dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.query; 

  try {
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email parameter is missing' });
    }

    const user = await getUser(email.toString());

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error handling result fetch:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
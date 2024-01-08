import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../db';
import getResult from '@/services/getResult.service';

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const result = await getResult();

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error handling result fetch:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

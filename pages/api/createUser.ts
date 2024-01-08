import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../db';
import createUser from '../../services/user.service';

dbConnect(); 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email,password,phoneNumber } = req.query as { name: string; email: string;password:string;phoneNumber:string; };
    const balance = 0;
    const role = "player"
    const bankDetails = {};
    const withdrawal: any[] = [];
    const deposit: any[] = [];
    const user = await createUser({ name, email,balance,password,phoneNumber,role, bankDetails, withdrawal, deposit });
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Error handling user creation:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

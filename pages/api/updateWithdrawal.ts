import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../db';
import updateWithdrawalStatus from '@/services/updateWithdrawalStatus.service'; // Assuming a service function to update bank details

dbConnect();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const { email, withdrawalId, status, amount } = req.body as {
        email: string;
        withdrawalId: string;
        status: string;
        amount: number;
      };
  
      // Perform validation if necessary
  
      // Call the function to update bank details
      const updatedUser = await updateWithdrawalStatus({
        email,
        withdrawalId,
        status,
        amount
      });
  
      res.status(200).json({ success: true, updatedUser });
    } catch (error) {
      console.error('Error updating bank details:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
  
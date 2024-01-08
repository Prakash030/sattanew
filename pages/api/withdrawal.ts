import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../db';
import withdrawalRequest from '@/services/withdraw.service'; // Assuming a service function to update bank details

dbConnect(); // Assuming this function establishes a connection to the database

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const {
            email,
            amount,
            status,
            date,
        } = req.body as {
            email: string;
            amount: number;
            status: string;
            date: string;
        };
        const updatedUser = await withdrawalRequest({
            email,
            amount,
            status,
            date,
        });

        res.status(200).json({ success: true, updatedUser });
    } catch (error) {
        console.error('Error updating withdrawal details:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

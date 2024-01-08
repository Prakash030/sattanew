import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../db';
import addMoneyRequest from '@/services/addMoney.service'; // Assuming a service function to update bank details

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
            utrNo
        } = req.body as {
            email: string;
            amount: number;
            status: string;
            date: string;
            utrNo: string;
        };
        console.log(req.body);
        const updatedUser = await addMoneyRequest({
            email,
            amount,
            status,
            date,
            utrNo
        });
        // console.log(updatedUser);
        res.status(200).json({ success: true, updatedUser });
    } catch (error) {
        console.error('Error updating withdrawal details:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

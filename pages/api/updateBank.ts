import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../db';
import updateUserBankDetails from '../../services/bankdetails.service' // Assuming a service function to update bank details

dbConnect(); // Assuming this function establishes a connection to the database

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, accountNumber, ifscCode, branch, bankName, upiId } = req.body as {
      email: string;
      accountNumber: string;
      ifscCode: string;
      branch: string;
      bankName: string;
      upiId: string;
    };

    // Perform validation if necessary

    // Call the function to update bank details
    const updatedUser = await updateUserBankDetails({
      email,
      accountNumber,
      ifscCode,
      branch,
      bankName,
      details: true, // Assuming this is a required field
      upiId
    });

    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    console.error('Error updating bank details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

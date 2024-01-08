import { userModel } from '../models/user.model';
import { z } from 'zod';

const bankDetailsSchema = z.object({
  email: z.string().email(),
  accountNumber: z.string(),
  ifscCode: z.string(),
  branch: z.string(),
  bankName: z.string(),
  details: z.boolean(),
  upiId: z.string()
});

const updateUserBankDetails = async (payload: z.infer<typeof bankDetailsSchema>) => {
  const { email, accountNumber, ifscCode, branch, bankName, details, upiId } = payload;

  const existingUser = await userModel().findOne({ email });

  if (!existingUser) {
    throw new Error('User not found');
  }

  // Update the bank details for the existing user
  existingUser.bankDetails = {
    accountNumber,
    ifscCode,
    branch,
    bankName,
    details,
    upiId
  };

  // Save the updated user with bank details
  const updatedUser = await existingUser.save();
  return updatedUser;
};

export default updateUserBankDetails;

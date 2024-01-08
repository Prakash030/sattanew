import { userModel } from '@/models/user.model';
import { z } from 'zod';

const updateStatus = z.object({
    email: z.string().email(),
    status: z.string(),
    depositId: z.string(),
    amount: z.number(),
});

const updateDepositStatus = async (payload: z.infer<typeof updateStatus>) => {
  try {
    const { email, status, depositId, amount } = payload;
    console.log("email", amount);

    const user = await userModel().findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Find the withdrawal request by ID
    const depositIndex = user.deposit.findIndex((deposits) => deposits._id.toString() === depositId);

    if (depositIndex === -1) {
      throw new Error('Withdrawal not found for the provided ID');
    }

    // Update the status of the found withdrawal request
    user.deposit[depositIndex].status = status;
    user.balance = user.balance + amount;


    // Save the updated user object
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    // Handle errors here or propagate them up
    console.log("error", error);
    throw error; // Propagate the error up to handle it in the calling function
  }
};

export default updateDepositStatus;

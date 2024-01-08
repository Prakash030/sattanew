import { userModel } from '../models/user.model';
import { z } from 'zod';

const withdrawSchema = z.object({
  email: z.string().email(),
  amount: z.number(),
  status: z.string(),
  date: z.string(),
});

const withdrawalRequest = async (payload: z.infer<typeof withdrawSchema>) => {
  const { email, amount, status, date } = payload;

  const existingUser = await userModel().findOne({ email });

  if (!existingUser) {
    throw new Error('User not found');
  }
  if(existingUser.balance >= amount) {
  
  // Assume 'withdrawal' field exists in the user model
  existingUser.withdrawal.push({ amount, status, date });
  }
  else{
    throw new Error('Insufficient Balance');
  }

  // Save the updated user with withdrawal details
  const updatedUser = await existingUser.save();
  return updatedUser;
};

export default withdrawalRequest ;

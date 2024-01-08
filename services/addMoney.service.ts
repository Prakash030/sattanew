import { userModel } from '../models/user.model';
import { z } from 'zod';

const withdrawSchema = z.object({
  email: z.string().email(),
  amount: z.number(),
  status: z.string(),
  date: z.string(),
  utrNo: z.string(),
});

const addMoneyRequest = async (payload: z.infer<typeof withdrawSchema>) => {
  const { email, amount, status, date, utrNo } = payload;

  const existingUser = await userModel().findOne({ email });

  if (!existingUser) {
    throw new Error('User not found');
  } 
  existingUser.deposit.push({ amount, status, date, utrNo });
  

  // Save the updated user with withdrawal details
  const updatedUser = await existingUser.save();
  return updatedUser;
};

export default addMoneyRequest ;

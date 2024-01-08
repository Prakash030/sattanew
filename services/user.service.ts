import {userModel} from '../models/user.model';
import { z } from 'zod';


const createUserInput = z.object({
    email: z.string().email(),
    name: z.string().min(6),
    phoneNumber: z.string().min(10),
    password: z.string().min(6),
    balance: z.number(),
    role:z.string(),
    bankDetails: z.object({}),
    withdrawal: z.array(z.object({})),
    deposit: z.array(z.object({})),
    
})

const createUser = async (payload: z.infer<typeof createUserInput>) => {
    const userEmail = await userModel().findOne({ email: payload.email });
  
    if (userEmail) {
      throw new Error('Email already exists');
    }

    console.log("inservce",payload);

    const newUser = await userModel().create({
      email: payload.email,
      name: payload.name,
      phoneNumber: payload.phoneNumber,
      password: payload.password,
      balance: payload.balance,
      role: payload.role,
      bankDetails: payload.bankDetails,
      withdrawal: payload.withdrawal,
      deposit: payload.deposit,
    });
    return newUser;
  };

export default createUser;

import {userModel} from '../models/user.model';
import { z } from 'zod';


const createUserInput = z.object({
    email: z.string().email(),
    password:z.string(),
})

const login = async (payload: z.infer<typeof createUserInput>) => {

    const user = await userModel().findOne({ email: payload.email,password:payload.password });
    console.log("user",user);
  
    if (!user) {
      throw new Error('user does not exists');
    }

    return user;
  };

export default login;

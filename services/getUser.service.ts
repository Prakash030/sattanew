import { resultModel } from '@/models/result.model';
import { userModel } from '../models/user.model';
import { z } from 'zod';

const getUser = async (email: string) => {
    // const { email } = req.body;
    const res = await userModel().findOne({ email });

    if (!res) {
        throw new Error('Result for the current day does not exist');
    }

    return res;
};

export default getUser;
import { resultModel } from '@/models/result.model';
import {userModel} from '../models/user.model';
import { z } from 'zod';


const getResultInput = z.object({
    MILAN_MORNING: z.string().min(1), // 10:15 am to 11:15 am
    SIVAJI: z.string().min(1), // 11:30 am to 12:30 pm - Highlight with yellow
    KALYAN_MORNING: z.string().min(1), // 11:00 am to 12:00 pm
    SRIDEVI: z.string().min(1), // 11:35 am to 12:35 pm
    SIVA: z.string().min(1), // 12:30 pm to 01:30 pm – Highlight with yellow
    MADHUR_DAY: z.string().min(1), // 1:30 pm to 2:30 pm
    MILAN_DAY: z.string().min(1), // 2:15 pm to 04:15 pm
    KALYAN: z.string().min(1), // 3:45 pm to 5:45 pm
    MAHARANI_DAY: z.string().min(1), // 5:15 pm to 7:15 pm
    SIVAJI_NIGHT: z.string().min(1), // 7:00 pm to 8:00 pm – Highlight with yellow
    SRIDEVI_NIGHT: z.string().min(1), // 7:00 pm to 8:00 pm
    MADHUR_NIGHT: z.string().min(1), // 8:30 pm to 10:30 pm
    MILAN_NIGHT: z.string().min(1), // 9:00 pm to 11:00 pm
    MAIN_BAJAR: z.string().min(1), // 9:35 pm to 12:05 am
    MAHARANI_NIGHT: z.string().min(1), // 10:15 pm to 12:15 am
})

const getResult = async () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  const res = await resultModel().findOne({
      createdAt: {
          $gte: currentDate,
          $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // Next day
      },
  });

  if (!res) {
      throw new Error('Result for the current day does not exist');
  }

  return res;
};

export default getResult;
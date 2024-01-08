import { z } from 'zod';
import { tableModel } from '@/models/table.model';

const chartTableInput = z.object({
    date:z.string().min(1),
    chartType: z.string().min(1),
    gameName: z.string().min(1),
    value: z.string().min(1),
    dayOfWeek:z.string().min(1),
})


const chartTable = async (payload: z.infer<typeof chartTableInput>) => {
  

    const existingResult = await tableModel().findOne({
        date:payload.date,
        chartType:payload.chartType,
        gameName:payload.gameName,
        dayOfWeek:payload.dayOfWeek,
    });

    if (existingResult) {
        // Update existing result for the current date
        const updatedResult = await tableModel().findOneAndUpdate(
            {
                date:payload.date,
                chartType:payload.chartType,
                gameName:payload.gameName, 
                dayOfWeek:payload.dayOfWeek, 
            },
            {
                $set: {
                    ...payload,
                },
            },
            { new: true } // Return the updated document
        );

        return updatedResult;
    } else {
        // Create a new result for the current date
        const newResult = await tableModel().create({
            ...payload,
        });

        return newResult;
    }
};

export default chartTable;

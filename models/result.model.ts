import mongoose, { Document, ObjectId } from 'mongoose';

interface Result extends Document {
    _id: ObjectId;
    MILAN_MORNING: string; // 10:15 am to 11:15 am
    SIVAJI: string; // 11:30 am to 12:30 pm - Highlight with yellow
    KALYAN_MORNING: string; // 11:00 am to 12:00 pm
    SRIDEVI: string; // 11:35 am to 12:35 pm
    SIVA: string; // 12:30 pm to 01:30 pm – Highlight with yellow
    MADHUR_DAY: string; // 1:30 pm to 2:30 pm
    MILAN_DAY: string; // 2:15 pm to 04:15 pm
    KALYAN: string; // 3:45 pm to 5:45 pm
    MAHARANI_DAY: string; // 5:15 pm to 7:15 pm
    SIVAJI_NIGHT: string; // 7:00 pm to 8:00 pm – Highlight with yellow
    SRIDEVI_NIGHT: string; // 7:00 pm to 8:00 pm
    MADHUR_NIGHT: string; // 8:30 pm to 10:30 pm
    MILAN_NIGHT: string; // 9:00 pm to 11:00 pm
    MAIN_BAJAR: string; // 9:35 pm to 12:05 am
    MAHARANI_NIGHT: string; // 10:15 pm to 12:15 am

}


  

const resultschema = new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    MILAN_MORNING: {
        type: String,
        required: true,
    },
    SIVAJI: {
        type: String,
        required: true,
    },
    KALYAN_MORNING: {
        type: String,
        required: true,
    },
    SRIDEVI: {
        type: String,
        required: true,
    },
    SIVA: {
        type: String,
        required: true,
    },
    MADHUR_DAY: {
        type: String,
        required: true,
    },
    MILAN_DAY: {
        type: String,
        required: true,
    },
    KALYAN: {
        type: String,
        required: true,
    },
    MAHARANI_DAY: {
        type: String,
        required: true,
    },
    SIVAJI_NIGHT: {
        type: String,
        required: true,
    },
    SRIDEVI_NIGHT: {
        type: String,
        required: true,
    },
    MADHUR_NIGHT: {
        type: String,
        required: true,
    },
    MILAN_NIGHT: {
        type: String,
        required: true,
    },
    MAIN_BAJAR: {
        type: String,
        required: true,
    },
    MAHARANI_NIGHT: {
        type: String,
        required: true,
    },
    
  
   
},
{
    timestamps: true,_id:true
}
);



export const resultModel = () => {
  const model =
    mongoose.models && mongoose.models.Result
      ? (mongoose.models.Result as mongoose.Model<Result>)
      : mongoose.model<Result>('Result', resultschema);

  return model;
};


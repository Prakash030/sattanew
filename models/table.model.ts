import mongoose, { Document, ObjectId } from "mongoose";

interface Table extends Document {
  _id: ObjectId;
  chartType: string;
  gameName: string;
  date: string;
  dayOfWeek:string;
  value: string;
}

const tableschema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    chartType: {
      type: String,
      required: true,
    },
    gameName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    dayOfWeek: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: true,
  }
);

export const tableModel = () => {
  const model =
    mongoose.models && mongoose.models.Table
      ? (mongoose.models.Table as mongoose.Model<Table>)
      : mongoose.model<Table>("Table", tableschema);

  return model;
};

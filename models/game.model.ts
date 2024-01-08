import mongoose, { Document, ObjectId } from "mongoose";

interface Game extends Document {
  _id: ObjectId;
  player: string;
  gameName: string;
  gameType: string;
  amount: number;
  digits: string;
  odds: number;
  isVerified:boolean;
}

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    player: {
      type: String,
      required: true,
    },
    gameName: {
      type: String,
      required: true,
    },
    gameType: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    digits: {
      type: String,
      required: true,
    },
    odds:{
      type: Number,
      required: true,
    },
    isVerified:{
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true, id: true }
);

export const gameModel = () => {
  const model =
    mongoose.models && mongoose.models.Game
      ? (mongoose.models.Game as mongoose.Model<Game>)
      : mongoose.model<Game>("Game", userSchema);

  return model;
};

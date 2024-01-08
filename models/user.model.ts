import mongoose, { Document, ObjectId } from 'mongoose';

interface User extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  balance: number;
  role: string;
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    branch: string;
    bankName: string;
    details: boolean;
    upiId: string;
  };
  withdrawal:[
    {
      amount: number;
      status: string;
      date: string;
    }
  ]
  deposit: [
    {
      amount: number;
      status: string;
      utrNo: string;
      date: string;
    }
  ]
  
}

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  bankDetails: {
    accountNumber: {
      type: String,
      required: false,
    },
    ifscCode: {
      type: String,
      required: false,
    },
    branch: {
      type: String,
      required: false,
    },
    bankName: {
      type: String,
      required: false,
    },
    details: {
      type: Boolean,
      required: false,
      default: false,
    },
    upiId: {
      type: String,
      required: false,
    },
  },
  withdrawal:[
    {
      amount: {
        type: Number,
        required: false,
      },
      status: {
        type: String,
        required: false,
      },
      date: {
        type: String,
        required: false,
      },
    }
  ],
  deposit: [
    {
      amount: {
        type: Number,
        required: false,
      },
      status: {
        type: String,
        required: false,
      },
      utrNo: {
        type: String,
        required: false,
      },
      date: {
        type: String,
        required: false,
      },
    }
  ],
},
  { timestamps: true, id: true }

);



export const userModel = () => {
  const model =
    mongoose.models && mongoose.models.User
      ? (mongoose.models.User as mongoose.Model<User>)
      : mongoose.model<User>('User', userSchema);

  return model;
};


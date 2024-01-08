import { userModel } from "../models/user.model";

const getDetails = async () => {
  // const { email } = req.body;
  const res = await userModel().find({});

  if (!res) {
    throw new Error("Result for the current day does not exist");
  }

  return res;
};

export default getDetails;

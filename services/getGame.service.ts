import { gameModel } from "../models/game.model";

const getDetails = async (player: string) => {
//   const { player } = req.body;
  const res = await gameModel().find({player});

  if (!res) {
    throw new Error("Result for the current day does not exist");
  }

  return res;
};

export default getDetails;
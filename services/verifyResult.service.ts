import { gameModel } from "../models/game.model";
import { userModel } from "@/models/user.model";
import { resultModel } from "@/models/result.model";
import { z } from "zod";

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const verifyResultInput = z.object({
  player: z.string().min(1),
});

const verifyResult = async (payload: z.infer<typeof verifyResultInput>) => {
  try {
    const { player } = payload;

    const user = await userModel().findOne({ email: player });

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user._id;

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(currentDate.getTime() + ONE_DAY_IN_MILLISECONDS);

    const res = await resultModel().findOne({
      createdAt: {
        $gte: currentDate,
        $lt: nextDay,
      },
    });

    if (!res) {
      throw new Error("Result for the current day does not exist");
    }

    let newBalance = user.balance;

    const gameDetails = await gameModel()
      .find({ player, isVerified: false })
      .sort({ createdAt: -1 });

    const promises = gameDetails.map(async (gameDetail) => {
      const resultDetail = (res as unknown as Record<string, string>)[
        gameDetail.gameName
      ];

      console.log("latest game", gameDetail);

      // logic for anks
      if (resultDetail && resultDetail.length >= 5) {
        const jodi = resultDetail.slice(3, 5);
        const openAnk = gameDetail.digits.toString()[0];
        const closeAnk = gameDetail.digits.toString()[1];

        if (
          (openAnk !== "-" &&
            closeAnk !== "-" &&
            jodi === openAnk + closeAnk) ||
          (openAnk === "-" && jodi[1] === closeAnk) ||
          (closeAnk === "-" && jodi[0] === openAnk)
        ) {
          newBalance += gameDetail.amount * gameDetail.odds;

          await userModel().findByIdAndUpdate(userId, {
            balance: newBalance,
          });

          console.log("newBalance", newBalance);
          // Update isVerified for the current game
          await gameModel().findByIdAndUpdate(gameDetail._id, {
            isVerified: true,
          });

          return {
            updateBalance: { userId, newBalance },
          };
        }
      }

      // logic for pattis
      if (resultDetail && resultDetail.length == 8) {
        const patti1 = resultDetail.slice(0, 3);
        const patti2 = resultDetail.slice(5, 8);
        const openPatti = gameDetail.digits.toString().slice(0, 3);
        const closePatti = gameDetail.digits.toString().slice(3, 6);
        console.log("data", patti1, patti2, openPatti, closePatti);

        if (
          (openPatti !== "---" &&
            closePatti !== "---" &&
            patti1 + patti2 === openPatti + closePatti) ||
          (openPatti === "---" && patti2 === closePatti) ||
          (closePatti === "---" && patti1 === openPatti)
        ) {
          newBalance += gameDetail.amount * gameDetail.odds;

          await userModel().findByIdAndUpdate(userId, {
            balance: newBalance,
          });

          console.log("newBalance", newBalance);
          // Update isVerified for the current game
          await gameModel().findByIdAndUpdate(gameDetail._id, {
            isVerified: true,
          });

          return {
            updateBalance: { userId, newBalance },
          };
        }
      }

      return null;
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    return {
      updateBalance: { userId, newBalance },
    };
  } catch (error) {
    console.log("error", error);
    throw error; // Propagate the error
  }
};

export default verifyResult;

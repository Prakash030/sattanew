import { gameModel } from '../models/game.model';
import { userModel } from '@/models/user.model';
import { z } from 'zod';

const updateBalanceInput = z.object({
  player: z.string().min(1),
  gameName: z.string().min(1),
  gameType: z.string().min(1),
  amount: z.number(),
  digits: z.string().min(1),
  odds:z.number(),
  isVerified:z.boolean(),
});

const updateBalance = async (payload: z.infer<typeof updateBalanceInput>) => {
  try {
    const user = await userModel().findOne({ email: payload.player });

    if (!user) {
      throw new Error('User not found');
    }

    const userId = user._id;

    const balance = user.balance;
    const newBalance = balance - payload.amount;

    if (newBalance < 0) {
      throw new Error('Insufficient balance');
    }

    // Update user's balance
    await userModel().findByIdAndUpdate(userId, { balance: newBalance });

    // Create a new game
    const newGame = await gameModel().create({
      player: payload.player,
      gameName: payload.gameName,
      gameType: payload.gameType,
      amount: payload.amount,
      digits: payload.digits,
      odds: payload.odds,
      isVerified:payload.isVerified,
    });

    return {
      updateBalance: { userId, newBalance },
      newGame,
    };
  } catch (error) {
    // Handle errors here or propagate them up
    console.log("error",error);
  }
};

export default updateBalance;

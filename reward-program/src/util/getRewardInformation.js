import { AMOUNT, DATE } from "../config/constants.js";
import calculatePoints from "./calculatePoints.js";
import convertNumberToMonth from "./convertNumberToMonth.js";

export default function getRewardInformation(purchase) {
    const transactions = { month: {}, total: 0 };
    for (let i = 0; i < purchase.length; i++) {
        const daily_reward_point = calculatePoints(purchase[i][AMOUNT]);
        const date = purchase[i].date.slice(
            purchase[i].date.indexOf("-") + 1
        );
        const month_number = date.slice(0, date.indexOf("-"));
        const month = convertNumberToMonth(Number(month_number));

        if (transactions.month[month] === undefined) {
            transactions.month[month] = {
                transaction: [
                    {
                        date,
                        amount: purchase[i][AMOUNT],
                        points: daily_reward_point,
                    },
                ],
                total: daily_reward_point,
            };
        } else {
            transactions.month[month].transaction.push({
                date,
                amount: purchase[i][AMOUNT],
                points: daily_reward_point,
            });
            transactions.month[month].total += daily_reward_point;
        }
        transactions.total += daily_reward_point;
    }
    return transactions;
}



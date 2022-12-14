import { AMOUNT, DATE } from "../config/constants.js";

export default function groupUserTransactions(data) {
    const transactions={}
    for (let i = 0; i < data.length; i++) {
      
        const {username, id}=data[i].user;
        const date=data[i][DATE].slice(0,data[i][DATE].indexOf(' '));

        if(transactions[username]===undefined){
            transactions[username]={id, purchase:[{date, amount:data[i][AMOUNT]}] }
        }
        else {
            let SameDayTransaction=false;

            transactions[username].purchase.forEach(t=> {
                //add amount together if it is the same day
                if(t.date===date){
                    t.amount+=data[i][AMOUNT];
                    SameDayTransaction=true;
                }
            });
            //add new record to the transactions array
            if(!SameDayTransaction){
                transactions[username].purchase.push({date, amount:data[i][AMOUNT]})
            }
        }
    }
    return transactions;
}

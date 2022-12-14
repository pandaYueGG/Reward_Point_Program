import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import { faker } from '@faker-js/faker';


function createData(n) {
    const data = { transactions: [] };
    const namelist=[];
    for(let i=0;i<10;i++){
        //generate random names
        namelist.push(faker.name.firstName())
    }

    for (let i = 0; i < n; i++) {
        const newData = {
            id: i+1,
            user: {
                id: uuidv4(),
                username: namelist[Math.floor(Math.random()*10)],
            },
            timestamp: `2022-${Math.floor(Math.random()*3+5)}-${Math.floor(Math.random()*30+1)} ${Math.floor(Math.random()*25)}:${Math.floor(Math.random()*61)}:${Math.floor(Math.random()*61)}`,
            amount: Math.floor(Math.random()*300+1),
        };
        data.transactions.push(newData);
    }
    return data;
}

fs.writeFile("../data.json", JSON.stringify(createData(40)), function (err) {
    console.log("data saved");
});

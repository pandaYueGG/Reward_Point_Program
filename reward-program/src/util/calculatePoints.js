export default function calculatePoints(amount){
    let reward_points=0;
    if(amount<=100&& amount>50){
        reward_points=amount-50;
    }
    else if(amount>100){
        reward_points=50+(amount-100)*2;
    }
    return reward_points;
}


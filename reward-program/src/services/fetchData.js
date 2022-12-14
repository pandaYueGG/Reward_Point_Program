
import { BASE_URL } from "../config/constants.js";

export default async function fetchData() {

    const resp = await fetch(`${BASE_URL}/transactions`)
    const data = await resp.json()
    
    const res = new Promise((res,rej) => {
        setTimeout(() => {
            res(data)
        },1000)
    })
    return res;
}

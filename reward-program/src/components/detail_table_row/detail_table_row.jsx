import React from "react";
import getRewardInformation from "../../util/getRewardInformation.js";
import getRowsData from "../../util/getRowsData.js";
import "./detail_table_row.css";
export default function Detail_table_row({ name, purchase }) {


    const rowinfo = getRewardInformation(purchase);

    const rows=getRowsData(name, rowinfo);

    return (
        <>
            {rows.map((row,index)=>{
              return <tr key={index}>
                {row.map((r,i)=><td key={i} rowSpan={r[1]}>{r[0]}</td>)}
              </tr>
            })}
        </>
    );
}

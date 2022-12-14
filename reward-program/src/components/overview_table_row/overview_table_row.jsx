import React from 'react'
import calculatePoints from "../../util/calculatePoints.js"
import "./overview_table_row.css"

export default function Overview_table_row({amount,timestamp,user}) {
  return (
    <tr className="text-center">
      <td >{user.username}</td>
      <td>{timestamp.slice(0,timestamp.indexOf(' '))}</td>
      <td>{amount}</td>
      <td>{calculatePoints(amount)}</td>
    </tr>
  )
}

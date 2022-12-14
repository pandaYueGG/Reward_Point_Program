import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "../detail_table/detail_table.css";
import fetchData from "../../services/fetchData.js";
import Overview_table_row from "../overview_table_row/overview_table_row.jsx";
import "./overview_table.css";
import calculatePoints from "../../util/calculatePoints.js";
import { withLoading } from "../../hoc/withLoading";
function OverviewTable({updateLoading}) {
    const [transactions, setTransactions] = useState([]);
    const [sorted, setSorted] = useState({
        date: "",
        amount: "",
        points: "",
    });
    useEffect(() => {
        async function getData() {
            updateLoading(true)
            const record = await fetchData();
            updateLoading(false)
            setTransactions(record);
        }
        getData();
    }, []);

    function onClickHandler(type) {
        let sortedTransactions;
        switch (type) {
            case "date":
                if (sorted.date === "ascendant") {
                    sortedTransactions = transactions.sort((a, b) =>
                        a.timestamp.localeCompare(b.timestamp)
                    );
                    setSorted({ amount: "", points: "", date: "descendant" });
                } else {
                    sortedTransactions = transactions.sort((a, b) =>
                        b.timestamp.localeCompare(a.timestamp)
                    );
                    setSorted({ amount: "", points: "", date: "ascendant" });
                }
                setTransactions([...sortedTransactions]);
                break;
            case "amount":
                if (sorted.amount === "ascendant") {
                    sortedTransactions = transactions.sort(
                        (a, b) => a.amount - b.amount
                    );
                    setSorted({ date: "", points: "", amount: "descendant" });
                } else {
                    sortedTransactions = transactions.sort(
                        (a, b) => b.amount - a.amount
                    );
                    setSorted({ date: "", points: "", amount: "ascendant" });
                }
                setTransactions([...sortedTransactions]);
                break;
            case "points":
                if (sorted.points === "ascendant") {
                    sortedTransactions = transactions.sort(
                        (a, b) =>
                            calculatePoints(a.amount) -
                            calculatePoints(b.amount)
                    );
                    setSorted({ date: "", amount: "", points: "descendant" });
                } else {
                    sortedTransactions = transactions.sort(
                        (a, b) =>
                            calculatePoints(b.amount) -
                            calculatePoints(a.amount)
                    );
                    setSorted({ date: "", amount: "", points: "ascendant" });
                }

                setTransactions([...sortedTransactions]);
                break;
            default:
                break;
        }
    }

    return (
        <div className="Overview_table_container">
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>Name</th>
                                <th onClick={(e) => onClickHandler("date")}>
                                    Date
                                    {sorted.date === "ascendant" ? (
                                        <i className="bi bi-caret-up-fill"></i>
                                    ) : (
                                        sorted.date === "descendant" && (
                                            <i className="bi bi-caret-down-fill"></i>
                                        )
                                    )}
                                </th>
                                <th onClick={(e) => onClickHandler("amount")}>
                                    Amount
                                    {sorted.amount === "ascendant" ? (
                                        <i className="bi bi-caret-up-fill"></i>
                                    ) : (
                                        sorted.amount === "descendant" && (
                                            <i className="bi bi-caret-down-fill"></i>
                                        )
                                    )}
                                </th>
                                <th onClick={(e) => onClickHandler("points")}>
                                    Reward Points
                                    {sorted.points === "ascendant" ? (
                                        <i className="bi bi-caret-up-fill"></i>
                                    ) : (
                                        sorted.points === "descendant" && (
                                            <i className="bi bi-caret-down-fill"></i>
                                        )
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions &&
                                transactions.map((transaction) => (
                                    <Overview_table_row
                                        key={transaction.user.id}
                                        {...transaction}
                                    />
                                ))}
                        </tbody>
                    </Table>
                </div>
        </div>
    );
}
export default withLoading(OverviewTable)
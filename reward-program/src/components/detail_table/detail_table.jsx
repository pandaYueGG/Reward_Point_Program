import React, { useState, useEffect } from "react";
import { Button, Table, Form, InputGroup } from "react-bootstrap";
import Detail_table_row from "../detail_table_row/detail_table_row.jsx";
import fetchData from "../../services/fetchData.js";
import groupUserTransactions from "../../util/groupUserTransactions.js";
import { withLoading } from "../../hoc/withLoading.js";

function DetailTable({updateLoading}) {
    const [transactions, setTransactions] = useState([]);
    const [searchContent, setSearchContent] = useState("");
    async function getData() {
        updateLoading(true)
        const record = await fetchData();
        updateLoading(false)
        const filteredTransaction = groupUserTransactions(record);
        setTransactions(filteredTransaction);
    }
    useEffect(() => {
        getData();
    }, []);
    function onClickHandler(e){
        e.preventDefault();
        
        if(transactions[searchContent]!==undefined){
            const newTransactions={[searchContent]:transactions[searchContent]};
            setTransactions(newTransactions);
        }
        else if(searchContent===""){
            getData()
        }
        else{
            window.confirm('no customer found, please search again!')
        }
        
    }
    return (
        <div className="Detail_table_container">

                <div>
                    <InputGroup className="mb-3">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                flexGrow: 1,
                            }}
                        >
                            <Form.Control
                                placeholder="Customer's name"
                                style={{
                                    width: "35%",
                                }}
                                value={searchContent}
                                onChange={e=>setSearchContent(e.target.value)}
                            />
                            <Button
                                variant="outline-secondary"
                                id="button-addon2"
                                onClick={e=>onClickHandler(e)}
                            >
                                <span className="bi-search" style={{paddingRight:"6px"}}></span> 
                                Search
                            </Button>
                            
                        </div>
                    </InputGroup>
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>Name</th>
                                <th>Month</th>
                                <th>date</th>
                                <th>amount</th>
                                <th>reward points(per day)</th>
                                <th>reward points(per month)</th>
                                <th>reward points(in total)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions &&
                                Object.entries(transactions).map(
                                    (transaction) => (
                                        <Detail_table_row
                                            key={transaction[1].id}
                                            name={transaction[0]}
                                            purchase={transaction[1].purchase}
                                        />
                                    )
                                )
                            
                            }
                        </tbody>
                    </Table>
                </div>
            
        </div>
    );
}

export default withLoading(DetailTable)
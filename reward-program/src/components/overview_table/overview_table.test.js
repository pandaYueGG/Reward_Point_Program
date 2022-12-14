import React from "react";
import {
    render,
    screen,
    waitForElementToBeRemoved,
    prettyDOM,
} from "@testing-library/react";
// import { act } from "react-dom/test-utils";
import mockFetch, { data } from "../../mocks/mockFetch";
import OverViewTable from "./overview_table";
import userEvent from "@testing-library/user-event";
import calculatePoints from "../../util/calculatePoints";

let windowFetchSpy;
beforeEach(() => {
    windowFetchSpy = jest.spyOn(window, "fetch").mockImplementation(mockFetch);
});

afterEach(() => {
    jest.restoreAllMocks();
});

function createTbody(data) {
    //create dummy data and appended it to tbody
    const tbody = document.createElement("tbody");
    for (let i = 0; i < 40; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement("td");
            let cellText;
            switch (j) {
                case 0:
                    cellText = document.createTextNode(data[i].user.username);
                    break;
                case 1:
                    cellText = document.createTextNode(
                        data[i].timestamp.slice(
                            0,
                            data[i].timestamp.indexOf(" ")
                        )
                    );
                    break;
                case 2:
                    cellText = document.createTextNode(data[i].amount);
                    break;
                case 3:
                    cellText = document.createTextNode(
                        calculatePoints(data[i].amount)
                    );
                    break;
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tbody.append(row);
    }
    return tbody;
}

function sorting(data, type) {
    // ascendant   descendant
    switch (type[0]) {
        case "date":
            if (type[1] === "descendant") {
                data.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
            } else {
                data.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
            }
            break;
        case "amount":
            if (type[1] === "descendant") {
                data.sort((a, b) => b.amount - a.amount);
            } else {
                data.sort((a, b) => a.amount - b.amount);
            }
            break;
        case "points":
            if (type[1] === "descendant") {
                data.sort(
                    (a, b) =>
                        calculatePoints(b.amount) - calculatePoints(a.amount)
                );
            } else {
                data.sort(
                    (a, b) =>
                        calculatePoints(a.amount) - calculatePoints(b.amount)
                );
            }
            break;
        default:
            break;
    }
    return data;
}

test("renders the overview table", async () => {
    const { container, rerender } = render(<OverViewTable />);

    //check some table headers
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Reward Points")).toBeInTheDocument();

    //check number of columns for the table
    const columns = screen.getAllByRole("columnheader");
    expect(columns).toHaveLength(4);

    //check data load from JSON server
    expect(windowFetchSpy).toHaveBeenCalledWith(
        "http://localhost:3000/transactions"
    );

  
});

test("check test sorting for date", async () => {
    render(<OverViewTable />);

    const date_column = screen.getAllByRole("columnheader")[1];
    userEvent.click(date_column);

    const sorted_data = sorting(data, ["date", "descendant"]);
    const Tbody = createTbody(sorted_data);
    const table = screen.getByRole("table");
    table.appendChild(Tbody);

    const name = screen.getAllByRole("cell")[0];
    const date = screen.getAllByRole("cell")[1];
    const amount = screen.getAllByRole("cell")[2];
    const point = screen.getAllByRole("cell")[3];
    expect(name).toHaveTextContent("Helen");
    expect(date).toHaveTextContent("2022-7-9");
    expect(amount).toHaveTextContent("85");
    expect(point).toHaveTextContent("35");
});

test("check test sorting for amount", async () => {
    render(<OverViewTable />);

    const amount_column = screen.getAllByRole("columnheader")[2];
    userEvent.click(amount_column);

    const sorted_data = sorting(data, ["amount", "descendant"]);
    const Tbody = createTbody(sorted_data);
    const table = screen.getByRole("table");
    table.appendChild(Tbody);

    const name = screen.getAllByRole("cell")[0];
    const date = screen.getAllByRole("cell")[1];
    const amount = screen.getAllByRole("cell")[2];
    const point = screen.getAllByRole("cell")[3];
    expect(name).toHaveTextContent("Milo");
    expect(date).toHaveTextContent("2022-6-17");
    expect(amount).toHaveTextContent("300");
    expect(point).toHaveTextContent("450");
});


test("check test sorting for points", async () => {
    render(<OverViewTable />);

    const point_column = screen.getAllByRole("columnheader")[3];
    userEvent.click(point_column);


    const sorted_data = sorting(data, ["points", "descendant"]);
    const Tbody = createTbody(sorted_data);
    const table = screen.getByRole("table");
    table.appendChild(Tbody);

    const name = screen.getAllByRole("cell")[0];
    const date = screen.getAllByRole("cell")[1];
    const amount = screen.getAllByRole("cell")[2];
    const point = screen.getAllByRole("cell")[3];
    expect(name).toHaveTextContent("Milo");
    expect(date).toHaveTextContent("2022-6-17");
    expect(amount).toHaveTextContent("300");
    expect(point).toHaveTextContent("450");
});

import React from "react";
import {
    render,
    screen,
    waitForElementToBeRemoved,
    prettyDOM,
} from "@testing-library/react";
import mockFetch, { data } from "../../mocks/mockFetch";
import DetailTable from "./detail_table";
import userEvent from "@testing-library/user-event";
import groupUserTransactions from "../../util/groupUserTransactions";

function sorting(data, name){
    return {[name]:groupUserTransactions(data)[name]}
};

let windowFetchSpy;
beforeEach(() => {
    windowFetchSpy =jest.spyOn(window, "fetch").mockImplementation(mockFetch);
    // jest.mock(mockFetch)
});

afterEach(() => {
    jest.restoreAllMocks();
});

test("renders the landing page", async () => {
    const {container}=render(<DetailTable />);

    //check some table headers
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("date")).toBeInTheDocument();

    //check number of columns for the table
    const columns = screen.getAllByRole("columnheader");
    expect(columns).toHaveLength(7);

    //check data load from JSON server
    expect(windowFetchSpy).toHaveBeenCalledWith("http://localhost:3000/transactions");
    expect(windowFetchSpy).toHaveBeenCalledTimes(1);


});

test("check search button features", async () => {
    const {container}=render(<DetailTable />);


    //test search button
    const searchBtn = screen.getByRole("button", { name: "Search" });
    expect(searchBtn).toBeInTheDocument();

    //test input onChange
    const input = screen.getByPlaceholderText("Customer's name");
    userEvent.type(input, "Norris");
    expect(input.value).toBe("Norris");

    //check search function
    userEvent.click(searchBtn);

    const filtered_data = sorting(data, "Norris");

    console.log('condada',filtered_data )
    expect(Object.keys(filtered_data).includes("Norris")).toBe(true);
    expect(Object.keys(filtered_data).includes("Tess")).toBe(false);

});

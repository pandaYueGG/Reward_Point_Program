import calculatePoints from "./calculatePoints";
import convertNumberToMonth from "./convertNumberToMonth";
import getRewardInformation from "./getRewardInformation";
import getRowsData from "./getRowsData";
import groupUserTransactions from "./groupUserTransactions";
import { data } from "../mocks/mockFetch";

test("test calculatePoints function", async () => {
    expect(calculatePoints(183)).toBe(216);
    expect(calculatePoints(61)).toBe(11);
    expect(calculatePoints(49)).toBe(0);
});

test("test convertNumberToMonth function", async () => {
    expect(convertNumberToMonth(1)).toEqual("January");
    expect(convertNumberToMonth(3)).toEqual("March");
    expect(convertNumberToMonth(10)).toEqual("October");
});

test("test getRewardInformation function", async () => {
    const input_purchase = [
        { date: "2022-5-23", amount: 196 },
        { date: "2022-5-3", amount: 94 },
        { date: "2022-6-13", amount: 290 },
    ];
    const expected_transaction = {
        month: {
            May: {
                transaction: [
                    { date: "5-23", amount: 196, points: 242 },
                    { date: "5-3", amount: 94, points: 44 },
                ],
                total: 286,
            },
            June: {
                transaction: [{ date: "6-13", amount: 290, points: 430 }],
                total: 430,
            },
        },
        total: 716,
    };
    expect(getRewardInformation(input_purchase)).toEqual(expected_transaction);
});

test("test getRowsData function", async () => {
    const input_data = {
        month: {
            July: {
                transaction: [{ date: "7-23", amount: 213, points: 276 }],
                total: 276,
            },
        },
        total: 276,
    };
    const input_name = "Krystina";
    const expected_output = [
        [
            ["Krystina", 1],
            ["July", 1],
            ["7-23", 1],
            [213, 1],
            [276, 1],
            [276, 1],
            [276, 1],
        ],
    ];
    expect(getRowsData(input_name, input_data)).toEqual(expected_output);
});

test("test groupUserTransactions function", async () => {
    const input = data;

    const expected_output = {
        Norris: {
            id: "3e3cd5c6-3854-482c-9bf2-1ffe67b88ced",
            purchase: [
                { date: "2022-7-25", amount: 183 },
                { date: "2022-6-20", amount: 298 },
            ],
        },
        Tess: {
            id: "d81bce3f-deb9-49f0-b698-f16532c9ab70",
            purchase: [
                { date: "2022-5-23", amount: 9 },
                { date: "2022-7-12", amount: 369 },
                { date: "2022-6-4", amount: 21 },
                { date: "2022-5-15", amount: 163 },
                { date: "2022-7-17", amount: 96 },
                { date: "2022-5-6", amount: 200 },
                { date: "2022-7-25", amount: 4 },
                { date: "2022-6-19", amount: 117 },
                { date: "2022-5-9", amount: 184 },
            ],
        },
        Evan: {
            id: "bb2141d9-aba6-4b9c-8d9c-5fd7ea7ca6b1",
            purchase: [
                { date: "2022-7-27", amount: 9 },
                { date: "2022-6-2", amount: 296 },
                { date: "2022-5-24", amount: 158 },
                { date: "2022-5-27", amount: 139 },
                { date: "2022-5-15", amount: 260 },
                { date: "2022-7-16", amount: 27 },
            ],
        },
        Milo: {
            id: "9ce94ca5-eaab-47b4-834e-218288a6776d",
            purchase: [
                { date: "2022-7-6", amount: 123 },
                { date: "2022-6-17", amount: 300 },
            ],
        },
        Jeff: {
            id: "9376a3f5-59e2-42ea-9090-ea612dc94723",
            purchase: [
                { date: "2022-6-24", amount: 559 },
                { date: "2022-5-9", amount: 247 },
            ],
        },
        Helen: {
            id: "cb59d6a1-0c55-43e4-ae74-0792db05e3ed",
            purchase: [
                { date: "2022-5-13", amount: 94 },
                { date: "2022-7-29", amount: 61 },
                { date: "2022-5-18", amount: 145 },
                { date: "2022-6-8", amount: 194 },
                { date: "2022-7-9", amount: 106 },
                { date: "2022-5-15", amount: 190 },
            ],
        },
        Katarina: {
            id: "9c34d8ec-8d6f-46f5-a15a-ab0c72eace51",
            purchase: [{ date: "2022-6-6", amount: 1 }],
        },
        Brenda: {
            id: "5e05f5c7-9d5f-443d-8e08-b06ace62cd2c",
            purchase: [
                { date: "2022-7-27", amount: 283 },
                { date: "2022-5-14", amount: 525 },
                { date: "2022-7-25", amount: 133 },
                { date: "2022-6-15", amount: 270 },
            ],
        },
        Lina: {
            id: "a0ec54d0-6481-42f2-892e-6a8faf6c0644",
            purchase: [
                { date: "2022-5-23", amount: 196 },
                { date: "2022-5-3", amount: 94 },
                { date: "2022-6-13", amount: 290 },
            ],
        },
        Krystina: {
            id: "868176f9-9227-49a3-8584-fda291090c60",
            purchase: [{ date: "2022-7-23", amount: 213 }],
        },
    };
    expect(groupUserTransactions(input)).toEqual(expected_output);
});

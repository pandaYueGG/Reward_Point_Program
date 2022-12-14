import { render, screen, findByText} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

test("renders learn react link", async () => {
    const {rerender}=render(<App />);

    //test header text
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    

    //test checkbox click
    const checkBtn = screen.getByRole("button");
    const content_div = screen.getByTestId("table-container");
    userEvent.click(checkBtn);
    let month_text=await screen.findByText('Month')
    expect(month_text).toBeInTheDocument();

});

import { fireEvent, render, screen } from "@testing-library/react";

import App from "./App";
import userEvent from "@testing-library/user-event";

test("should render the order form", () => {
  render(<App />);
  expect(screen.getByTestId("order-form")).toBeInTheDocument();
});

test("should display table after submitting form", async () => {
  render(<App />);
  userEvent.type(screen.getByTestId("amount-input"), "44");
  userEvent.click(screen.getByTestId("submit-button"));
  expect(screen.getAllByTestId("table-cell-id")).toHaveLength(1);
  expect(screen.getAllByTestId("table-cell-date")).toHaveLength(1);
  expect(screen.getAllByTestId("table-cell-amount")).toHaveLength(1);
  expect(screen.getAllByTestId("table-cell-shipped")).toHaveLength(1);
});

test("should display correct data after submitting form", async () => {
  render(<App />);
  fireEvent.change(screen.getByDisplayValue("12/06/2022"), {
    target: { value: "22/11/2021" },
  });
  userEvent.type(screen.getByTestId("amount-input"), "500");
  userEvent.click(screen.getByTestId("shipped-input"));
  userEvent.click(screen.getByTestId("submit-button"));
  expect(screen.getAllByTestId("table-cell-id")).toHaveLength(1);
  expect(screen.getAllByTestId("table-cell-date")[0].innerHTML).toBe(
    "22/11/2021"
  );
  expect(screen.getAllByTestId("table-cell-amount")[0].innerHTML).toBe("500");
  expect(screen.getAllByTestId("table-cell-shipped")[0].innerHTML).toBe("Yes");
});

test("should show 1 order awaiting shipment", async () => {
  render(<App />);
  userEvent.type(screen.getByTestId("amount-input"), "44");
  userEvent.click(screen.getByTestId("submit-button"));
  expect(screen.getByTestId("awaiting-shipment-text").innerHTML).toBe(
    "1 order awaiting shipment"
  );
});

test("should show 2 orders awaiting shipment", async () => {
  render(<App />);
  userEvent.type(screen.getByTestId("amount-input"), "44");
  userEvent.click(screen.getByTestId("submit-button"));
  userEvent.type(screen.getByTestId("amount-input"), "44");
  userEvent.click(screen.getByTestId("submit-button"));
  expect(screen.getByTestId("awaiting-shipment-text").innerHTML).toBe(
    "2 orders awaiting shipment"
  );
});

test("should show 0 orders awaiting shipment", async () => {
  render(<App />);
  userEvent.type(screen.getByTestId("amount-input"), "44");
  userEvent.click(screen.getByTestId("shipped-input"));
  userEvent.click(screen.getByTestId("submit-button"));
  userEvent.type(screen.getByTestId("amount-input"), "44");
  userEvent.click(screen.getByTestId("shipped-input"));
  userEvent.click(screen.getByTestId("submit-button"));
  expect(screen.getByTestId("awaiting-shipment-text").innerHTML).toBe(
    "0 orders awaiting shipment"
  );
});

test("should not show order which gets deleted", async () => {
  render(<App />);
  userEvent.type(screen.getByTestId("amount-input"), "500");
  userEvent.click(screen.getByTestId("shipped-input"));
  userEvent.click(screen.getByTestId("submit-button"));
  userEvent.type(screen.getByTestId("amount-input"), "1000");
  userEvent.click(screen.getByTestId("shipped-input"));
  userEvent.click(screen.getByTestId("submit-button"));

  expect(screen.queryAllByTestId("table-cell-amount")).toHaveLength(2);

  userEvent.click(screen.getAllByTestId("delete-order-button")[0]);

  expect(screen.queryAllByTestId("table-cell-amount")).toHaveLength(1);
});

test("should update shipping text when order is shipped", async () => {
  render(<App />);
  userEvent.type(screen.getByTestId("amount-input"), "500");
  userEvent.click(screen.getByTestId("submit-button"));
  userEvent.type(screen.getByTestId("amount-input"), "1000");
  userEvent.click(screen.getByTestId("submit-button"));

  expect(screen.queryAllByTestId("table-cell-id")).toHaveLength(2);

  expect(screen.getByTestId("awaiting-shipment-text").innerHTML).toBe(
    "2 orders awaiting shipment"
  );

  userEvent.click(screen.getAllByTestId("ship-order-button")[0]);

  expect(screen.getByTestId("awaiting-shipment-text").innerHTML).toBe(
    "1 order awaiting shipment"
  );
});

test("should not show ship button if all orders are shipped", async () => {
  render(<App />);
  userEvent.type(screen.getByTestId("amount-input"), "500");
  userEvent.click(screen.getByTestId("shipped-input"));
  userEvent.click(screen.getByTestId("submit-button"));
  userEvent.type(screen.getByTestId("amount-input"), "1000");
  userEvent.click(screen.getByTestId("shipped-input"));
  userEvent.click(screen.getByTestId("submit-button"));

  expect(screen.queryAllByTestId("table-cell-id")).toHaveLength(2);
  expect(screen.queryByTestId("ship-order-button")).not.toBeInTheDocument();

  expect(screen.getByTestId("awaiting-shipment-text").innerHTML).toBe(
    "0 orders awaiting shipment"
  );
});

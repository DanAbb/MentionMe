import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders a order row", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Orders" })).toBeInTheDocument();
  expect(screen.getByText("29/03/2022")).toBeInTheDocument();
});

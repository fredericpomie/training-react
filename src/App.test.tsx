import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders brand list", async () => {
  const { findByText, asFragment, findByTestId } = render(<App />);
  await findByText(/ferrari/i);
  expect(asFragment()).toMatchSnapshot("First loading");

  fireEvent.change(await findByTestId("search-input"), {
    target: { value: "mase" },
  });
  await findByText(/rims maserati/i);
  expect(asFragment()).toMatchSnapshot("after search");

  fireEvent.click(await findByText("NEXT"));
  await findByText(/next/i);
  expect(asFragment()).toMatchSnapshot("after next");
});

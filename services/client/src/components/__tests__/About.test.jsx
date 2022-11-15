/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, cleanup } from "@testing-library/react";

import About from "../About";

afterEach(cleanup);

it("renders properly", () => {
  const { getByText } = render(<About />);
  const pTag = getByText("Add something relevant here.");
  expect(pTag).toHaveClass("content");
});

it("renders", () => {
  const { asFragment } = render(<About />);
  expect(asFragment()).toMatchSnapshot();
});

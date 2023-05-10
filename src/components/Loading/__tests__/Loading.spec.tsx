import { render, screen } from "@testing-library/react";

import Loading from "../Loading";

describe("Loading", () => {
  it("renders the Loading component", () => {
    render(<Loading />);

    const testId = screen.getByTestId("loading");

    expect(testId).toBeInTheDocument();
  });
});

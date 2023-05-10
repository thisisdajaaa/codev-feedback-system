import { render, screen } from "@testing-library/react";

import Button from "../Button";

describe("Button", () => {
  it("renders a Button", () => {
    render(<Button>Click me</Button>);

    const heading = screen.getByText(/Click me/i);

    expect(heading).toBeInTheDocument();
  });

  it("check if Button is disabled", () => {
    render(<Button disabled>Click me</Button>);

    const button = screen.getByText(/Click me/i);

    expect(button).toBeDisabled();
  });

  it("check if Button is loading", () => {
    render(<Button isLoading>Click me</Button>);

    const loading = screen.getByTestId("loading-icon");

    expect(loading).toBeInTheDocument();
  });
});

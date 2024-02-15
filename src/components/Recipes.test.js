import { render, screen } from "@testing-library/react";
import Recipes from "./Recipes";

describe("<Recipes />", () => {
  it("should verify the title of the component to exist", () => {
    render(<Recipes />);
    const headlineEl = screen.getByText(/Current Recipe:/i);
    expect(headlineEl).toBeInTheDocument();
  });
});

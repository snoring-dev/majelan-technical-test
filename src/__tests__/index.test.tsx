import App from "@/app/page";
import { render } from "@testing-library/react";

describe("test", () => {
  it("should render page", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("appContainer")).toBeTruthy();
  });
});

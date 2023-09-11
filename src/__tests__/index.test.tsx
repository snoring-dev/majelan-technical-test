import fetchMock from "jest-fetch-mock";
import App from "@/app/page";
import { render } from "@testing-library/react";
import { User, UserType } from "@/types";

fetchMock.enableMocks();

describe("test", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should render page", async () => {
    const mockUserData: User[] = [
      {
        name: "User1",
        email: "user1@example.com",
        id: 1,
        type: UserType.admin,
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockUserData), { status: 200 });

    const { getByTestId } = render(await App());
    expect(getByTestId("appContainer")).toBeTruthy();
  });
});

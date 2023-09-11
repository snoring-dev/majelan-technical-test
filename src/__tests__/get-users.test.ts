import fetchMock from "jest-fetch-mock";
import { getUsers } from "@/actions/get-users";
import { User, UserType } from "@/types";

fetchMock.enableMocks();

describe("getUsers", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches user data successfully", async () => {
    const mockUserData: User[] = [
      {
        name: "User1",
        email: "user1@example.com",
        id: 1,
        type: UserType.admin,
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockUserData), { status: 200 });

    const users = await getUsers();

    expect(users).toEqual(mockUserData);
    expect(fetchMock).toHaveBeenCalledWith(process.env.API_URL as string);
  });

  it("handles non-OK response", async () => {
    fetchMock.mockResponseOnce("Not Found", { status: 404 });

    try {
      await getUsers();
    } catch (error) {
      expect(error).toEqual(new Error("Failed to fetch data: 404 - Not Found"));
    }

    expect(fetchMock).toHaveBeenCalledWith(process.env.API_URL as string);
  });

  it("handles unexpected response format", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ foo: "bar" }), { status: 200 });

    try {
      await getUsers();
    } catch (error) {
      expect(error).toEqual(
        new Error("Unexpected response format: data is not an array")
      );
    }

    expect(fetchMock).toHaveBeenCalledWith(process.env.API_URL as string);
  });

  it("handles fetch errors", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));

    try {
      await getUsers();
    } catch (error) {
      expect(error).toEqual(new Error("Network error"));
    }

    expect(fetchMock).toHaveBeenCalledWith(process.env.API_URL as string);
  });
});

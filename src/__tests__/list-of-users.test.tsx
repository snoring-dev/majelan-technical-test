import React from "react";
import { render, fireEvent, waitFor, screen, within } from "@testing-library/react";
import ListOfUsers from "@/components/list-of-users";
import { UserType } from "@/types";
import "@testing-library/jest-dom/extend-expect";

import { users } from "@/data/mockData";

describe("ListOfUsers Component", () => {
  const convertTypes = (t: string) => {
    switch (t) {
      case "admin":
        return UserType.admin;
      case "member":
        return UserType.member;
      case "staff":
        return UserType.staff;
      default:
        return UserType.member;
    }
  };

  const mockData = [
    ...users.map((u) => ({ ...u, type: convertTypes(u.type) })),
  ];

  it("should render the component with initial data", () => {
    render(<ListOfUsers data={mockData} />);

    const headingElement = screen.getByText("Users");
    const searchInput = screen.getByPlaceholderText("Search...");
    const emailHeader = screen.getByText("Email");
    const nameHeader = screen.getByText("Name");
    const typeHeader = screen.getByText("Type");

    expect(headingElement).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(emailHeader).toBeInTheDocument();
    expect(nameHeader).toBeInTheDocument();
    expect(typeHeader).toBeInTheDocument();
  });

  it("should filter users by search string", async () => {
    render(<ListOfUsers data={mockData} />);

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.keyUp(searchInput, { target: { value: "arm" } });

    await waitFor(() => {
      const filteredUser = screen.getByTestId("arman-lucero");
      const table = screen.getByRole("table");
      const tableRows = within(table).getAllByRole("row");

      expect(filteredUser).toBeInTheDocument();
      expect(tableRows).toHaveLength(3); // 2 Results + 1 Row for headers
    });
  });

  it("should sort users by name in ascending order", async () => {
    render(<ListOfUsers data={mockData} />);

    const sortTrigger = screen.getByTestId("sort-users");
    fireEvent.click(sortTrigger);

    await waitFor(() => {
      const firstUser = screen.getByTestId("yasmine-mcneil");
      const lastUserInPage = screen.getByTestId("john-doe");

      expect(firstUser).toBeInTheDocument();
      expect(lastUserInPage).toBeInTheDocument();
    });
  });

  it("should paginate users", async () => {
    render(<ListOfUsers data={mockData} />);

    const nextButton = screen.getByTestId("next-btn");
    const unpaginatedUser = screen.getByTestId("bilal-levine");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const paginatedUser = screen.getByTestId("kieron-bass");
      expect(paginatedUser).toBeInTheDocument();
      expect(unpaginatedUser).not.toBeInTheDocument();
    });
  });
});

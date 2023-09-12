import { User } from "@/types";

export function sortUsersByName(users: User[], order: "ASC" | "DESC"): User[] {
  const sortedUsers = [...users];

  sortedUsers.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (order === "ASC") {
      return nameA.localeCompare(nameB);
    } else if (order === "DESC") {
      return nameB.localeCompare(nameA);
    }

    return 0;
  });

  return sortedUsers;
}

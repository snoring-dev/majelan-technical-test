import { User } from "@/types";

export function filterUsersByName(
  users: User[],
  search_string: string
): User[] {
  const lowerSearchString = search_string.toLowerCase().trim();

  if (lowerSearchString === "") {
    return users;
  }

  return users.filter((user) => {
    return user.name.toLowerCase().includes(lowerSearchString);
  });
}

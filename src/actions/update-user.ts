import { User } from "@/types";

export const patchUser = async (
  userId: number,
  username: string
): Promise<User[]> => {
  try {
    const resp = await fetch("http://localhost:3000/api/users", {
      method: "PATCH",
      body: JSON.stringify({ userId, username }),
    });

    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error('Somthing happened when fetching back data from the server');
    }
  } catch (error) {
    throw error;
  }
};

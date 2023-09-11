import { User } from "@/types";

export const getUsers = async (): Promise<User[]> => {
  try {
    const resp = await fetch(process.env.API_URL as string);

    if (!resp.ok) {
      throw new Error(`Failed to fetch data: ${resp.status} - ${resp.statusText}`);
    }

    const data = await resp.json();

    if (!Array.isArray(data)) {
      throw new Error("Unexpected response format: data is not an array");
    }

    return data as User[];
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

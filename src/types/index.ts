export type User = {
  name: string;
  email: string;
  id: number;
  type: "admin" | "staff" | "member";
};

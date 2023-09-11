export enum UserType {
  member = 'member',
  admin = 'admin',
  staff = 'staff',
};

export type User = {
  name: string;
  email: string;
  id: number;
  type: UserType;
};

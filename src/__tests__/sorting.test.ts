import { User, UserType } from "@/types";
import { sortUsersByName } from "@/utils/sorting";

describe('sortUsersByName', () => {
  const users: User[] = [
    {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      id: 1,
      type: UserType.admin,
    },
    {
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      id: 2,
      type: UserType.member,
    },
    {
      name: 'Alice Smith',
      email: 'alice.smith@gmail.com',
      id: 3,
      type: UserType.staff,
    },
  ];

  it('should sort users by name in ascending order', () => {
    const sortedUsers = sortUsersByName(users, 'ASC');
    expect(sortedUsers).toEqual([
      {
        name: 'Alice Smith',
        email: 'alice.smith@gmail.com',
        id: 3,
        type: UserType.staff,
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@gmail.com',
        id: 2,
        type: UserType.member,
      },
      {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        id: 1,
        type: UserType.admin,
      },
    ]);
  });

  it('should sort users by name in descending order', () => {
    const sortedUsers = sortUsersByName(users, 'DESC');
    expect(sortedUsers).toEqual([
      {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        id: 1,
        type: UserType.admin,
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@gmail.com',
        id: 2,
        type: UserType.member,
      },
      {
        name: 'Alice Smith',
        email: 'alice.smith@gmail.com',
        id: 3,
        type: UserType.staff,
      },
    ]);
  });

  it('should return the original array for an invalid order', () => {
    const sortedUsers = sortUsersByName(users, 'INVALID_ORDER' as any);
    expect(sortedUsers).toEqual(users);
  });
});

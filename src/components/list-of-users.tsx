"use client";

import { User } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { paginate } from "@/utils/pagination";
import { sortUsersByName } from "@/utils/sorting";
import { filterUsersByName } from "@/utils/filter-users";
import { slugify } from "@/utils/slugify";
import { patchUser } from "@/actions/update-user";
import NameEntry from "./name-entry";
import Pagination from "./pagination";
import ReOrderIcon from "./re-order-icon";
import Heading from "./heading";
import SearchField from "./search-field";
import Badge from "./badge";

interface Props {
  data: User[];
}

function ListOfUsers({ data }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [innerData, setInnerData] = useState<User[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingDirection, setSortingDirection] = useState<"ASC" | "DESC">(
    "ASC"
  );

  useEffect(
    () => setInnerData(sortUsersByName(data, sortingDirection)),
    [data, sortingDirection]
  );

  const onNextPage = useCallback(() => {
    if (currentPage >= pageCount) {
      return;
    }

    setCurrentPage((page) => page + 1);
  }, [currentPage, pageCount]);

  const onPrevPage = useCallback(() => {
    if (currentPage <= 1) {
      return;
    }

    setCurrentPage((page) => page - 1);
  }, [currentPage]);

  const toggleSortingDirection = () =>
    setSortingDirection((prevDirection) => {
      if (prevDirection === "ASC") return "DESC";
      return "ASC";
    });

  const sortUsers = () => {
    toggleSortingDirection();
    const users = sortUsersByName(innerData, sortingDirection);
    setInnerData(users);
  };

  useEffect(() => {
    const list = paginate<User>(innerData, 10, currentPage);
    setUserList(list);
  }, [currentPage, innerData]);

  useEffect(() => {
    const list = paginate<User>(innerData, 10, 1);
    setUserList(list);
    setPageCount(Math.ceil(innerData.length / 10));
  }, [innerData]);

  const filterUsers = useCallback(
    (value: string) => {
      const filtredUsers = filterUsersByName(data, value);
      setInnerData(filtredUsers);
    },
    [data]
  );

  const updateUser = async (id: number, username: string, callback: () => void) => {
    try {
      setIsLoading(true);
      // add some delay to show loading state!
      // @TODO: delete this in production
      await new Promise((r) => setTimeout(r, 2000));

      const position = data.findIndex((u) => u.id === id);

      if (position === -1) {
        throw new Error("User not found");
      }

      const updatedUsers = [
        ...data.filter((u) => u.id !== id),
        { ...data[position], name: username },
      ];

      setInnerData(sortUsersByName(updatedUsers, sortingDirection));
    } catch (err) {
      // handle the error here
    } finally {
      setIsLoading(false);
      callback();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mt-12 mb-6">
        <Heading title="Users" description="A list of all users" />
        <SearchField onChange={filterUsers} />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Name
                  <ReOrderIcon onClick={sortUsers} />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 &&
              userList.map((u: User) => {
                return (
                  <tr
                    key={u.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {u.email}
                    </th>
                    <td className="px-6 py-4" data-testid={slugify(u.name)}>
                      <NameEntry
                        value={u.name}
                        onUpdate={(username, cb) => updateUser(u.id, username, cb)}
                        isLoading={isLoading}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Badge label={u.type} type={u.type} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end py-4">
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPrev={onPrevPage}
          onNext={onNextPage}
          onPageSelected={(selectedPage) => setCurrentPage(selectedPage)}
        />
      </div>
    </>
  );
}

export default ListOfUsers;

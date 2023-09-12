"use client";

import { User } from "@/types";
import Heading from "./heading";
import SearchField from "./search-field";
import Badge from "./badge";
import { useCallback, useEffect, useState } from "react";
import { paginate } from "@/utils/pagination";
import Pagination from "./pagination";

interface Props {
  data: User[];
}

function ListOfUsers({ data }: Props) {
  const [userList, setUserList] = useState<User[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    const list = paginate<User>(data, 10, currentPage);
    setUserList(list);
  }, [currentPage, data]);

  useEffect(() => {
    const list = paginate<User>(data, 10, 1);
    setUserList(list);
    setPageCount(Math.ceil(data.length / 10));
  }, [data]);

  return (
    <>
      <div className="flex items-center justify-between mt-12 mb-6">
        <Heading title="Users" description="A list of all users" />
        <SearchField />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Name
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
                    <td className="px-6 py-4">{u.name}</td>
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

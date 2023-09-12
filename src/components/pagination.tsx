"use client";

import { useEffect, useState } from "react";

interface Props {
  pageCount: number;
  currentPage: number;
  onNext: () => void;
  onPrev: () => void;
  onPageSelected: (index: number) => void;
}

function Pagination({
  pageCount,
  currentPage,
  onNext,
  onPrev,
  onPageSelected,
}: Props) {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const expectedPages = Array.from(Array(pageCount), (_, x) => x + 1);
    setPages(expectedPages);
  }, [pageCount]);

  const classNames = {
    inactive:
      "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
    active:
      "z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
  };

  return (
    <div>
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li onClick={onPrev}>
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>
        {pages.map((page) => {
          return (
            <li key={page} onClick={() => onPageSelected(page)}>
              <a
                href="#"
                aria-current="page"
                className={
                  currentPage === page ? classNames.active : classNames.inactive
                }
              >
                {page}
              </a>
            </li>
          );
        })}
        <li onClick={onNext}>
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;

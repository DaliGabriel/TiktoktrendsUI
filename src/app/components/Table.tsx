"use client";
import { format } from "date-fns";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { TableProps } from "../../types/table";
import { Edge } from "../../types/trends";
const categoriesData = [
  {
    name: "Tech & Electronics",
    value: "Tech & Electronics",
    themeClass:
      "bg-blue-100/60 dark:bg-blue-800 text-blue-500 dark:text-blue-300",
  },
  {
    name: "News & Entertainment",
    value: "News & Entertainment",
    themeClass:
      "bg-yellow-100/60 dark:bg-yellow-800 text-yellow-500 dark:text-yellow-300",
  },
  {
    name: "Sports & Outdoor",
    value: "Sports & Outdoor",
    themeClass: "bg-red-100/60 dark:bg-red-800 text-red-500 dark:text-red-300",
  },
  {
    name: "Top Trend 🔥",
    value: "General",
    themeClass:
      "bg-yellow-200 dark:bg-yellow-600 text-yellow-700 dark:text-yellow-200",
  },
  {
    name: "Apparel & Accessories",
    value: "Apparel & Accessories",
    themeClass:
      "bg-emerald-100/60 dark:bg-emerald-800 text-emerald-500 dark:text-emerald-300",
  },
  {
    name: "Baby, Kids & Maternity",
    value: "Baby, Kids & Maternity",
    themeClass:
      "bg-pink-100/60 dark:bg-pink-800 text-pink-500 dark:text-pink-300",
  },
  {
    name: "Beauty & Personal Care",
    value: "Beauty & Personal Care",
    themeClass:
      "bg-fuchsia-100/60 dark:bg-fuchsia-800 text-fuchsia-500 dark:text-fuchsia-300",
  },
  {
    name: "Business Services",
    value: "Business Services",
    themeClass:
      "bg-indigo-100/60 dark:bg-indigo-800 text-indigo-500 dark:text-indigo-300",
  },
  {
    name: "Education",
    value: "Education",
    themeClass: "bg-sky-100/60 dark:bg-sky-800 text-sky-500 dark:text-sky-300",
  },
  {
    name: "Financial Services",
    value: "Financial Services",
    themeClass:
      "bg-teal-100/60 dark:bg-teal-800 text-teal-500 dark:text-teal-300",
  },
  {
    name: "Food & Beverage",
    value: "Food & Beverage",
    themeClass:
      "bg-lime-100/60 dark:bg-lime-800 text-lime-500 dark:text-lime-300",
  },
  {
    name: "Games",
    value: "Games",
    themeClass:
      "bg-violet-100/60 dark:bg-violet-800 text-violet-500 dark:text-violet-300",
  },
  {
    name: "Health",
    value: "Health",
    themeClass:
      "bg-rose-100/60 dark:bg-rose-800 text-rose-500 dark:text-rose-300",
  },
  {
    name: "Home Improvement",
    value: "Home Improvement",
    themeClass:
      "bg-orange-100/60 dark:bg-orange-800 text-orange-500 dark:text-orange-300",
  },
  {
    name: "Life Services",
    value: "Life Services",
    themeClass:
      "bg-cyan-100/60 dark:bg-cyan-800 text-cyan-500 dark:text-cyan-300",
  },
  {
    name: "Household Products",
    value: "Household Products",
    themeClass:
      "bg-amber-100/60 dark:bg-amber-800 text-amber-500 dark:text-amber-300",
  },
  {
    name: "Pets",
    value: "Pets",
    themeClass:
      "bg-purple-100/60 dark:bg-purple-800 text-purple-500 dark:text-purple-300",
  },
  {
    name: "Travel",
    value: "Travel",
    themeClass:
      "bg-blue-100/60 dark:bg-blue-800 text-blue-500 dark:text-blue-300",
  },
  {
    name: "Vehicle & Transportation",
    value: "Vehicle & Transportation",
    themeClass:
      "bg-slate-100/60 dark:bg-slate-800 text-slate-500 dark:text-slate-300",
  },
];

const Table: React.FC<TableProps> = ({
  trends,
  totalHashtags,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  selectedCategory,
  setSelectedCategory,
  selectedDate,
  setSelectedDate,
  loadMore,
}) => {
  const [searchKeyboard, setsearchKeyboard] = useState("");

  function generateTableRows(trendsData: Edge[]) {
    // console.log(trendsData);
    return trendsData.map((trend) => (
      <tr key={trend?.cursor}>
        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
          <div>
            <h2 className="font-medium text-gray-800 dark:text-white">
              <Link
                href={`https://www.tiktok.com/tag/${trend.node.hashtag}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {trend.node.hashtag}
              </Link>
            </h2>
            <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
              {trend.node.country}
            </p>
          </div>
        </td>
        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
          <div
            className={`inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 ${getThemeClass(
              trend.node.theme
            )}`}
          >
            {trend.node.theme == "General" ? "Top Trend 🔥" : trend.node.theme}
          </div>
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div>
            <h4 className="text-gray-700 dark:text-gray-200">
              Rank: {trend.node.rank}
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              {trend.node.posts} posts
            </p>
          </div>
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <h4 className="text-gray-700 dark:text-gray-200">
            {trend.node.scrapedAt?.split(",")[0]}
          </h4>
        </td>
      </tr>
    ));
  }

  function getThemeClass(theme: string) {
    const category = categoriesData.find((cat) => cat.value === theme);
    return category
      ? category.themeClass
      : "bg-gray-100/60 dark:bg-gray-800 text-gray-500 dark:text-gray-300"; // Default style
  }

  const handleDateChange = (date: string) => {
    if (!date) {
      setSelectedDate(null);
      return;
    }

    const newDate = new Date(date);

    // Adjust the date to set the time to the start of the selected day in the user's local timezone
    newDate.setHours(0, 0, 0, 0);

    // This is crucial: Add one day to the date
    newDate.setDate(newDate.getDate() + 1);

    setSelectedDate(newDate);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchKeyboard(e.target.value);
  };

  const handleSearch = () => {
    if (searchKeyboard.trim() === "") {
      setSearchTerm("");
      return;
    }
    const searchQuery = `# ${searchKeyboard}`;
    setSearchTerm(searchQuery);
    setsearchKeyboard("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <section className="container px-4 mx-auto">
        {/* title text and buttons */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Tik Tok Trends
              </h2>

              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                {totalHashtags} Hashtags
              </span>
            </div>
          </div>
        </div>

        {/* Buttons categories and search input */}
        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button
              onClick={() => setSelectedCountry("MX")}
              className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 ${
                selectedCountry === "MX" ? "bg-gray-100 dark:bg-gray-800" : ""
              } sm:text-sm dark:text-gray-300`}
            >
              México
            </button>

            <button
              onClick={() => setSelectedCountry("USA")}
              className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 ${
                selectedCountry === "USA" ? "bg-gray-100 dark:bg-gray-800" : ""
              } sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100`}
            >
              U.S.A
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                onClick={handleSearch} // Trigger search on SVG click
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search"
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleChange}
              onKeyDown={handleKeyDown} // Trigger search on Enter key
            />
          </div>
        </div>

        {/* Table content */}
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3 focus:outline-none">
                          <span>Hashtag</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <strong>Select Category:</strong>
                        <br />
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className={`select-category ${getThemeClass(
                            selectedCategory
                          )} cursor-pointer mt-2`}
                        >
                          {categoriesData.map((category) => (
                            <option key={category.name} value={category.value}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Posts
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex flex-col space-y-2">
                          <strong>Select Date:</strong>
                          <input
                            type="date"
                            value={
                              selectedDate
                                ? format(selectedDate, "yyyy-MM-dd")
                                : ""
                            }
                            onChange={(e) => handleDateChange(e.target.value)}
                            className="mt-2 px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 dark:focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {generateTableRows(trends)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <div className="flex justify-center my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                {" "}
                {/* Spinner SVG */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>

            <span className="my-2">Load More</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Table;

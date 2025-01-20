"use client";
import React from "react";

interface Trend {
  country: string;
  hashtag: string;
  posts: string;
  rank: string;
  scrapedAt: string;
  theme: string;
}

interface Edge {
  cursor: string;
  node: Trend;
}

interface TableProps {
  trends: Edge[];
  totalHashtags: number;
  selectedCountry: string; // Receive the state
  setSelectedCountry: (country: string) => void; // Receive the setter
  loadMore: () => void; // Receive the setter
}

const Table: React.FC<TableProps> = ({
  trends,
  totalHashtags,
  selectedCountry,
  setSelectedCountry,
  loadMore,
}) => {
  function generateTableRows(trendsData: Edge[]) {
    // console.log(trendsData);
    return trendsData.map((trend) => (
      <tr key={trend?.cursor}>
        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
          <div>
            <h2 className="font-medium text-gray-800 dark:text-white ">
              {trend.node.hashtag}
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
            {trend.node.theme}
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
    switch (theme) {
      case "Tech & Electronics":
        return "bg-blue-100/60 dark:bg-blue-800 text-blue-500 dark:text-blue-300";
      case "News & Entertainment":
        return "bg-yellow-100/60 dark:bg-yellow-800 text-yellow-500 dark:text-yellow-300";
      case "Sports & Outdoor":
        return "bg-red-100/60 dark:bg-red-800 text-red-500 dark:text-red-300";
      case "General":
        return "bg-gray-100/60 dark:bg-gray-800 text-gray-500 dark:text-gray-300";
      case "Apparel & Accessories":
        return "bg-emerald-100/60 dark:bg-emerald-800 text-emerald-500 dark:text-emerald-300";
      case "Baby, Kids & Maternity":
        return "bg-pink-100/60 dark:bg-pink-800 text-pink-500 dark:text-pink-300";
      case "Beauty & Personal Care":
        return "bg-fuchsia-100/60 dark:bg-fuchsia-800 text-fuchsia-500 dark:text-fuchsia-300";
      case "Business Services":
        return "bg-indigo-100/60 dark:bg-indigo-800 text-indigo-500 dark:text-indigo-300";
      case "Education":
        return "bg-sky-100/60 dark:bg-sky-800 text-sky-500 dark:text-sky-300";
      case "Financial Services":
        return "bg-teal-100/60 dark:bg-teal-800 text-teal-500 dark:text-teal-300";
      case "Food & Beverage":
        return "bg-lime-100/60 dark:bg-lime-800 text-lime-500 dark:text-lime-300";
      case "Games":
        return "bg-violet-100/60 dark:bg-violet-800 text-violet-500 dark:text-violet-300";
      case "Health":
        return "bg-rose-100/60 dark:bg-rose-800 text-rose-500 dark:text-rose-300";
      case "Home Improvement":
        return "bg-orange-100/60 dark:bg-orange-800 text-orange-500 dark:text-orange-300";
      case "Life Services":
        return "bg-cyan-100/60 dark:bg-cyan-800 text-cyan-500 dark:text-cyan-300";
      case "Household Products":
        return "bg-amber-100/60 dark:bg-amber-800 text-amber-500 dark:text-amber-300";
      case "Pets":
        return "bg-purple-100/60 dark:bg-purple-800 text-purple-500 dark:text-purple-300";
      case "Travel":
        return "bg-blue-100/60 dark:bg-blue-800 text-blue-500 dark:text-blue-300";
      case "Vehicle & Transportation":
        return "bg-slate-100/60 dark:bg-slate-800 text-slate-500 dark:text-slate-300";
      default:
        return "bg-gray-100/60 dark:bg-gray-800 text-gray-500 dark:text-gray-300";
    }
  }

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

          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
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
                        <button className="flex items-center gap-x-3 focus:outline-none">
                          <span>Hashtag</span>

                          <svg
                            className="h-3"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.1"
                            />
                            <path
                              d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.1"
                            />
                            <path
                              d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.3"
                            />
                          </svg>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Category
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
                        Date
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
                className="w-5 h-5 animate-spin"
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

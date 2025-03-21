"use client";

import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import Table from "./components/Table";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Loading from "./components/Loading";
import Error from "./components/Error";
import { TrendsData } from "../types/trends";

// Define your GraphQL query
const GET_TRENDS = gql`
  query GetTrends(
    $first: Int
    $after: String
    $country: String
    $hashtag: String
    $rank: Int
    $theme: String
    $targetDate: String
  ) {
    trends(
      first: $first
      after: $after
      hashtag: $hashtag
      country: $country
      rank: $rank
      theme: $theme
      targetDate: $targetDate
    ) {
      edges {
        cursor
        node {
          country
          hashtag
          posts
          rank
          scrapedAt
          theme
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalHashtags
    }
  }
`;

export default function Home() {
  const router = useRouter(); // Get the router instance

  const [selectedCountry, setSelectedCountry] = useState("MX"); // Default country
  const [selectedCategory, setSelectedCategory] = useState("General"); // Default country
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Use correct type
  const [pageSize, setPageSize] = useState(10); // Initial page size
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, data, refetch } = useQuery<TrendsData>(GET_TRENDS, {
    variables: {
      first: pageSize,
      hashtag: searchTerm,
      country: selectedCountry,
      theme: selectedCategory,
      targetDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined,
    }, // Initial fetch
    onError: (error) => { 
      if (error.message === "Not authenticated!") {
        router.push("/login");
      }
    },
  });

  // Refetch data when selectedCountry changes
  useEffect(() => {
    console.log(selectedDate);
    if (data) {
      refetch({
        country: selectedCountry,
        hashtag: searchTerm,
        first: pageSize,
        theme: selectedCategory,
        targetDate: selectedDate
          ? format(selectedDate, "yyyy-MM-dd")
          : undefined,
      });
    }
  }, [
    selectedCountry,
    refetch,
    data,
    pageSize,
    selectedCategory,
    selectedDate,
    searchTerm,
  ]);

  const handleLoadMore = () => {
    setPageSize(pageSize + 10);
  };

  if (loading) return <Loading />;

  if (error) return <Error message={error.message} />;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Hello</h1>
        <Table
          trends={data?.trends.edges || []}
          totalHashtags={data?.trends.totalHashtags || 0}

          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm} // Pass down the state and setter

          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry} // Pass down the state and setter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory} // Pass down the state and setter
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate} // Pass down the state and setter
          loadMore={handleLoadMore}
        />
      </main>
    </div>
  );
}

"use client";

import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import Table from "./components/Table";
import { useEffect, useState } from "react";

// Define your GraphQL query
const GET_TRENDS = gql`
  query GetTrends(
    $first: Int
    $after: String
    $country: String
    $rank: String
    $theme: String
  ) {
    trends(
      first: $first
      after: $after
      country: $country
      rank: $rank
      theme: $theme
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

interface TrendsData {
  trends: {
    edges: Edge[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    totalHashtags: number;
  };
}

export default function Home() {
  const router = useRouter(); // Get the router instance

  const [selectedCountry, setSelectedCountry] = useState("MX"); // Default country
  const [pageSize, setPageSize] = useState(10); // Initial page size

  const { loading, error, data, fetchMore, refetch } = useQuery<TrendsData>(
    GET_TRENDS,
    {
      variables: { first: pageSize, country: selectedCountry }, // Initial fetch
      onError: (error) => {
        if (error.message === "Not authenticated!") {
          router.push("/login");
        }
      },
    }
  );

  // Refetch data when selectedCountry changes
  useEffect(() => {
    if (data) {
      refetch({ country: selectedCountry, first: pageSize });
    }
  }, [selectedCountry, refetch, data, pageSize]);

  if (loading)
    return (
      <>
        <div className="loop cubes">
          <div className="item cubes"></div>
          <div className="item cubes"></div>
          <div className="item cubes"></div>
          <div className="item cubes"></div>
          <div className="item cubes"></div>
          <div className="item cubes"></div>
        </div>
      </>
    );
  if (error) return <p>Error: {error.message}</p>;

  const handleLoadMore = () => {
    setPageSize(pageSize + 10); // Increase page size by 10
  };
  console.log(data?.trends.totalHashtags);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Table
          trends={data?.trends.edges || []}
          totalHashtags={data?.trends.totalHashtags || 0}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry} // Pass down the state and setter
          loadMore={handleLoadMore}
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </div>

    // <div>
    //   {data?.trends.edges.map(({ node }) => (
    //     <div key={node.hashtag}>
    //       <h3>{node.hashtag}</h3>
    //     </div>
    //   ))}
    //   {data?.trends.pageInfo.hasNextPage && (
    //     <button onClick={loadMore}>Load More</button>
    //   )}
    // </div>
  );
}

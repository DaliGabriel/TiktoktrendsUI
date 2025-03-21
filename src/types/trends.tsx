interface Trend {
  hashtag: string;
  country: string;
  rank: number;
  posts: number | null;
  scrapedAt: string;
  theme: string;
  numberDays?: number | null;
}

export interface Edge {
  cursor: string;
  node: Trend;
}

export interface TrendsData {
  trends: {
    edges: Edge[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    totalHashtags: number;
  };
}

export interface QueryTrendsArgs {
  hashtag?: string;
  country?: string;
  rank?: string;
  theme?: string;
  first?: number;
  after?: string;
  targetDate?: string;
}

interface TrendEdge {
  cursor: string;
  node: Trend;
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null; // Allow null as per your logic
}
export interface TrendConnection {
  edges: TrendEdge[];
  pageInfo: PageInfo;
  totalHashtags: number;
}

import { db } from "@/lib/firebaseAdmin";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import admin from "firebase-admin";
import jwt from "jsonwebtoken";

// 1. Define GraphQL Schema (Type Definitions)
const typeDefs = `

type Trend {
  country: String
  hashtag: String
  posts: String
  rank: String
  scrapedAt: String
  theme: String
}

type TrendEdge {
  cursor: String!
  node: Trend!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}

type TrendConnection {
  edges: [TrendEdge!]!
  pageInfo: PageInfo!
  totalHashtags: Int!
}

type Query {
  trends(country: String, rank: String, theme: String, first: Int, after: String): TrendConnection
}
`;

//*Auth
interface MyContext {
  userId?: string;
}

interface QueryTrendsArgs {
  country?: string;
  rank?: string;
  theme?: string;
  first?: number;
  after?: string;
}

const resolvers = {
  Query: {
    trends: async (
      _: unknown,
      { country, rank, theme, first = 10, after }: QueryTrendsArgs,
      context: MyContext
    ): Promise<any> => {
      // Authentication Check:
      if (!context.userId) {
        throw new Error("Not authenticated!");
      }

      let query: any = db.collection("trends");

      if (country) {
        query = query.where("country", "==", country);
      }

      if (rank) {
        query = query.where("rank", "==", rank);
      }

      if (theme) {
        query = query.where("theme", "==", theme);
      }

      // Use the count() method on the query
      const totalHashtags = (await query.count().get()).data().count;

      // Ordering is crucial for cursor-based pagination to work correctly.
      query = query.orderBy("rank", "asc").orderBy("scrapedAt", "desc"); // Example: Order by scrapedAt in descending order

      //*last document fetched
      if (after) {
        // Assuming the cursor is the document ID
        const lastDoc = await db.collection("trends").doc(after).get();
        query = query.startAfter(lastDoc);
      }

      query = query.limit(first);

      const snapshot = await query.get();

      //*Trend data
      const edges = snapshot.docs.map((doc: any) => {
        const data = doc.data();
        const timestamp = data.scrapedAt as admin.firestore.Timestamp;
        const date = timestamp.toDate();
        const formatter = new Intl.DateTimeFormat("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        });
        return {
          cursor: doc.id, // Use document ID as cursor
          node: {
            country: data.country,
            hashtag: data.hashtag,
            numberDays: data.numberDays || null,
            posts: data.posts || null,
            rank: data.rank,
            scrapedAt: formatter.format(date),
            theme: data.theme,
          },
        };
      });

      let endCursor = null;
      if (edges.length > 0) {
        endCursor = edges[edges.length - 1].cursor;
      }

      // Check if there's a next page
      let hasNextPage = false;
      if (endCursor) {
        const nextQuery = db
          .collection("trends")
          .orderBy("scrapedAt", "desc") // Same order as the main query
          .startAfter(await db.collection("trends").doc(endCursor).get())
          .limit(1); // Just need to check if one more document exists

        const nextSnapshot = await nextQuery.get();
        hasNextPage = !nextSnapshot.empty;
      }

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
        totalHashtags,
      };
    },
  },
};

// Initialize the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Export the handler as the default API route export
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  //*add validation to the context api
  context: async (req) => {
    try {
      // 1. Get token from Authorization header:
      const authHeader = req.headers.get("authorization");
      if (!authHeader) return {}; // No header, return empty context

      const token = authHeader.split(" ")[1]; // "Bearer <token>"

      // 2. Verify the token and decode:
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };

      // 3. Add userId to the context
      return { userId: decoded.userId };
    } catch (error) {
      console.error("Authentication error:", error);
      return {}; // Invalid token, return empty context
    }
  },
});

export async function POST(request: NextRequest) {
  return handler(request);
}

export async function GET(request: NextRequest) {
  return handler(request);
}

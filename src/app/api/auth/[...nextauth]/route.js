import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getDB } from "@/lib/mongo";
import { verifyPassword } from "@/lib/hashedPassword";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await getDB();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) throw new Error("❌ No user found");

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("❌ Invalid credentials");

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          approved: user.approved ?? user.role !== "StoreAdmin",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt", maxAge: 1 * 24 * 60 * 60 }, // 1 Day
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.approved = user.approved;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.approved = token.approved;
      return session;
    },
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const db = await getDB();
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });

        if (!existingUser) {
          await db.collection("users").insertOne({
            name: user.name,
            email: user.email,
            role: "User",
            approved: true,
            createdAt: new Date(),
          });
        }
      }
      return true;
    },
    async redirect({ url, baseUrl, token }) {
      if (!token) return "/login";

      if (token.role === "StoreAdmin" && !token.approved) return "/waiting";

      if (token.role === "GeneralAdmin") return "/admin/dashboard";

      if (token.role === "StoreAdmin") return "/store/dashboard";

      return "/";
    },
  },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

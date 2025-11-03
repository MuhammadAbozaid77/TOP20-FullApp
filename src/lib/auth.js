import CredentialsProvider from "next-auth/providers/credentials";
import { getDB } from "./mongo";
import { verifiyPassword } from "./hashedPassword";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await getDB();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

        const isValid = await verifiyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid credentials");

        if (user.role === "StoreAdmin" && !user.approved) {
          throw new Error("Store not approved by admin yet");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};

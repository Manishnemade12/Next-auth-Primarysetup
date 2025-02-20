import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await mongooseConnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("No user found with this email");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Incorrect password");

        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: { signIn: "/auth/signin" },
  secret: process.env.NEXTAUTH_SECRET,
});

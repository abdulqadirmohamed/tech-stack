import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { compare } from "bcrypt-ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt', // Using JWT sessions
  },
  pages: {
    signIn: '/login', // Custom login page
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate input data using Zod
        const validationFields = signInSchema.safeParse(credentials);

        if (!validationFields.success) {
          throw new Error('Invalid input');
        }

        const { email, password } = validationFields.data;

        // Fetch user from the database
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error('Invalid email or password');
        }

        // Verify the password
        const correctPassword = await compare(password, user.password);

        if (!correctPassword) {
          throw new Error('Invalid email or password');
        }

        // Return user object (excluding sensitive fields)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
});

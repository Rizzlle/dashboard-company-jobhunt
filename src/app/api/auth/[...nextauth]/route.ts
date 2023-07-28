import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../lib/prisma";
import { comparePassword } from "@/lib/utils";

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: { label: "Email", type: "password" },
				id: {
					type: "text",
				},
			},
			async authorize(credentials, req) {
				const user = await prisma.company.findFirst({
					where: {
						email: credentials?.email,
					},
				});

				if (!user) {
					return null;
				}

				const isMatch = await comparePassword(
					credentials?.password!!,
					user?.password!!
				);

				if (isMatch) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signOut",
		error: "/auth/error",
		newUser: "/auth/new-company",
	},
	callbacks: {
		jwt({ token, account, user }) {
			if (account) {
				token.id = user?.id;
			}

			return token;
		},
		async session({ session, token, user }) {
			session.user.id = token.id;

			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

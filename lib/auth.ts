import { NextAuthOptions } from "next-auth";
import { Signature } from "@/lib/signature";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";

const providers = [
  CredentialsProvider({
    name: "web3-auth",
    credentials: {
      signature: {
        label: "Signature",
        type: "text",
      },
      message: {
        label: "Message",
        type: "text",
      },
      username: { label: "Username", type: "text" },
    },
    async authorize(credentials, req: any) {
      const { publicKey, host } = JSON.parse(credentials?.message || "{}");

      const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || "");

      if (host !== nextAuthUrl.host) {
        return null;
      }

      const username = credentials!.username;
      if (!username) {
        throw new Error("Username is required");
      }
      console.log("username", username);
      const crsf = await getCsrfToken({ req: { ...req, body: null } });

      if (!crsf) {
        return null;
      }

      const nonceUnit8 = Signature.create(crsf);

      const isValidate = await Signature.validate(
        {
          signature: credentials?.signature || "",
          publicKey,
        },
        nonceUnit8
      );

      if (!isValidate) {
        throw new Error("Could not validate the signed message");
      }
      return { id: publicKey, username };
    },
  }),
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.username = (user as any)['username']; //TODO
      }
      return token;
    },
    session({ session, token }: any) {
      console.log("session", session);
      console.log("token", token);
      if (session.user) {
        session.user.walletId = token.sub;
        session.user.username = token.username;
      }
      return session;
    },
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

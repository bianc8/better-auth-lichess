import { betterAuth, logger } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../../prisma";
import { genericOAuth } from "better-auth/plugins";
import type { LichessUser } from "types/lichess";

const lichessHost = "https://lichess.org";

export const auth = betterAuth({
  logger: {
    level: "error",
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    genericOAuth({
      config: [
        // lichess oauth provider
        {
          providerId: "lichess",
          clientId: "lichess-client-id",
          clientSecret: "",
          authorizationUrl: `${lichessHost}/oauth`,
          tokenUrl: `${lichessHost}/api/api/token`,
          scopes: ["preference:read", "email:read"],
          pkce: true,
          getUserInfo: async (tokens) => {
            logger.info("getting user info for lichess tokens", tokens);
            const [data, emailData] = await Promise.all([
              fetch(`${lichessHost}/api/account`, {
                headers: {
                  Authorization: `Bearer ${tokens.accessToken}`,
                },
              }).then((res) => res.json() as Promise<LichessUser>),
              fetch(`${lichessHost}/api/account/email`, {
                headers: {
                  Authorization: `Bearer ${tokens.accessToken}`,
                },
              }).then((res) => res.json() as Promise<{ email: string }>),
            ]);
            logger.info("lichess received user data", data);
            logger.info("lichess received email data", emailData);
            return {
              id: data.id,
              name: data.username,
              email: emailData.email || "",
              emailVerified: emailData.email ? true : false,
              profileUrl: `${lichessHost}/@/${data.username}`,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          },
          mapProfileToUser: async (profile) => {
            logger.info("oauth profile received", profile);
            return profile;
          },
        },
      ],
    }),
  ],
});

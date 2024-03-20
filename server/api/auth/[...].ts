import KeycloakProvider from "next-auth/providers/keycloak";
import { TokenSet } from "next-auth";
import { NuxtAuthHandler } from "#auth";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken({
  refresh_token,
}: {
  refresh_token: string;
}) {
  const params = new URLSearchParams({
    client_id: process.env.KEYCLOAK_ID as string,
    client_secret: process.env.KEYCLOAK_SECRET as string,
    grant_type: "refresh_token",
    refresh_token,
  });

  const url = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const refreshedTokens: TokenSet = await response.json();

  if (!response.ok) {
    throw refreshedTokens;
  }

  return refreshedTokens;
}

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the access_token in the encrypted JWT.
      if (account && profile) {
        token.access_token = account.access_token;
        token.expires_at = (account.expires_at ?? 0) * 1000;
        token.refresh_token = account.refresh_token;
      }
      if (Date.now() + 60 * 1000 < (token.expires_at as number)) {
        return token;
      }

      const currentDate = Math.trunc(Date.now() / 1000) * 1000;
      const newToken = await refreshAccessToken({
        refresh_token: token.refresh_token as string,
      });
      token.access_token = newToken.access_token;
      token.expires_at =
        currentDate + ((newToken.expires_in as number) ?? 0) * 1000;
      token.refresh_token = newToken.refresh_token;
      return token;
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    KeycloakProvider.default({
      clientId: process.env.KEYCLOAK_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
});

import NextAuth, {TokenSet} from "next-auth"
import {RebelToken} from "#/types";
import {EntraClient} from "#/app/state/server";

const version = require("../../../package.json").version;

const configEndpoint = process.env.ENTRAOS_CONFIG;
if (!configEndpoint) throw new Error("Configuration env variable not set.");

const clientId = process.env.TEKNOLOGIHUSET_CLIENT_ID;
if (!clientId) throw new Error("Config endpoint env variable not set.");

const clientSecret = process.env.TEKNOLOGIHUSET_CLIENT_SECRET;
if (!clientSecret) throw new Error("Config endpoint env variable not set.");

export default NextAuth({
    providers: [
        {
            id: 'RebelSSO',
            name: 'RebelSSO',
            type: 'oauth',
            wellKnown: configEndpoint,
            clientId: clientId,
            clientSecret: clientSecret,
            idToken: true,
            profile(profile) {
                const {given_name, family_name, sub} = profile;
                return {
                    id: `${profile.customer_ref}-${sub}`,
                    given_name, family_name, sub,
                    name: `${given_name} ${family_name}`,
                    email: sub
                }
            }
        }
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                console.log("User %s was logged in at %s", token.name,
                    new Date(Date.now()).toLocaleString("no-nb", { timeZone: 'CET' }))
                return {
                    ...token,
                    access_token: account.access_token,
                    expires_at: Date.now() + 1000 * (account.expires_at ?? 900),
                    refresh_token: account.refresh_token,
                    id_token: account.id_token,
                    version,
                    user
                };
            }

            const rebelTokens: RebelToken = token as RebelToken;

            // https://github.com/nextauthjs/next-auth-refresh-token-example/blob/main/pages/api/auth/%5B...nextauth%5D.js
            // https://authjs.dev/guides/basics/refresh-token-rotation

            // refresh token rotation
            if (Date.now() > rebelTokens.expires_at) {
                console.log("Token has expired. Trying to refresh.")
                const client = await EntraClient();
                const tokenEndpoint = client.issuer.metadata.token_endpoint;
                if (!tokenEndpoint) throw new Error("No token endpoint on client - cannot refresh access token");

                const refreshParams = new URLSearchParams();
                refreshParams.append("client_id", clientId);
                refreshParams.append("client_secret", clientSecret);
                refreshParams.append("grant_type", "refresh_token");
                refreshParams.append("refresh_token", rebelTokens.refresh_token);

                const response = await fetch(tokenEndpoint, {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: refreshParams,
                    method: "POST"
                })

                const tokens: TokenSet = await response.json()

                if (!response.ok) {
                    console.error("Error refreshing access token", tokens)
                    return { ...token, error: "RefreshAccessTokenError" }
                }

                console.log("Token has been updated.")

                return {
                    ...token,
                    access_token: tokens.access_token,
                    expires_at: Date.now() + 1000 * (rebelTokens.expires_at ?? 900),
                    refresh_token: tokens.refresh_token ?? token.refresh_token
                }
            }

            if (token.version !== version) {
                console.warn("User %s %s has an outdated app version.", token.name, token.email)
                return {
                    ...token,
                    error: "InvalidVersionError"
                }
            }

            return token
        },
        async session({ session, token }) {
            if (token && token.user)
                session.user = token.user

            if (token && token.error)
                // @ts-ignore
                session.error = token.error

            if (token.version)
                // @ts-ignore
                session.version = token.version

            return session
        }
    },
    useSecureCookies: process.env.NODE_ENV !== "development",
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 900
    },
    pages: {
        signIn: "/"
    }
})

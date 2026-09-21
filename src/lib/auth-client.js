import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    /** The base URL of the server (dynamic origin on client, env on server) */
    baseURL:
        typeof window !== "undefined"
            ? window.location.origin
            : process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
              process.env.BETTER_AUTH_URL ||
              (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
    plugins: [jwtClient()],
});

export const { signIn, signUp, useSession } = authClient;
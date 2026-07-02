import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { createAuthMiddleware, APIError } from "better-auth/api";
const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

   hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-in/email") return;

      const { email } = ctx.body;

      const user = await db.collection("user").findOne({ email });

      if (user?.status === "block") {
        throw new APIError("FORBIDDEN", {
          message: "Your account has been blocked by the administrator.",
        });
      }
    }),
  },

  // for google
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  // for role

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "client",
      },
      skills: {
        type: "string",
        input: true,
      },
      bio: {
        type: "string",
        input: true,
      },
      hourlyRate: {
        type: "string", 
        input: true,
      },
    },
  },

  session:{
    cookieCache:{
      enabled: true,
      strategy:'jwt',
      maxAge: 60 * 24 * 30,
    }
  },

  plugins:[
    jwt()
  ],

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});

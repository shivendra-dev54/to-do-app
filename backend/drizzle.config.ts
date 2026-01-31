import { defineConfig } from "drizzle-kit";


export default defineConfig(
    {
        dialect: 'mysql',
        schema: 'src/db/schemas',
        out: './drizzle',
        dbCredentials: {
            url: process.env.DATABASE_URL!
        }
    }
);
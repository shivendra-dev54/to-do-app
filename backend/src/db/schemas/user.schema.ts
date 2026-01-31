import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
  id: int("id")
    .primaryKey()
    .notNull()
    .autoincrement(),
  username: varchar("username", { length: 30 })
    .unique()
    .notNull(),
  email: varchar("email", { length: 50 })
    .unique()
    .notNull(),
  password: varchar("password", { length: 300 })
    .notNull(),
  refresh_token: varchar("access_token", { length: 500 })
    .default(""),

  created_at: timestamp("created_at")
    .defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
});
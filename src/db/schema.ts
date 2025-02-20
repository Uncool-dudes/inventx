import { sql } from "drizzle-orm";
import {
    pgTable,
    text,
    boolean, uuid,
    timestamp,
    uniqueIndex,
    primaryKey
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: text("user_id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  image: text("user_image").notNull().default("/defaultUser.svg"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const eventsTable = pgTable("events", {
  id: uuid("event_id")
    .defaultRandom()
    .primaryKey(),
  name: text("event_name").notNull(),
  description: text("event_description").notNull(),
  startDate: timestamp("event_start_date", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  endDate: timestamp("event_end_date", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  location: text("event_location")
    .notNull()
    .default("RV University, Bangalore, India"),
  organizer: text("event_organizer").notNull().default("RV University"),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  ongoing: boolean("event_ongoing").notNull().default(false),
  cancelled: boolean("event_cancelled").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const eventAttendeesTable = pgTable(
  "event_attendees",
  {
    attendeeeID: uuid("attendee_id")
      .defaultRandom()
      .primaryKey(),
    eventID: uuid("event_id")
      .notNull()
      .references(() => eventsTable.id),
    userID: text("user_id")
      .notNull()
      .references(() => Users.id),
  },
  (table) => ({
    uniqueUserEvent: uniqueIndex("unique_user_event_idx").on(
      table.eventID,
      table.userID
    ),
  })
);

export const tweetsTable = pgTable("tweets", {
  id: uuid("tweet_id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => Users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tweetInteractionsTable = pgTable(
  "tweet_interactions",
  {
    id: uuid("interaction_id").defaultRandom().primaryKey(),
    tweetId: uuid("tweet_id").notNull().references(() => tweetsTable.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => Users.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // 'like' or 'comment'
    comment: text("comment"), // null for likes, contains comment text for comments
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueUserTweetLike: uniqueIndex("unique_user_tweet_like_idx").on(
      table.userId,
      table.tweetId
    ).where(sql`type = 'like'`),
  })
);

export const projectsTable = pgTable("projects", {
  id: uuid("project_id").defaultRandom().primaryKey(),
  name: text("project_name").notNull(),
  stage: text("project_stage").notNull(),
  size: text("project_size").notNull(),
  pitch: text("project_pitch").notNull(),
  industries: text("project_industries").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  tagline: text("project_tagline"),
  nonProfitStatus: boolean("project_non_profit_status").default(false),
  location: text("project_location").default("RV University, Bangalore, India"),
  startDate: timestamp("project_start_date"),
  description: text("project_description"),
});

export const projectMembersTable = pgTable(
  "project_members",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => projectsTable.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => Users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.projectId, table.userId] }),
    };
  }
);

import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  boolean,
  integer,
  uuid,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: text("user-id").primaryKey(),
  firstName: text("first-name").notNull(),
  lastName: text("last-name").notNull(),
  image: text("user-image").notNull().default("/defaultUser.svg"),
});

export const eventsTable = pgTable("events", {
  id: uuid("event-id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey(),
  name: text("event-name").notNull(),
  description: text("event-description").notNull(),
  startDate: timestamp("event-start-date", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  endDate: timestamp("event-end-date", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  location: text("event-location")
    .notNull()
    .default("RV University, Bangalore, India"),
  organizer: text("event-organizer").notNull().default("RV University"),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  ongoing: boolean("event-ongoing").notNull().default(false),
  cancelled: boolean("event-cancelled").notNull().default(false),
});

export const eventAttendeesTable = pgTable(
  "event_attendees",
  {
    attendeeeID: uuid("attendee-id")
      .default(sql`uuid_generate_v4()`)
      .primaryKey(),
    eventID: uuid("event-id")
      .notNull()
      .references(() => eventsTable.id),
    userID: text("user-id")
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

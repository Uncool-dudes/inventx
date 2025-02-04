import { eventAttendeesTable, eventsTable, Users } from '@/db/schema';
export type insertEvent = typeof eventsTable.$inferInsert
export type insertAttendees = typeof eventAttendeesTable.$inferInsert
export type selectUsers = typeof Users.$inferSelect


import { eventsTable, eventAttendeesTable, Users, projectsTable, projectMembersTable } from '@/db/schema'
export type insertEvent = typeof eventsTable.$inferInsert
export type insertAttendees = typeof eventAttendeesTable.$inferInsert
export type selectUsers = typeof Users.$inferSelect
export type insertUser = typeof Users.$inferInsert
export type selectProjects = typeof projectsTable.$inferSelect
export type insertProjects = typeof projectsTable.$inferInsert
export type insertProjectMembers = typeof projectMembersTable.$inferInsert
export type selectProjectMembers = typeof projectMembersTable.$inferSelect

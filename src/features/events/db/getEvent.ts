import { eventAttendeesTable, Users } from "./../../../db/schema";
import { eventsTable } from "@/db/schema";
import { eq, SQL } from "drizzle-orm";
import db from '@/db';
import { BasicEventType } from "../lib/basicEventType";

export async function getEvent(eventID: string) {

  // First get the event with its attendees
  const result = await db
    .select({
      // Event fields
      id: eventsTable.id,
      name: eventsTable.name,
      description: eventsTable.description,
      startDate: eventsTable.startDate,
      endDate: eventsTable.endDate,
      location: eventsTable.location,
      organizer: eventsTable.organizer,
      ongoing: eventsTable.ongoing,
      cancelled: eventsTable.cancelled,
      tags: eventsTable.tags,
      // Attendee fields
      attendeeId: eventAttendeesTable.attendeeeID,
      // User fields
      userId: Users.id,
      firstName: Users.firstName,
      lastName: Users.lastName,
      image: Users.image,
    })
    .from(eventsTable)
    .fullJoin(
      eventAttendeesTable,
      eq(eventAttendeesTable.eventID, eventsTable.id)
    )
    .fullJoin(Users, eq(Users.id, eventAttendeesTable.userID))
    .where(eq(eventsTable.id, eventID));

  // If no results, return null
  if (!result.length) return null;

  // Transform the flat results into the desired structure
  // Get the event details from the first row
  const eventDetails = {
    id: result[0].id,
    name: result[0].name,
    description: result[0].description,
    startDate: result[0].startDate,
    endDate: result[0].endDate,
    location: result[0].location,
    organizer: result[0].organizer,
    ongoing: result[0].ongoing,
    cancelled: result[0].cancelled,
    tags: result[0].tags,
    // Transform the results into an attendees array
    attendees: result
      .filter((row) => row.userId !== null) // Filter out null users from full join
      .map((row) => ({
        attendeeId: row.attendeeId,
        userId: row.userId,
        firstName: row.firstName,
        lastName: row.lastName,
        image: row.image,
      })),
  };

  return {
    id: eventDetails.id,
    eventName: eventDetails.name,
    eventDescription: eventDetails.description,
    startDate: eventDetails.startDate,
    endDate: eventDetails.endDate,
    location: eventDetails.location,
    organizer: eventDetails.organizer,
    ongoing: eventDetails.ongoing,
    cancelled: eventDetails.cancelled,
    eventTags: eventDetails.tags,
    eventAttendees: eventDetails.attendees,
  } as BasicEventType;
}

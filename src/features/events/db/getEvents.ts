import { eventAttendeesTable, Users } from "./../../../db/schema";
import { eventsTable } from "@/db/schema";
import { eq, SQL } from "drizzle-orm";
import db from "@/db";
import { BasicEventType } from "../lib/basicEventType";

export async function getEvents() {
    // Get all events with their attendees
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
        .fullJoin(Users, eq(Users.id, eventAttendeesTable.userID));

    // Group results by event
    const eventsMap = new Map();

    result.forEach(row => {
        if (!eventsMap.has(row.id)) {
            eventsMap.set(row.id, {
                eventId: row.id,
                eventName: row.name,
                eventDescription: row.description,
                startDate: row.startDate,
                endDate: row.endDate,
                location: row.location,
                organizer: row.organizer,
                ongoing: row.ongoing,
                cancelled: row.cancelled,
                eventTags: row.tags,
                eventAttendees: []
            });
        }

        if (row.userId) {
            eventsMap.get(row.id).eventAttendees.push({
                attendeeId: row.attendeeId,
                userId: row.userId,
                firstName: row.firstName,
                lastName: row.lastName,
                image: row.image,
            });
        }
    });

    return Array.from(eventsMap.values()) as BasicEventType[];
}

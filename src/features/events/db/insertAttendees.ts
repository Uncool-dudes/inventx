"use server";
import db from '@/db';
import { eventAttendeesTable } from '@/db/schema';
import { insertAttendees } from '@/db/types';

export async function InsertAttendees(attendee: insertAttendees[]) {
    if (attendee.length === 0) {
        return;
    }
    const attendees = [];
    for (const a of attendee) {
        attendees.push(
            await db.insert(eventAttendeesTable).values(a).returning({ id: eventAttendeesTable.attendeeeID }).onConflictDoNothing()
        );
    }
    return attendees;
}

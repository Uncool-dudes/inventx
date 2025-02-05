"use server";
import { insertEvent } from "@/db/types";
import db from "@/db";
import { BasicEventType } from "../lib/basicEventType";
import { eventsTable } from "@/db/schema";
import { InsertEvent } from "../db/insertEvent";
import { InsertAttendees } from "../db/insertAttendees";

export async function handleEventCreate ( event: BasicEventType ) {
    const ongoing = event.startDate < new Date() && event.endDate > new Date();
    const eventDetails: insertEvent = {
        name: event.eventName,
        description: event.eventDescription,
        startDate: event.startDate,
        endDate: event.endDate,
        tags: event.eventTags,
        ongoing: ongoing,
    };
    try {
        const newEvent = await InsertEvent( eventDetails );
        const attendees = event.eventAttendees.map( ( attendee ) => ( {
            eventID: newEvent,
            userID: attendee.userId,
            attendeeeID: attendee.attendeeId,
        } ) );
        await InsertAttendees( attendees );
    } catch ( error ) {
        console.error( error );
        throw new Error( "Error creating event" );
    }
}

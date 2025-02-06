import db from '@/db';
import { eventsTable, eventAttendeesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { BasicEventType } from '../lib/basicEventType';
import { getEvent } from './getEvent';

export async function getEventsByAttendees ( attendeeId: string ) {
    // Get events this user is attending
    const eventsWithAttendees = await db
        .select( { id: eventsTable.id, } )
        .from( eventAttendeesTable )
        .fullJoin( eventsTable, eq( eventAttendeesTable.eventID, eventsTable.id ) )
        .where( eq( eventAttendeesTable.userID, attendeeId ) );

    const eventPromises = eventsWithAttendees
        .filter( ( event ): event is { id: string; } => event.id !== null )
        .map( event => getEvent( event.id ) );
    const events = (await Promise.all( eventPromises )).filter( ( event ): event is BasicEventType => event !== null );
    return events;
}

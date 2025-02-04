import db from '@/db';
import { eventsTable } from '@/db/schema';
import { insertEvent } from '@/db/types';
export async function InsertEvent(event: insertEvent) {
    const result = await db.insert(eventsTable).values(event).returning({ id: eventsTable.id });
    return result[0].id;
}

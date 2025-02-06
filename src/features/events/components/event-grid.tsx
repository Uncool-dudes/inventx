import { BasicEventType } from '../lib/basicEventType';
import { EventCard } from "./event-card";

export function EventList ( { events }: { events: BasicEventType[]; } ) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map( ( event, index ) => (
                <EventCard key={`${event.eventId}-${index}`} event={event} />
            ) )}
        </div>
    );
}

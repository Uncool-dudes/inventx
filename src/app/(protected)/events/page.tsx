import { EventList } from '@/features/events/components/event-grid';
import { getEvents } from '@/features/events/db/getEvents';

export default async function EventsPage() {
    const events = await getEvents();
    return (
        <div className="container mx-auto p-8">
            <h1>Events</h1>
            <EventList events={events} />
        </div>
    );
}

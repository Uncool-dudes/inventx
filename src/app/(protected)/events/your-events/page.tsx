
import { Separator } from '@/components/ui/separator';
import { EventList } from '@/features/events/components/event-grid';
import { getEventsByAttendees } from '@/features/events/db/getAttendeesByEvent';
import { currentUser } from '@clerk/nextjs/server';
import { Calendar } from 'lucide-react';

export default async function Page() {
    const user = await currentUser();
    if (!user || !user.id) {
        return null;
    }
    const events = await getEventsByAttendees(user.id);
    return (
        <div>
            <div className="flex flex-col gap-5 p-8">
                <h1 className="text-3xl font-bold">Your Events</h1>
                <Separator className={`mx-5`} />
                {events.length === 0 || events === null? (
                    <div className="flex items-center justify-center">
                        <Calendar className="h-12 w-12" />
                        <p className="text-lg ml-2">You are not attending any events</p>
                    </div>
                ) : (
                    <EventList events={events} />
                )}
            </div>
        </div>
    );
}

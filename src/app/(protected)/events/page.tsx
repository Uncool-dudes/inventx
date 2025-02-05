import { getEvents } from '@/features/events/db/getEvents';
import Image from 'next/image';
import Link from 'next/link';

export default async function EventsPage() {
    const events = await getEvents();
    return (
        <div>
            <h1>Events</h1>
            <ul className={`flex flex-row items-center justify-center`}>
                {events.map((event) => (
                    <li key={event.eventId}>
                        <Link href={`/events/${event.eventId}`}>
                                <h2>{event.eventName}</h2>
                        </Link>
                        <p>{event.eventDescription}</p>
                        <p>Start Date: {event.startDate?.toLocaleDateString()}</p>
                        <p>End Date: {event.endDate?.toLocaleDateString()}</p>
                        <p>Location: {event.location}</p>
                        <p>Organizer: {event.organizer}</p>
                        <p>Tags: {event.eventTags.join(", ")}</p>
                        <h3>Attendees</h3>
                        <ul>
                            {event.eventAttendees.map((attendee) => (
                                <li key={attendee.userId}>
                                    <Image
                                        src={attendee.image ?? '/defaultUser.svg'}
                                        alt="User Image"
                                        width={50}
                                        height={50}
                                    />
                                    <p>
                                        {attendee.firstName} {attendee.lastName}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

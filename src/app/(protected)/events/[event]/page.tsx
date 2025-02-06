import { getEvent } from '@/features/events/db/getEvent';
import Image from 'next/image';
export default async function Page ( { params, }: { params: Promise<{ event: string; }>; } ) {
    const event = ( await params ).event;
    const Event = await getEvent(event);
    if (!Event) {
        return <div>Event not found</div>;
    }
    return (
        <div>
            <h1>Event</h1>
            <h2>{Event.eventName}</h2>
            <p>{Event.eventDescription}</p>
            <p>Start Date: {Event.startDate?.toLocaleDateString()}</p>
            <p>End Date: {Event.endDate?.toLocaleDateString()}</p>
            <p>Location: {Event.location}</p>
            <p>Organizer: {Event.organizer}</p>
            <p>Tags: {Event.eventTags.join(", ")}</p>
            <h3>Attendees</h3>
            <ul>
                {Event.eventAttendees.map((attendee) => (
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
        </div>
    );
}

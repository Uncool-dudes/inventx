import { getEvent } from '@/features/events/db/getEvent';
import Image from "next/image";

export default async function Home() {
  const getEventResult = await getEvent("c4702d48-980a-4384-aa98-a09d032697e9");
  return (
    <div>
      <h1>{getEventResult?.name}</h1>
      <p>{getEventResult?.description}</p>
      <p>Start Date: {getEventResult?.startDate?.toLocaleDateString()}</p>
      <p>End Date: {getEventResult?.endDate?.toLocaleDateString()}</p>
      <p>Location: {getEventResult?.location}</p>
      <p>Organizer: {getEventResult?.organizer}</p>
      <p>Tags: {getEventResult?.tags.join(", ")}</p>
      <h2>Attendees</h2>
      <ul>
        {getEventResult?.attendees.map((attendee) => (
          <li key={attendee.userId}>
            <Image
              src={attendee.image}
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

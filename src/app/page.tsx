import { getEvent } from '@/features/events/db/getEvent';
import Image from "next/image";

export default async function Home() {
  const getEventResult = await getEvent("c4702d48-980a-4384-aa98-a09d032697e9");
  return (
    <div>hi</div>
     );
}

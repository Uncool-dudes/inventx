import { EventForm } from '@/features/events/components/eventForm';
import { selectUsers } from '@/features/users/db/selectUsers';

export default async function EventPage() {
    const users = await selectUsers();
    return (
        <div className={`flex flex-col items-center justify-center h-screen `}>
            <div className="w-1/8">
                <EventForm users={users} />
            </div>
        </div>
    )
}

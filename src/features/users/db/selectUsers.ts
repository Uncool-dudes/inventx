import db from '@/db';
import { Users } from '@/db/schema';

export function selectUsers() {
    return db.select().from(Users);
}

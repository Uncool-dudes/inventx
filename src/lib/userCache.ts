import db from '@/db';
import { Users } from '@/db/schema';

const users = db.select().from(Users);
export default users;

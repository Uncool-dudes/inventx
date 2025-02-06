import { projectMembersTable } from '@/db/schema';
import db from '@/db';

export async function insertMembers(projectId: string, projectMembers : string[]) {
    const members = projectMembers.map(member => ({
        projectId,
        userId: member
    }));
    await db.insert(projectMembersTable).values(members);
}

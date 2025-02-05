import { projectMembersTable } from '@/db/schema';
import db from '@/db';
import { ProjectFormValues } from '../components/projectForm';
import { insertProjectMembers } from '@/db/types';

export async function insertMembers(projectId: string, projectMembers : string[]) {
    const members = projectMembers.map(member => ({
        projectId,
        userId: member
    }));
    await db.insert(projectMembersTable).values(members);
}

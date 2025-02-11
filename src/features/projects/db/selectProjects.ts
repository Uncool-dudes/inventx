import {
  projectMembersTable,
  Users,
} from "@/db/schema";
import { projectsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "@/db";
import { ProjectDetails } from '../lib/basicProject';

export async function getProjects() {
  const result = await db
    .select({
      id: projectsTable.id,
      name: projectsTable.name,
      description: projectsTable.description,
      tagline: projectsTable.tagline,
      stage: projectsTable.stage,
      size: projectsTable.size,
      pitch: projectsTable.pitch,
      nonProfitStatus: projectsTable.nonProfitStatus,
      industries: projectsTable.industries,
      createdAt: projectsTable.createdAt,
      updatedAt: projectsTable.updatedAt,
      startDate: projectsTable.startDate,

      location: projectsTable.location,
      memberId: projectMembersTable.userId,
      userId: Users.id,
      firstName: Users.firstName,
      lastName: Users.lastName,
      image: Users.image,
    })
    .from(projectsTable)
    .fullJoin(
      projectMembersTable,
      eq(projectMembersTable.projectId, projectsTable.id)
    )
    .fullJoin(Users, eq(Users.id, projectMembersTable.userId))

  if (!result.length) return null;

    const projectsMap = new Map();

    result.filter(row => row.id !== null).forEach(row => {
        if (!projectsMap.has(row.id)) {
            projectsMap.set(row.id, {
              id: row.id,
              name: row.name,
              description: row.description,
              tagline: row.tagline,
              stage: row.stage,
              size: row.size,
              pitch: row.pitch,
              nonProfitStatus: row.nonProfitStatus,
              industries: row.industries,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,
              startDate: row.startDate,
              location: row.location,
              members: [],
            });
        }

        if (row.userId) {
            projectsMap.get(row.id).members.push({
                id: row.userId,
                firstName: row.firstName,
                lastName: row.lastName,
                image: row.image,
            });
        }
    });

  return Array.from(projectsMap.values()) as ProjectDetails[];
}

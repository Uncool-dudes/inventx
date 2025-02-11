import {
  projectMembersTable,
  Users,
} from "@/db/schema";
import { projectsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "@/db";

export async function getProject(projectId: string) {
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
    .where(eq(projectsTable.id, projectId));

  if (!result.length) return null;
  const projectDetails = {
    id: result[0].id,
    name: result[0].name,
    description: result[0].description,
    tagline: result[0].tagline,
    stage: result[0].stage,
    size: result[0].size,
    pitch: result[0].pitch,
    nonProfitStatus: result[0].nonProfitStatus,
    industries: result[0].industries,
    createdAt: result[0].createdAt,
    updatedAt: result[0].updatedAt,
    startDate: result[0].startDate,
    members: result
      .filter((row) => row.userId !== null)
      .map((row) => ({
        userId: row.userId,
        firstName: row.firstName,
        lastName: row.lastName,
        image: row.image,
      })),
  };
  return projectDetails;
}

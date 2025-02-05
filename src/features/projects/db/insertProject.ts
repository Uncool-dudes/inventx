"use server";
import { insertProjects } from "@/db/types";
import { ProjectFormValues } from "../components/projectForm";
import db from "@/db";
import { projectsTable } from "@/db/schema";
import { insertMembers } from './insertProjectMembers';

export async function InsertProject(project: ProjectFormValues) {
    const transformedProject : insertProjects = {
        name: project.projectName,
        stage: project.projectStage,
        size: project.projectSize,
        pitch: project.projectPitch,
        industries: project.projectIndustries,

        tagline: project.projectTagline,
        nonProfitStatus: project.projectNonProfitStatus,
        startDate: project.projectStartDate,
        description: project.projectDescription,
        location: project.projectLocation,

    };
    const result = await db.insert(projectsTable).values(transformedProject).returning({ id: projectsTable.id });

    await insertMembers(result[0].id, project.projectMembers);
    return "Fucked up";
}

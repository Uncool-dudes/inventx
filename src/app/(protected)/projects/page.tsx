import { ProjectDetails } from '@/features/projects/lib/basicProject';
import { getProjects } from '@/features/projects/db/selectProjects';
import { ProjectGrid } from '@/features/projects/components/projectUI';
export const dynamic = 'force-dynamic';
export default async function Page () {
    const projects: ProjectDetails[] = await getProjects() ?? [];

    return (
        <div className={`p-10`}>
            <ProjectGrid projects={projects} />
        </div>
    );
}

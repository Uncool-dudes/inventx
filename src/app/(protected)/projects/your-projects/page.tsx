import { ProjectGrid } from '@/features/projects/components/projectUI';
import { getProjects } from '@/features/projects/db/selectProjects';
import { currentUser } from '@clerk/nextjs/server';

export default async function Page(){
    const user = await currentUser();
    if (!user) {
        return (
            <div className={`flex items-center justify-center`}>
                <p className={`text-2xl text-gray-500`}>You are not logged in</p>
            </div>
        );
    }
    let projects = await getProjects() ?? []
    projects = projects.filter(project => project.members.some(member => member.id === user.id));
    if (projects.length === 0) {
        return (
            <div className={`flex items-center justify-center`}>
                <p className={`text-2xl text-gray-500`}>No projects found</p>
            </div>
        );
    }

    return (
        <div className={`p-10`}>
            <ProjectGrid projects={projects} />
        </div>
    );
}

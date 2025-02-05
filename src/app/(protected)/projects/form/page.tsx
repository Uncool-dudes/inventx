import { ProjectForm } from '@/features/projects/components/projectForm';
import { selectUsers } from '@/features/users/db/selectUsers';

export default async function ProjectCreationForm(){
    const users = await selectUsers();
    
    const formOptions = {
        users: users,
        industries: [
            { id: "tech", name: "Technology" },
            { id: "health", name: "Healthcare" },
            { id: "edu", name: "Education" }
        ],
        projectSizes: [
            { id: "small", name: "Small (1-10 people)" },
            { id: "medium", name: "Medium (11-50 people)" },
            { id: "large", name: "Large (50+ people)" }
        ],
        developmentStages: [
            { id: "idea", name: "Idea Stage" },
            { id: "mvp", name: "MVP" },
            { id: "growth", name: "Growth" }
        ]
    };

    return(
        <div className={`flex flex-col items-center justify-center`}>
            <div className="w-1/3">
                <ProjectForm options={formOptions} />;
            </div>
        </div>
    )
}

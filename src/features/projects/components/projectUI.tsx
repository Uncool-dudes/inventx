import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { FC } from 'react';
import { ProjectDetails } from '../lib/basicProject';
import { Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ProjectCardProps {
    project: ProjectDetails;
}

interface ProjectGridProps {
    projects: ProjectDetails[];
}

const formatDate = ( dateString: string ): string => {
    return new Date( dateString ).toLocaleDateString( 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    } );
};

export const ProjectCard: FC<ProjectCardProps> = ( { project } ) => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
                        {project.tagline && (
                            <CardDescription className="mt-1">
                                {project.tagline}
                                <div>
                                    <span className="text-sm text-muted-foreground">
                                        {formatDate( project.startDate || project.createdAt )}
                                    </span>
                                </div>
                            </CardDescription>
                        )}
                    </div>
                    {project.nonProfitStatus && (
                        <Badge variant="secondary" className="ml-2">Non-Profit</Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="flex-grow">
                <div className="space-y-4">
                    <p className="text-sm line-clamp-3">{project.description || project.pitch}</p>

                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{project.stage}</Badge>
                        <Badge variant="outline">{project.size}</Badge>
                        {project.industries.map( ( industry ) => (
                            <Badge key={industry} variant="outline">{industry}</Badge>
                        ) )}
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <div className="flex -space-x-2">
                        {project.members.slice( 0, 3 ).map( ( member ) => (
                            <Tooltip key={member.id}>
                                <TooltipTrigger>
                                    <Avatar key={member.id} className="w-6 h-6 border-2 border-background">
                                        <AvatarImage src={member.image} alt={`${member.firstName} ${member.lastName}`} />
                                        <AvatarFallback>{( member.firstName?.[0] ?? '?' )}{( member.lastName?.[0] ?? '?' )}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {member.firstName} {member.lastName}
                                </TooltipContent>
                            </Tooltip>
                        ) )}
                    </div>
                    {project.members.length > 3 && (
                        <span className="text-sm ml-2">+{project.members.length - 3} more</span>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export const ProjectGrid: FC<ProjectGridProps> = ( { projects } ) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map( ( project ) => (
                <ProjectCard key={project.id} project={project} />
            ) )}
        </div>
    );
};

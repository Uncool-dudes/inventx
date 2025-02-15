'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { BasicEventType } from '../lib/basicEventType';
import { formatDate } from '@/utils/format-date';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useReportWebVitals } from 'next/web-vitals';
export function EventCard ( { event }: { event: BasicEventType; } ) {
    useReportWebVitals( ( metric ) => {
        console.log( metric );
    } )
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{event.eventName}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {formatDate( event.startDate )} - {formatDate( event.endDate )}
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex items-center mb-2 text-sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                </div>
                <div className="mb-2 text-sm">
                    <span className="font-semibold">Organizer:</span> {event.organizer}
                </div>
                {event.eventTags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                        {event.eventTags.map( ( tag ) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ) )}
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <div className="flex -space-x-2">
                        {event.eventAttendees.slice( 0, 3 ).map( ( attendee ) => (
                            <Tooltip key={attendee.attendeeId}>
                                <TooltipTrigger>
                                    <Avatar key={attendee.attendeeId} className="w-6 h-6 border-2 border-background">
                                        <AvatarImage src={attendee.image} alt={`${attendee.firstName} ${attendee.lastName}`} />
                                        <AvatarFallback>{( attendee.firstName?.[0] ?? '?' )}{( attendee.lastName?.[0] ?? '?' )}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {attendee.firstName} {attendee.lastName}
                                </TooltipContent>
                            </Tooltip>
                        ) )}
                    </div>
                    {event.eventAttendees.length > 3 && (
                        <span className="text-sm ml-2">+{event.eventAttendees.length - 3} more</span>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}

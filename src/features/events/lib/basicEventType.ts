export type BasicEventType = {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    organizer?: string;
    ongoing?: boolean;
    cancelled?: boolean;
    tags?: string[];
    attendees: {
        attendeeId: string;
        userId: string;
        firstName: string;
        lastName: string;
        image: string;
    }[];
};

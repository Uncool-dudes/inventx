export type BasicEventType = {
    eventId?: string;
    eventName: string;
    eventDescription: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    organizer?: string;
    ongoing?: boolean;
    cancelled?: boolean;
    eventTags: string[];
    eventAttendees: {
        attendeeId?: string;
        userId: string;
        firstName?: string;
        lastName?: string;
        image?: string;
    }[];
};

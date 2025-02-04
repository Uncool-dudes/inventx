ALTER TABLE "event_attendees" DROP CONSTRAINT "event_attendees_attendee-id_unique";--> statement-breakpoint
ALTER TABLE "event_attendees" ADD PRIMARY KEY ("attendee-id");--> statement-breakpoint
ALTER TABLE "event_attendees" ALTER COLUMN "attendee-id" SET NOT NULL;
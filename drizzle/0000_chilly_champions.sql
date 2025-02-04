CREATE TABLE "users" (
	"user-id" text PRIMARY KEY NOT NULL,
	"first-name" text NOT NULL,
	"last-name" text NOT NULL,
	"user-image" text
);
--> statement-breakpoint
CREATE TABLE "event_attendees" (
	"attendee-id" uuid DEFAULT uuid_generate_v4(),
	"event-id" uuid NOT NULL,
	"user-id" text NOT NULL,
	CONSTRAINT "event_attendees_attendee-id_unique" UNIQUE("attendee-id")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"event-id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"event-name" text NOT NULL,
	"event-description" text NOT NULL,
	"event-start-date" timestamp with time zone DEFAULT now() NOT NULL,
	"event-end-date" timestamp with time zone DEFAULT now() NOT NULL,
	"event-location" text DEFAULT 'RV University, Bangalore, India' NOT NULL,
	"event-organizer" text DEFAULT 'RV University' NOT NULL,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"event-ongoing" boolean DEFAULT false NOT NULL,
	"event-cancelled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event_attendees" ADD CONSTRAINT "event_attendees_event-id_events_event-id_fk" FOREIGN KEY ("event-id") REFERENCES "public"."events"("event-id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_attendees" ADD CONSTRAINT "event_attendees_user-id_users_user-id_fk" FOREIGN KEY ("user-id") REFERENCES "public"."users"("user-id") ON DELETE no action ON UPDATE no action;
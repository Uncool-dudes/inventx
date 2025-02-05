ALTER TABLE "project_attendees" RENAME TO "project_members";--> statement-breakpoint
ALTER TABLE "project_members" DROP CONSTRAINT "project_attendees_project_id_projects_project_id_fk";
--> statement-breakpoint
ALTER TABLE "project_members" DROP CONSTRAINT "project_attendees_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "project_members" DROP CONSTRAINT "project_attendees_project_id_user_id_pk";--> statement-breakpoint
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_project_id_user_id_pk" PRIMARY KEY("project_id","user_id");--> statement-breakpoint
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_project_id_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("project_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
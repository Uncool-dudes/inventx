"use client"

import * as React from "react";
import {
    BookOpen,
    Bot, Calendar,
    Settings2, MessageSquare
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
const data = {
  navMain: [
    {
      title: "Feed",
      url: "/feed",
      icon: MessageSquare,
      items: [
        {
          title: "All Posts",
          url: "/feed",
        },
        {
          title: "Your Posts",
          url: "/feed/your-posts",
        },
      ],
    },
    {
      title: "Events",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "All events",
          url: "/events",
        },
        {
          title: "Your events",
          url: "/events/your-events",
        },
        {
          title: "Event Form",
          url: "/events/form",
        },
      ],
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Bot,
      items: [
        {
          title: "Your Projects",
          url: "/projects/your-projects",
        },
        {
          title: "Project Form",
          url: "/projects/form",
        },
        {
          title: "All Projects",
          url: "/projects",
        },
      ],
    },
  ],
}

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

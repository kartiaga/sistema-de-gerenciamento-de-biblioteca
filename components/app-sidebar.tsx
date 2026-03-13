import Link from "next/link";
import { Book, LayoutDashboard, PlusCircle, Building2, UserPlus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Acervo de Livros",
    url: "/books",
    icon: Book,
  },
  {
    title: "Editoras",
    url: "/publishers",
    icon: Building2,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center justify-center border-b">
        <h2 className="text-lg font-bold tracking-tight">Biblioteca Admin</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* Removing the asChild property to fix the typescript error for now */}
                  <Link href={item.url} className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-sm font-medium">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

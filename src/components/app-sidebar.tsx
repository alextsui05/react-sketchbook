import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';
import Sitemap from './sitemap';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <header>
          <nav className="flex items-center justify-between p-4">
            <Link to="/">React Sketchbook</Link>
          </nav>
        </header>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Sitemap />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

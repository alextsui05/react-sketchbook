import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';

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
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/ingredients">Ingredients</Link>
            </li>
            <li>
              <Link to="/mahjong">Mahjong</Link>
            </li>
            <li>
              <Link to="/links">Links</Link>
            </li>
          </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

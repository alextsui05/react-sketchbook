import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const Route = createRootRoute({
  component: RootWrapper,
});

function RootWrapper() {
  return (
    <SidebarProvider>
      <RootComponent />
    </SidebarProvider>
  );
}

function RootComponent() {
  return (
    <React.Fragment>
      <AppSidebar />
      <SidebarTrigger />

      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      <Toaster />
    </React.Fragment>
  );
}

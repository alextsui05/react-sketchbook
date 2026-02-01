import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <header>
        <nav className="flex items-center justify-between p-4">
          <Link to="/">React Sketchbook</Link>
        </nav>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
    </React.Fragment>
  );
}

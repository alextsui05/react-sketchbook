import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div>
        <div>Hello "__root"!</div>
        <Outlet />
      </div>
    </React.Fragment>
  );
}

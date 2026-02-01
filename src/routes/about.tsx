import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <h1>About</h1>
      <p>This is a sketchbook for me to practice React and TypeScript.</p>
    </section>
  );
}

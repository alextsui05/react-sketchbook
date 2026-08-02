import Sitemap from '@/components/sitemap';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <h1>Home</h1>
      <div>
        <Sitemap />
      </div>
    </section>
  );
}

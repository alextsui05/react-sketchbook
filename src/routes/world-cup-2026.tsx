import { createFileRoute } from '@tanstack/react-router';
import fifaParticipants from '@/fifa2026.json';
import CountryFlag from '@/components/CountryFlag';

export const Route = createFileRoute('/world-cup-2026')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full">
      <h1>World Cup 2026</h1>
      <div className="flex flex-wrap">
        {fifaParticipants.map((participant) => (
          <CountryFlag {...participant} />
        ))}
      </div>
    </div>
  );
}

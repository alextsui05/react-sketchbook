import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <h1>Home</h1>
      <div>
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
      </div>
    </section>
  );
}

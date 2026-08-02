import { Link } from '@tanstack/react-router';

export default function Sitemap() {
  return (
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
        <Link to="/world-cup-2026">World Cup 2026</Link>
      </li>
      <li>
        <Link to="/doves">Doves</Link>
      </li>
      <li>
        <Link to="/links">Links</Link>
      </li>
    </ul>
  );
}

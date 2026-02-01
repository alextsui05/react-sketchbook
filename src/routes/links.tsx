import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/links')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <h1>Links</h1>
      <ul>
        <li>
          <a href="https://atsui.click">My Blog</a>
        </li>
        <li>
          <p>
            <a href="https://atsui.click/pinyin-jyutping-lookup">
              Pinyin Jyutping Lookup
            </a>
            - A tool to look up Pinyin and Jyutping pronunciations.
          </p>
        </li>
        <li>
          <p>
            <a href="https://atsui.click/primes">Infinite Primes</a> - A
            single-page app that generates more prime numbers the more you
            scroll.
          </p>
        </li>
      </ul>
    </section>
  );
}

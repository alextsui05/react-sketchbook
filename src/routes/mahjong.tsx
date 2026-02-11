import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/mahjong')({
  component: RouteComponent,
});

const images: Record<string, { default: string }> = import.meta.glob(
  '../assets/tiles/*.svg',
  {
    eager: true,
    query: '?url',
    // as: 'url',
  },
);
console.log(images);

function toImageName(code: string) {
  // map mpsz notation to image name
  const [number, type] = code.split('');
  switch (type) {
    case 'm':
      return `character${number}`;
    case 's':
      return `bamboo${number}`;
    case 'p':
      return `circles${number}`;
    case 'z':
      if (number === '1') return 'windeast';
      if (number === '2') return 'windsouth';
      if (number === '3') return 'windwest';
      if (number === '4') return 'windnorth';
      if (number === '5') return 'dragonwhite';
      if (number === '6') return 'dragongreen';
      else return 'dragonred';

    default:
      throw new Error(`Invalid tile code: ${code}`);
  }
}

function MahjongHand({ names }: { names: string }) {
  const tiles = names.split(' ');
  return (
    <div className="flex gap-0 my-4">
      {tiles.map((name, index) => (
        <MahjongTile key={index} name={name} />
      ))}
    </div>
  );
}

function MahjongTile({ name }: { name: string }) {
  name = toImageName(name);
  return (
    <img
      className="w-16 h-16 inline-block"
      src={images[`../assets/tiles/${name}.svg`].default}
      alt={name}
    />
  );
}

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Tiles</h1>
      <h2 className="text-xl font-semibold">Characters</h2>
      <MahjongHand names="1m 2m 3m 4m 5m 6m 7m 8m 9m" />
      <h2 className="text-xl font-semibold">Bamboos</h2>
      <MahjongHand names="1s 2s 3s 4s 5s 6s 7s 8s 9s" />
      <h2 className="text-xl font-semibold">Dots</h2>
      <MahjongHand names="1p 2p 3p 4p 5p 6p 7p 8p 9p" />
      <h2 className="text-xl font-semibold">Winds and Dragons</h2>
      <MahjongHand names="1z 2z 3z 4z 5z 6z 7z" />
      <h1 className="text-xl font-semibold">Setup</h1>
      <ol>
        <li>Stack each wind randomly</li>
        <li>
          One player rolls two dice, count counterclockwise from themselves.
          Pick winds starting from that person going counterclockwise.
        </li>
        <li>
          East player chooses their seat, and everyone else sits
          counterclockwise from East (East, South, West, North).
        </li>
        <li>
          Wash the tiles and everyone build a wall 17 tiles wide and 2 tiles
          tall
        </li>
        <li>
          East player rolls two dice, and count counterclockwise from
          themselves. The chosen player is East.
        </li>
        <li>
          The East player counts right-to-left on their wall the number of the
          last dice roll. Open the wall from the next tile.
        </li>
        <li>
          Players take turns drawing tiles clockwise from the opening in the
          wall. Draw 4 tiles each for 3 rounds, then draw 1 tile for a total of
          13.
        </li>
      </ol>
      <h1 className="text-2xl font-bold">Triples</h1>
      <p>Sets of three identical tiles</p>
      <MahjongHand names="1m 1m 1m 4s 4s 4s 7p 7p 7p 5z 5z 5z" />
      <p>Runs of three consecutive tiles</p>
      <MahjongHand names="1s 2s 3s 4p 5p 6p 7m 8m 9m" />
      <h1 className="text-2xl font-bold">Winning</h1>
      <p>Winning hand has 4 triples and a pair</p>
      <MahjongHand names="1m 1m 1m 4s 4s 4s 5p 6p 7p 2z 2z 2z 6z 6z" />
      <h1 className="text-2xl font-bold">Turns</h1>
      <ul>
        <li>Draw from the wall clockwise</li>
        <li>Discard a tile</li>
        <li>Players take turns going counterclockwise, starting from East</li>
        <li>
          Hand ends when player wins or draw down the last 14 tiles of the wall
        </li>
        <li>East marker moves counterclockwise, unless East wins or draw</li>
        <li>
          Round ends when East has moved around the table, then the table wind
          changes
        </li>
        <li>Game ends after four rounds</li>
      </ul>
      <h1 className="text-2xl font-bold">Special Hands</h1>
      <p>
        There are many special hands in mahjong. Here's a{' '}
        <a
          href={`${import.meta.env.BASE_URL}/riichi-mahjong-hands.png`}
          target="_blank"
        >
          cheatsheet
        </a>
        .
      </p>
    </div>
  );
}

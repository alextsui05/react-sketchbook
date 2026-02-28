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
      className="h-16 inline-block dark:bg-white"
      src={images[`../assets/tiles/${name}.svg`].default}
      alt={name}
    />
  );
}

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">How to win</h1>
      <p>
        Winning hand has 4 <b>triples</b> and a <b>pair</b>
      </p>
      <MahjongHand names="1m 1m 1m 4s 4s 4s 5p 6p 7p 2z 2z 2z 6z 6z" />
      <h2 className="text-xl font-bold">Triples = Sets or Runs</h2>
      <p>Sets of three identical tiles</p>
      <MahjongHand names="1m 1m 1m 4s 4s 4s 7p 7p 7p 5z 5z 5z" />
      <p>Runs of three consecutive tiles</p>
      <MahjongHand names="1s 2s 3s 4p 5p 6p 7m 8m 9m" />

      <h1 className="text-xl font-semibold">Tiles</h1>
      <p>There are 4 of each pattern:</p>
      <h2 className="text-xl font-semibold">Characters</h2>
      <MahjongHand names="1m 2m 3m 4m 5m 6m 7m 8m 9m" />
      <h2 className="text-xl font-semibold">Bamboos</h2>
      <MahjongHand names="1s 2s 3s 4s 5s 6s 7s 8s 9s" />
      <h2 className="text-xl font-semibold">Dots</h2>
      <MahjongHand names="1p 2p 3p 4p 5p 6p 7p 8p 9p" />
      <h2 className="text-xl font-semibold">Winds</h2>
      <MahjongHand names="1z 2z 3z 4z" />
      <h2 className="text-xl font-semibold">Dragons</h2>
      <MahjongHand names="5z 6z 7z" />
      <h1 className="text-xl font-semibold">Setup</h1>
      <ol className="list-decimal list-inside">
        <li>Stack each wind randomly</li>
        <li>
          One player rolls two dice. Count counterclockwise from themselves by
          that number to choose a player. Deal the winds counterclockwise from
          the chosen player.
        </li>
        <li>
          The player dealt the East tile chooses their seat, and everyone else
          sits counterclockwise from East (East, South, West, North).
        </li>
        <li>
          Wash the tiles and everyone build a wall segment 17 tiles wide and 2
          tiles tall. Connect the segments in a windmill pattern.
        </li>
        <li>
          East player rolls two dice. Count counterclockwise from themselves by
          that number to choose a player. That player becomes the new East
          player and receives the wind disc.
        </li>
        <li>
          The East player counts right-to-left on their wall by the number of
          the last dice roll. Open the wall from the next tile.
        </li>
        <li>
          Players take turns drawing tiles clockwise from the opening in the
          wall. When a wall segment is done, draw from the next clockwise wall
          segment. Draw 4 tiles each for 3 rounds, then draw 1 tile for a total
          of 13.
        </li>
      </ol>
      <h1 className="text-2xl font-semibold">Turns</h1>
      <ul className="list-disc list-inside">
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
      <h2 className="text-xl font-bold">Pung</h2>
      <p>
        If a player discards a tile that would complete a set, you may call
        pung. Take the discarded tile, reveal your completed set, and discard a
        tile. Play continues counterclockwise from your position.
      </p>
      <h2 className="text-xl font-bold">Kong</h2>
      <p>
        If you have a concealed set and a player discards a matching tile, you
        may call kong. Take the discarded tile, reveal the four matching tiles,
        then draw from the back of the wall. Play continues counterclockwise.
      </p>
      <h2 className="text-xl font-bold">Shung</h2>
      <p>
        On your turn, if you can make a run by picking up the last discard, you
        may call shung. Take the discarded tile, reveal your completed run, and
        discard a tile. Play continues counterclockwise from your position.
      </p>
      <h1 className="text-2xl font-semibold">Special Hands</h1>
      <p>
        Here's a{' '}
        <a
          href={`${import.meta.env.BASE_URL}/riichi-mahjong-hands.png`}
          target="_blank"
        >
          reference sheet
        </a>{' '}
        of other winning hands in Mahjong.
      </p>
    </div>
  );
}

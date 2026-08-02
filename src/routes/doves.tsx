import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/doves')({
  component: Doves,
});

const items = [...'abcde'];

function Doves() {
  const [expanded, setExpanded] = useState<boolean[]>(items.map(() => false));
  const expand = (index: number) => {
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <>
      <h1>Doves</h1>
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 items-center">
          {items.map((item, index) => (
            <div key={item}>
              {!expanded[index] && (
                <button onClick={() => expand(index)}>
                  <img
                    src={`https://gaveta.atsui.click/videos/doves/${item}.jpg`}
                    alt={item}
                    className="aspect-square object-cover w-50 h-50"
                  />
                </button>
              )}
              {expanded[index] && (
                <div className="flex flex-col">
                  <video
                    src={`https://gaveta.atsui.click/videos/doves/${item}.mp4`}
                    controls
                    muted
                    className="w-full h-auto max-h-[80vh]"
                  />
                  <button onClick={() => expand(index)}>Hide</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

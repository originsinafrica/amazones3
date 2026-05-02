import { Amazone } from "@/data/amazones";
import { useState } from "react";

interface Props {
  amazones: Amazone[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const AmazoneSelector = ({ amazones, activeId, onSelect }: Props) => {
  return (
    <nav
      aria-label="Sélection des Amazones"
      className="hairline-b hairline-t py-6 space-y-8"
    >
      {/* Rangée de portraits ronds */}
      <div className="flex items-center justify-center gap-3 md:gap-4 overflow-x-auto">
        {amazones.map((a) => {
          const active = a.id === activeId;
          return (
            <button
              key={a.id}
              onClick={() => onSelect(a.id)}
              className="group relative shrink-0"
              aria-pressed={active}
              aria-label={a.name}
            >
              <div
                className={`relative w-9 h-9 md:w-10 md:h-10 overflow-hidden rounded-full transition-all duration-500 ${
                  active
                    ? "ring-1 ring-gold ring-offset-2 ring-offset-background"
                    : "opacity-60 group-hover:opacity-100"
                }`}
              >
                <img
                  src={a.portrait}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Sélecteur en forme de fleur */}
      <FlowerSelector
        amazones={amazones}
        activeId={activeId}
        onSelect={onSelect}
      />
    </nav>
  );
};

const FlowerSelector = ({ amazones, activeId, onSelect }: Props) => {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const cx = 250;
  const cy = 250;
  const petalRx = 22;
  const petalRy = 95;
  const petalCenterOffset = 95;
  const count = amazones.length;
  // Palette douce, une teinte par pétale
  const petalColors = [
    "20 70% 60%",   // terracotta
    "42 65% 60%",   // gold
    "150 35% 50%",  // sauge
    "200 50% 55%",  // bleu doux
    "270 35% 60%",  // mauve
    "340 55% 65%",  // rose
    "10 55% 50%",   // brique
    "85 40% 50%",   // olive
  ];

  return (
    <div className="flex flex-col items-center pt-2">
      <svg
        viewBox="0 0 500 500"
        className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
        role="group"
        aria-label="Choisir une Amazone via la fleur"
      >
        {amazones.map((a, i) => {
          const angle = (360 / count) * i - 90;
          const active = a.id === activeId;
          const isHover = a.id === hoverId;
          const isOn = isHover || active;
          const firstName = a.name.split(" ")[0];
          const color = petalColors[i % petalColors.length];

          // Position du label à l'extérieur du pétale (le pétale est tourné de angle+90)
          const petalAngleRad = ((angle + 90) * Math.PI) / 180;
          const labelRadius = petalCenterOffset + petalRy + 18;
          const lx = cx + Math.cos(petalAngleRad) * labelRadius;
          const ly = cy + Math.sin(petalAngleRad) * labelRadius;
          const angleRad = petalAngleRad;
          // Anchor selon le quadrant
          const anchor =
            Math.abs(Math.cos(angleRad)) < 0.2
              ? "middle"
              : Math.cos(angleRad) > 0
              ? "start"
              : "end";
          return (
            <g key={a.id}>
              <g
                transform={`rotate(${angle + 90} ${cx} ${cy})`}
                className="cursor-pointer"
                onClick={() => onSelect(a.id)}
                onMouseEnter={() => setHoverId(a.id)}
                onMouseLeave={() => setHoverId(null)}
              >
                <ellipse
                  cx={cx + petalCenterOffset}
                  cy={cy}
                  rx={petalRy}
                  ry={petalRx}
                  fill={
                    isOn
                      ? `hsl(${color} / 0.55)`
                      : `hsl(${color} / 0.08)`
                  }
                  stroke={
                    isOn ? `hsl(${color})` : "hsl(var(--hairline))"
                  }
                  strokeWidth={active ? 1.4 : 0.8}
                  className="transition-all duration-300"
                />
                {/* Hit area étendue */}
                <ellipse
                  cx={cx + petalCenterOffset}
                  cy={cy}
                  rx={petalRy}
                  ry={petalRx + 6}
                  fill="transparent"
                  pointerEvents="all"
                >
                  <title>{a.name}</title>
                </ellipse>
              </g>
              {/* Label visible uniquement pour le pétale actif/survolé */}
              {isOn && (
                <text
                  x={lx}
                  y={ly}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  className="pointer-events-none select-none transition-all duration-300"
                  fontFamily="Cormorant Garamond, serif"
                  fontSize={18}
                  fontStyle="italic"
                  fill={`hsl(${color})`}
                >
                  {firstName}
                </text>
              )}
            </g>
          );
        })}
        {/* Centre */}
        <circle
          cx={cx}
          cy={cy}
          r={18}
          fill="hsl(var(--background))"
          stroke="hsl(var(--hairline))"
          strokeWidth={0.8}
        />
        <circle cx={cx} cy={cy} r={5} fill="hsl(var(--gold))" />
      </svg>
    </div>
  );
};

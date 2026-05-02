import { useEffect, useMemo, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { amazones } from "@/data/amazones";

const GRID_SIZE = 128;
const CELL_PRICE = 5;

const FIRST_NAMES = [
  "Awa", "Mariam", "Ibrahim", "Salif", "Fanta", "Oumar", "Aïcha", "Moussa",
  "Kadidia", "Sékou", "Ramata", "Bakary", "Hawa", "Modibo", "Djeneba", "Cheikh",
  "Néné", "Adama", "Penda", "Yacouba", "Sira", "Drissa", "Aminata", "Ladji",
];
const LAST_INITIALS = ["D.", "T.", "S.", "C.", "B.", "K.", "F.", "N."];

type MediaType = "photo" | "video" | "poeme";

type FilledCell = {
  src: string;
  type: MediaType;
  contributor: string;
  caption?: string;
  poem?: string;
};

const POEMS = [
  "Sous le baobab,\nles voix anciennes\nse souviennent de moi.",
  "Une pierre,\nune semence,\nune mémoire qui germe.",
  "Le fleuve coule\nentre nos mains tendues —\nrien ne se perd.",
  "Les Amazones marchent\ndans la poussière dorée\nde nos prières.",
];

function buildInitialFilled(): Map<string, FilledCell> {
  const map = new Map<string, FilledCell>();
  const photoPool = [
    ...amazones.map((a) => a.portrait),
    ...amazones.flatMap((a) => a.gallery.map((g) => g.src)),
  ];
  let seed = 1;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const total = 1824;
  let placed = 0;
  while (placed < total) {
    const x = Math.floor(rnd() * GRID_SIZE);
    const y = Math.floor(rnd() * GRID_SIZE);
    const key = `${x}:${y}`;
    if (map.has(key)) continue;
    const r = rnd();
    const type: MediaType = r < 0.78 ? "photo" : r < 0.9 ? "video" : "poeme";
    const contributor = `${FIRST_NAMES[Math.floor(rnd() * FIRST_NAMES.length)]} ${LAST_INITIALS[Math.floor(rnd() * LAST_INITIALS.length)]}`;
    const src = photoPool[placed % photoPool.length];
    const cell: FilledCell = { src, type, contributor };
    if (type === "poeme") cell.poem = POEMS[Math.floor(rnd() * POEMS.length)];
    if (type === "photo") cell.caption = "Photo partagée";
    if (type === "video") cell.caption = "Vidéo partagée";
    map.set(key, cell);
    placed++;
  }
  return map;
}

type Sel = { x1: number; y1: number; x2: number; y2: number } | null;

function normalize(s: NonNullable<Sel>) {
  return {
    x: Math.min(s.x1, s.x2),
    y: Math.min(s.y1, s.y2),
    w: Math.abs(s.x2 - s.x1) + 1,
    h: Math.abs(s.y2 - s.y1) + 1,
  };
}

const ZOOM_LEVELS = [1, 1.5, 2, 3, 4, 6];

export const ContributionsWall = () => {
  const filled = useMemo(buildInitialFilled, []);
  const [sel, setSel] = useState<Sel>(null);
  const [dragging, setDragging] = useState(false);
  const [moved, setMoved] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [media, setMedia] = useState<FilledCell | null>(null);
  const [zoom, setZoom] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalContribs = filled.size;

  const cellFromEvent = (clientX: number, clientY: number) => {
    const el = gridRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const x = Math.floor(((clientX - rect.left) / rect.width) * GRID_SIZE);
    const y = Math.floor(((clientY - rect.top) / rect.height) * GRID_SIZE);
    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) return null;
    return { x, y };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const c = cellFromEvent(e.clientX, e.clientY);
    if (!c) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDragging(true);
    setMoved(false);
    setSel({ x1: c.x, y1: c.y, x2: c.x, y2: c.y });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const c = cellFromEvent(e.clientX, e.clientY);
    if (!c || !sel) return;
    if (c.x !== sel.x1 || c.y !== sel.y1) setMoved(true);
    setSel({ x1: sel.x1, y1: sel.y1, x2: c.x, y2: c.y });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    if (!moved) {
      const c = cellFromEvent(e.clientX, e.clientY);
      if (c) {
        const cell = filled.get(`${c.x}:${c.y}`);
        if (cell) {
          setMedia(cell);
          setSel(null);
        }
      }
    }
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSel(null);
        setMedia(null);
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const norm = sel ? normalize(sel) : null;
  const cellCount = norm ? norm.w * norm.h : 0;
  const totalPrice = cellCount * CELL_PRICE;

  const zoomIn = () => {
    const i = ZOOM_LEVELS.indexOf(zoom);
    if (i < ZOOM_LEVELS.length - 1) setZoom(ZOOM_LEVELS[i + 1]);
  };
  const zoomOut = () => {
    const i = ZOOM_LEVELS.indexOf(zoom);
    if (i > 0) setZoom(ZOOM_LEVELS[i - 1]);
  };
  const resetZoom = () => setZoom(1);

  return (
    <div className="animate-fade-in">
      <div className="hairline-b py-6 mb-px flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[10px] tracking-micro uppercase text-muted-foreground mb-1">
            Pierres posées
          </p>
          <p className="font-mono text-2xl tabular-nums text-foreground">
            {totalContribs.toLocaleString("fr-FR")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[11px] text-muted-foreground italic max-w-xs hidden md:block">
            Glissez pour réserver. Cliquez une case posée pour la découvrir.
          </p>
          <div className="hairline flex items-center">
            <button
              onClick={zoomOut}
              disabled={zoom === ZOOM_LEVELS[0]}
              className="w-9 h-9 flex items-center justify-center hover:bg-muted disabled:opacity-30 transition-colors"
              aria-label="Dézoomer"
            >
              <ZoomOut className="w-3.5 h-3.5" strokeWidth={1.25} />
            </button>
            <span className="px-3 font-mono text-[10px] tabular-nums text-muted-foreground border-l border-r border-[hsl(var(--hairline))]">
              ×{zoom}
            </span>
            <button
              onClick={zoomIn}
              disabled={zoom === ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
              className="w-9 h-9 flex items-center justify-center hover:bg-muted disabled:opacity-30 transition-colors"
              aria-label="Zoomer"
            >
              <ZoomIn className="w-3.5 h-3.5" strokeWidth={1.25} />
            </button>
            <button
              onClick={resetZoom}
              className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors border-l border-[hsl(var(--hairline))]"
              aria-label="Réinitialiser le zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="relative w-full overflow-auto hairline bg-background"
          style={{ maxHeight: "min(80vh, 900px)" }}
        >
          <div
            style={{
              width: `${zoom * 100}%`,
              aspectRatio: "1 / 1",
            }}
          >
            <div
              ref={gridRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={() => setDragging(false)}
              className="relative w-full h-full select-none touch-none cursor-crosshair"
              style={{
                backgroundImage:
                  "linear-gradient(to right, hsl(var(--hairline)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--hairline)) 1px, transparent 1px)",
                backgroundSize: `calc(100% / ${GRID_SIZE}) calc(100% / ${GRID_SIZE})`,
              }}
            >
              <FilledLayer filled={filled} />

              {norm && (
                <div
                  className="absolute pointer-events-none ring-1 ring-gold bg-gold/15"
                  style={{
                    left: `${(norm.x / GRID_SIZE) * 100}%`,
                    top: `${(norm.y / GRID_SIZE) * 100}%`,
                    width: `${(norm.w / GRID_SIZE) * 100}%`,
                    height: `${(norm.h / GRID_SIZE) * 100}%`,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {norm && cellCount > 0 && (
          <div className="mt-6 hairline bg-background p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-[10px] tracking-micro uppercase text-muted-foreground mb-1">
                  Sélection
                </p>
                <p className="font-mono text-lg tabular-nums text-foreground">
                  {norm.w} × {norm.h}
                </p>
              </div>
              <div className="hairline-l pl-8">
                <p className="text-[10px] tracking-micro uppercase text-muted-foreground mb-1">
                  Cases
                </p>
                <p className="font-mono text-lg tabular-nums text-foreground">
                  {cellCount}
                </p>
              </div>
              <div className="hairline-l pl-8">
                <p className="text-[10px] tracking-micro uppercase text-muted-foreground mb-1">
                  Total
                </p>
                <p className="font-mono text-lg tabular-nums text-foreground">
                  {totalPrice.toLocaleString("fr-FR")} €
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSel(null)}
                className="text-[11px] tracking-micro uppercase text-muted-foreground hover:text-foreground transition-colors px-4 py-3"
              >
                Annuler
              </button>
              <button
                onClick={() => setConfirmOpen(true)}
                className="bg-foreground text-background px-6 py-3 text-xs tracking-micro uppercase hover:bg-gold transition-colors"
              >
                Réserver ma pierre
              </button>
            </div>
          </div>
        )}
      </div>

      {confirmOpen && norm && (
        <ConfirmModal
          width={norm.w}
          height={norm.h}
          price={totalPrice}
          onClose={() => setConfirmOpen(false)}
        />
      )}

      {media && <MediaModal cell={media} onClose={() => setMedia(null)} />}
    </div>
  );
};

const FilledLayer = ({ filled }: { filled: Map<string, FilledCell> }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from(filled.entries()).map(([key, cell]) => {
        const [x, y] = key.split(":").map(Number);
        return (
          <div
            key={key}
            className="absolute"
            style={{
              left: `${(x / GRID_SIZE) * 100}%`,
              top: `${(y / GRID_SIZE) * 100}%`,
              width: `calc(100% / ${GRID_SIZE})`,
              height: `calc(100% / ${GRID_SIZE})`,
              backgroundImage: `url(${cell.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor:
                cell.type === "poeme"
                  ? "hsl(var(--gold-soft))"
                  : cell.type === "video"
                  ? "hsl(var(--foreground))"
                  : undefined,
            }}
          />
        );
      })}
    </div>
  );
};

const MediaModal = ({
  cell,
  onClose,
}: {
  cell: FilledCell;
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 hairline flex items-center justify-center hover:bg-muted"
        aria-label="Fermer"
      >
        <X className="w-4 h-4" strokeWidth={1.25} />
      </button>
      <div
        className="max-w-2xl w-full hairline bg-background animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {cell.type === "poeme" ? (
          <div className="p-10 md:p-14 bg-[hsl(var(--gold-soft))]">
            <p className="text-[10px] tracking-micro uppercase text-muted-foreground mb-6">
              Poème
            </p>
            <p className="font-serif italic text-2xl md:text-3xl text-foreground whitespace-pre-line leading-relaxed">
              {cell.poem}
            </p>
          </div>
        ) : cell.type === "video" ? (
          <div className="relative aspect-video bg-foreground flex items-center justify-center">
            <img
              src={cell.src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 w-16 h-16 rounded-full bg-background/90 flex items-center justify-center">
              <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[14px] border-l-foreground ml-1" />
            </div>
            <p className="absolute bottom-4 left-4 text-[10px] tracking-micro uppercase text-background">
              Vidéo
            </p>
          </div>
        ) : (
          <img
            src={cell.src}
            alt={cell.caption ?? ""}
            className="w-full max-h-[70vh] object-cover"
          />
        )}
        <div className="p-6 md:p-8 hairline-t flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-micro uppercase text-muted-foreground mb-1">
              Déposé par
            </p>
            <p className="font-serif text-2xl text-foreground">
              {cell.contributor}
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground italic">
            {cell.caption}
          </p>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal = ({
  width,
  height,
  price,
  onClose,
}: {
  width: number;
  height: number;
  price: number;
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 hairline flex items-center justify-center hover:bg-muted"
        aria-label="Fermer"
      >
        <X className="w-4 h-4" strokeWidth={1.25} />
      </button>
      <div
        className="max-w-xl w-full hairline bg-background p-10 md:p-14 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[10px] tracking-micro uppercase text-muted-foreground mb-3">
          Votre pierre
        </p>
        <h3 className="font-serif text-3xl md:text-4xl mb-6 text-foreground">
          {width} × {height} — {width * height} cases
        </h3>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          Vous vous apprêtez à réserver votre emplacement dans le village des
          contributions. Une fois validé, vous pourrez y déposer une photo, une
          vidéo ou un poème.
        </p>
        <div className="hairline-t hairline-b py-5 my-6 flex items-center justify-between">
          <span className="text-[11px] tracking-micro uppercase text-muted-foreground">
            Total à payer
          </span>
          <span className="font-serif text-3xl tabular-nums text-foreground">
            {price.toLocaleString("fr-FR")} €
          </span>
        </div>
        <button className="w-full bg-foreground text-background py-4 text-xs tracking-micro uppercase hover:bg-gold transition-colors">
          Procéder au paiement sécurisé
        </button>
      </div>
    </div>
  );
};

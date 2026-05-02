import { Amazone } from "@/data/amazones";
import { useEffect, useState } from "react";

interface Props {
  amazone: Amazone;
  onSupport?: () => void;
}

export const FundingBlock = ({ amazone, onSupport }: Props) => {
  const pct = Math.min(100, Math.round((amazone.raised / amazone.goal) * 100));
  const [animatedPct, setAnimatedPct] = useState(0);

  useEffect(() => {
    setAnimatedPct(0);
    const t = setTimeout(() => setAnimatedPct(pct), 50);
    return () => clearTimeout(t);
  }, [pct, amazone.id]);

  return (
    <aside className="hairline bg-background p-8 lg:p-10 sticky top-8">
      <div className="space-y-8">
        <div>
          <p className="text-[10px] tracking-micro uppercase text-muted-foreground mb-3">
            Budget attendu
          </p>
          <p className="font-serif text-5xl lg:text-6xl text-foreground tabular-nums">
            {amazone.goal.toLocaleString("fr-FR")}
            <span className="text-3xl text-muted-foreground ml-1">€</span>
          </p>
        </div>

        <div className="hairline-t pt-6">
          <div className="flex items-end justify-between mb-3">
            <p className="text-[10px] tracking-micro uppercase text-muted-foreground">
              Avancement
            </p>
            <p className="font-mono text-xs tabular-nums text-foreground">
              {pct}%
            </p>
          </div>
          <div className="h-px bg-muted relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-[1400ms] ease-out"
              style={{ width: `${animatedPct}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{amazone.raised.toLocaleString("fr-FR")} €</span>
            <span>{amazone.goal.toLocaleString("fr-FR")} €</span>
          </div>
        </div>

        <div className="hairline-t pt-6">
          <p className="text-[10px] tracking-micro uppercase text-muted-foreground mb-3">
            Contributions reçues
          </p>
          <div className="flex items-baseline gap-2">
            <p className="font-mono text-3xl tabular-nums text-foreground">
              {amazone.contributors}
            </p>
            <p className="text-sm text-muted-foreground">soutiens</p>
          </div>
        </div>

        <button
          onClick={onSupport}
          className="w-full bg-foreground text-background py-4 text-xs tracking-micro uppercase hover:bg-gold transition-colors duration-300"
        >
          Soutenir ce projet
        </button>

        <p className="text-[11px] text-muted-foreground leading-relaxed text-center">
          Choisissez votre pierre dans le village
        </p>
      </div>
    </aside>
  );
};

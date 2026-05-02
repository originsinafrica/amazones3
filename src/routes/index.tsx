import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { amazones } from "@/data/amazones";
import { AmazoneSelector } from "@/components/AmazoneSelector";
import { AmazoneHeader } from "@/components/AmazoneHeader";
import { ProjectBody } from "@/components/ProjectBody";
import { FundingBlock } from "@/components/FundingBlock";
import { ContributionsWall } from "@/components/ContributionsWall";

export const Route = createFileRoute("/")({
  component: Index,
});

type Tab = "presentation" | "mur";

function Index() {
  const [tab, setTab] = useState<Tab>("presentation");
  const [activeId, setActiveId] = useState(amazones[0].id);
  const active = amazones.find((a) => a.id === activeId)!;
  const wallRef = useRef<HTMLDivElement>(null);

  const goToWall = () => {
    setTab("mur");
    setTimeout(() => wallRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-12 pb-6 flex justify-center">
        <div className="hairline inline-flex p-1">
          {[
            { id: "presentation", label: "Présentation des projets" },
            { id: "mur", label: "Village des contributions" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`px-5 md:px-8 py-3 text-[11px] tracking-micro uppercase transition-colors ${
                tab === t.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
        {tab === "presentation" ? (
          <>
            <AmazoneSelector
              amazones={amazones}
              activeId={activeId}
              onSelect={setActiveId}
            />

            <div className="mt-12">
              <AmazoneHeader amazone={active} />
            </div>

            <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-8">
                <ProjectBody amazone={active} />
              </div>
              <div className="lg:col-span-4">
                <FundingBlock amazone={active} onSupport={goToWall} />
              </div>
            </div>
          </>
        ) : (
          <div ref={wallRef} className="mt-8">
            <ContributionsWall />
          </div>
        )}
      </div>
    </main>
  );
}

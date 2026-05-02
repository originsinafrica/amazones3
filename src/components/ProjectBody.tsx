import { Amazone } from "@/data/amazones";
import { Play } from "lucide-react";

interface Props {
  amazone: Amazone;
}

export const ProjectBody = ({ amazone }: Props) => {
  return (
    <article className="space-y-16 animate-fade-slide" key={amazone.id}>
      <header className="space-y-6">
        <p className="text-[10px] tracking-micro uppercase text-muted-foreground">
          {amazone.region} · {amazone.role}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground">
          {amazone.projectTitle}
        </h1>
        <p className="font-serif text-xl md:text-2xl text-muted-foreground italic max-w-xl leading-snug">
          {amazone.tagline}
        </p>
      </header>

      <div className="space-y-6 max-w-2xl">
        {amazone.story.map((para, i) => (
          <p
            key={i}
            className="text-[15px] leading-[1.8] text-foreground/85"
          >
            {para}
          </p>
        ))}
      </div>

      {/* Video */}
      <figure className="space-y-3">
        <div className="relative aspect-video bg-muted overflow-hidden hairline group cursor-pointer">
          <img
            src={amazone.videoPoster}
            alt="Présentation vidéo"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-background/90 hairline flex items-center justify-center group-hover:bg-gold group-hover:text-gold-foreground transition-colors duration-300">
              <Play className="w-5 h-5 ml-0.5" strokeWidth={1.25} />
            </div>
          </div>
        </div>
        <figcaption className="text-xs text-muted-foreground tracking-wide">
          Présentation par {amazone.name} — 3 min 42
        </figcaption>
      </figure>

      {/* Gallery */}
      <section className="space-y-6">
        <h2 className="text-[10px] tracking-micro uppercase text-muted-foreground hairline-b pb-3">
          Galerie du terrain
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline">
          {amazone.gallery.map((img, i) => (
            <figure key={i} className="bg-background space-y-2 p-px">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <figcaption className="text-[11px] text-muted-foreground p-2">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </article>
  );
};

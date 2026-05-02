import { Amazone } from "@/data/amazones";

interface Props {
  amazone: Amazone;
}

export const AmazoneHeader = ({ amazone }: Props) => {
  return (
    <section
      key={amazone.id}
      className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-hairline animate-fade-in"
    >
      <div className="lg:col-span-5 bg-background overflow-hidden">
        <div className="aspect-[4/5] overflow-hidden bg-background">
          <img
            src={amazone.portrait}
            alt={`Portrait de ${amazone.name}`}
            width={640}
            height={800}
            className="w-full h-full object-cover animate-scale-in"
          />
        </div>
      </div>
      <div className="lg:col-span-7 bg-background flex flex-col justify-between p-8 lg:p-14">
        <div>
          <p className="text-[10px] tracking-micro uppercase text-muted-foreground mb-6">
            Amazone · {amazone.region}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-foreground">
            {amazone.name.split(" ").map((w, i) => (
              <span key={i} className="block">
                {w}
              </span>
            ))}
          </h2>
          <p className="mt-6 font-serif italic text-xl text-muted-foreground">
            {amazone.role}
          </p>
          <p className="mt-8 text-[15px] leading-[1.8] text-foreground/85 max-w-md">
            {amazone.bio}
          </p>
        </div>
        <div className="hairline-t pt-6 mt-12">
          <p className="text-[10px] tracking-micro uppercase text-muted-foreground mb-2">
            Projet
          </p>
          <p className="font-serif text-2xl text-foreground leading-tight max-w-md">
            {amazone.projectTitle}
          </p>
        </div>
      </div>
    </section>
  );
};

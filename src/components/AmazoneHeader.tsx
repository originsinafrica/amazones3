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
        <div className="grid grid-cols-2 gap-px bg-hairline">
          <div className="col-span-2 aspect-[4/3] overflow-hidden bg-background">
            <img
              src={amazone.portrait}
              alt={`Portrait de ${amazone.name}`}
              width={640}
              height={480}
              className="w-full h-full object-cover animate-scale-in"
            />
          </div>
          {amazone.gallery[0] && (
            <div className="aspect-square overflow-hidden bg-background">
              <img
                src={amazone.gallery[0].src}
                alt={amazone.gallery[0].caption}
                className="w-full h-full object-cover animate-scale-in"
              />
            </div>
          )}
          {amazone.gallery[1] && (
            <div className="aspect-square overflow-hidden bg-background">
              <img
                src={amazone.gallery[1].src}
                alt={amazone.gallery[1].caption}
                className="w-full h-full object-cover animate-scale-in"
              />
            </div>
          )}
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

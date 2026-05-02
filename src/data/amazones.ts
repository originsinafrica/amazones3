import a1 from "@/assets/amazone-1.jpg";
import a2 from "@/assets/amazone-2.jpg";
import a3 from "@/assets/amazone-3.jpg";
import a4 from "@/assets/amazone-4.jpg";
import a5 from "@/assets/amazone-5.jpg";
import a6 from "@/assets/amazone-6.jpg";
import a7 from "@/assets/amazone-7.jpg";
import a8 from "@/assets/amazone-8.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

export type Amazone = {
  id: string;
  name: string;
  role: string;
  region: string;
  portrait: string;
  bio: string;
  projectTitle: string;
  tagline: string;
  story: string[];
  gallery: { src: string; caption: string }[];
  videoPoster: string;
  goal: number;
  raised: number;
  contributors: number;
};

export const amazones: Amazone[] = [
  {
    id: "aminata",
    name: "Aminata Diallo",
    role: "Gardienne des semences",
    region: "Vallée du Niger",
    portrait: a1,
    bio: "Née en 1968 dans un village au bord du fleuve Niger, Aminata a hérité du savoir des semences de sa grand-mère. Pendant trente ans, elle a parcouru les marchés du Sahel pour collecter, échanger et préserver les variétés oubliées. Aujourd'hui, elle forme une nouvelle génération de gardiennes.",
    projectTitle: "La maison des semences anciennes",
    tagline: "Préserver 47 variétés ancestrales menacées de disparition.",
    story: [
      "Depuis trois générations, ma famille conserve des semences que personne d'autre ne cultive plus. Le mil rouge, le fonio noir, l'oseille de Guinée — chacune porte un nom, une histoire, un rituel.",
      "Avec ce projet, je souhaite construire une maison de terre crue dédiée à leur conservation, et former douze jeunes femmes du village à la sélection variétale. Une banque vivante, ouverte, partagée.",
      "Chaque pierre que vous poserez deviendra une semence rendue à la terre. Chaque don, une variété sauvée de l'oubli.",
    ],
    gallery: [
      { src: g2, caption: "Récolte de mil rouge — saison sèche 2025" },
      { src: g1, caption: "Atelier de tressage des paniers de stockage" },
      { src: g3, caption: "Cérémonie d'ouverture des silos" },
    ],
    videoPoster: g1,
    goal: 5000,
    raised: 3240,
    contributors: 187,
  },
  {
    id: "fatou",
    name: "Fatou Sangaré",
    role: "Maître tisserande",
    region: "Pays Dogon",
    portrait: a2,
    bio: "Fatou apprend le bogolan à sept ans, sous l'œil exigeant de sa mère. Quarante ans plus tard, elle est l'une des dernières à maîtriser les motifs rituels du pays Dogon. Son atelier est devenu un lieu de résistance silencieuse contre l'uniformisation des textiles industriels.",
    projectTitle: "L'atelier des fils retrouvés",
    tagline: "Transmettre l'art du bogolan à la nouvelle génération.",
    story: [
      "Le bogolan n'est pas qu'un tissu : c'est un langage. Chaque motif raconte une naissance, un mariage, une saison.",
      "J'ouvre un atelier où vingt apprenties pourront apprendre les gestes anciens, du filage à la teinture à la boue fermentée.",
    ],
    gallery: [
      { src: g1, caption: "Préparation des fils de coton" },
      { src: g2, caption: "Pigments naturels" },
    ],
    videoPoster: g2,
    goal: 5000,
    raised: 1820,
    contributors: 94,
  },
  {
    id: "mariam",
    name: "Mariam Touré",
    role: "Guérisseuse traditionnelle",
    region: "Forêt de Ziama",
    portrait: a3,
    bio: "Septuagénaire au regard clair, Mariam connaît plus de deux cents plantes de la forêt de Ziama. Initiée par son père, ancien chasseur-guérisseur, elle a soigné trois générations de villageois. Sa hantise : que ce savoir s'éteigne avec elle.",
    projectTitle: "Le jardin des plantes qui soignent",
    tagline: "Cataloguer 200 plantes médicinales avant qu'elles ne disparaissent.",
    story: [
      "Soixante-douze ans à apprendre les plantes. Et personne, après moi, pour porter ce savoir.",
      "Ce projet finance un jardin pédagogique et un livre illustré, en français et en malinké.",
    ],
    gallery: [{ src: g3, caption: "Cérémonie des feuilles" }, { src: g2, caption: "Graines séchées" }],
    videoPoster: g3,
    goal: 5000,
    raised: 4650,
    contributors: 312,
  },
  {
    id: "kadiatou",
    name: "Kadiatou Barry",
    role: "Agricultrice régénérative",
    region: "Plateau du Fouta",
    portrait: a4,
    bio: "Kadiatou a quitté Conakry à 25 ans pour reprendre les terres familiales du Fouta-Djalon. Formée à l'agroécologie au Sénégal, elle expérimente depuis dix ans des techniques de reboisement qui réconcilient productivité agricole et résilience climatique.",
    projectTitle: "Mille arbres pour la rivière",
    tagline: "Reboiser les berges asséchées de la rivière Bafing.",
    story: [
      "Quand j'étais enfant, la rivière chantait toute l'année. Aujourd'hui elle se tait six mois sur douze.",
      "Avec mille arbres — manguiers, nérés, karités — nous ramènerons l'ombre, l'eau, et les oiseaux.",
    ],
    gallery: [{ src: g2, caption: "Pépinière de jeunes plants" }],
    videoPoster: g2,
    goal: 5000,
    raised: 2410,
    contributors: 145,
  },
  {
    id: "aissatou",
    name: "Aïssatou Camara",
    role: "Éducatrice",
    region: "Conakry",
    portrait: a5,
    bio: "Institutrice en zone rurale pendant vingt ans, Aïssatou a vu trop d'enfants abandonner l'école faute de livres. Elle imagine la bibliothèque mobile en 2022 ; deux ans plus tard, sa charrette dessert quinze villages reculés du littoral guinéen.",
    projectTitle: "L'école sous l'arbre à palabres",
    tagline: "Une bibliothèque mobile pour quinze villages isolés.",
    story: [
      "Lire, c'est respirer plus large. Mais dans nos villages, il n'y a pas de livres.",
      "Une charrette, deux ânes, trois cents livres. Voilà l'école qui voyage.",
    ],
    gallery: [{ src: g1, caption: "Première tournée" }],
    videoPoster: g1,
    goal: 5000,
    raised: 3890,
    contributors: 256,
  },
  {
    id: "salimata",
    name: "Salimata Keïta",
    role: "Céramiste",
    region: "Ségou",
    portrait: a6,
    bio: "Salimata appartient à une lignée de potières bambara qui remonte à six générations. Formée par sa tante à Ségou, elle façonne des poteries rituelles que les anciens utilisent encore lors des cérémonies de purification. Elle craint que les fours collectifs ne disparaissent avant qu'elle n'ait pu transmettre.",
    projectTitle: "La terre qui se souvient",
    tagline: "Faire revivre l'art des poteries rituelles bambara.",
    story: [
      "Mes mains connaissent la terre depuis l'enfance. Mais les fours à bois disparaissent.",
      "Construire un four collectif, et accueillir huit jeunes potières.",
    ],
    gallery: [{ src: g3, caption: "Cuisson nocturne" }],
    videoPoster: g3,
    goal: 5000,
    raised: 1240,
    contributors: 78,
  },
  {
    id: "nafissatou",
    name: "Nafissatou Cissé",
    role: "Conteuse",
    region: "Tombouctou",
    portrait: a7,
    bio: "Nafissatou est griotte de père en fille. Voix ample, mémoire vertigineuse, elle conserve dans sa tête plus de cinq cents contes, proverbes et généalogies. Depuis 2020, elle parcourt le nord du Mali avec un enregistreur pour collecter les voix des plus anciens.",
    projectTitle: "Les voix qu'on n'entend plus",
    tagline: "Enregistrer cent contes oraux avant qu'ils ne s'éteignent.",
    story: [
      "Les vieux meurent, et avec eux des bibliothèques entières.",
      "Un studio mobile, un micro, et la patience d'écouter.",
    ],
    gallery: [{ src: g3, caption: "Veillée de contes" }],
    videoPoster: g3,
    goal: 5000,
    raised: 2980,
    contributors: 201,
  },
  {
    id: "hawa",
    name: "Hawa Doumbia",
    role: "Danseuse rituelle",
    region: "Bamako",
    portrait: a8,
    bio: "Hawa danse depuis qu'elle sait marcher. Initiée aux danses sacrées par sa mère, prêtresse d'un culte de possession, elle enseigne aujourd'hui à Bamako des chorégraphies anciennes que les écoles modernes ne transmettent plus. Pour elle, chaque geste est une prière.",
    projectTitle: "Le corps comme mémoire",
    tagline: "Une école de danses sacrées pour jeunes filles.",
    story: [
      "Danser, c'est prier debout. Chaque geste est une prière transmise de mère en fille.",
      "Une salle, des tambours, et trente apprenties par an.",
    ],
    gallery: [{ src: g1, caption: "Répétition collective" }],
    videoPoster: g1,
    goal: 5000,
    raised: 4120,
    contributors: 289,
  },
];

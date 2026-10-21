export const shop = {
  name: "Lunette Store",
  address: "Gogoguhe, à côté du Collège Imane, Daloa",
  email: "lunettestore875@gmail.com",
  phones: [
    {
      label: "01 01 16 21 37",
      international: "+2250101162137",
      whatsapp: "2250101162137",
    },
    {
      label: "07 13 58 23 57",
      international: "+2250713582357",
      whatsapp: "2250713582357",
    },
  ],
  maps:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Lunette Store, Gogoguhe, à côté du Collège Imane, Daloa, Côte d’Ivoire",
    ),
};
export const whatsappLink = (
  phone,
  message = "Bonjour Lunette Store, je souhaite obtenir des informations sur vos montures et vos services.",
) => `https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(message)}`;
export const navigation = [
  ["Accueil", "accueil"],
  ["Nos montures", "montures"],
  ["Nos services", "services"],
  ["La boutique", "boutique"],
  ["Contact", "contact"],
];
// Visuels générés par IA : illustrations de styles, pas un inventaire.
// Remplacer image et alt ci-dessous par les photographies autorisées du stock réel.
export const collection = [
  {
    id: "timeless",
    title: "Élégance intemporelle",
    subtitle: "Les classiques, réinterprétés.",
    category: "Optiques",
    groups: ["Optiques", "Femmes", "Hommes"],
    image: "timeless",
    alt: "Illustration de lunettes rondes en acétate écaille miel",
    description:
      "Des lignes douces et un esprit classique pour un style qui traverse les saisons.",
  },
  {
    id: "modern",
    title: "Montures modernes",
    subtitle: "La légèreté a du caractère.",
    category: "Optiques",
    groups: ["Optiques", "Femmes", "Hommes"],
    image: "modern",
    alt: "Illustration de lunettes géométriques fines en métal champagne",
    description:
      "Des silhouettes épurées et des détails subtils, pour un regard résolument contemporain.",
  },
  {
    id: "bold",
    title: "Style audacieux",
    subtitle: "Une allure qui ne passe pas inaperçue.",
    category: "Solaires",
    groups: ["Solaires", "Femmes", "Hommes"],
    image: "bold",
    alt: "Illustration de lunettes de soleil rectangulaires en acétate noir",
    description:
      "Du volume, du contraste et une personnalité affirmée. Osez une nouvelle perspective.",
  },
  {
    id: "women",
    title: "Lunettes pour femmes",
    subtitle: "Votre style, tout simplement.",
    category: "Femmes",
    groups: ["Optiques", "Femmes"],
    image: "women",
    alt: "Illustration de lunettes œil-de-chat bordeaux translucide",
    description:
      "Des courbes expressives et des formes élégantes pour révéler votre personnalité.",
  },
  {
    id: "men",
    title: "Lunettes pour hommes",
    subtitle: "Le sens du détail.",
    category: "Hommes",
    groups: ["Optiques", "Hommes"],
    image: "men",
    alt: "Illustration de lunettes à arcade écaille et cerclage doré",
    description:
      "Des lignes structurées, entre inspiration classique et élégance quotidienne.",
  },
  {
    id: "kids",
    title: "Lunettes pour enfants",
    subtitle: "Pour leurs grandes découvertes.",
    category: "Enfants",
    groups: ["Optiques", "Enfants"],
    image: "kids",
    alt: "Illustration de petites lunettes rondes vert sauge pour enfant",
    description:
      "Un univers de montures pensé pour les petits regards. Demandez conseil en boutique.",
  },
  {
    id: "care",
    title: "Accessoires et entretien",
    subtitle: "Les petites attentions qui font durer.",
    category: "Accessoires",
    groups: ["Accessoires"],
    image: "care",
    alt: "Illustration d’un étui cognac, d’une microfibre et d’un flacon de nettoyage",
    description:
      "Étuis, cordons et produits d’entretien : les essentiels pour accompagner vos lunettes chaque jour.",
  },
];
export const filters = [
  "Tout découvrir",
  "Optiques",
  "Solaires",
  "Femmes",
  "Hommes",
  "Enfants",
  "Accessoires",
];

export const GOOGLE_PROFILE = "https://share.google/z9GciW2iuIooYdN8C";

export const company = {
  name: "RCHbau",
  operator: "Roman Chamaj",
  phoneDisplay: "+421 949 183 499",
  phoneHref: "tel:+421949183499",
  email: "info@rchbau.sk",
  street: "Hosťovce 97",
  postal: "951 91",
  city: "Zlaté Moravce",
  area: "Zlaté Moravce, Nitra, Levice, Vráble a okolie. Realizácie po Slovensku podľa dohody.",
  from: "Zlaté Moravce",
  drive: "https://drive.google.com/drive/folders/1cq-IxMmJktJuSr6kg1C8jz4UVC__FNqU?usp=sharing",
  website: "https://rchbau.sk",
  formKey: "f138d20f-b479-4bb9-8629-17202ce907a1",
  ico: "44356846",
  legalForm: "Fyzická osoba – živnostník",
  tradeRegister: "430-34341",
  trade: "Dokončovacie stavebné práce pri realizácii exteriérov a interiérov",
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  lead: string;
  points: string[];
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    slug: "sadrokarton",
    title: "Sadrokartónové práce",
    short: "Podhľady, priečky, opláštenie a príprava na svetlá.",
    lead: "Montujeme sadrokartónové priečky, predsadené steny a podhľady v bytoch, domoch aj prevádzkach.",
    points: [
      "Priečky a predsadené steny",
      "Znížené podhľady",
      "Príprava na LED osvetlenie",
      "Opravy a úpravy existujúcich konštrukcií",
    ],
    image: "/media/praca-sadrokarton-malovanie.jpg",
    alt: "Sadrokartónový strop pred dokončením",
  },
  {
    slug: "kazetove-stropy",
    title: "Kazetové a panelové stropy",
    short: "Stropné systémy pre kancelárie, prevádzky a technické priestory.",
    lead: "Kazetové a panelové stropy pre priestory, kde treba rýchlu montáž, prístup k inštaláciám a čistý výsledok.",
    points: [
      "Kazetové podhľady",
      "Panelové stropy",
      "Kombinácia so sadrokartónom",
      "Kancelárie a komerčné priestory",
    ],
    image: "/media/praca-panelove-stropy.jpg",
    alt: "Konštrukcia kazetového stropu",
  },
  {
    slug: "akusticke-panely",
    title: "Akustické panely",
    short: "Lepší zvuk v kanceláriách, miestnostiach a pracovných priestoroch.",
    lead: "Akustické panely a stropy znižujú dozvuk tam, kde sa pracuje, stretáva alebo prijímajú zákazníci.",
    points: [
      "Akustické stropy",
      "Panely do kancelárií",
      "Riešenie dozvuku",
      "Kombinácia s existujúcim interiérom",
    ],
    image: "/media/praca-akusticke-panely.jpg",
    alt: "Akustické panely v interiéri",
  },
  {
    slug: "malovanie-tmelenie",
    title: "Tmelenie a maľovanie",
    short: "Dokončenie sadrokartónu a maľovanie interiérov.",
    lead: "Tmelíme, brúsime a maľujeme steny a stropy po montáži sadrokartónu.",
    points: [
      "Tmelenie a brúsenie",
      "Maľovanie stien a stropov",
      "Obnova povrchov",
      "Dokončenie po montáži sadrokartónu",
    ],
    image: "/media/praca-led-svetla.jpg",
    alt: "Podhľad s prípravou na osvetlenie",
  },
];

export const gallery = [
  { src: "/media/praca-sadrokarton-malovanie.jpg", alt: "Sadrokartónový strop pred dokončením" },
  { src: "/media/IMG_20260219_140436.jpg", alt: "Hotový kazetový strop" },
  { src: "/media/praca-panelove-stropy.jpg", alt: "Montáž kazetového stropu" },
  { src: "/media/praca-led-svetla.jpg", alt: "Podhľad s prípravou na LED" },
  { src: "/media/praca-akusticke-panely.jpg", alt: "Akustické panely" },
  { src: "/media/IMG_20250214_091356.jpg", alt: "Realizácia interiéru" },
  { src: "/media/IMG_20250214_091435.jpg", alt: "Detail stropnej konštrukcie" },
  { src: "/media/IMG_20250214_091449.jpg", alt: "Pohľad na realizáciu" },
  { src: "/media/20230202_203121.jpg", alt: "Interiérová realizácia RCHbau" },
];

export const faqs = [
  {
    q: "Čo treba poslať pre cenovú ponuku?",
    a: "Mesto, typ práce, približné rozmery, fotky priestoru a termín. Pri väčšom rozsahu je vhodná obhliadka.",
  },
  {
    q: "Robíte aj menšie zákazky?",
    a: "Áno, podľa rozsahu a termínu. Najlepšie je poslať popis a fotky priestoru.",
  },
  {
    q: "Kde pracujete?",
    a: "Sme firma zo Zlatých Moraviec. Najčastejšie pôsobíme v Zlatých Moravciach, Nitre, Leviciach, Vrábľoch a okolí. Ďalej po Slovensku podľa dohody.",
  },
  {
    q: "Je na webe pevný cenník?",
    a: "Nie. Cena závisí od rozsahu, materiálu, prípravy podkladu, výšky a termínu.",
  },
];

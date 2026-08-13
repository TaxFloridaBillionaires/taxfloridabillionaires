export type SocialPlatform =
  | "website"
  | "x"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "bluesky"
  | "threads";

export interface CandidateSocial {
  platform: SocialPlatform;
  url: string;
}

export type CandidateLevel = "federal" | "state" | "local";

export interface Candidate {
  /** URL-safe anchor slug derived from the candidate name. */
  slug: string;
  name: string;
  role: string;
  url: string;
  /** Official campaign donation page. */
  donateUrl?: string;
  /** Rough region of Florida the district sits in — used by the endorsements map. */
  region: "northeast" | "north" | "central" | "southeast" | "southwest";
  /** Approximate district center [lng, lat] for map focus. */
  center: [number, number];
  /** Short area label shown under the role. */
  area?: string;
  /** Office level — used to group the endorsements list. */
  level: CandidateLevel;
  blurb?: string;
  socials?: CandidateSocial[];
}

/** Convert a candidate name into a URL-safe slug. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const regionLabels: Record<Candidate["region"], string> = {
  north: "North Florida / Panhandle",
  northeast: "Northeast Florida",
  central: "Central Florida",
  southwest: "Southwest Florida",
  southeast: "Southeast Florida",
};

export const levelLabels: Record<CandidateLevel, string> = {
  federal: "Federal",
  state: "State Legislature",
  local: "Local",
};

export const levelOrder: CandidateLevel[] = ["federal", "state", "local"];

export const candidates: Candidate[] = [
  {
    slug: "angie-nixon",
    name: "Angie Nixon",
    role: "U.S. Senate",
    url: "https://angienixon.com",
    donateUrl: "https://secure.actblue.com/donate/nixon-web",
    region: "northeast",
    center: [-81.66, 30.33],
    area: "Jacksonville",
    level: "federal",
    blurb:
      "State Representative, union organizer and Jacksonville native running on an affordability agenda for working Floridians.",
    socials: [{ platform: "threads", url: "https://www.threads.com/@theangienixon" }],
  },
  {
    slug: "nicole-locklin",
    name: "Nicole Locklin",
    role: "FL-26",
    url: "https://locklinforcongress.com",
    region: "southeast",
    center: [-80.19, 25.77],
    area: "Miami-Dade",
    level: "federal",
    blurb:
      'Runs on a flat "tax billionaires, no corporate PAC money" platform — working people shouldn\'t be told to accept poverty while corporations and billionaires keep raking it in.',
    socials: [
      { platform: "instagram", url: "https://www.instagram.com/locklin2026" },
      { platform: "x", url: "https://x.com/locklin2026" },
      { platform: "linkedin", url: "https://www.linkedin.com/in/nlocklin" },
    ],
  },
  {
    slug: "brandt-robinson",
    name: "Brandt Robinson",
    role: "FL-13",
    url: "https://brandtforcongress.com",
    donateUrl: "https://brandtforcongress.com",
    region: "central",
    center: [-82.75, 27.84],
    area: "Pinellas / St. Petersburg & Clearwater",
    level: "federal",
    blurb:
      'A 29-year public school teacher who put it plainly: "It\'s not radical to say that billionaires MUST pay their fair share."',
    socials: [
      { platform: "instagram", url: "https://www.instagram.com/brandtforcongress" },
      {
        platform: "facebook",
        url: "https://www.facebook.com/p/Brandt-Robinson-for-Congress-61585424938260",
      },
    ],
  },
  {
    slug: "britt-robinson",
    name: "Britt Robinson",
    role: "FL-04",
    url: "https://www.brit4congress.com",
    region: "northeast",
    center: [-81.6, 30.36],
    area: "Jacksonville / Duval",
    level: "federal",
    blurb:
      "Jacksonville-area challenger running on affordability for working families — livable wages, healthcare access and an economy that stops rewarding only the wealthiest.",
  },
  {
    slug: "jon-harris",
    name: "Jon Harris",
    role: "FL-16",
    url: "https://jonharrisforcongress.com",
    region: "central",
    center: [-82.4, 27.5],
    area: "Hillsborough & Manatee",
    level: "federal",
    blurb:
      'Affordability-first "Growth Economy" plan: lower household bills, an expanded child tax credit, paid leave and student loan relief.',
    socials: [{ platform: "threads", url: "https://www.threads.com/@jonharrisforcongress" }],
  },
  {
    slug: "elijah-manley",
    name: "Elijah Manley",
    role: "FL-20",
    url: "https://www.elijahmanley.com",
    donateUrl: "https://secure.actblue.com/donate/elijah-manley-1",
    region: "southeast",
    center: [-80.24, 26.13],
    area: "Broward / Fort Lauderdale",
    level: "federal",
    blurb: "Organizer and educator running in FL-20 to restore the American Dream.",
    socials: [{ platform: "bluesky", url: "https://bsky.app/profile/elijahmanley.bsky.social" }],
  },
  {
    slug: "oliver-larkin",
    name: "Oliver Larkin",
    role: "FL-25",
    url: "https://www.oliverforcongress.com",
    donateUrl: "https://secure.actblue.com/donate/oliver-for-congress",
    region: "southeast",
    center: [-80.15, 26.35],
    area: "Broward / Palm Beach",
    level: "federal",
    blurb: "South Florida candidate campaigning against corporate power and for working families.",
  },
  {
    slug: "amanda-marie-green",
    name: "Amanda Marie Green",
    role: "FL-02",
    url: "https://www.amgforcongress.com",
    region: "north",
    center: [-84.28, 30.44],
    area: "Tallahassee / North Florida",
    level: "federal",
    blurb:
      'Endorsed by the Florida AFL-CIO through the Northwest Florida Federation of Labor, and blunt about the stakes: making the economy work for everyday folks, "not billionaires."',
    socials: [{ platform: "instagram", url: "https://www.instagram.com/amgforcongress" }],
  },
  {
    slug: "brice-barnes",
    name: "Brice Barnes",
    role: "FL-02",
    url: "https://bricebarnes.com",
    region: "north",
    center: [-84.28, 30.44],
    area: "Tallahassee / North Florida",
    level: "federal",
    blurb:
      'Backed by union leaders and longtime organizers across North Florida, running on the plain fact that "life simply isn\'t working for people in North Florida."',
    socials: [
      { platform: "facebook", url: "https://www.facebook.com/brice.barnes.12" },
      { platform: "instagram", url: "https://www.instagram.com/bricebarnes" },
    ],
  },
  {
    slug: "gay-valimont",
    name: "Gay Valimont",
    role: "FL-01",
    url: "https://www.gayforcongress.com",
    donateUrl: "https://secure.actblue.com/donate/s-gayvalimont",
    region: "north",
    center: [-87.22, 30.44],
    area: "Escambia & Santa Rosa / Pensacola",
    level: "federal",
    blurb:
      "Runs on household affordability in the most expensive insurance market in the country — property and health coverage costs, care access, and a full-service VA hospital for Northwest Florida.",
    socials: [
      { platform: "facebook", url: "https://www.facebook.com/gayvalimont" },
      { platform: "instagram", url: "https://www.instagram.com/gayvalimontfl" },
    ],
  },
  {
    slug: "jayden-donofrio",
    name: "Jayden D'Onofrio",
    role: "FL House District 102",
    url: "https://jaydenforflorida.com",
    donateUrl: "https://secure.anedot.com/jayden-dononfrio-for-state-house/web-donate",
    region: "southeast",
    center: [-80.24, 26.06],
    area: "Broward / Davie & West Broward",
    level: "state",
    blurb:
      "The sharpest union platform in this field: repeal Florida's anti-union laws, defend the voter-approved $15 minimum wage, win paid family and medical leave, expand Medicaid.",
  },
  {
    slug: "antione-fields",
    name: "Antione Fields",
    role: "FL House District 21",
    url: "https://fieldsforflorida.com",
    donateUrl: "https://secure.actblue.com/donate/fieldsforflorida-web",
    region: "northeast",
    center: [-82.27, 29.55],
    area: "Alachua & Marion / Gainesville & Ocala",
    level: "state",
    blurb:
      'A "Good Jobs and Worker Power" agenda — raise wages, expand Medicaid toward universal healthcare, hold insurers accountable. Takes no corporate PAC or lobbyist money.',
    socials: [{ platform: "linkedin", url: "https://www.linkedin.com/in/antione-fields" }],
  },
  {
    slug: "ben-braver",
    name: "Ben Braver",
    role: "FL House District 65",
    url: "https://benbraver.com",
    donateUrl: "https://secure.actblue.com/donate/benbraver65",
    region: "central",
    center: [-82.5, 27.95],
    area: "Tampa Bay / Hillsborough",
    level: "state",
    blurb: "Tampa Bay candidate focused on housing costs, public schools and utility bills.",
  },
  {
    slug: "rey-sordo",
    name: "Rey Sordo",
    role: "FL House District 119",
    url: "https://rey4florida.org",
    donateUrl: "https://secure.actblue.com/donate/rey4florida",
    region: "southeast",
    center: [-80.43, 25.66],
    area: "South Miami-Dade / West Kendall",
    level: "state",
    blurb:
      "A service worker running on wage transparency, incentives for workforce housing and renter protections against abusive fees.",
  },
  {
    slug: "johnny-austin-thompson",
    name: "Johnny Austin Thompson",
    role: "FL House District 2",
    url: "https://standwithjohnny.com",
    donateUrl: "https://secure.actblue.com/donate/standwithjohnny",
    region: "north",
    center: [-87.22, 30.44],
    area: "Escambia / Pensacola",
    level: "state",
    blurb:
      'Pensacola campaign built on quality healthcare, good jobs and a clean Gulf Coast — "a representative working for all of us, not just the well-connected."',
  },
  {
    slug: "jasmine-brown",
    name: "Jasmine Brown",
    role: "Mayor of Pensacola",
    url: "https://www.jasminebrownformayor.com",
    region: "north",
    center: [-87.22, 30.42],
    area: "Escambia / Pensacola",
    level: "local",
    blurb:
      'A community organizer running on "Pensacola for the people, not the developers" — working people are squeezed every month while landlords and developers get richer off the city\'s resources.',
  },
  {
    slug: "anna-v-eskamani",
    name: "Anna V. Eskamani",
    role: "Mayor of Orlando",
    url: "https://annaforflorida.com",
    donateUrl: "https://secure.actblue.com/donate/ave_website",
    region: "central",
    center: [-81.38, 28.54],
    area: "Orange County / Orlando",
    level: "local",
    blurb:
      "The deepest delivery record of the group: Medicaid expansion advocacy, unemployment benefit reform, anti-eviction work, earned sick time, paid parental leave and consistent union support.",
    socials: [
      { platform: "facebook", url: "https://www.facebook.com/AnnaForFlorida" },
      { platform: "x", url: "https://x.com/annaforflorida" },
      { platform: "instagram", url: "https://www.instagram.com/annaforflorida" },
      { platform: "youtube", url: "https://www.youtube.com/channel/UCb_5-G7XakYb36Eu1Eu06eg" },
    ],
  },
  {
    slug: "adam-roberti",
    name: "Adam Roberti",
    role: "Hollywood City Commission, District 5",
    url: "https://www.adamforhollywood.com",
    donateUrl: "https://secure.anedot.com/adam-roberti/donate",
    region: "southeast",
    center: [-80.15, 26.01],
    area: "Broward / Hollywood",
    level: "local",
    blurb:
      "Grew up in District 5 and runs on cost of living, flood-ready neighborhoods, safer streets and youth programs — a City Hall that answers to residents.",
    socials: [
      { platform: "instagram", url: "https://instagram.com/adamforhollywood" },
      { platform: "facebook", url: "https://facebook.com/adamforhollywood" },
    ],
  },
];

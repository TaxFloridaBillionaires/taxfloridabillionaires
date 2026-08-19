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
    donateUrl: "https://secure.actblue.com/donate/nicole.locklin-fl.26",
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
    slug: "amanda-marie-green",
    name: "Amanda Marie Green",
    role: "FL-02",
    url: "https://www.amgforcongress.com",
    donateUrl: "https://secure.actblue.com/donate/amanda-green-1",
    region: "north",
    center: [-84.28, 30.44],
    area: "Tallahassee / North Florida",
    level: "federal",
    blurb:
      'Endorsed by the Florida AFL-CIO through the Northwest Florida Federation of Labor, and blunt about the stakes: making the economy work for everyday folks, "not billionaires."',
    socials: [{ platform: "instagram", url: "https://www.instagram.com/amgforcongress" }],
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

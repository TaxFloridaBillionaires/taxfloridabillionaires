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

export interface Candidate {
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
  blurb?: string;
  socials?: CandidateSocial[];
}

export const regionLabels: Record<Candidate["region"], string> = {
  north: "North Florida / Panhandle",
  northeast: "Northeast Florida",
  central: "Central Florida",
  southwest: "Southwest Florida",
  southeast: "Southeast Florida",
};

export const candidates: Candidate[] = [
  {
    name: "Angie Nixon",
    role: "U.S. Senate",
    url: "https://angienixon.com",
    donateUrl: "https://secure.actblue.com/donate/nixon-web",
    region: "northeast",
    center: [-81.66, 30.33],
    area: "Jacksonville",
    blurb:
      "State Representative, union organizer and Jacksonville native running on an affordability agenda for working Floridians.",
    socials: [{ platform: "threads", url: "https://www.threads.com/@theangienixon" }],
  },
  {
    name: "Britt Robinson",
    role: "FL-04",
    url: "https://www.brit4congress.com",
    donateUrl: "https://secure.actblue.com/donate/letsflipfl",
    region: "northeast",
    center: [-81.7, 30.28],
    area: "Jacksonville / Clay & Nassau",
    blurb: "Running in Florida's 4th congressional district on healthcare and economic fairness.",
  },
  {
    name: "Ben Braver",
    role: "FL House District 65",
    url: "https://benbraver.com",
    donateUrl: "https://secure.actblue.com/donate/benbraver65",
    region: "central",
    center: [-82.5, 27.95],
    area: "Tampa Bay / Hillsborough",
    blurb: "Tampa Bay candidate focused on housing costs, public schools and utility bills.",
  },
  {
    name: "Elijah Manley",
    role: "FL-20",
    url: "https://www.elijahmanley.com",
    donateUrl: "https://secure.actblue.com/donate/elijah-manley-1",
    region: "southeast",
    center: [-80.24, 26.13],
    area: "Broward / Fort Lauderdale",
    blurb: "Organizer and educator running in FL-20 to restore the American Dream.",
    socials: [{ platform: "bluesky", url: "https://bsky.app/profile/elijahmanley.bsky.social" }],
  },
  {
    name: "Oliver Larkin",
    role: "FL-25",
    url: "https://www.oliverforcongress.com",
    donateUrl: "https://secure.actblue.com/donate/oliver-for-congress",
    region: "southeast",
    center: [-80.15, 26.35],
    area: "Broward / Palm Beach",
    blurb: "South Florida candidate campaigning against corporate power and for working families.",
  },
];

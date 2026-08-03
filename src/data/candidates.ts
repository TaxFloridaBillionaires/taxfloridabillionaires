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
  /** Rough region of Florida the district sits in — used by the endorsements map. */
  region: "northeast" | "north" | "central" | "southeast" | "southwest";
  /** Approximate district center [lng, lat] for map focus. */
  center: [number, number];
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
    region: "northeast",
    center: [-81.66, 30.33],
    blurb:
      "State Representative, union organizer and Jacksonville native running on an affordability agenda for working Floridians.",
    socials: [{ platform: "threads", url: "https://www.threads.com/@theangienixon" }],
  },
  {
    name: "Britt Robinson",
    role: "FL-04",
    url: "https://www.brit4congress.com",
    region: "northeast",
    center: [-81.55, 30.25],
    blurb: "Running in Florida's 4th congressional district on healthcare and economic fairness.",
  },
  {
    name: "Ben Braver",
    role: "FL House District 65",
    url: "https://benbraver.com",
    region: "central",
    center: [-82.55, 27.9],
    blurb: "Tampa Bay candidate focused on housing costs, public schools and utility bills.",
  },
  {
    name: "Elijah Manley",
    role: "FL-20",
    url: "https://www.elijahmanley.com",
    region: "southeast",
    center: [-80.2, 26.13],
    blurb: "Organizer and educator running in FL-20 to restore the American Dream.",
    socials: [{ platform: "bluesky", url: "https://bsky.app/profile/elijahmanley.bsky.social" }],
  },
  {
    name: "Oliver Larkin",
    role: "FL-25",
    url: "http://oliverforcongress.com",
    region: "southeast",
    center: [-80.25, 26.15],
    blurb: "South Florida candidate campaigning against corporate power and for working families.",
  },
];

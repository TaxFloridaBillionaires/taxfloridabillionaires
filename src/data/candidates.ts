export interface Candidate {
  name: string;
  role: string;
  url: string;
  /** Rough region of Florida the district sits in — used by the endorsements map. */
  region: "northeast" | "north" | "central" | "southeast" | "southwest";
  /** Approximate district center [lng, lat] for map focus. */
  center: [number, number];
  blurb?: string;
}

export const candidates: Candidate[] = [
  {
    name: "Oliver Larkin",
    role: "FL-25",
    url: "http://oliverforcongress.com",
    region: "southeast",
    center: [-80.25, 26.15],
  },
  {
    name: "Angie Nixon",
    role: "FL Senate",
    url: "https://angienixon.com",
    region: "northeast",
    center: [-81.66, 30.33],
  },
  {
    name: "Elijah Manley",
    role: "FL-20",
    url: "https://www.elijahmanley.com",
    region: "southeast",
    center: [-80.2, 26.13],
  },
  {
    name: "Ben Braver",
    role: "FL House District 65",
    url: "https://benbraver.com",
    region: "central",
    center: [-82.55, 27.9],
  },
  {
    name: "Britt Robinson",
    role: "FL-04",
    url: "https://www.brit4congress.com",
    region: "northeast",
    center: [-81.55, 30.25],
  },
];

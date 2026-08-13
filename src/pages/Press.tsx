import { Link } from "react-router-dom";
import { Head } from "@/components/Head";

const slate: { group: string; items: { name: string; office: string; note: string }[] }[] = [
  {
    group: "Federal",
    items: [
      {
        name: "Angie Nixon",
        office: "U.S. Senate — Jacksonville",
        note: "State representative and union organizer running an affordability agenda for working Floridians.",
      },
      {
        name: "Amanda Marie Green",
        office: "U.S. House, FL-02 — Tallahassee / North Florida",
        note: "Florida AFL-CIO endorsed through the Northwest Florida Federation of Labor; campaigns to make the economy work for everyday folks, “not billionaires.”",
      },
      {
        name: "Brice Barnes",
        office: "U.S. House, FL-02 — Tallahassee / North Florida",
        note: "Backed by union leaders and longtime organizers across North Florida.",
      },
      {
        name: "Gay Valimont",
        office: "U.S. House, FL-01 — Escambia & Santa Rosa / Pensacola",
        note: "Runs on household affordability, insurance and health costs, and a full-service VA hospital for Northwest Florida.",
      },
      {
        name: "Britt Robinson",
        office: "U.S. House, FL-04 — Jacksonville / Duval",
        note: "Livable wages, healthcare access, and an economy that rewards work and expands opportunity for everyone.",
      },
      {
        name: "Brandt Robinson",
        office: "U.S. House, FL-13 — Pinellas / St. Petersburg & Clearwater",
        note: "A 29-year public school teacher: “It’s not radical to say that billionaires MUST pay their fair share.”",
      },
      {
        name: "Jon Harris",
        office: "U.S. House, FL-16 — Hillsborough & Manatee",
        note: "Affordability-first agenda: lower household bills, an expanded child tax credit, paid leave and student loan relief.",
      },
      {
        name: "Elijah Manley",
        office: "U.S. House, FL-20 — Broward / Fort Lauderdale",
        note: "Organizer and educator running to restore the American Dream for working families.",
      },
      {
        name: "Oliver Larkin",
        office: "U.S. House, FL-25 — Broward / Palm Beach",
        note: "Campaigning for working families and for an economy that puts community interests ahead of corporate profits.",
      },
      {
        name: "Nicole Locklin",
        office: "U.S. House, FL-26 — Miami-Dade",
        note: "Runs on a flat “tax billionaires, no corporate PAC money” platform.",
      },
    ],
  },
  {
    group: "State Legislature",
    items: [
      {
        name: "Johnny Austin Thompson",
        office: "Florida House District 2 — Escambia / Pensacola",
        note: "Quality healthcare, good jobs and a clean Gulf Coast — “a representative working for every family in the community.”",
      },
      {
        name: "Antione Fields",
        office: "Florida House District 21 — Alachua & Marion / Gainesville & Ocala",
        note: "A “Good Jobs and Worker Power” agenda; takes no corporate PAC or lobbyist money.",
      },
      {
        name: "Ben Braver",
        office: "Florida House District 65 — Tampa Bay / Hillsborough",
        note: "Focused on housing costs, public schools and utility bills.",
      },
      {
        name: "Jayden D’Onofrio",
        office: "Florida House District 102 — Broward / Davie & West Broward",
        note: "Repeal Florida’s anti-union laws, defend the voter-approved $15 minimum wage, win paid family and medical leave.",
      },
      {
        name: "Rey Sordo",
        office: "Florida House District 119 — South Miami-Dade / West Kendall",
        note: "A service worker running on wage transparency, workforce housing and renter protections.",
      },
    ],
  },
  {
    group: "Local",
    items: [
      {
        name: "Jasmine Brown",
        office: "Mayor of Pensacola — Escambia / Pensacola",
        note: "“Pensacola for working families and long-time residents” — organizing for a city economy that lifts up neighborhoods and small businesses.",
      },
      {
        name: "Anna V. Eskamani",
        office: "Mayor of Orlando — Orange County / Orlando",
        note: "Medicaid expansion advocacy, unemployment reform, anti-eviction work, earned sick time and consistent union support.",
      },
      {
        name: "Adam Roberti",
        office: "Hollywood City Commission, District 5 — Broward / Hollywood",
        note: "Grew up in District 5 and runs on cost of living, flood-ready neighborhoods, safer streets and youth programs — a City Hall that answers to residents.",
      },
    ],
  },
];

const Press = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head
        title="Press — Tax Florida Billionaires Endorses 18-Candidate 2026 Slate"
        description="Press release: Tax Florida Billionaires endorses 18 federal, state legislative and local candidates across Florida who support investing in Florida families and workers."
        canonical="https://taxfloridabillionaires.com/press"
      />

      <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-display text-sm tracking-[0.3em] text-gold sm:text-base">PRESS</p>
        <h1 className="mt-3 font-display text-4xl leading-[0.95] tracking-wide sm:text-6xl">
          TAX FLORIDA BILLIONAIRES ENDORSES 18-CANDIDATE 2026 SLATE
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Federal, state legislative and local candidates from Pensacola to Miami support policies
          that invest in Florida families and workers.
        </p>

        <div className="mt-8 border-y border-gold/30 py-4 text-sm uppercase tracking-widest text-muted-foreground">
          <p>For Immediate Release — August 12, 2026</p>
          <p className="mt-1 normal-case tracking-normal">
            Contact: Robert Davis, Project Lead, Tax Florida Billionaires ·{" "}
            <a href="tel:+19549008728" className="text-gold hover:underline">
              (954) 900-8728
            </a>
          </p>
        </div>

        <article className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90 sm:text-lg">
          <p>
            <span className="font-bold uppercase tracking-wide">Miami, Fla.</span> — Tax Florida
            Billionaires today announced its endorsement of 18 candidates for federal, state
            legislative and local office in the 2026 Florida elections. The slate spans the
            Panhandle, North Florida, Tampa Bay, Central Florida and South Florida, and shares one
            commitment: building an economy that invests in Florida families and expands
            opportunity for workers across the state.
          </p>
          <p>
            Florida is now home to roughly $1.40 trillion in billionaire wealth, a total that has
            grown as fortunes built elsewhere have relocated to Florida, where there is no personal
            income tax, estate tax or inheritance tax. At the same time, the state ranks 47th in the
            nation in average teacher pay and districts across Florida have closed neighborhood
            schools. A modest annual contribution from that concentrated wealth could help fund
            early childhood education, healthcare access and the public services Florida families
            need most.
          </p>
          <blockquote className="border-l-4 border-gold pl-5 text-lg italic sm:text-xl">
            “Florida has the resources to invest in its future. What we need are leaders willing to
            ask the wealthiest households to contribute their fair share toward the common good. The
            candidates we are endorsing today understand what most Floridians already know: our
            teachers, nurses, service workers and caregivers are the backbone of this state. We are
            proud to stand with them.”
            <footer className="mt-3 text-sm not-italic text-muted-foreground">
              — Robert Davis, project lead for Tax Florida Billionaires
            </footer>
          </blockquote>
          <p>
            The endorsed candidates were selected for their public platforms and records supporting
            higher wages, stronger worker rights, healthcare access, affordable housing and
            equitable tax policy. Several — including Angie Nixon, Oliver Larkin and Amanda
            Marie Green — have called for billionaires to pay their fair share. Others bring strong
            records of delivering results for working families.
          </p>
        </article>

        <section className="mt-14">
          <h2 className="font-display text-3xl tracking-wide sm:text-4xl">THE 2026 ENDORSED SLATE</h2>
          {slate.map((group) => (
            <div key={group.group} className="mt-8">
              <h3 className="font-display text-xl tracking-[0.2em] text-gold sm:text-2xl">
                {group.group.toUpperCase()}
              </h3>
              <ul className="mt-4 space-y-4">
                {group.items.map((c) => (
                  <li key={c.name + c.office} className="border-l-2 border-gold/25 pl-4">
                    <p className="font-bold">{c.name}</p>
                    <p className="text-sm uppercase tracking-wider text-muted-foreground">
                      {c.office}
                    </p>
                    <p className="mt-1 text-sm text-foreground/85 sm:text-base">{c.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl tracking-wide sm:text-3xl">
            ABOUT TAX FLORIDA BILLIONAIRES
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            Tax Florida Billionaires is an educational project documenting the concentration of
            billionaire wealth in Florida and what a modest contribution from that wealth could fund
            for Florida families. Its interactive simulator at taxfloridabillionaires.com lets
            residents set a rate on the state’s billionaire fortunes and allocate the revenue across
            early childhood education, healthcare, housing and other public priorities.
          </p>
          <p className="mt-6 text-center font-display text-2xl tracking-[0.4em] text-gold">###</p>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/endorsements"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-gold px-5 py-2.5 font-display text-lg tracking-wider text-gold transition-colors hover:bg-gold hover:text-background"
          >
            SEE ALL ENDORSEMENTS →
          </Link>
        </div>

        <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">
          Paid for by Tax Florida Billionaires, not authorized by any candidate or candidate’s
          committee.
        </p>
      </main>
    </div>
  );
};

export default Press;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Head } from "@/components/Head";
import { billionaires, totalBillionaireWealth } from "@/data/gameData";

const CANONICAL = "https://taxfloridabillionaires.com/richest-person-in-florida";

const ranked = [...billionaires].sort((a, b) => b.netWorth - a.netWorth);
const transplants = ranked.filter((b) => b.movedFrom !== "Born in FL (rare!)").length;

const FAQ = [
  {
    q: "Who is the richest person in Florida?",
    a: `${ranked[0].name} is the richest person in Florida, worth roughly $${ranked[0].netWorth} billion from ${ranked[0].source}. ${ranked[0].name} moved to ${ranked[0].city} from ${ranked[0].movedFrom} in ${ranked[0].movedYear}.`,
  },
  {
    q: "How many billionaires live in Florida?",
    a: `Florida is home to more than 100 billionaires. The ${ranked.length} wealthiest tracked here hold about $${(totalBillionaireWealth / 1000).toFixed(2)} trillion in combined net worth.`,
  },
  {
    q: "Why do so many billionaires move to Florida?",
    a: "Florida has no state income tax, no estate tax and no inheritance tax. Of the wealthiest residents tracked here, only one actually built their fortune in the state — the rest relocated from higher-tax states.",
  },
  {
    q: "Where do Florida's billionaires live?",
    a: "Most cluster in Miami, Miami Beach, Palm Beach and the barrier islands such as Indian Creek and Bal Harbour.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Richest People in Florida",
      description: "Ranking of Florida's wealthiest billionaires by net worth, including where each one moved from.",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: ranked.length,
      itemListElement: ranked.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        description: `${b.source} · $${b.netWorth}B · ${b.city}, FL`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const RichestPeople = () => {
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify(jsonLd);
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Head
        title="Richest People in Florida (2026): Billionaires List & Net Worth"
        description="See the richest person in Florida and the full list of Florida billionaires ranked by net worth — plus where each one moved from and the taxes they left behind."
        canonical={CANONICAL}
        ogTitle="Richest People in Florida (2026): Billionaires List & Net Worth"
        ogDescription="The full ranking of Florida billionaires by net worth in 2026 — who is the richest person in Florida, how they made their money, and which high-tax states they moved from."
        ogType="article"
      />

      <section className="max-w-5xl mx-auto px-4 pt-16 pb-10">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-gold underline underline-offset-4">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Richest people in Florida</span>
        </nav>

        <h1 className="font-display text-5xl md:text-7xl text-gold mb-4">
          THE RICHEST PEOPLE IN FLORIDA
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Florida's {ranked.length} wealthiest residents control roughly{" "}
          <strong className="text-foreground">
            ${(totalBillionaireWealth / 1000).toFixed(2)} trillion
          </strong>{" "}
          in net worth. The richest person in Florida is{" "}
          <strong className="text-foreground">{ranked[0].name}</strong> (~$
          {ranked[0].netWorth}B). {transplants} of these {ranked.length} billionaires moved here
          from another state — Florida charges no income tax, no estate tax and no inheritance tax.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {[
            { k: "Billionaires tracked", v: `${ranked.length}` },
            { k: "Combined wealth", v: `$${(totalBillionaireWealth / 1000).toFixed(2)}T` },
            { k: "Moved from out of state", v: `${transplants}` },
            { k: "State income tax", v: "0%" },
          ].map((s) => (
            <div key={s.k} className="bg-card border border-border rounded-sm p-4">
              <div className="font-mono text-gold text-2xl font-bold">{s.v}</div>
              <div className="text-sm text-muted-foreground">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="font-display text-4xl md:text-5xl mb-6">
          FLORIDA BILLIONAIRES LIST, RANKED BY NET WORTH
        </h2>

        <div className="overflow-x-auto border border-border rounded-sm">
          <table className="w-full text-left min-w-[720px]">
            <caption className="sr-only">
              Florida billionaires ranked by net worth, with source of wealth, city and where they
              moved from.
            </caption>
            <thead className="bg-card">
              <tr className="text-sm text-muted-foreground">
                <th scope="col" className="p-3">#</th>
                <th scope="col" className="p-3">Name</th>
                <th scope="col" className="p-3">Net worth</th>
                <th scope="col" className="p-3">Source of wealth</th>
                <th scope="col" className="p-3">Florida city</th>
                <th scope="col" className="p-3">Moved from</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((b, i) => (
                <tr key={b.name} className="border-t border-border align-top">
                  <td className="p-3 font-mono text-muted-foreground">{i + 1}</td>
                  <td className="p-3">
                    <span className="mr-2" aria-hidden="true">{b.emoji}</span>
                    <span className="font-semibold">{b.name}</span>
                    <div className="text-sm text-muted-foreground italic">{b.whyMoved}</div>
                  </td>
                  <td className="p-3 font-mono text-gold whitespace-nowrap">${b.netWorth}B</td>
                  <td className="p-3 text-sm">{b.source}</td>
                  <td className="p-3 text-sm whitespace-nowrap">{b.city}</td>
                  <td className="p-3 text-sm whitespace-nowrap">
                    {b.movedFrom === "Born in FL (rare!)" ? (
                      <span className="text-emerald">Born in Florida</span>
                    ) : (
                      <span className="text-crimson">
                        {b.movedFrom}
                        {b.movedYear !== "Unknown" && b.movedYear !== "N/A" ? ` (${b.movedYear})` : ""}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="font-display text-4xl md:text-5xl mb-4">
          WHY FLORIDA COLLECTS NOTHING FROM THIS WEALTH
        </h2>
        <div className="space-y-4 text-muted-foreground max-w-3xl">
          <p>
            Florida has no personal income tax, no estate tax and no inheritance tax. That's the
            common thread in the relocation stories above: hedge fund and tech fortunes built in
            California, New York, Illinois and Connecticut, then re-domiciled to Miami and Palm
            Beach once the tax bill came due.
          </p>
          <p>
            The result is a state that courts billionaires while its public schools rank near the
            bottom nationally in teacher pay — 47th out of 50 — and districts continue to close
            schools and cut classroom funding. A small annual levy on the wealth listed here could
            help reverse that underinvestment.
          </p>
          <p>
            Meanwhile, proposed Medicaid cuts would open a roughly $3 billion hole in Florida's
            economy, putting an estimated 33,000 jobs and $177 million in local tax revenue at risk.
            A modest annual levy on the ${(totalBillionaireWealth / 1000).toFixed(2)} trillion listed
            here would cover that gap many times over.
          </p>
        </div>
        <Link
          to="/"
          className="inline-block mt-6 gradient-gold text-primary-foreground font-display text-2xl px-8 py-3 rounded-sm tracking-wider hover:brightness-110 transition-all"
        >
          TRY THE TAX SIMULATOR →
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="font-display text-4xl md:text-5xl mb-6">FREQUENTLY ASKED QUESTIONS</h2>
        <dl className="space-y-6 max-w-3xl">
          {FAQ.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-lg text-foreground">{f.q}</dt>
              <dd className="text-muted-foreground mt-1">{f.a}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-muted-foreground mt-10">
          Net worth figures are approximate and compiled from public billionaire trackers; they
          fluctuate with markets. See also our{" "}
          <Link to="/endorsements" className="text-gold underline underline-offset-4">
            endorsed pro-worker candidates
          </Link>
          .
        </p>
      </section>
    </main>
  );
};

export default RichestPeople;

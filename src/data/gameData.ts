export interface Billionaire {
  name: string;
  netWorth: number; // in billions
  source: string;
  industry: string;
  city: string;
  movedFrom: string;
  movedYear: string;
  whyMoved: string;
  emoji: string;
}

export const billionaires: Billionaire[] = [
  { name: "Larry Page", netWorth: 254.4, source: "Google / Alphabet", industry: "Technology", city: "Miami", movedFrom: "Palo Alto, CA", movedYear: "2026", whyMoved: "Spent $173.4M on two estates in Miami's Coconut Grove", emoji: "🔍" },
  { name: "Jeff Bezos", netWorth: 246.7, source: "Amazon", industry: "Technology", city: "Miami", movedFrom: "Seattle, WA", movedYear: "2023", whyMoved: "Said he wanted to be closer to his parents", emoji: "📦" },
  { name: "Sergey Brin", netWorth: 235.0, source: "Google / Alphabet", industry: "Technology", city: "Miami", movedFrom: "Los Altos, CA", movedYear: "2026", whyMoved: "Purchased $51M mansion on Miami's Allison Island", emoji: "🔎" },
  { name: "Mark Zuckerberg", netWorth: 221.8, source: "Meta / Facebook", industry: "Technology", city: "Indian Creek Island", movedFrom: "Palo Alto, CA", movedYear: "2025", whyMoved: "Relocated amid tax concerns; bought $100M+ estate", emoji: "👤" },
  { name: "Larry Ellison", netWorth: 189.9, source: "Oracle", industry: "Technology", city: "Manalapan", movedFrom: "Lanai, HI", movedYear: "2025", whyMoved: "Made $173M Palm Beach estate near Mar-a-Lago his official residence", emoji: "🏝️" },
  { name: "Thomas Peterffy", netWorth: 89.1, source: "Interactive Brokers", industry: "Finance", city: "Palm Beach", movedFrom: "Greenwich, CT", movedYear: "2014", whyMoved: "Left after CT governor was re-elected — 'I was actually very mad'", emoji: "📈" },
  { name: "Ken Griffin", netWorth: 51.5, source: "Citadel", industry: "Finance", city: "Miami", movedFrom: "Chicago, IL", movedYear: "2022", whyMoved: "Cited 25 bullet holes in front of his Chicago building", emoji: "🏦" },
  { name: "Peter Thiel", netWorth: 25.0, source: "PayPal / Palantir / Founders Fund", industry: "Technology", city: "Miami Beach", movedFrom: "Los Angeles, CA", movedYear: "2020", whyMoved: "Bought Miami Beach home in 2020; moved Thiel Capital to Wynwood", emoji: "🏛️" },
  { name: "David Tepper", netWorth: 23.7, source: "Appaloosa Management", industry: "Finance", city: "Palm Beach", movedFrom: "New Jersey", movedYear: "2015", whyMoved: "Could have owed $500M in NJ state taxes over 3 years", emoji: "💰" },
  { name: "Stephen Ross", netWorth: 17.0, source: "Related Ross", industry: "Real Estate", city: "West Palm Beach", movedFrom: "New York, NY", movedYear: "2021", whyMoved: "Tax-friendly environment and business opportunities", emoji: "🏗️" },
  { name: "Shahid Khan", netWorth: 15.0, source: "Flex-N-Gate / Jaguars", industry: "Auto/Sports", city: "Naples", movedFrom: "Urbana, IL", movedYear: "2014", whyMoved: "Never publicly explained the move", emoji: "🏈" },
  { name: "J. Christopher Reyes", netWorth: 13.1, source: "Reyes Holdings", industry: "Food & Beverage", city: "Hobe Sound", movedFrom: "Chicago, IL", movedYear: "~2012", whyMoved: "No reason given publicly", emoji: "🍺" },
  { name: "Jude Reyes", netWorth: 13.1, source: "Reyes Holdings", industry: "Food & Beverage", city: "Palm Beach", movedFrom: "Chicago, IL", movedYear: "~2006", whyMoved: "No reason given publicly", emoji: "🍺" },
  { name: "Orlando Bravo", netWorth: 12.8, source: "Thoma Bravo", industry: "Private Equity", city: "Miami Beach", movedFrom: "San Francisco, CA", movedYear: "2021", whyMoved: "Expanded firm's existing Miami office", emoji: "💼" },
  { name: "Robert Duggan", netWorth: 12.0, source: "Duggan Investments", industry: "Healthcare", city: "Miami", movedFrom: "Oakland, CA", movedYear: "~2016", whyMoved: "Moved after selling pharma company for $3.5B", emoji: "💊" },
  { name: "Josh Harris", netWorth: 11.2, source: "Apollo / 76ers / Commanders", industry: "Finance/Sports", city: "Miami Beach", movedFrom: "New York, NY", movedYear: "2021", whyMoved: "Bought mansion; shifted primary residence", emoji: "🏀" },
  { name: "Micky Arison", netWorth: 9.9, source: "Carnival Cruises", industry: "Travel", city: "Bal Harbour", movedFrom: "Born in FL (rare!)", movedYear: "N/A", whyMoved: "Only top billionaire who actually made fortune in FL", emoji: "🚢" },
  { name: "Todd Boehly", netWorth: 9.3, source: "Eldridge Industries", industry: "Finance", city: "Miami", movedFrom: "Greenwich, CT", movedYear: "~2022", whyMoved: "Listed CT estate for sale, moved firm to Miami", emoji: "⚽" },
  { name: "Terrence Pegula", netWorth: 9.3, source: "Natural gas / Buffalo Bills", industry: "Energy/Sports", city: "Boca Raton", movedFrom: "Buffalo, NY", movedYear: "~2022", whyMoved: "Bought home in 2010, gradually made it primary residence", emoji: "⛽" },
  { name: "Jeff Greene", netWorth: 9.0, source: "Real estate, investments", industry: "Finance", city: "Palm Beach", movedFrom: "California", movedYear: "~2008", whyMoved: "Made fortune shorting housing bubble, moved to FL", emoji: "🏠" },
  { name: "Elisabeth DeLuca & family", netWorth: 9.0, source: "Subway", industry: "Food & Beverage", city: "Pompano Beach", movedFrom: "Connecticut", movedYear: "Unknown", whyMoved: "Family relocated", emoji: "🥖" },
  { name: "Abel Avellan", netWorth: 8.8, source: "Telecoms", industry: "Telecom", city: "Coral Gables", movedFrom: "Venezuela (originally)", movedYear: "Unknown", whyMoved: "Built telecom business in South Florida", emoji: "📡" },
  { name: "Stephen Bisciotti", netWorth: 8.5, source: "Staffing / Ravens", industry: "Sports", city: "Hobe Sound", movedFrom: "Maryland", movedYear: "Unknown", whyMoved: "Established FL residence", emoji: "🏈" },
  { name: "Paul Tudor Jones II", netWorth: 8.1, source: "Hedge funds", industry: "Finance", city: "Palm Beach", movedFrom: "Connecticut", movedYear: "Unknown", whyMoved: "Tax-advantaged relocation", emoji: "📊" },
  { name: "Igor Olenicoff", netWorth: 8.0, source: "Real estate", industry: "Real Estate", city: "Lighthouse Point", movedFrom: "California", movedYear: "Unknown", whyMoved: "Real estate investments in FL", emoji: "🏢" },
  { name: "Howard Schultz", netWorth: 3.5, source: "Starbucks", industry: "Food & Beverage", city: "Surfside", movedFrom: "Seattle, WA", movedYear: "2026", whyMoved: "Bought $44M penthouse; said he's 'enjoying the sunshine of South Florida'", emoji: "☕" },
];

export const totalBillionaireWealth = 1399; // in billions, updated with Page, Brin, Schultz

// Breaking news headlines
export const breakingHeadlines = [
  "Larry Ellison Makes $173 Million Palm Beach Estate Near Trump's Mar-a-Lago His Official Residence",
  "Zuckerberg joins Florida billionaire exodus — buys $100M+ Indian Creek estate",
  "Peter Thiel moves Thiel Capital to Miami's Wynwood as Palantir HQ shifts to Aventura",
];

// Mark Zuckerberg context
export const zuckerbergContext = {
  netWorth: 221.8,
  headline: "Mark Zuckerberg has become the latest California billionaire to relocate to Florida amid tax concerns.",
  detail: "His move follows a pattern: of Florida's 20 wealthiest residents, only ONE (Micky Arison) actually made their fortune in the state. The rest migrated from high-tax states.",
};

export interface SpendingItem {
  id: string;
  name: string;
  description: string;
  costPerUnit: number; // in millions
  unit: string;
  category: "education" | "healthcare" | "infrastructure" | "housing" | "jobs";
  emoji: string;
  realWorldContext?: string;
}

export const spendingItems: SpendingItem[] = [
  // Education
  { id: "prek_classroom", name: "Universal Pre-K Classroom", description: "Fund a pre-K classroom for 20 children for one year", costPerUnit: 0.5, unit: "classroom", category: "education", emoji: "🏫", realWorldContext: "New York invested $400M and New Mexico $300M in universal pre-K" },
  { id: "prek_teacher_salary", name: "Pre-K Teacher Salary", description: "Pay one early childhood educator for a year", costPerUnit: 0.055, unit: "teacher", category: "education", emoji: "👩‍🏫" },
  { id: "child_care_subsidy", name: "Child Care Subsidies", description: "Subsidize childcare for 100 low-income families for a year", costPerUnit: 1.2, unit: "100 families", category: "education", emoji: "👶" },
  { id: "school_counselor", name: "School Counselors", description: "Hire a school counselor for one year", costPerUnit: 0.075, unit: "counselor", category: "education", emoji: "🧠" },

  // Healthcare / Medicaid
  { id: "medicaid_gap", name: "Fill Medicaid Gap", description: "Cover the $3B hole Medicaid cuts would create in FL's economy", costPerUnit: 3000, unit: "full gap", category: "healthcare", emoji: "🏥", realWorldContext: "Proposed cuts could trigger 33,000 layoffs and a $3B economic downturn per Commonwealth Fund" },
  { id: "medicaid_enrollee", name: "Medicaid Coverage", description: "Cover one Medicaid enrollee for a year (~$8,400 avg)", costPerUnit: 0.0084, unit: "person", category: "healthcare", emoji: "💉" },
  { id: "community_health_center", name: "Community Health Center", description: "Build and operate a community health center for one year", costPerUnit: 5, unit: "center", category: "healthcare", emoji: "🏨" },
  { id: "nursing_home_staff", name: "Nursing Home Staff", description: "Fund proper staffing at one nursing home for a year", costPerUnit: 2, unit: "facility", category: "healthcare", emoji: "🧑‍⚕️" },

  // Federal cuts support
  { id: "save_healthcare_jobs", name: "Save Healthcare Jobs", description: "Prevent layoffs of healthcare workers (avg $55K salary)", costPerUnit: 0.055, unit: "job saved", category: "jobs", emoji: "👷", realWorldContext: "17,000 healthcare jobs and 16,000 other jobs at risk from Medicaid cuts" },
  { id: "local_tax_gap", name: "Fill Local Tax Revenue Gap", description: "Replace the $177M in local tax revenue jeopardized by cuts", costPerUnit: 177, unit: "full gap", category: "infrastructure", emoji: "🏛️", realWorldContext: "$177M in FL local tax revenue at risk per Commonwealth Fund study" },

  // Housing
  { id: "affordable_housing", name: "Affordable Housing Units", description: "Build 10 affordable housing units", costPerUnit: 2.5, unit: "10 units", category: "housing", emoji: "🏘️" },
  { id: "homelessness_program", name: "Homelessness Prevention", description: "Fund rapid rehousing for 200 individuals", costPerUnit: 1.5, unit: "200 people", category: "housing", emoji: "🏠" },
];

export const categoryLabels: Record<string, { label: string; color: string }> = {
  education: { label: "Early Childhood Education", color: "gold" },
  healthcare: { label: "Healthcare & Medicaid", color: "crimson" },
  infrastructure: { label: "Infrastructure & Revenue", color: "emerald" },
  housing: { label: "Affordable Housing", color: "primary" },
  jobs: { label: "Protecting Jobs", color: "secondary" },
};

export const floridaFacts = {
  noIncomeTax: true,
  noEstateTax: true,
  noInheritanceTax: true,
  medicaidCutImpact: {
    gdpHole: 3_000_000_000,
    jobsAtRisk: 33_000,
    healthcareJobs: 17_000,
    otherJobs: 16_000,
    localTaxRevenueAtRisk: 177_000_000,
  },
};

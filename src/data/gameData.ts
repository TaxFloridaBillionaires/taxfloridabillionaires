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
  { name: "Michael Saylor", netWorth: 8.8, source: "MicroStrategy / Bitcoin", industry: "Technology", city: "Miami Beach", movedFrom: "Virginia", movedYear: "2012", whyMoved: "Publicly said moving to Florida saved him millions in state income tax", emoji: "₿" },
  { name: "Sami Mnaymneh", netWorth: 7.8, source: "H.I.G. Capital", industry: "Private Equity", city: "Miami", movedFrom: "New York, NY", movedYear: "1993", whyMoved: "Co-founded H.I.G. Capital in Miami", emoji: "💼" },
  { name: "Leonid Radvinsky", netWorth: 7.8, source: "OnlyFans", industry: "Technology", city: "Bal Harbour", movedFrom: "Chicago, IL", movedYear: "~2018", whyMoved: "Relocated to South Florida", emoji: "💻" },
  { name: "Donald Trump", netWorth: 7.3, source: "Real estate / media", industry: "Real Estate", city: "Palm Beach", movedFrom: "New York, NY", movedYear: "2019", whyMoved: "Changed his official residence to Mar-a-Lago, citing New York taxes", emoji: "🏛️" },
  { name: "James Clark", netWorth: 7.2, source: "Netscape, investments", industry: "Technology", city: "Palm Beach", movedFrom: "California", movedYear: "Unknown", whyMoved: "Made Palm Beach his base", emoji: "🌐" },
  { name: "Dirk Ziff", netWorth: 7.2, source: "Ziff Brothers Investments", industry: "Finance", city: "Palm Beach", movedFrom: "New York, NY", movedYear: "Unknown", whyMoved: "Family investment office relocated south", emoji: "📚" },
  { name: "Tom Golisano", netWorth: 6.5, source: "Paychex", industry: "Finance", city: "Naples", movedFrom: "Rochester, NY", movedYear: "2009", whyMoved: "Said the move saved him about $5M a year in New York taxes", emoji: "🧾" },
  { name: "Robert Rich Jr.", netWorth: 6.5, source: "Rich Products", industry: "Food & Beverage", city: "Islamorada", movedFrom: "Buffalo, NY", movedYear: "Unknown", whyMoved: "Made Florida his primary residence", emoji: "🍦" },
  { name: "William Berkley & family", netWorth: 6.2, source: "W.R. Berkley insurance", industry: "Insurance", city: "Palm Beach", movedFrom: "Connecticut", movedYear: "Unknown", whyMoved: "Established Florida residence", emoji: "🛡️" },
  { name: "Reinhold Schmieding", netWorth: 6.0, source: "Arthrex", industry: "Healthcare", city: "Naples", movedFrom: "Michigan", movedYear: "1991", whyMoved: "Moved Arthrex headquarters to Naples", emoji: "🦴" },
  { name: "Ronald Wanek", netWorth: 6.0, source: "Ashley Furniture", industry: "Retail", city: "Arcadia", movedFrom: "Wisconsin", movedYear: "Unknown", whyMoved: "Winters and residence moved to Florida", emoji: "🛋️" },
  { name: "Rakesh Gangwal", netWorth: 5.9, source: "IndiGo airline", industry: "Airlines", city: "Miami", movedFrom: "North Carolina", movedYear: "Unknown", whyMoved: "Relocated to South Florida", emoji: "✈️" },
  { name: "John Henry", netWorth: 5.7, source: "Red Sox, Liverpool FC", industry: "Sports", city: "Boca Raton", movedFrom: "Illinois", movedYear: "Unknown", whyMoved: "Long-time Florida resident", emoji: "⚾" },
  { name: "Charles B. Johnson", netWorth: 5.6, source: "Franklin Templeton", industry: "Finance", city: "Palm Beach", movedFrom: "San Mateo, CA", movedYear: "Unknown", whyMoved: "Moved primary residence to Palm Beach", emoji: "📈" },
  { name: "Jeff Skoll", netWorth: 5.4, source: "eBay", industry: "Technology", city: "Miami Beach", movedFrom: "California", movedYear: "~2021", whyMoved: "Bought Miami Beach property and shifted residence", emoji: "🛒" },
  { name: "Russell Savage", netWorth: 5.4, source: "Celsius energy drinks", industry: "Food & Beverage", city: "Boca Raton", movedFrom: "Florida-based", movedYear: "N/A", whyMoved: "Built the business in Florida", emoji: "🥤" },
  { name: "Isaac Perlmutter", netWorth: 5.2, source: "Marvel Entertainment", industry: "Media", city: "Palm Beach", movedFrom: "New York, NY", movedYear: "Unknown", whyMoved: "Long-time Palm Beach resident", emoji: "🦸" },
  { name: "Scott Kapnick", netWorth: 5.0, source: "HPS Investment Partners", industry: "Private Equity", city: "Palm Beach", movedFrom: "New York, NY", movedYear: "Unknown", whyMoved: "Established Florida residence", emoji: "💼" },
  { name: "Peter Cancro", netWorth: 4.9, source: "Jersey Mike's Subs", industry: "Food & Beverage", city: "Manalapan", movedFrom: "New Jersey", movedYear: "Unknown", whyMoved: "Bought Florida estate and shifted residence", emoji: "🥪" },
  { name: "Carl Icahn", netWorth: 4.6, source: "Icahn Enterprises", industry: "Finance", city: "Sunny Isles Beach", movedFrom: "New York, NY", movedYear: "2020", whyMoved: "Moved himself and his firm from Manhattan to Florida; reported as a tax-driven relocation", emoji: "🦈" },
  { name: "Richard Schulze", netWorth: 4.4, source: "Best Buy", industry: "Retail", city: "Naples", movedFrom: "Minnesota", movedYear: "Unknown", whyMoved: "Made Naples his primary home", emoji: "🔌" },
  { name: "Rajiv Jain", netWorth: 4.2, source: "GQG Partners", industry: "Finance", city: "Fort Lauderdale", movedFrom: "Chicago, IL", movedYear: "2016", whyMoved: "Founded GQG Partners in Fort Lauderdale", emoji: "📊" },
  { name: "Daniel Och", netWorth: 4.2, source: "Och-Ziff / Sculptor", industry: "Finance", city: "Miami Beach", movedFrom: "New York, NY", movedYear: "~2021", whyMoved: "Relocated to Miami Beach", emoji: "🏦" },
  { name: "Nick Caporella", netWorth: 4.1, source: "National Beverage (LaCroix)", industry: "Food & Beverage", city: "Fort Lauderdale", movedFrom: "Florida-based", movedYear: "N/A", whyMoved: "Built National Beverage in Florida", emoji: "🥫" },
  { name: "Todd Christopher", netWorth: 4.1, source: "Vogue International hair care", industry: "Consumer Goods", city: "Clearwater", movedFrom: "Florida-based", movedYear: "N/A", whyMoved: "Built the company in Clearwater", emoji: "💇" },
  { name: "C. Dean Metropoulos", netWorth: 4.1, source: "Investments (Hostess, Pabst)", industry: "Food & Beverage", city: "Palm Beach", movedFrom: "Connecticut", movedYear: "Unknown", whyMoved: "Made Palm Beach his base", emoji: "🧁" },
  { name: "Steve Wynn", netWorth: 3.9, source: "Casinos, hotels", industry: "Hospitality", city: "Palm Beach", movedFrom: "Las Vegas, NV", movedYear: "2019", whyMoved: "Moved to Florida after leaving Wynn Resorts", emoji: "🎰" },
  { name: "Edward DeBartolo Jr.", netWorth: 3.8, source: "Shopping centers, 49ers", industry: "Real Estate", city: "Tampa", movedFrom: "Youngstown, OH", movedYear: "Unknown", whyMoved: "Long-time Tampa resident", emoji: "🛍️" },
  { name: "Robert Wood Johnson & family", netWorth: 3.8, source: "Johnson & Johnson, NY Jets", industry: "Healthcare/Sports", city: "Palm Beach", movedFrom: "New York, NY", movedYear: "Unknown", whyMoved: "Family residence in Palm Beach", emoji: "🏈" },
  { name: "Michael Jordan", netWorth: 3.8, source: "Endorsements, Hornets stake", industry: "Sports", city: "Jupiter", movedFrom: "Chicago, IL", movedYear: "~2013", whyMoved: "Built Jupiter estate and became a Florida resident", emoji: "🏀" },
  { name: "Herbert Wertheim", netWorth: 3.8, source: "Investments, optometry", industry: "Finance", city: "Coral Gables", movedFrom: "Florida-based", movedYear: "N/A", whyMoved: "Native Floridian investor and philanthropist", emoji: "👓" },
  { name: "Howard Schultz", netWorth: 3.5, source: "Starbucks", industry: "Food & Beverage", city: "Surfside", movedFrom: "Seattle, WA", movedYear: "2026", whyMoved: "Bought $44M penthouse; said he's 'enjoying the sunshine of South Florida'", emoji: "☕" },
];

export const totalBillionaireWealth = Math.round(
  billionaires.reduce((sum, b) => sum + b.netWorth, 0)
); // in billions, from Forbes 400 Florida residents


// Breaking news headlines
export const breakingHeadlines = [
  "Tax Florida Billionaires endorses a statewide slate of pro-worker candidates for the 2026 general election.",
  "Federal: Angie Nixon for U.S. Senate, Gay Valimont (FL-01), Amanda Marie Green (FL-02), Nicole Locklin (FL-26).",
  "State Legislature: Johnny Austin Thompson (HD-2), Ben Braver (HD-65), Rey Sordo (HD-119).",
  "Local: Anna V. Eskamani for Mayor of Orlando, Adam Roberti for Hollywood City Commission District 5.",
  "See every endorsement and donation link at taxfloridabillionaires.com/endorsements.",
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
  { id: "save_teacher_jobs", name: "Save Public School Teachers", description: "Fund a public school teacher position for one year (~$55K)", costPerUnit: 0.055, unit: "teacher", category: "jobs", emoji: "🧑‍🏫" },
  { id: "first_responder_retention", name: "First Responder Retention", description: "Keep a firefighter or EMT from leaving due to low pay (~$60K/yr)", costPerUnit: 0.06, unit: "first responder", category: "jobs", emoji: "👮" },
  { id: "park_rangers", name: "State Park Rangers", description: "Fund a state park ranger position for one year (~$45K)", costPerUnit: 0.045, unit: "ranger", category: "jobs", emoji: "🌴" },
  { id: "local_tax_gap", name: "Fill Local Tax Revenue Gap", description: "Replace the $177M in local tax revenue jeopardized by cuts", costPerUnit: 177, unit: "full gap", category: "infrastructure", emoji: "🏛️", realWorldContext: "$177M in FL local tax revenue at risk per Commonwealth Fund study" },
  { id: "public_transit", name: "Public Transit Expansion", description: "Fund a new bus or rail route for a metro area", costPerUnit: 50, unit: "route", category: "infrastructure", emoji: "🚌" },
  { id: "flood_resilience", name: "Flood & Hurricane Resilience", description: "Build seawalls, drainage, and storm hardening projects", costPerUnit: 25, unit: "project", category: "infrastructure", emoji: "🌊" },
  { id: "rural_broadband", name: "Rural Broadband", description: "Bring high-speed internet to an underserved FL county", costPerUnit: 10, unit: "county", category: "infrastructure", emoji: "📶" },
  { id: "school_repairs", name: "School Building Repairs", description: "Fix crumbling public school facilities", costPerUnit: 5, unit: "school", category: "infrastructure", emoji: "🏫" },
  { id: "power_grid", name: "Power Grid Hardening", description: "Storm-proof electrical infrastructure for a region", costPerUnit: 100, unit: "region", category: "infrastructure", emoji: "⚡" },
  { id: "clean_water", name: "Clean Water Infrastructure", description: "Upgrade aging water and sewer systems for a municipality", costPerUnit: 20, unit: "municipality", category: "infrastructure", emoji: "💧" },

  // Housing
  { id: "affordable_housing", name: "Affordable Housing Units", description: "Build 10 affordable housing units", costPerUnit: 2.5, unit: "10 units", category: "housing", emoji: "🏘️" },
  { id: "homelessness_program", name: "Homelessness Prevention", description: "Fund rapid rehousing for 200 individuals", costPerUnit: 1.5, unit: "200 people", category: "housing", emoji: "🏠" },

  // Added options
  { id: "school_meals", name: "Free School Breakfast & Lunch", description: "Feed 1,000 students two meals a day for a full school year", costPerUnit: 0.9, unit: "1,000 students", category: "education", emoji: "🍎", realWorldContext: "Florida districts raised lunch prices again in 2026 as food costs climbed" },
  { id: "summer_food", name: "Summer Food Benefits", description: "Give 10,000 kids $120 in summer grocery benefits", costPerUnit: 1.2, unit: "10,000 kids", category: "education", emoji: "🥪", realWorldContext: "Florida opted out of the federal SUN Bucks summer grocery program" },
  { id: "college_tuition", name: "Full College Tuition", description: "Cover a year of in-state tuition and fees for one student (~$6,400)", costPerUnit: 0.0064, unit: "student", category: "education", emoji: "🎓", realWorldContext: "Florida has the lowest average in-state tuition in the country — and still leaves students in debt" },
  { id: "afterschool_site", name: "After-School Program Site", description: "Run an after-school and summer program at one school for a year", costPerUnit: 0.3, unit: "site", category: "education", emoji: "📚" },
  { id: "mobile_crisis_team", name: "Mobile Mental Health Crisis Team", description: "Fund a 24/7 mobile crisis response team for one year", costPerUnit: 1, unit: "team", category: "healthcare", emoji: "🚐" },
  { id: "school_nurse", name: "School Nurses", description: "Put a full-time nurse in a public school for a year (~$60K)", costPerUnit: 0.06, unit: "nurse", category: "healthcare", emoji: "🩺" },
  { id: "home_hardening", name: "Home Hardening Grants", description: "Storm-proof 100 homes with $10,000 wind-mitigation grants", costPerUnit: 1, unit: "100 homes", category: "housing", emoji: "🔨", realWorldContext: "My Safe Florida Home grants max out at $10,000 and run out of funding every year" },
  { id: "shelter_retrofit", name: "Hurricane Shelter Upgrades", description: "Retrofit a public school to serve as a certified storm shelter", costPerUnit: 2, unit: "school", category: "infrastructure", emoji: "🌀" },
  { id: "everglades_restoration", name: "Everglades & Water Quality", description: "Fund a wetland restoration or stormwater treatment project", costPerUnit: 50, unit: "project", category: "infrastructure", emoji: "🐊" },
  { id: "electric_school_bus", name: "Electric School Buses", description: "Replace a diesel bus with an air-conditioned electric one", costPerUnit: 0.375, unit: "bus", category: "infrastructure", emoji: "🚍" },
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

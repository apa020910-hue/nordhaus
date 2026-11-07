/** Static content for the demo: services, portfolio, team, reviews, FAQ, process. */

export const SERVICE_CATEGORIES = ["construction", "renovation", "commercial", "exterior"] as const;
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export interface Service {
  id: string;
  name: string;
  short: string;
  includes: readonly string[];
  duration: string;
  category: ServiceCategory;
}

export const SERVICES: readonly Service[] = [
  {
    id: "private-house",
    name: "Private House Construction",
    short: "New houses built from foundation to handover, with one team responsible for the whole process.",
    includes: [
      "Foundation and structural work",
      "Framing and roof structure",
      "Windows, doors and insulation",
      "Electrical and plumbing rough-in",
      "Interior finishing",
      "Site coordination with your architect, if you have one",
    ],
    duration: "6–10 months",
    category: "construction",
  },
  {
    id: "apartment-renovation",
    name: "Apartment Renovation",
    short: "Full or partial apartment renovations, from a single room to a complete rebuild.",
    includes: ["Demolition", "Electrical work", "Plumbing", "Walls and ceilings", "Flooring", "Painting", "Finishing"],
    duration: "4–10 weeks",
    category: "renovation",
  },
  {
    id: "commercial-renovation",
    name: "Commercial Renovation",
    short: "Offices, shops and premises renovated with minimal disruption to your business.",
    includes: [
      "Phased work scheduling around business hours",
      "Electrical and data cabling",
      "Partitions and ceilings",
      "Flooring",
      "Fire and safety compliance checks",
    ],
    duration: "3–12 weeks",
    category: "commercial",
  },
  {
    id: "interior-finishing",
    name: "Interior Finishing",
    short: "The finishing layer that turns a structure into a finished, liveable space.",
    includes: ["Plastering and painting", "Flooring", "Tiling", "Trim and millwork", "Fixture installation"],
    duration: "2–8 weeks",
    category: "renovation",
  },
  {
    id: "roofing",
    name: "Roofing",
    short: "New roofs and roof replacements, built to handle the Baltic climate.",
    includes: ["Roof structure assessment", "Insulation and vapour barrier", "Roofing membrane or tiles", "Guttering", "Flashing and detailing"],
    duration: "1–4 weeks",
    category: "exterior",
  },
  {
    id: "facade-insulation",
    name: "Facade & Insulation",
    short: "External wall insulation and facade renewal, for lower heating bills and a cleaner exterior.",
    includes: ["Facade condition survey", "Insulation board installation", "Reinforcement mesh and base coat", "Render or cladding finish", "Window reveal detailing"],
    duration: "3–6 weeks",
    category: "exterior",
  },
  {
    id: "reconstruction",
    name: "Reconstruction",
    short: "Rebuilding and extending existing structures, including older houses with no original drawings.",
    includes: ["Structural survey", "Load-bearing assessment", "Demolition of unsound sections", "Rebuilding to current standards", "Full interior finishing"],
    duration: "3–9 months",
    category: "construction",
  },
  {
    id: "terraces",
    name: "Terraces & Outdoor Works",
    short: "Terraces, decking and small outdoor structures built to last through Latvian winters.",
    includes: ["Ground preparation and drainage", "Substructure", "Decking or paving", "Railing and steps", "Weatherproofing"],
    duration: "1–3 weeks",
    category: "exterior",
  },
] as const;

export function getService(id: string): Service | undefined {
  return SERVICES.find((service) => service.id === id);
}

// --- Portfolio -------------------------------------------------------------

export const PROJECT_CATEGORIES = ["all", ...SERVICE_CATEGORIES] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface Project {
  id: string;
  title: string;
  location: string;
  category: ServiceCategory;
  servicesText: string;
  area: string;
  duration: string;
  year: number;
  description: string;
  /** Number of abstract gallery tiles to render in the detail view. */
  galleryCount: number;
}

export const PROJECTS: readonly Project[] = [
  {
    id: "marupe-house",
    title: "Modern Family House",
    location: "Mārupe",
    category: "construction",
    servicesText: "Full construction",
    area: "210 m²",
    duration: "8 months",
    year: 2025,
    description:
      "A two-storey family house built from foundation to handover, including structural work, insulation and interior finishing, coordinated with the owners through weekly site updates.",
    galleryCount: 4,
  },
  {
    id: "riga-centre-apartment",
    title: "Full Apartment Renovation",
    location: "Riga Centre",
    category: "renovation",
    servicesText: "Full renovation",
    area: "86 m²",
    duration: "9 weeks",
    year: 2025,
    description:
      "Complete renovation of a pre-war apartment: new electrical and plumbing systems, levelled floors and walls, and a layout opened up between the kitchen and living room.",
    galleryCount: 4,
  },
  {
    id: "jurmala-reconstruction",
    title: "Private House Reconstruction",
    location: "Jūrmala",
    category: "construction",
    servicesText: "Reconstruction",
    area: "240 m²",
    duration: "7 months",
    year: 2024,
    description:
      "A 1970s house rebuilt around its original brick shell: new roof structure, a full insulation upgrade, and an interior layout redesigned for a young family.",
    galleryCount: 3,
  },
  {
    id: "riga-office",
    title: "Office Renovation",
    location: "Riga",
    category: "commercial",
    servicesText: "Commercial renovation",
    area: "320 m²",
    duration: "6 weeks",
    year: 2025,
    description:
      "An open-plan office fit-out completed in phases outside business hours, so the client's team could keep working through most of the renovation.",
    galleryCount: 3,
  },
  {
    id: "adazi-facade",
    title: "Facade Renovation",
    location: "Ādaži",
    category: "exterior",
    servicesText: "Facade & insulation",
    area: "410 m² facade",
    duration: "5 weeks",
    year: 2024,
    description:
      "External wall insulation and a new ventilated facade system on a 1990s house, with particular attention to detailing around windows and the roofline.",
    galleryCount: 3,
  },
  {
    id: "babite-house",
    title: "Scandinavian House",
    location: "Babīte",
    category: "construction",
    servicesText: "Full construction",
    area: "175 m²",
    duration: "7 months",
    year: 2026,
    description:
      "A single-storey timber-frame house built around clean lines and a restrained material palette, to current Latvian energy-efficiency standards.",
    galleryCount: 4,
  },
  {
    id: "teika-apartment",
    title: "Apartment Renovation",
    location: "Teika",
    category: "renovation",
    servicesText: "Renovation",
    area: "54 m²",
    duration: "5 weeks",
    year: 2026,
    description:
      "A one-bedroom apartment renovated for a first-time buyer on a defined budget, with a clear priority list agreed before work began.",
    galleryCount: 2,
  },
  {
    id: "pinki-terrace",
    title: "Terrace & Exterior Project",
    location: "Piņķi",
    category: "exterior",
    servicesText: "Terraces & outdoor works",
    area: "48 m²",
    duration: "3 weeks",
    year: 2025,
    description:
      "A raised timber terrace and adjoining pathway built along the rear of a private house, finished in time for summer.",
    galleryCount: 2,
  },
] as const;

export function projectsByCategory(category: ProjectCategory): readonly Project[] {
  if (category === "all") return PROJECTS;
  return PROJECTS.filter((project) => project.category === category);
}

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}

// --- Team --------------------------------------------------------------

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const TEAM: readonly TeamMember[] = [
  {
    id: "janis",
    name: "Jānis Ozols",
    role: "Project Manager",
    bio: "Plans and tracks every project from estimate to handover, and is your one point of contact throughout.",
    initials: "JO",
  },
  {
    id: "martins",
    name: "Mārtiņš Kalniņš",
    role: "Construction Supervisor",
    bio: "Runs the site day to day — scheduling crews, checking work against the plan, and catching problems early.",
    initials: "MK",
  },
  {
    id: "arturs",
    name: "Artūrs Bērziņš",
    role: "Renovation Specialist",
    bio: "Fifteen years in apartment and house renovation, with a focus on older buildings and tight timelines.",
    initials: "AB",
  },
  {
    id: "laura",
    name: "Laura Liepa",
    role: "Client Coordinator",
    bio: "Handles estimates, scheduling and day-to-day questions, so you're never waiting on an answer.",
    initials: "LL",
  },
] as const;

// --- Reviews -------------------------------------------------------------

export interface Review {
  name: string;
  location: string;
  project: string;
  text: string;
}

export const REVIEWS: readonly Review[] = [
  {
    name: "Andris",
    location: "Riga",
    project: "Apartment Renovation",
    text: "We renovated a 3-room apartment in Riga. Communication was straightforward, the estimate was clear and the work was finished close to the agreed schedule.",
  },
  {
    name: "Laura",
    location: "Mārupe",
    project: "House Renovation",
    text: "Very easy to work with. Clear communication and good quality.",
  },
  {
    name: "Ilze",
    location: "Jūrmala",
    project: "House Reconstruction",
    text: "We reconstructed my parents' old house, which meant working around an existing structure with its own surprises. The team flagged issues as they came up rather than after the fact, and the final cost stayed within about 8% of the original estimate — reasonable, given what we found once the walls were opened.",
  },
  {
    name: "Kārlis",
    location: "Ādaži",
    project: "Facade & Insulation",
    text: "Facade insulation on our house took five weeks, as planned. The crew was tidy and walked us through the materials before starting.",
  },
  {
    name: "Signe",
    location: "Riga",
    project: "Office Renovation",
    text: "Our office renovation had to happen around a working team, which added complexity on both sides. NORDHAUS split the work into phases and kept the noisy jobs to early mornings. There were a couple of delays, but nothing that affected our move-in date.",
  },
] as const;

// --- FAQ -------------------------------------------------------------

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: readonly FaqItem[] = [
  {
    q: "How much does apartment renovation cost?",
    a: "It depends on the size, the condition of the property and the finishing level you choose. Use the estimate calculator above for a rough range, or request a detailed quote and we'll confirm pricing after a site visit.",
  },
  {
    q: "Do you provide a detailed estimate?",
    a: "Yes. Before any work starts, you'll receive a written estimate covering materials, labour and the project timeline, so there's a clear reference point if anything changes along the way.",
  },
  {
    q: "Do you work outside Riga?",
    a: "Yes, we take on projects across Latvia. Travel time may affect scheduling for sites further from Riga, which we'll factor into the estimate.",
  },
  {
    q: "How long does renovation take?",
    a: "A single room can take 1–2 weeks; a full apartment renovation typically runs 4–10 weeks depending on scope. We'll give you a realistic timeline once we've seen the property.",
  },
  {
    q: "Can you help with materials?",
    a: "We can source materials through our regular suppliers, or work with materials you've already chosen or purchased — whichever suits the project and budget.",
  },
  {
    q: "Do you provide a warranty?",
    a: "Yes. Completed work is covered by a warranty, with the exact terms set out in the project agreement.",
  },
  {
    q: "Can I live in the apartment during renovation?",
    a: "For smaller jobs, often yes. For a full renovation involving dust, demolition or no running water for periods, most clients choose to stay elsewhere, at least for the first few weeks.",
  },
  {
    q: "How soon can work start?",
    a: "It depends on the season and our current schedule — usually somewhere between two and six weeks after the estimate is agreed. We'll confirm a specific date before the project is finalised.",
  },
] as const;

// --- Process -------------------------------------------------------------

export interface ProcessStep {
  title: string;
  text: string;
}

export const PROCESS: readonly ProcessStep[] = [
  { title: "Initial Consultation", text: "A short call or site visit to understand what you need and whether it's a fit for us." },
  { title: "Site Visit", text: "We inspect the property in person, take measurements and note any constraints before pricing the work." },
  { title: "Detailed Estimate", text: "A written estimate covering materials, labour and a realistic timeline, based on what we saw on site." },
  { title: "Planning & Agreement", text: "We confirm the scope, schedule and payment terms in a signed agreement before any work begins." },
  { title: "Construction", text: "Work proceeds in the agreed phases, with one project manager as your point of contact throughout." },
  { title: "Quality Inspection", text: "Before handover, we walk through the finished work together and address anything that needs adjusting." },
  { title: "Project Handover", text: "You receive the keys, warranty documentation and any product information relevant to upkeep." },
] as const;

// --- Trust -------------------------------------------------------------

export interface TrustPoint {
  title: string;
  text: string;
}

export const TRUST: readonly TrustPoint[] = [
  { title: "Written Estimate", text: "You know the cost before work starts, not after." },
  { title: "Clear Project Schedule", text: "Dates are set during planning and tracked throughout the project." },
  { title: "Experienced Team", text: "Our crews average eight or more years in their trade." },
  { title: "Warranty", text: "Completed work is covered under written warranty terms." },
  { title: "Insured Work", text: "Projects are covered by liability insurance throughout construction." },
  { title: "One Project Manager", text: "A single point of contact from estimate to handover." },
] as const;

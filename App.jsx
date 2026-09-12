import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Leaf,
  Search,
  MapPin,
  Wifi,
  Wind,
  UtensilsCrossed,
  IndianRupee,
  Users,
  Package,
  Recycle,
  X,
  Check,
  ChevronDown,
  Star,
  Clock,
  Phone,
  User,
  Plus,
  ShieldCheck,
  BookOpen,
  Calculator,
  Zap,
  PenTool,
  FlaskConical,
  Building2,
  ArrowRight,
  SlidersHorizontal,
  BadgeCheck,
  CircleDot,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  MOCK DATA                                                                  */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
  { name: "All", icon: Package },
  { name: "Calculators", icon: Calculator },
  { name: "Lab Kits", icon: FlaskConical },
  { name: "Textbooks", icon: BookOpen },
  { name: "Electronics", icon: Zap },
  { name: "Drawing Tools", icon: PenTool },
];

const CATEGORY_STYLES = {
  Calculators: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200", icon: Calculator },
  "Lab Kits": { bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-200", icon: FlaskConical },
  Textbooks: { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-200", icon: BookOpen },
  Electronics: { bg: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-200", icon: Zap },
  "Drawing Tools": { bg: "bg-teal-50", text: "text-teal-700", ring: "ring-teal-200", icon: PenTool },
};

const CONDITION_STYLES = {
  "Like New": "bg-emerald-100 text-emerald-800",
  Good: "bg-lime-100 text-lime-800",
  Fair: "bg-stone-200 text-stone-700",
};

const AVATAR_COLORS = [
  "bg-emerald-600",
  "bg-amber-600",
  "bg-teal-600",
  "bg-rose-500",
  "bg-violet-600",
  "bg-sky-600",
];

const MOCK_ITEMS = [
  {
    id: "itm-1",
    name: "Scientific Calculator — Casio fx-991EX",
    category: "Calculators",
    condition: "Like New",
    owner: { name: "Ritika Sharma", dept: "Mechanical, 3rd Yr" },
    note: "Available for the whole semester. Comes with manual.",
    deposit: 0,
  },
  {
    id: "itm-2",
    name: "Digital Multimeter Kit",
    category: "Lab Kits",
    condition: "Good",
    owner: { name: "Aman Verma", dept: "Electrical, 2nd Yr" },
    note: "Used for one semester of circuits lab. Fully calibrated.",
    deposit: 200,
  },
  {
    id: "itm-3",
    name: "Engineering Mathematics — Vol. 2",
    category: "Textbooks",
    condition: "Fair",
    owner: { name: "Priya Nair", dept: "Civil, 4th Yr" },
    note: "Some highlighter marks in chapters 3–5, otherwise intact.",
    deposit: 0,
  },
  {
    id: "itm-4",
    name: "Arduino Uno Starter Set",
    category: "Electronics",
    condition: "Like New",
    owner: { name: "Karan Mehta", dept: "CSE, 2nd Yr" },
    note: "Includes breadboard, jumper wires, and sensor pack.",
    deposit: 300,
  },
  {
    id: "itm-5",
    name: "Drafting Table Compass Set",
    category: "Drawing Tools",
    condition: "Good",
    owner: { name: "Sanya Kapoor", dept: "Architecture, 1st Yr" },
    note: "Full precision set with spare leads.",
    deposit: 0,
  },
  {
    id: "itm-6",
    name: "Organic Chemistry Lab Manual",
    category: "Lab Kits",
    condition: "Good",
    owner: { name: "Devansh Rao", dept: "Biotech, 3rd Yr" },
    note: "Annotated with lab-viva notes from last semester.",
    deposit: 0,
  },
  {
    id: "itm-7",
    name: "Graphing Calculator — TI-84 Plus",
    category: "Calculators",
    condition: "Fair",
    owner: { name: "Ishaan Gupta", dept: "Physics, 4th Yr" },
    note: "Battery cover slightly loose, works perfectly otherwise.",
    deposit: 150,
  },
  {
    id: "itm-8",
    name: "DSLR Camera — Canon 1500D",
    category: "Electronics",
    condition: "Like New",
    owner: { name: "Meera Iyer", dept: "Design, 3rd Yr" },
    note: "For fest coverage or projects. 18-55mm lens included.",
    deposit: 500,
  },
];

const MOCK_PGS = [
  {
    id: "pg-1",
    name: "Green Nest PG",
    rent: 8500,
    distanceKm: 0.6,
    sharing: "Double Sharing",
    amenities: { wifi: true, ac: true, food: true },
    rating: 4.6,
    owner: { name: "Mrs. Kulkarni", phone: "+91 98200 11223" },
  },
  {
    id: "pg-2",
    name: "Campus Corner Residency",
    rent: 6200,
    distanceKm: 1.2,
    sharing: "Triple Sharing",
    amenities: { wifi: true, ac: false, food: true },
    rating: 4.2,
    owner: { name: "Mr. Fernandes", phone: "+91 90040 55667" },
  },
  {
    id: "pg-3",
    name: "The Scholar's Stay",
    rent: 11000,
    distanceKm: 0.3,
    sharing: "Single",
    amenities: { wifi: true, ac: true, food: false },
    rating: 4.8,
    owner: { name: "Mr. Ansari", phone: "+91 99870 33445" },
  },
  {
    id: "pg-4",
    name: "Sunrise Boys PG",
    rent: 7000,
    distanceKm: 1.8,
    sharing: "Double Sharing",
    amenities: { wifi: true, ac: false, food: true },
    rating: 4.0,
    owner: { name: "Mr. Yadav", phone: "+91 91234 77889" },
  },
  {
    id: "pg-5",
    name: "Willow Girls Hostel",
    rent: 9200,
    distanceKm: 0.9,
    sharing: "Triple Sharing",
    amenities: { wifi: true, ac: true, food: true },
    rating: 4.7,
    owner: { name: "Mrs. Bose", phone: "+91 98765 22110" },
  },
  {
    id: "pg-6",
    name: "MetroLine Residency",
    rent: 5400,
    distanceKm: 2.4,
    sharing: "Double Sharing",
    amenities: { wifi: false, ac: false, food: true },
    rating: 3.9,
    owner: { name: "Mr. Chatterjee", phone: "+91 90911 44556" },
  },
];

const PICKUP_SPOTS = [
  "Library Main Gate",
  "Hostel Block C Lobby",
  "Cafeteria Food Court",
  "Academic Block A Entrance",
  "Sports Complex Gate",
];

const SHARING_OPTIONS = ["Any", "Single", "Double Sharing", "Triple Sharing"];
const DISTANCE_OPTIONS = [
  { label: "Any distance", value: 999 },
  { label: "Within 0.5 km", value: 0.5 },
  { label: "Within 1 km", value: 1 },
  { label: "Within 2 km", value: 2 },
];

/* -------------------------------------------------------------------------- */
/*  SMALL HELPERS                                                             */
/* -------------------------------------------------------------------------- */

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function avatarColor(name) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function formatINR(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

/* -------------------------------------------------------------------------- */
/*  TOAST                                                                     */
/* -------------------------------------------------------------------------- */

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-[fadeSlideUp_0.25s_ease-out]">
      <div className="flex items-center gap-3 rounded-2xl bg-emerald-950 text-emerald-50 pl-4 pr-3 py-3 shadow-2xl shadow-emerald-950/30 max-w-sm">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
          <Check className="h-4 w-4 text-emerald-300" />
        </div>
        <p className="text-sm leading-snug">{message}</p>
        <button
          onClick={onClose}
          className="ml-1 shrink-0 rounded-full p-1 text-emerald-300 hover:bg-emerald-900 hover:text-emerald-100 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  NAVIGATION                                                                */
/* -------------------------------------------------------------------------- */

function NavBar({ activeTab, setActiveTab, onOpenList, wasteReducedKg }) {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-[#FAF7F1]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-sm shadow-emerald-900/20">
            <Leaf className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-[15px] font-semibold text-emerald-950 tracking-tight">UniLoop</p>
            <p className="hidden text-[11px] text-emerald-700/70 sm:block">Green Campus Initiative</p>
          </div>
        </div>

        {/* Tab switcher */}
        <nav className="hidden items-center gap-1 rounded-full bg-emerald-950/5 p-1 md:flex">
          <button
            onClick={() => setActiveTab("borrow")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "borrow"
                ? "bg-emerald-800 text-white shadow-sm"
                : "text-emerald-900/70 hover:text-emerald-900"
            }`}
          >
            Borrow &amp; Lend
          </button>
          <button
            onClick={() => setActiveTab("pg")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "pg"
                ? "bg-emerald-800 text-white shadow-sm"
                : "text-emerald-900/70 hover:text-emerald-900"
            }`}
          >
            PG Finder
          </button>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2.5">
          <div className="hidden items-center gap-1.5 rounded-full border border-emerald-900/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-emerald-800 lg:flex">
            <Recycle className="h-3.5 w-3.5 text-emerald-600" />
            <span>{wasteReducedKg.toLocaleString("en-IN")} kg waste diverted</span>
          </div>

          <button
            onClick={onOpenList}
            className="hidden items-center gap-1.5 rounded-full bg-amber-500 px-3.5 py-1.5 text-sm font-medium text-amber-950 shadow-sm transition-colors hover:bg-amber-400 sm:flex"
          >
            <Plus className="h-4 w-4" />
            List Item / PG
          </button>

          <button className="flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white py-1 pl-1 pr-3 shadow-sm">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-[11px] font-semibold text-white">
              NM
            </div>
            <span className="hidden text-sm font-medium text-emerald-950 sm:block">Nikhil M.</span>
          </button>
        </div>
      </div>

      {/* Mobile tab switcher */}
      <div className="flex items-center gap-1 border-t border-emerald-900/10 bg-white/40 px-5 py-2 md:hidden">
        <button
          onClick={() => setActiveTab("borrow")}
          className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-colors ${
            activeTab === "borrow" ? "bg-emerald-800 text-white" : "text-emerald-900/70"
          }`}
        >
          Borrow &amp; Lend
        </button>
        <button
          onClick={() => setActiveTab("pg")}
          className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-colors ${
            activeTab === "pg" ? "bg-emerald-800 text-white" : "text-emerald-900/70"
          }`}
        >
          PG Finder
        </button>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  IMPACT HERO                                                               */
/* -------------------------------------------------------------------------- */

function ImpactHero({ onOpenList }) {
  const stats = [
    { label: "Money saved by students", value: "₹4,86,200", icon: IndianRupee },
    { label: "Items shared on campus", value: "1,342", icon: Package },
    { label: "Verified PG listings", value: "58", icon: ShieldCheck },
    { label: "Waste reduced", value: "912 kg", icon: Recycle },
  ];

  return (
    <section className="relative overflow-hidden bg-emerald-950">
      {/* Ambient background shapes */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-700/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-lime-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-12 sm:pt-16">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-100 ring-1 ring-white/15">
            <Leaf className="h-3 w-3" />
            Campus circular economy
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Borrow what you need. Lend what you don't.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-emerald-200/80">
            UniLoop keeps gear circulating and rooms filling up without a single rupee of
            brokerage — one shared calculator or spare bed at a time.
          </p>
          <button
            onClick={onOpenList}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-amber-950 shadow-lg shadow-amber-900/20 transition-transform hover:scale-[1.02] hover:bg-amber-400"
          >
            List something on UniLoop
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Glassmorphism stat banner */}
        <div className="mt-10 grid grid-cols-2 gap-3 rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:grid-cols-4 sm:gap-4 sm:p-5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2 rounded-2xl px-2 py-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <s.icon className="h-4 w-4 text-lime-300" />
              </div>
              <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{s.value}</p>
              <p className="text-xs leading-snug text-emerald-200/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  BORROW & LEND TAB                                                         */
/* -------------------------------------------------------------------------- */

function ItemCard({ item, onRequest }) {
  const style = CATEGORY_STYLES[item.category];
  const CatIcon = style.icon;

  return (
    <div className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-4 shadow-sm shadow-stone-200/40 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.bg} ring-1 ${style.ring}`}>
          <CatIcon className={`h-5 w-5 ${style.text}`} />
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${CONDITION_STYLES[item.condition]}`}>
          {item.condition}
        </span>
      </div>

      <h3 className="mt-3 text-[15px] font-semibold leading-snug text-stone-900">{item.name}</h3>
      <span className={`mt-1.5 w-fit rounded-full px-2 py-0.5 text-[11px] font-medium ${style.bg} ${style.text}`}>
        {item.category}
      </span>
      <p className="mt-2 text-[13px] leading-relaxed text-stone-500">{item.note}</p>

      <div className="mt-4 flex items-center gap-2 border-t border-stone-100 pt-3">
        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold text-white ${avatarColor(item.owner.name)}`}>
          {initials(item.owner.name)}
        </div>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-xs font-medium text-stone-800">{item.owner.name}</p>
          <p className="truncate text-[11px] text-stone-400">{item.owner.dept}</p>
        </div>
        <p className="ml-auto shrink-0 text-xs font-medium text-stone-500">
          {item.deposit > 0 ? `${formatINR(item.deposit)} deposit` : "No deposit"}
        </p>
      </div>

      <button
        onClick={() => onRequest(item)}
        className="mt-4 w-full rounded-xl bg-emerald-800 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
      >
        Request to Borrow
      </button>
    </div>
  );
}

function BorrowLendTab({ onRequest }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return MOCK_ITEMS.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for a calculator, textbook, lab kit…"
          className="w-full rounded-2xl border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm text-stone-800 shadow-sm outline-none transition-shadow focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      {/* Category tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = category === c.name;
          return (
            <button
              key={c.name}
              onClick={() => setCategory(c.name)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-emerald-800 text-white"
                  : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-50"
              }`}
            >
              <c.icon className="h-3.5 w-3.5" />
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Item grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} onRequest={onRequest} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white py-14 text-center">
          <Package className="h-8 w-8 text-stone-300" />
          <p className="mt-3 text-sm font-medium text-stone-600">No items match that search</p>
          <p className="mt-1 text-xs text-stone-400">Try a different keyword or category</p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  PG FINDER TAB                                                             */
/* -------------------------------------------------------------------------- */

function AmenityIcon({ active, icon: Icon, label }) {
  return (
    <div
      className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${
        active ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-300 line-through"
      }`}
      title={label}
    >
      <Icon className="h-3 w-3" />
      <span className="hidden sm:inline">{label}</span>
    </div>
  );
}

function PGCard({ pg, onContact }) {
  return (
    <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-4 shadow-sm shadow-stone-200/40 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
          <Building2 className="h-5 w-5 text-emerald-700" />
        </div>
        <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
          <BadgeCheck className="h-3 w-3" />0 Brokerage
        </span>
      </div>

      <h3 className="mt-3 text-[15px] font-semibold leading-snug text-stone-900">{pg.name}</h3>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {pg.distanceKm} km from campus
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          {pg.sharing}
        </span>
        <span className="flex items-center gap-1 text-amber-600">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {pg.rating}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <AmenityIcon active={pg.amenities.wifi} icon={Wifi} label="Wi-Fi" />
        <AmenityIcon active={pg.amenities.ac} icon={Wind} label="AC" />
        <AmenityIcon active={pg.amenities.food} icon={UtensilsCrossed} label="Food" />
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-stone-100 pt-3">
        <div>
          <p className="text-lg font-semibold tracking-tight text-stone-900">
            {formatINR(pg.rent)}
            <span className="text-xs font-normal text-stone-400">/month</span>
          </p>
          <p className="text-[11px] text-stone-400">Managed by {pg.owner.name}</p>
        </div>
        <button
          onClick={() => onContact(pg)}
          className="flex items-center gap-1.5 rounded-xl bg-emerald-800 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          <Phone className="h-3.5 w-3.5" />
          Contact Owner
        </button>
      </div>
    </div>
  );
}

function PGFinderTab({ onContact }) {
  const [budget, setBudget] = useState(12000);
  const [sharing, setSharing] = useState("Any");
  const [distance, setDistance] = useState(999);

  const filtered = useMemo(() => {
    return MOCK_PGS.filter((pg) => {
      const withinBudget = pg.rent <= budget;
      const matchesSharing = sharing === "Any" || pg.sharing === sharing;
      const withinDistance = pg.distanceKm <= distance;
      return withinBudget && matchesSharing && withinDistance;
    });
  }, [budget, sharing, distance]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-2 text-emerald-800">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-sm font-medium">Filters</span>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between text-xs font-medium text-stone-500">
            <span>Max budget</span>
            <span className="text-emerald-700">{formatINR(budget)}/mo</span>
          </div>
          <input
            type="range"
            min="4000"
            max="15000"
            step="500"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="mt-1.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-emerald-700"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-stone-500">Sharing type</span>
          <div className="relative">
            <select
              value={sharing}
              onChange={(e) => setSharing(e.target.value)}
              className="appearance-none rounded-xl border border-stone-200 bg-stone-50 py-2 pl-3 pr-8 text-sm text-stone-700 outline-none focus:border-emerald-400"
            >
              {SHARING_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-stone-500">Distance from campus</span>
          <div className="relative">
            <select
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="appearance-none rounded-xl border border-stone-200 bg-stone-50 py-2 pl-3 pr-8 text-sm text-stone-700 outline-none focus:border-emerald-400"
            >
              {DISTANCE_OPTIONS.map((d) => (
                <option key={d.label} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
          </div>
        </div>
      </div>

      {/* PG grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pg) => (
            <PGCard key={pg.id} pg={pg} onContact={onContact} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white py-14 text-center">
          <Building2 className="h-8 w-8 text-stone-300" />
          <p className="mt-3 text-sm font-medium text-stone-600">No PGs match those filters</p>
          <p className="mt-1 text-xs text-stone-400">Try raising your budget or distance range</p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MODAL SHELL                                                               */
/* -------------------------------------------------------------------------- */

function ModalShell({ title, subtitle, onClose, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onMouseDown={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-50 flex items-end justify-center bg-emerald-950/50 backdrop-blur-sm sm:items-center"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-[#FAF7F1] shadow-2xl sm:rounded-3xl">
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-emerald-950">{title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-stone-500">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full p-1.5 text-stone-400 transition-colors hover:bg-stone-200 hover:text-stone-700"
            aria-label="Close dialog"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  LIST ITEM / PG MODAL                                                      */
/* -------------------------------------------------------------------------- */

function FieldLabel({ children }) {
  return <label className="mb-1.5 block text-xs font-medium text-stone-600">{children}</label>;
}

const inputClasses =
  "w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-800 outline-none transition-shadow focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";

function ListModal({ onClose, onSubmit }) {
  const [listType, setListType] = useState("item");
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("Calculators");
  const [itemCondition, setItemCondition] = useState("Good");
  const [pgName, setPgName] = useState("");
  const [pgRent, setPgRent] = useState("");
  const [pgSharing, setPgSharing] = useState("Single");
  const [pgDistance, setPgDistance] = useState("");

  const canSubmit = listType === "item" ? itemName.trim().length > 0 : pgName.trim().length > 0 && pgRent.trim().length > 0;

  return (
    <ModalShell title="List something on UniLoop" subtitle="Share a resource or a room in a couple of steps" onClose={onClose}>
      {/* Toggle */}
      <div className="flex rounded-2xl bg-stone-200/60 p-1">
        <button
          onClick={() => setListType("item")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-medium transition-colors ${
            listType === "item" ? "bg-white text-emerald-800 shadow-sm" : "text-stone-500"
          }`}
        >
          <Package className="h-4 w-4" />
          Academic Resource
        </button>
        <button
          onClick={() => setListType("pg")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-medium transition-colors ${
            listType === "pg" ? "bg-white text-emerald-800 shadow-sm" : "text-stone-500"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Room / PG
        </button>
      </div>

      {listType === "item" ? (
        <div className="mt-5 space-y-4">
          <div>
            <FieldLabel>Item name</FieldLabel>
            <input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              type="text"
              placeholder="e.g. Casio fx-991EX Calculator"
              className={inputClasses}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Category</FieldLabel>
              <div className="relative">
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                  className={`${inputClasses} appearance-none pr-8`}
                >
                  {CATEGORIES.filter((c) => c.name !== "All").map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
              </div>
            </div>
            <div>
              <FieldLabel>Condition</FieldLabel>
              <div className="relative">
                <select
                  value={itemCondition}
                  onChange={(e) => setItemCondition(e.target.value)}
                  className={`${inputClasses} appearance-none pr-8`}
                >
                  {Object.keys(CONDITION_STYLES).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
              </div>
            </div>
          </div>
          <div>
            <FieldLabel>Notes for borrowers</FieldLabel>
            <textarea
              rows={3}
              placeholder="Mention wear, accessories included, or how long it's available for"
              className={`${inputClasses} resize-none`}
            />
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div>
            <FieldLabel>PG / property name</FieldLabel>
            <input
              value={pgName}
              onChange={(e) => setPgName(e.target.value)}
              type="text"
              placeholder="e.g. Green Nest PG"
              className={inputClasses}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Monthly rent (₹)</FieldLabel>
              <input
                value={pgRent}
                onChange={(e) => setPgRent(e.target.value)}
                type="number"
                placeholder="8500"
                className={inputClasses}
              />
            </div>
            <div>
              <FieldLabel>Distance from campus (km)</FieldLabel>
              <input
                value={pgDistance}
                onChange={(e) => setPgDistance(e.target.value)}
                type="number"
                step="0.1"
                placeholder="0.8"
                className={inputClasses}
              />
            </div>
          </div>
          <div>
            <FieldLabel>Sharing type</FieldLabel>
            <div className="relative">
              <select
                value={pgSharing}
                onChange={(e) => setPgSharing(e.target.value)}
                className={`${inputClasses} appearance-none pr-8`}
              >
                {SHARING_OPTIONS.filter((s) => s !== "Any").map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-xs text-emerald-800 ring-1 ring-emerald-100">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            All PG listings are verified by the campus housing desk before going live.
          </div>
        </div>
      )}

      <button
        disabled={!canSubmit}
        onClick={() =>
          onSubmit(
            listType === "item"
              ? `"${itemName}" was listed for borrowing.`
              : `"${pgName}" was submitted for PG verification.`
          )
        }
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3 text-sm font-medium text-white transition-colors enabled:hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {listType === "item" ? "List this item" : "Submit PG for verification"}
      </button>
    </ModalShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  REQUEST ITEM MODAL                                                        */
/* -------------------------------------------------------------------------- */

function RequestModal({ item, onClose, onSubmit }) {
  const [spot, setSpot] = useState(PICKUP_SPOTS[0]);
  const [note, setNote] = useState("");
  const style = CATEGORY_STYLES[item.category];
  const CatIcon = style.icon;

  return (
    <ModalShell title="Confirm your request" subtitle="Let the owner know where to meet you" onClose={onClose}>
      {/* Item summary */}
      <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3.5">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.bg} ring-1 ${style.ring}`}>
          <CatIcon className={`h-5 w-5 ${style.text}`} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-stone-900">{item.name}</p>
          <p className="text-xs text-stone-500">
            Owned by {item.owner.name} · {item.owner.dept}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <FieldLabel>Choose a campus pickup spot</FieldLabel>
        <div className="space-y-2">
          {PICKUP_SPOTS.map((s) => (
            <button
              key={s}
              onClick={() => setSpot(s)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors ${
                spot === s
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                  : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  spot === s ? "border-emerald-600" : "border-stone-300"
                }`}
              >
                {spot === s && <CircleDot className="h-3.5 w-3.5 -m-0.5 text-emerald-600" />}
              </span>
              <MapPin className="h-3.5 w-3.5 shrink-0 text-stone-400" />
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <FieldLabel>Message to owner (optional)</FieldLabel>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="e.g. Could I pick this up after 5 PM tomorrow?"
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs text-amber-800 ring-1 ring-amber-100">
        <Clock className="h-4 w-4 shrink-0" />
        The owner usually responds within a few hours. You'll get a notification once confirmed.
      </div>

      <button
        onClick={() => onSubmit(`Request sent to ${item.owner.name} — pickup at ${spot}.`)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
      >
        <Check className="h-4 w-4" />
        Confirm Request
      </button>
    </ModalShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  CONTACT OWNER MODAL (lightweight, reuses ModalShell)                     */
/* -------------------------------------------------------------------------- */

function ContactModal({ pg, onClose, onSubmit }) {
  return (
    <ModalShell title="Contact owner" subtitle={`Reach out about ${pg.name}`} onClose={onClose}>
      <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3.5">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${avatarColor(pg.owner.name)}`}>
          {initials(pg.owner.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-stone-900">{pg.owner.name}</p>
          <p className="text-xs text-stone-500">Manages {pg.name}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-stone-100 px-3.5 py-2.5">
        <span className="flex items-center gap-2 text-sm text-stone-700">
          <Phone className="h-4 w-4 text-emerald-700" />
          {pg.owner.phone}
        </span>
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
      </div>

      <p className="mt-4 text-xs text-stone-500">
        UniLoop verifies every PG owner's identity before their listing goes live, so it's safe to
        call or message directly.
      </p>

      <button
        onClick={() => onSubmit(`Calling ${pg.owner.name} about ${pg.name}…`)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
      >
        <Phone className="h-4 w-4" />
        Call Now
      </button>
    </ModalShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  APP                                                                       */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [activeTab, setActiveTab] = useState("borrow");
  const [showListModal, setShowListModal] = useState(false);
  const [requestItem, setRequestItem] = useState(null);
  const [contactPg, setContactPg] = useState(null);
  const [toast, setToast] = useState("");

  const notify = (msg) => setToast(msg);

  return (
    <div className="min-h-screen bg-[#FAF7F1] font-sans text-stone-900">
      <NavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenList={() => setShowListModal(true)}
        wasteReducedKg={912}
      />

      <ImpactHero onOpenList={() => setShowListModal(true)} />

      <main className="mx-auto max-w-6xl px-5 py-8">
        {activeTab === "borrow" ? (
          <BorrowLendTab onRequest={setRequestItem} />
        ) : (
          <PGFinderTab onContact={setContactPg} />
        )}
      </main>

      <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-400">
        UniLoop · Built by students, for students · Zero brokerage, zero waste.
      </footer>

      {showListModal && (
        <ListModal
          onClose={() => setShowListModal(false)}
          onSubmit={(msg) => {
            setShowListModal(false);
            notify(msg);
          }}
        />
      )}

      {requestItem && (
        <RequestModal
          item={requestItem}
          onClose={() => setRequestItem(null)}
          onSubmit={(msg) => {
            setRequestItem(null);
            notify(msg);
          }}
        />
      )}

      {contactPg && (
        <ContactModal
          pg={contactPg}
          onClose={() => setContactPg(null)}
          onSubmit={(msg) => {
            setContactPg(null);
            notify(msg);
          }}
        />
      )}

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}

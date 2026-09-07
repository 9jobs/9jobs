"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  RotateCcw,
  Plus,
  Minus,
  MapPin,
  ArrowRight,
  ExternalLink,
  Navigation,
} from "lucide-react";

const searchLocations = [
  { name: "Melbourne", state: "VIC", citySlug: "melbourne", type: "Capital Metro", zone: "melbourne" },
  { name: "Docklands", state: "VIC", citySlug: "melbourne", type: "Commercial Hub", zone: "melbourne" },
  { name: "Richmond", state: "VIC", citySlug: "melbourne", type: "Tech Corridor", zone: "melbourne" },
  { name: "South Yarra", state: "VIC", citySlug: "melbourne", type: "Creative Hub", zone: "melbourne" },
  { name: "Fitzroy", state: "VIC", citySlug: "melbourne", type: "Agency & Digital", zone: "melbourne" },
  { name: "Sydney", state: "NSW", citySlug: "sydney", type: "Capital Metro", zone: "sydney" },
  { name: "Parramatta", state: "NSW", citySlug: "sydney", type: "Western CBD", zone: "sydney" },
  { name: "Surry Hills", state: "NSW", citySlug: "sydney", type: "Tech Hub", zone: "sydney" },
  { name: "North Sydney", state: "NSW", citySlug: "sydney", type: "Corporate Center", zone: "sydney" },
  { name: "Pyrmont", state: "NSW", citySlug: "sydney", type: "Media Hub", zone: "sydney" },
  { name: "Brisbane", state: "QLD", citySlug: "brisbane", type: "Capital Metro", zone: "brisbane" },
  { name: "Fortitude Valley", state: "QLD", citySlug: "brisbane", type: "Startups & Tech", zone: "brisbane" },
  { name: "South Brisbane", state: "QLD", citySlug: "brisbane", type: "Commercial Precinct", zone: "brisbane" },
  { name: "Milton", state: "QLD", citySlug: "brisbane", type: "Corporate Hub", zone: "brisbane" },
  { name: "Perth", state: "WA", citySlug: "perth", type: "Capital Metro", zone: "perth" },
  { name: "West Perth", state: "WA", citySlug: "perth", type: "Mining & Resources", zone: "perth" },
  { name: "Fremantle", state: "WA", citySlug: "perth", type: "Maritime & Port", zone: "perth" },
  { name: "Subiaco", state: "WA", citySlug: "perth", type: "Business Center", zone: "perth" },
  { name: "Adelaide", state: "SA", citySlug: "adelaide", type: "Capital Metro", zone: "adelaide" },
  { name: "Norwood", state: "SA", citySlug: "adelaide", type: "Tech & Commercial", zone: "adelaide" },
  { name: "Mawson Lakes", state: "SA", citySlug: "adelaide", type: "Defense & Space", zone: "adelaide" },
  { name: "Geelong", state: "VIC", citySlug: "geelong", type: "Regional Hub", zone: "geelong" },
  { name: "Newtown", state: "VIC", citySlug: "geelong", type: "Services Center", zone: "geelong" },
  { name: "Belmont", state: "VIC", citySlug: "geelong", type: "Commercial Hub", zone: "geelong" },
];

const cityViews = {
  all: {
    title: "All Australia Coverage",
    subtitle: "Select a metro hub or click any pinpoint to explore local opportunities",
    zones: [
      {
        id: "wa-hub",
        name: "Western Australia",
        slug: "perth",
        badge: "WA Hub",
        rect: { x: "4%", y: "24%", width: "26%", height: "62%" },
        pins: [
          { id: "p1", name: "Perth CBD", slug: "perth", x: "18%", y: "62%", desc: "Mining, Tech & Resources Hub" },
          { id: "p2", name: "Fremantle", slug: "perth", x: "14%", y: "74%", desc: "Logistics & Maritime Corridor" },
        ],
      },
      {
        id: "sa-hub",
        name: "South Australia",
        slug: "adelaide",
        badge: "SA Hub",
        rect: { x: "32%", y: "38%", width: "24%", height: "48%" },
        pins: [
          { id: "a1", name: "Adelaide CBD", slug: "adelaide", x: "44%", y: "66%", desc: "Defense, Space & Innovation" },
          { id: "a2", name: "Mawson Lakes", slug: "adelaide", x: "46%", y: "52%", desc: "Tech & Research Precinct" },
        ],
      },
      {
        id: "vic-reg-hub",
        name: "Regional Victoria",
        slug: "geelong",
        badge: "VIC Regional",
        rect: { x: "58%", y: "54%", width: "19%", height: "36%" },
        pins: [
          { id: "g1", name: "Geelong CBD", slug: "geelong", x: "66%", y: "76%", desc: "NDIS, Govt & Advanced Materials" },
          { id: "g2", name: "Ballarat Corridor", slug: "geelong", x: "64%", y: "62%", desc: "Regional Tech & Services" },
        ],
      },
      {
        id: "vic-metro-hub",
        name: "Melbourne Metro",
        slug: "melbourne",
        badge: "VIC Metro",
        rect: { x: "78%", y: "56%", width: "18%", height: "34%" },
        pins: [
          { id: "m1", name: "Melbourne CBD", slug: "melbourne", x: "86%", y: "72%", desc: "Tech, Creative & Financial Hub" },
          { id: "m2", name: "Docklands & Richmond", slug: "melbourne", x: "84%", y: "82%", desc: "Enterprise Software & Agencies" },
        ],
      },
      {
        id: "nsw-hub",
        name: "Sydney Metro",
        slug: "sydney",
        badge: "NSW Hub",
        rect: { x: "76%", y: "28%", width: "20%", height: "26%" },
        pins: [
          { id: "s1", name: "Sydney CBD", slug: "sydney", x: "87%", y: "42%", desc: "National Financial Capital" },
          { id: "s2", name: "Parramatta", slug: "sydney", x: "81%", y: "36%", desc: "Western Corporate Corridor" },
        ],
      },
      {
        id: "qld-hub",
        name: "Brisbane & SE QLD",
        slug: "brisbane",
        badge: "QLD Hub",
        rect: { x: "72%", y: "6%", width: "24%", height: "20%" },
        pins: [
          { id: "b1", name: "Brisbane CBD", slug: "brisbane", x: "84%", y: "16%", desc: "Public Sector & Tech Startups" },
          { id: "b2", name: "Fortitude Valley", slug: "brisbane", x: "88%", y: "12%", desc: "Digital, Agency & Resources" },
        ],
      },
    ],
  },
  melbourne: {
    title: "Melbourne & Victoria Coverage",
    subtitle: "Localized market breakdown matching Victorian recruitment corridors",
    zones: [
      {
        id: "reg-vic",
        name: "Regional Victoria",
        slug: "geelong",
        badge: "Regional Hub",
        rect: { x: "6%", y: "12%", width: "36%", height: "76%" },
        pins: [
          { id: "rv1", name: "Geelong / Surf Coast", slug: "geelong", x: "18%", y: "62%", desc: "NDIS, TAC & Advanced Tech Hub" },
          { id: "rv2", name: "Ballarat / Central VIC", slug: "geelong", x: "28%", y: "36%", desc: "Regional Public Health & Logistics" },
        ],
      },
      {
        id: "melb-north",
        name: "Melbourne North",
        slug: "melbourne",
        badge: "Metro North",
        rect: { x: "44%", y: "12%", width: "24%", height: "37%" },
        pins: [
          { id: "mn1", name: "Brunswick / Coburg", slug: "melbourne", x: "56%", y: "24%", desc: "Design, Education & Healthcare" },
        ],
      },
      {
        id: "melb-east",
        name: "Melbourne East",
        slug: "melbourne",
        badge: "Metro East",
        rect: { x: "69%", y: "12%", width: "26%", height: "42%" },
        pins: [
          { id: "me1", name: "Richmond / Hawthorn", slug: "melbourne", x: "80%", y: "28%", desc: "Tech Startups, Scaleups & Digital" },
        ],
      },
      {
        id: "melb-west-central",
        name: "Melbourne West/Central",
        slug: "melbourne",
        badge: "CBD & West",
        rect: { x: "44%", y: "51%", width: "24%", height: "37%" },
        pins: [
          { id: "mwc1", name: "Melbourne CBD", slug: "melbourne", x: "54%", y: "62%", desc: "Banking, Advisory & Enterprise IT" },
          { id: "mwc2", name: "Docklands Precinct", slug: "melbourne", x: "57%", y: "78%", desc: "Corporate Headquarters & Platforms" },
        ],
      },
      {
        id: "melb-south",
        name: "Melbourne South",
        slug: "melbourne",
        badge: "Metro South",
        rect: { x: "69%", y: "56%", width: "26%", height: "32%" },
        pins: [
          { id: "ms1", name: "South Yarra / St Kilda", slug: "melbourne", x: "78%", y: "72%", desc: "Creative Agencies & Medical" },
        ],
      },
    ],
  },
  sydney: {
    title: "Sydney & NSW Coverage",
    subtitle: "Key recruitment corridors across Greater Sydney and financial centers",
    zones: [
      {
        id: "syd-west",
        name: "Western Sydney & Parramatta",
        slug: "sydney",
        badge: "Western CBD",
        rect: { x: "6%", y: "14%", width: "38%", height: "72%" },
        pins: [
          { id: "sw1", name: "Parramatta CBD", slug: "sydney", x: "24%", y: "48%", desc: "Government, Finance & Enterprise" },
          { id: "sw2", name: "Macquarie Park", slug: "sydney", x: "32%", y: "28%", desc: "Tech & Pharmaceutical Corridor" },
        ],
      },
      {
        id: "syd-north",
        name: "North Sydney & Shore",
        slug: "sydney",
        badge: "North Hub",
        rect: { x: "46%", y: "14%", width: "25%", height: "36%" },
        pins: [
          { id: "sn1", name: "North Sydney / Chatswood", slug: "sydney", x: "58%", y: "28%", desc: "Media, Tech & Telecommunications" },
        ],
      },
      {
        id: "syd-cbd",
        name: "Sydney CBD & Harbour",
        slug: "sydney",
        badge: "Financial Core",
        rect: { x: "72%", y: "14%", width: "23%", height: "40%" },
        pins: [
          { id: "sc1", name: "Sydney Financial District", slug: "sydney", x: "82%", y: "30%", desc: "Investment Banking & Corporate Law" },
        ],
      },
      {
        id: "syd-inner-west",
        name: "Inner West & Tech Corridor",
        slug: "sydney",
        badge: "Creative Hub",
        rect: { x: "46%", y: "52%", width: "25%", height: "34%" },
        pins: [
          { id: "siw1", name: "Pyrmont / Ultimo", slug: "sydney", x: "57%", y: "68%", desc: "Digital Media & Tech Scaleups" },
        ],
      },
      {
        id: "syd-east-south",
        name: "Surry Hills & South",
        slug: "sydney",
        badge: "Innovation Corridor",
        rect: { x: "72%", y: "56%", width: "23%", height: "30%" },
        pins: [
          { id: "ses1", name: "Surry Hills & Alexandria", slug: "sydney", x: "81%", y: "72%", desc: "Startups, Design & Marketing" },
        ],
      },
    ],
  },
  brisbane: {
    title: "Brisbane & SE Queensland Coverage",
    subtitle: "Infrastructure, resources, and burgeoning technology corridors",
    zones: [
      {
        id: "bne-west",
        name: "Ipswich & Greater West",
        slug: "brisbane",
        badge: "Regional West",
        rect: { x: "6%", y: "14%", width: "36%", height: "72%" },
        pins: [
          { id: "bw1", name: "Ipswich Corridor", slug: "brisbane", x: "22%", y: "54%", desc: "Manufacturing & Defense Logistics" },
        ],
      },
      {
        id: "bne-north",
        name: "Brisbane North & Valley",
        slug: "brisbane",
        badge: "Tech & Agency",
        rect: { x: "44%", y: "14%", width: "26%", height: "36%" },
        pins: [
          { id: "bn1", name: "Fortitude Valley / Newstead", slug: "brisbane", x: "56%", y: "28%", desc: "Technology, Creative & Agencies" },
        ],
      },
      {
        id: "bne-cbd",
        name: "Brisbane CBD & Milton",
        slug: "brisbane",
        badge: "Corporate Center",
        rect: { x: "71%", y: "14%", width: "24%", height: "38%" },
        pins: [
          { id: "bc1", name: "Brisbane CBD / Milton", slug: "brisbane", x: "82%", y: "30%", desc: "Resources, Public Sector & Finance" },
        ],
      },
      {
        id: "bne-south",
        name: "South Brisbane & Coast",
        slug: "brisbane",
        badge: "Growth Corridor",
        rect: { x: "44%", y: "52%", width: "51%", height: "34%" },
        pins: [
          { id: "bs1", name: "South Brisbane / West End", slug: "brisbane", x: "62%", y: "68%", desc: "Healthcare, Tourism & Startups" },
          { id: "bs2", name: "Gold Coast Transit Corridor", slug: "brisbane", x: "82%", y: "74%", desc: "Commercial & Healthcare Services" },
        ],
      },
    ],
  },
  perth: {
    title: "Perth & Western Australia Coverage",
    subtitle: "Western Australia's mining, engineering, and commercial energy gateway",
    zones: [
      {
        id: "per-fremantle",
        name: "Fremantle & Maritime",
        slug: "perth",
        badge: "Port Corridor",
        rect: { x: "6%", y: "14%", width: "36%", height: "72%" },
        pins: [
          { id: "pf1", name: "Fremantle Port", slug: "perth", x: "22%", y: "58%", desc: "Maritime Logistics, Freight & Trade" },
        ],
      },
      {
        id: "per-cbd",
        name: "Perth CBD & West Perth",
        slug: "perth",
        badge: "Mining & Resources",
        rect: { x: "44%", y: "14%", width: "27%", height: "38%" },
        pins: [
          { id: "pc1", name: "West Perth / St Georges Tce", slug: "perth", x: "57%", y: "30%", desc: "Resource Majors, Engineering & Finance" },
        ],
      },
      {
        id: "per-north",
        name: "Subiaco & Tech North",
        slug: "perth",
        badge: "Tech & Services",
        rect: { x: "72%", y: "14%", width: "23%", height: "38%" },
        pins: [
          { id: "pn1", name: "Subiaco / Osborne Park", slug: "perth", x: "82%", y: "30%", desc: "Commercial Services & Engineering Firms" },
        ],
      },
      {
        id: "per-south",
        name: "South Perth & Industrial",
        slug: "perth",
        badge: "Industry Corridor",
        rect: { x: "44%", y: "54%", width: "51%", height: "32%" },
        pins: [
          { id: "ps1", name: "Belmont / South Perth", slug: "perth", x: "64%", y: "70%", desc: "Logistics, Supply Chain & Fleet Support" },
        ],
      },
    ],
  },
  adelaide: {
    title: "Adelaide & South Australia Coverage",
    subtitle: "Defense contracting, aerospace, medical research, and tech corridors",
    zones: [
      {
        id: "adl-hills",
        name: "Adelaide Hills & Regional SA",
        slug: "adelaide",
        badge: "Regional SA",
        rect: { x: "6%", y: "14%", width: "36%", height: "72%" },
        pins: [
          { id: "ah1", name: "Mount Barker & Hills", slug: "adelaide", x: "22%", y: "54%", desc: "AgTech, Wine Industry & Regional Health" },
        ],
      },
      {
        id: "adl-north",
        name: "Mawson Lakes & Tech",
        slug: "adelaide",
        badge: "Defense & Space",
        rect: { x: "44%", y: "14%", width: "27%", height: "38%" },
        pins: [
          { id: "an1", name: "Mawson Lakes Tech Park", slug: "adelaide", x: "57%", y: "30%", desc: "Defense Contractors & Aerospace R&D" },
        ],
      },
      {
        id: "adl-cbd",
        name: "Adelaide CBD & East",
        slug: "adelaide",
        badge: "Innovation Core",
        rect: { x: "72%", y: "14%", width: "23%", height: "38%" },
        pins: [
          { id: "ac1", name: "Adelaide CBD / Norwood", slug: "adelaide", x: "82%", y: "30%", desc: "BioMed City, Financial & Professional Services" },
        ],
      },
      {
        id: "adl-south",
        name: "Tonsley & Southern Innovation",
        slug: "adelaide",
        badge: "Advanced Tech",
        rect: { x: "44%", y: "54%", width: "51%", height: "32%" },
        pins: [
          { id: "as1", name: "Tonsley Innovation District", slug: "adelaide", x: "68%", y: "70%", desc: "Clean Energy, Medical Tech & Robotics" },
        ],
      },
    ],
  },
  geelong: {
    title: "Geelong & Coastal Victoria Coverage",
    subtitle: "Transitioning manufacturing, insurance claims, and government services",
    zones: [
      {
        id: "gee-surf",
        name: "Surf Coast & Bellarine",
        slug: "geelong",
        badge: "Coastal Corridor",
        rect: { x: "6%", y: "14%", width: "36%", height: "72%" },
        pins: [
          { id: "gs1", name: "Torquay / Bellarine", slug: "geelong", x: "22%", y: "54%", desc: "Tourism, Health & Small Business" },
        ],
      },
      {
        id: "gee-cbd",
        name: "Geelong CBD & TAC/NDIS",
        slug: "geelong",
        badge: "Public Sector Core",
        rect: { x: "44%", y: "14%", width: "27%", height: "38%" },
        pins: [
          { id: "gc1", name: "Central Geelong", slug: "geelong", x: "57%", y: "30%", desc: "NDIS HQ, TAC Claims & Regional Govt" },
        ],
      },
      {
        id: "gee-west",
        name: "Newtown & Commercial",
        slug: "geelong",
        badge: "Services Corridor",
        rect: { x: "72%", y: "14%", width: "23%", height: "38%" },
        pins: [
          { id: "gw1", name: "Newtown / Geelong West", slug: "geelong", x: "82%", y: "30%", desc: "Professional Advisory & Healthcare" },
        ],
      },
      {
        id: "gee-waurn",
        name: "Waurn Ponds & Tech",
        slug: "geelong",
        badge: "Education & Tech",
        rect: { x: "44%", y: "54%", width: "51%", height: "32%" },
        pins: [
          { id: "gwp1", name: "Waurn Ponds Campus", slug: "geelong", x: "68%", y: "70%", desc: "Deakin Tech Park & Carbon Fiber Hub" },
        ],
      },
    ],
  },
};

export default function AustraliaJobMap() {
  const router = useRouter();
  const [activeViewKey, setActiveViewKey] = useState("melbourne");
  const [hoveredPin, setHoveredPin] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const currentView = cityViews[activeViewKey] || cityViews.melbourne;

  const filteredSearch = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return searchLocations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q) ||
        loc.type.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelectLocation = (loc) => {
    setSearchQuery("");
    setIsSearchFocused(false);
    if (loc.zone && cityViews[loc.zone]) {
      setActiveViewKey(loc.zone);
    }
    router.push(`/jobs/${loc.citySlug}`);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.15, 1.45));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.15, 0.85));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setActiveViewKey("all");
    setHoveredPin(null);
  };

  return (
    <div className="fj-map-component-shell">
      {/* City Switcher Pill Navigation */}
      <div className="fj-map-pills-bar">
        <span className="fj-map-pills-label">
          <Navigation size={13} /> Metro Corridors:
        </span>
        <div className="fj-map-pills-track">
          {[
            { key: "all", label: "All Australia", slug: "all" },
            { key: "melbourne", label: "Melbourne", state: "VIC", slug: "melbourne" },
            { key: "sydney", label: "Sydney", state: "NSW", slug: "sydney" },
            { key: "brisbane", label: "Brisbane", state: "QLD", slug: "brisbane" },
            { key: "perth", label: "Perth", state: "WA", slug: "perth" },
            { key: "adelaide", label: "Adelaide", state: "SA", slug: "adelaide" },
            { key: "geelong", label: "Geelong", state: "VIC", slug: "geelong" },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setActiveViewKey(item.key);
                setHoveredPin(null);
              }}
              className={`fj-map-nav-pill ${activeViewKey === item.key ? "is-active" : ""}`}
            >
              <span>{item.label}</span>
              {item.state && <span className="fj-map-nav-state">{item.state}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Main Mapbox-style Interactive Map Canvas */}
      <div className="fj-map-viewport">
        {/* Floating Top Bar (Search + Map Controls) */}
        <div className="fj-map-controls-row">
          {/* Top Left: Search Input matching user screenshot */}
          <div className="fj-map-search-wrap">
            <div className="fj-map-search-box">
              <Search size={16} className="fj-map-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 220)}
                placeholder="Enter a suburb or city..."
                className="fj-map-search-input"
              />
            </div>

            {/* Autocomplete dropdown */}
            {isSearchFocused && filteredSearch.length > 0 && (
              <div className="fj-map-search-results">
                {filteredSearch.map((loc) => (
                  <button
                    key={`${loc.name}-${loc.state}`}
                    type="button"
                    onMouseDown={() => handleSelectLocation(loc)}
                    className="fj-map-search-item"
                  >
                    <div className="fj-map-search-item-info">
                      <MapPin size={14} className="fj-map-item-pin" />
                      <span className="fj-map-item-name">{loc.name}</span>
                      <span className="fj-map-item-state">{loc.state}</span>
                    </div>
                    <span className="fj-map-item-type">{loc.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Top Right: Zoom & Reset Controls matching user screenshot */}
          <div className="fj-map-action-controls">
            <button
              type="button"
              onClick={handleZoomOut}
              className="fj-map-btn"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <Minus size={15} />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="fj-map-btn fj-map-btn--reset"
              title="Reset map view"
            >
              <RotateCcw size={13} />
              <span>RESET</span>
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className="fj-map-btn"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>

        {/* Map Canvas Background & Geometric Zones */}
        <div
          className="fj-map-interactive-stage"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Render Zoned Boxes matching screenshot geometry */}
          {currentView.zones.map((zone) => (
            <div
              key={zone.id}
              className="fj-map-zone-polygon"
              style={{
                left: zone.rect.x,
                top: zone.rect.y,
                width: zone.rect.width,
                height: zone.rect.height,
              }}
              onClick={() => {
                if (zone.slug && zone.slug !== "all") {
                  router.push(`/jobs/${zone.slug}`);
                }
              }}
              title={`Explore ${zone.name} jobs`}
            >
              <div className="fj-map-zone-header">
                <span className="fj-map-zone-title">{zone.name}</span>
                {zone.badge && <span className="fj-map-zone-badge">{zone.badge}</span>}
              </div>
            </div>
          ))}

          {/* Render Location Dots / Pins matching user screenshot */}
          {currentView.zones.flatMap((zone) =>
            zone.pins.map((pin) => {
              const isHovered = hoveredPin?.id === pin.id;

              return (
                <div
                  key={pin.id}
                  className="fj-map-pin-anchor"
                  style={{ left: pin.x, top: pin.y }}
                  onMouseEnter={() => setHoveredPin(pin)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  {/* Clickable Circle Pin Dot */}
                  <button
                    type="button"
                    onClick={() => router.push(`/jobs/${pin.slug}`)}
                    className={`fj-map-dot-marker ${isHovered ? "is-active" : ""}`}
                    aria-label={`View jobs in ${pin.name}`}
                  >
                    <span className="fj-map-dot-core" />
                    <span className="fj-map-dot-ring" />
                  </button>

                  {/* Tooltip Card (Matching "Loading coverage" tooltip from user screenshot) */}
                  {isHovered && (
                    <div className="fj-map-coverage-tooltip">
                      <div className="fj-map-tooltip-arrow" />
                      <div className="fj-map-tooltip-top">
                        <span className="fj-map-tooltip-beacon" />
                        <strong className="fj-map-tooltip-title">{pin.name}</strong>
                      </div>
                      <p className="fj-map-tooltip-desc">{pin.desc}</p>
                      <Link
                        href={`/jobs/${pin.slug}`}
                        className="fj-map-tooltip-btn"
                        prefetch={false}
                      >
                        <span>Explore Roles</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Attribution Bar matching reference image */}
        <div className="fj-map-attribution-bar">
          <div className="fj-map-attribution-left">
            <span className="fj-map-attribution-logo">mapbox</span>
            <span className="fj-map-live-tag">
              <span className="fj-map-live-dot" /> 9Jobs Australia Live Sourcing Active
            </span>
          </div>
          <div className="fj-map-attribution-right">
            <span>© 9Jobs · Australian Metro Hiring Corridors</span>
          </div>
        </div>
      </div>

      {/* Bottom Quick-Action Link Banner */}
      <div className="fj-map-bottom-cta">
        <span>Click any pin or zone above to open dedicated Australian career guides and salary benchmarks.</span>
        <div className="fj-map-quick-links">
          {["melbourne", "sydney", "brisbane", "perth", "adelaide", "geelong"].map((city) => (
            <Link
              key={city}
              href={`/jobs/${city}`}
              className="fj-map-quick-link-btn"
              prefetch={false}
            >
              <span>{city.charAt(0).toUpperCase() + city.slice(1)}</span>
              <ExternalLink size={12} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

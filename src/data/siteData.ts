import heroSolar from "@/assets/hero-solar.jpg";
import teamSolar from "@/assets/team-solar.jpg";
import commercialSolar from "@/assets/commercial-solar.jpg";
import streetLight from "@/assets/street-light.jpg";
import waterPump from "@/assets/water-pump.jpg";
import waterHeater from "@/assets/water-heater.jpg";
import happyFamily from "@/assets/happy-family.jpg";
import installationKit from "@/assets/installation-kit.jpg";

export const images = {
  hero: heroSolar,
  team: teamSolar,
  commercial: commercialSolar,
  streetLight,
  waterPump,
  waterHeater,
  happyFamily,
  installationKit,
};

export const services = [
  { name: "On Grid Solar", slug: "on-grid-solar", image: commercialSolar, desc: "Grid-connected solar systems that reduce your electricity bill by feeding excess power back to the grid. Ideal for homes and businesses with consistent grid supply." },
  { name: "Off Grid Solar", slug: "off-grid-solar", image: heroSolar, desc: "Independent solar systems with battery backup for areas with unreliable grid supply. Perfect for remote locations and rural homes." },
  { name: "Hybrid Solar", slug: "hybrid-solar", image: teamSolar, desc: "Best of both worlds — grid-connected with battery backup. Enjoy uninterrupted power supply with maximum savings." },
  { name: "Solar Street Light", slug: "solar-street-light", image: streetLight, desc: "Autonomous solar-powered street lighting solutions for villages, colonies, and commercial areas. Zero electricity cost." },
  { name: "Solar Water Pump", slug: "solar-water-pump", image: waterPump, desc: "Solar-powered irrigation pumps for Indian farmers. Reduce diesel costs and increase agricultural productivity." },
  { name: "Solar Aata Chakki", slug: "solar-aata-chakki", image: commercialSolar, desc: "Solar-powered flour mills for rural entrepreneurs. Start your business with zero electricity cost." },
  { name: "Solar Water Heater", slug: "solar-water-heater", image: waterHeater, desc: "Energy-efficient solar water heating systems for homes, hotels, and hospitals. Save up to 80% on water heating costs." },
  { name: "Solar Installation", slug: "solar-installation", image: teamSolar, desc: "Professional solar panel installation services by certified technicians. Quality assured with warranty support." },
  { name: "Solar AMC Service", slug: "solar-amc-service", image: commercialSolar, desc: "Annual Maintenance Contracts to keep your solar systems running at peak performance year-round." },
  { name: "Solar Installation Kit", slug: "solar-installation-kit", image: installationKit, desc: "Complete solar installation kits including panels, inverters, mounting structures, cables, and accessories." },
];

export const installationKitItems = [
  { name: "Solar Structure", slug: "solar-structure", desc: "High-quality galvanized iron and aluminum mounting structures for rooftop and ground-mount solar installations. Designed for Indian weather conditions with 25+ year durability." },
  { name: "ACDB & DCDB Box", slug: "acdb-dcdb-box", desc: "AC Distribution Box and DC Distribution Box for safe solar power distribution. IP65 rated, surge protection enabled, designed for Indian solar systems." },
  { name: "AC & DC Cable", slug: "ac-dc-cable", desc: "UV-resistant, flame-retardant solar cables for AC and DC connections. TUV certified, designed for outdoor installation with 25-year lifespan." },
  { name: "MC4 Connector", slug: "mc4-connector", desc: "Industrial-grade MC4 connectors for secure solar panel connections. Waterproof, UV-resistant, and designed for quick installation." },
  { name: "LA & Earthing", slug: "la-earthing", desc: "Lightning Arrestor and earthing systems for solar installation safety. Protect your solar investment from lightning and electrical surges." },
];

export const subsidyStates = [
  { name: "Bihar", slug: "bihar", subsidy: "Up to ₹78,000 for 3kW systems under PM Surya Ghar Yojana. Bihar residents can save up to 40% on solar installation costs.", eligibility: "Indian citizen, residential property owner in Bihar, valid electricity connection, Aadhaar linked bank account.", benefits: ["40% subsidy on 1-3kW systems", "Free electricity generation", "25-year panel warranty", "Net metering support", "Reduced electricity bills"] },
  { name: "Uttar Pradesh", slug: "uttar-pradesh", subsidy: "UP government provides additional state subsidy on top of central government scheme. Get up to ₹78,000 subsidy.", eligibility: "UP resident, property owner, valid UPPCL electricity connection, Aadhaar verification required.", benefits: ["Central + State subsidy", "Net metering facility", "Reduced tariff rates", "Green energy certificate", "Tax benefits"] },
  { name: "Jharkhand", slug: "jharkhand", subsidy: "Jharkhand solar subsidy under PM Surya Ghar scheme. Up to 40% subsidy for residential installations.", eligibility: "Jharkhand resident, homeowner, valid electricity bill, bank account linked to Aadhaar.", benefits: ["40% central subsidy", "Additional state incentives", "Net metering", "Priority installation", "Free maintenance for 5 years"] },
  { name: "West Bengal", slug: "west-bengal", subsidy: "West Bengal offers attractive solar subsidies for residential customers. Apply through state portal.", eligibility: "WB resident, property owner, WBSEDCL connection, valid ID proof.", benefits: ["Government subsidy up to 40%", "Reduced installation cost", "Net metering benefits", "Green energy credits", "Long-term savings"] },
  { name: "Haryana", slug: "haryana", subsidy: "Haryana provides generous solar subsidies through HAREDA. Up to 40% subsidy available.", eligibility: "Haryana resident, rooftop owner, valid electricity connection, Aadhaar card.", benefits: ["40% subsidy", "State incentives", "Net metering", "Fast approval process", "Quality assured installation"] },
  { name: "Delhi", slug: "delhi", subsidy: "Delhi offers one of the best solar subsidy programs in India. Generation-based incentive also available.", eligibility: "Delhi resident, property owner, BSES/NDPL/MES connection, valid documents.", benefits: ["Central subsidy", "Generation-based incentive", "Net metering", "Pollution reduction credit", "Tax exemption benefits"] },
  { name: "Punjab", slug: "punjab", subsidy: "Punjab solar subsidy program supports residential solar adoption. Apply through PEDA portal.", eligibility: "Punjab resident, homeowner, PSPCL electricity connection, valid Aadhaar.", benefits: ["Government subsidy", "State PEDA support", "Net metering", "Agricultural pump subsidy", "Rural electrification support"] },
  { name: "Rajasthan", slug: "rajasthan", subsidy: "Rajasthan — India's solar capital. Excellent solar subsidy and high solar generation potential.", eligibility: "Rajasthan resident, property owner, valid electricity connection, Aadhaar.", benefits: ["Maximum solar generation", "40% subsidy", "Net metering", "Desert climate advantage", "State policy support"] },
];

export const amcServices = [
  { name: "On Grid Solar AMC", slug: "on-grid-solar-amc", desc: "Annual maintenance for grid-connected solar systems. Includes panel cleaning, inverter check, wiring inspection, and performance monitoring." },
  { name: "Off Grid Solar AMC", slug: "off-grid-solar-amc", desc: "Comprehensive maintenance for off-grid systems including battery health check, charge controller inspection, and panel cleaning." },
  { name: "Hybrid Solar AMC", slug: "hybrid-solar-amc", desc: "Full service maintenance for hybrid solar systems. Covers grid-tie inverter, battery bank, panel cleaning, and system optimization." },
  { name: "Solar Street Light AMC", slug: "solar-street-light-amc", desc: "Maintenance contracts for solar street light installations. Includes LED replacement, battery check, panel cleaning, and sensor calibration." },
  { name: "Solar Water Pump AMC", slug: "solar-water-pump-amc", desc: "Service contracts for solar pump systems. Motor check, panel cleaning, controller inspection, and pump maintenance included." },
  { name: "Solar Aata Chakki AMC", slug: "solar-aata-chakki-amc", desc: "Maintenance service for solar-powered flour mills. Motor servicing, panel cleaning, electrical inspection, and performance tuning." },
];

export const reviews = [
  { name: "Rajesh Kumar", city: "Patna", text: "Very professional installation and great service. My electricity bill reduced by 80% after installing solar panels from Smart Power Energy." },
  { name: "Sunita Devi", city: "Ranchi", text: "Saved my electricity bill significantly. The team was very helpful in getting the government subsidy approved." },
  { name: "Amit Singh", city: "Lucknow", text: "Highly recommend Smart Power Energy. Quality panels, expert installation, and excellent after-sales support." },
  { name: "Priya Sharma", city: "Jaipur", text: "Affordable and reliable solar solutions. The solar calculator on their website helped me understand my savings before installation." },
  { name: "Vikram Patel", city: "Delhi", text: "Best solar company in India. They handled everything from subsidy paperwork to installation. Very smooth process." },
  { name: "Meena Kumari", city: "Varanasi", text: "Our factory electricity cost reduced by 70%. The commercial solar installation was completed on time and within budget." },
];

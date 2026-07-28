export interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  builtUpArea: string;
  completionYear: string;
  image: string;
  desc: string;
  features: string[];
  specs: {
    structureType: string;
    foundation: string;
    steelGrade: string;
    cementGrade: string;
    wastageControl: string;
    isCode: string;
  };
  clientBrief: string;
  engineeringHighlight: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Modern Villa Retreat",
    category: "Residential",
    location: "Patia, Bhubaneswar, Odisha",
    builtUpArea: "3,400 sq.ft (G+2)",
    completionYear: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    desc: "A comprehensive G+2 residential architectural and civil structural project focusing on contemporary aesthetics, space optimization, and IS-compliant earthquake-resistant frame design.",
    features: ["Vastu Compliant Layout", "Fe500D TMT Reinforcement", "Cantilevered Balconies", "Full AutoCAD Approval Set"],
    specs: {
      structureType: "RCC Frame Structure with Shear Walls",
      foundation: "Isolated Trapezoidal Footing (5.5 ft depth)",
      steelGrade: "Fe500D TMT (Primary 16mm & 20mm)",
      cementGrade: "PPC 53 Grade Concrete (M20 Slab / M25 Column)",
      wastageControl: "BBS (Bar Bending Schedule) Optimized < 2.5%",
      isCode: "IS 456:2000 & IS 1893:2016 (Seismic Zone III)"
    },
    clientBrief: "Create a luxurious 5-BHK private family residence with seamless indoor-outdoor connectivity, maximum natural lighting, and zero compromised corners.",
    engineeringHighlight: "Engineered a 14-foot column-free cantilever slab for the front terrace using heavy 20mm structural rebar ties and high-grade M25 concrete."
  },
  {
    id: 2,
    title: "Skyline Apartments",
    category: "Commercial",
    location: "CDA Sector 9, Cuttack",
    builtUpArea: "45,000 sq.ft (B+G+11)",
    completionYear: "2024",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
    desc: "12-floor high-rise residential apartment complex featuring basement parking management, dual fire-escape stairwells, and municipal BDA approval blueprints.",
    features: ["12 Floors Tower", "Underground Basement Parking", "Fire Safety MEP Schematics", "Dual Elevators"],
    specs: {
      structureType: "Commercial High-Rise RCC Framed Structure",
      foundation: "Raft Foundation with Micro Piling",
      steelGrade: "Fe550D High Ductility Steel",
      cementGrade: "M30 Ready Mix Concrete (RMC)",
      wastageControl: "Digital Quantity Takeoff (QTO) & ERP sync",
      isCode: "NBC 2016 Part 4 Fire Safety & IS 13920 Ductile Detailing"
    },
    clientBrief: "Design a space-efficient 36-unit apartment complex maximizing plot coverage while ensuring 100% compliance with BDA setback norms.",
    engineeringHighlight: "Implemented dual subterranean retaining walls with waterproof membrane barrier to isolate groundwater pressure."
  },
  {
    id: 3,
    title: "Eco Office Hub",
    category: "Commercial",
    location: "Infocity, Bhubaneswar",
    builtUpArea: "18,200 sq.ft",
    completionYear: "2023",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    desc: "Sustainable corporate office building incorporating open-plan structural steel trusses, double-glazed curtain walls, and rooftop rainwater harvesting.",
    features: ["Green Building Certified", "Open Span Steel Trusses", "Rainwater Harvesting Pit", "Solar Power Grid Ready"],
    specs: {
      structureType: "Composite Steel-Concrete Structure",
      foundation: "Combined RCC Strip Footing",
      steelGrade: "Structural Steel E250 (IS 2062)",
      cementGrade: "M25 Fly Ash Concrete",
      wastageControl: "Prefabricated Steel Joists & Deck Sheets",
      isCode: "IS 800:2007 (Steel Structures) & ECBC 2017"
    },
    clientBrief: "Construct a flexible, open-plan tech workspace with high thermal insulation and modular floor plates for easy office expansion.",
    engineeringHighlight: "Designed 18-meter clear-span steel roof trusses without intermediate column supports, maximizing interior usable space."
  },
  {
    id: 4,
    title: "Heritage Fort Restoration",
    category: "Renovation",
    location: "Old Town, Bhubaneswar",
    builtUpArea: "8,500 sq.ft",
    completionYear: "2023",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80",
    desc: "Laser-measured architectural retrofitting and structural strengthening for a traditional colonial heritage estate, preserving historical stonework.",
    features: ["Structural Retrofitting", "Laterite Stone Restoration", "Lime Mortar Injection", "Heritage Compliance"],
    specs: {
      structureType: "Load Bearing Laterite Masonry with Steel Jacketing",
      foundation: "Underpinned Stone Masonry Foundation",
      steelGrade: "Epoxy Coated Mild Steel Tie Rods",
      cementGrade: "Non-Shrink Polymer Modified Mortar & Hydraulic Lime",
      wastageControl: "Salvaged Material Reuse > 80%",
      isCode: "IS 13935:2009 (Repair & Retrofitting of Structures)"
    },
    clientBrief: "Restore structural safety and stabilize 80-year-old load-bearing walls without altering the authentic heritage exterior facade.",
    engineeringHighlight: "Injected low-viscosity polymer mortar into masonry fissures and added hidden carbon-fiber polymer wraps around distressed arches."
  },
  {
    id: 5,
    title: "Urban Duplex Villa",
    category: "Residential",
    location: "Khandagiri, Bhubaneswar",
    builtUpArea: "2,800 sq.ft",
    completionYear: "2024",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    desc: "Compact modern duplex designed for a narrow 30x40 ft urban plot. Features double-height living rooms, skylights, and rooftop garden isolation.",
    features: ["Narrow Plot Optimization", "Double Height Ceiling", "Skylight Ventilation", "Private Terrace Garden"],
    specs: {
      structureType: "RCC Frame with AAC Lightweight Blocks",
      foundation: "Isolated Step Footing",
      steelGrade: "Fe500D TMT Rebar",
      cementGrade: "M20 Grade Cast-in-Situ Concrete",
      wastageControl: "Precision Block Cutting & Dry Mortar Adhesive",
      isCode: "IS 2185 Part 3 (AAC Block Masonry Standard)"
    },
    clientBrief: "Maximize indoor volume and light on a tight urban plot while maintaining complete acoustics and privacy from neighboring houses.",
    engineeringHighlight: "Engineered a central glass skylight shaft with integrated ventilation cowls that naturally cools the building through stack effect."
  },
  {
    id: 6,
    title: "Lakeside Eco Resort",
    category: "Hospitality",
    location: "Chilika Lake Side, Odisha",
    builtUpArea: "22,000 sq.ft",
    completionYear: "2024",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=80",
    desc: "Topographical slope masterplanning for an eco-hospitality resort. Includes cottage structural detailing, boardwalk piers, and cantilevered infinity pool.",
    features: ["Contour Terrain Analysis", "Stilt Villa Design", "Cantilever Infinity Pool", "Eco Sewage Treatment"],
    specs: {
      structureType: "Stilt Concrete Piers with Treated Timber & Light Steel Frame",
      foundation: "Bored Cast-in-Situ Concrete Piles",
      steelGrade: "Hot-Dip Galvanized Anti-Corrosive Steel",
      cementGrade: "Sulphate Resisting Concrete (SRC M30)",
      wastageControl: "Off-site Prefabricated Wall Panels",
      isCode: "IS 456 Appendix A (Corrosive Coastal Environment Protection)"
    },
    clientBrief: "Build 12 luxury over-water and hillside cottages with zero disturbance to natural slope contours and coastal eco-zones.",
    engineeringHighlight: "Designed marine-grade concrete pile foundations treated against saline coastal water corrosion with epoxy-coated steel reinforcement."
  }
];

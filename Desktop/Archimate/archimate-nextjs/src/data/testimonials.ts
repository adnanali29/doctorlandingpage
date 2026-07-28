export interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  projectType: string;
  rating: number;
  content: string;
  avatar: string;
  verified: boolean;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Er. Rajesh K. Patra",
    role: "Chief Civil Contractor",
    location: "Patia, Bhubaneswar",
    projectType: "G+3 Luxury Residential Villa",
    rating: 5,
    content: "ArchiMate provided flawless AutoCAD 2D structural layouts and column-beam details. On-site execution became 40% faster because every measurement, lap length, and steel bending schedule was crystal clear.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Soumya Mishra",
    role: "Property Owner",
    location: "Cuttack, Odisha",
    projectType: "Duplex Home & Vastu Planning",
    rating: 5,
    content: "We wanted a modern facade without sacrificing traditional Vastu principles. ArchiMate delivered a stunning G+1 layout with 3D front elevation renders that perfectly matched our dream home vision.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    verified: true,
  },
  {
    id: 3,
    name: "Amitabh Swain",
    role: "Managing Director, Kalinga Logistics",
    location: "Infocity, Bhubaneswar",
    projectType: "Commercial Office Complex (15,000 sq.ft)",
    rating: 5,
    content: "Their municipal approval blueprint drawings were approved on the first submission by BDA. Their civil calculators and structural load analysis gave us exact material estimations before ordering.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    verified: true,
  },
  {
    id: 4,
    name: "Priyanka Sahoo",
    role: "Architectural Interior Designer",
    location: "Puri, Odisha",
    projectType: "Heritage Resort & Cottage Layout",
    rating: 5,
    content: "Working with ArchiMate's civil drafting team is effortless. Their cross-sectional details, plumbing schematics, and elevation drawings match global standards. Highly recommended for complex projects!",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    verified: true,
  },
];

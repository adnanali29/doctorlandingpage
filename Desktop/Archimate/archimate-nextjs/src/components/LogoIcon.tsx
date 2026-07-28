"use client";

export function LogoIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* White Outer Sticker Badge & Border */}
        <path
          d="M 18 10 H 82 A 6 6 0 0 1 88 16 V 84 A 6 6 0 0 1 82 90 H 26 A 12 12 0 0 1 14 78 V 16 A 6 6 0 0 1 20 10 Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Blueprint Rolled Paper Outer Outline */}
        <path
          d="M 20 12 H 82 A 4 4 0 0 1 86 16 V 84 A 4 4 0 0 1 82 88 H 26 A 10 10 0 0 1 16 78 V 16 A 4 4 0 0 1 20 12 Z"
          fill="#FFFBF7"
          stroke="#E07A3A"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Rolled Corner Fold */}
        <path
          d="M 16 78 A 10 10 0 0 0 26 88 H 20 A 4 4 0 0 1 16 84 V 78 Z"
          fill="#E07A3A"
        />

        {/* Title Box Lines at Bottom */}
        <path
          d="M 52 78 H 86 M 52 78 V 88 M 68 78 V 88 M 68 83 H 86"
          stroke="#555555"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Dimension & Grid Lines */}
        <path
          d="M 28 32 H 74 M 28 70 H 74"
          stroke="#777777"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M 28 32 V 70 M 74 32 V 70"
          stroke="#555555"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Dimension Arrows */}
        <path d="M 28 32 L 32 29 M 28 32 L 32 35" stroke="#444" strokeWidth="1.5" />
        <path d="M 74 32 L 70 29 M 74 32 L 70 35" stroke="#444" strokeWidth="1.5" />
        <path d="M 28 70 L 32 67 M 28 70 L 32 73" stroke="#444" strokeWidth="1.5" />
        <path d="M 74 70 L 70 67 M 74 70 L 70 73" stroke="#444" strokeWidth="1.5" />

        {/* Architectural Compass Tool */}
        {/* Compass Hinge / Top Knob */}
        <circle cx="50" cy="30" r="4.5" fill="#E07A3A" stroke="#E07A3A" strokeWidth="1" />
        <path d="M 50 24 V 28" stroke="#E07A3A" strokeWidth="3" strokeLinecap="round" />

        {/* Compass Curved Arc */}
        <path
          d="M 38 52 A 16 16 0 0 1 62 52"
          fill="none"
          stroke="#E07A3A"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Compass Left Leg */}
        <path
          d="M 47 33 L 34 66 A 3 3 0 0 0 39 68 L 49 35 Z"
          fill="#E07A3A"
          stroke="#E07A3A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Compass Right Leg */}
        <path
          d="M 53 33 L 66 66 A 3 3 0 0 1 61 68 L 51 35 Z"
          fill="#E07A3A"
          stroke="#E07A3A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

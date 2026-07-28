export function Marquee() {
  const items = [
    "AutoCAD 2D & 3D Drafting",
    "Structural Layouts",
    "Section Details",
    "3D Elevation Design",
    "Site Planning",
    "Municipal Submissions",
    "Photorealistic Renders",
  ];

  return (
    <div className="marquee-wrap">
      <div className="marquee-inner">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="m-item">
            <span className="m-dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

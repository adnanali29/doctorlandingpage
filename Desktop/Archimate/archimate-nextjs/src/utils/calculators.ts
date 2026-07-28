// Civil Engineering Calculation Utilities

export interface BrickCalcInput {
  wallLength: number; // in feet
  wallHeight: number; // in feet
  wallThickness: number; // in inches (e.g., 5 or 10 inch wall)
  mortarRatio: "1:4" | "1:6"; // Cement : Sand ratio
  brickLength: number; // in inches (standard: 9 inch)
  brickWidth: number; // in inches (standard: 4.25 inch)
  brickHeight: number; // in inches (standard: 2.75 inch)
  wastagePercent: number; // e.g. 5%
}

export interface BrickCalcOutput {
  wallVolumeCuFt: number;
  totalBricksNeeded: number;
  bricksWithWastage: number;
  mortarVolumeCuFt: number;
  dryMortarVolumeCuFt: number;
  cementBags: number; // 50kg bags
  sandCuFt: number;
  sandTons: number;
}

export function calculateBricks(input: BrickCalcInput): BrickCalcOutput {
  const thicknessFeet = input.wallThickness / 12;
  const wallVolumeCuFt = input.wallLength * input.wallHeight * thicknessFeet;

  // Single brick volume with mortar (adding ~0.5 inch / 12.5mm mortar joint)
  const brickLenFt = (input.brickLength + 0.5) / 12;
  const brickWidFt = (input.brickWidth + 0.5) / 12;
  const brickHgtFt = (input.brickHeight + 0.5) / 12;
  const brickVolumeWithMortar = brickLenFt * brickWidFt * brickHgtFt;

  // Raw brick count
  const rawBricks = wallVolumeCuFt / brickVolumeWithMortar;
  const totalBricksNeeded = Math.ceil(rawBricks);
  const bricksWithWastage = Math.ceil(totalBricksNeeded * (1 + input.wastagePercent / 100));

  // Actual brick volume without mortar
  const actualBrickVolSingle = (input.brickLength / 12) * (input.brickWidth / 12) * (input.brickHeight / 12);
  const totalActualBrickVol = totalBricksNeeded * actualBrickVolSingle;
  const wetMortarVolume = Math.max(0, wallVolumeCuFt - totalActualBrickVol);

  // Dry mortar volume factor is ~1.33 for brick masonry
  const dryMortarVolumeCuFt = wetMortarVolume * 1.33;

  // Mix ratio split
  const [cRatio, sRatio] = input.mortarRatio.split(":").map(Number);
  const totalParts = cRatio + sRatio;

  const cementVolCuFt = (dryMortarVolumeCuFt * cRatio) / totalParts;
  // 1 bag of 50kg cement = 1.226 cu.ft
  const cementBags = Math.ceil((cementVolCuFt / 1.226) * 10) / 10;

  const sandCuFt = Math.round(((dryMortarVolumeCuFt * sRatio) / totalParts) * 10) / 10;
  // 1 cu.ft sand ~ 45 kg -> 1 ton ~ 22.2 cu.ft
  const sandTons = Math.round((sandCuFt / 22.2) * 100) / 100;

  return {
    wallVolumeCuFt: Math.round(wallVolumeCuFt * 100) / 100,
    totalBricksNeeded,
    bricksWithWastage,
    mortarVolumeCuFt: Math.round(wetMortarVolume * 100) / 100,
    dryMortarVolumeCuFt: Math.round(dryMortarVolumeCuFt * 100) / 100,
    cementBags,
    sandCuFt,
    sandTons,
  };
}

// -------------------------------------------------------------
// Concrete Calculator
// -------------------------------------------------------------

export interface ConcreteCalcInput {
  length: number; // in feet
  width: number; // in feet
  depth: number; // in inches
  grade: "M10" | "M15" | "M20" | "M25"; // M20 is standard (1 : 1.5 : 3)
  wastagePercent: number;
}

export interface ConcreteCalcOutput {
  volumeCuFt: number;
  volumeCuM: number;
  dryVolumeCuFt: number;
  cementBags: number;
  sandCuFt: number;
  sandTons: number;
  aggregateCuFt: number;
  aggregateTons: number;
  waterLiters: number;
}

export function calculateConcrete(input: ConcreteCalcInput): ConcreteCalcOutput {
  const depthFeet = input.depth / 12;
  const volumeCuFt = input.length * input.width * depthFeet * (1 + input.wastagePercent / 100);
  const volumeCuM = volumeCuFt / 35.3147;

  // Dry volume safety factor for wet concrete is ~1.54
  const dryVolumeCuFt = volumeCuFt * 1.54;

  // Mix ratios (Cement : Sand : Aggregate)
  const ratios: Record<string, [number, number, number]> = {
    M10: [1, 3, 6], // Total = 10
    M15: [1, 2, 4], // Total = 7
    M20: [1, 1.5, 3], // Total = 5.5
    M25: [1, 1, 2], // Total = 4
  };

  const [cRatio, sRatio, aRatio] = ratios[input.grade] || [1, 1.5, 3];
  const totalRatio = cRatio + sRatio + aRatio;

  const cementVol = (dryVolumeCuFt * cRatio) / totalRatio;
  const cementBags = Math.ceil((cementVol / 1.226) * 10) / 10;

  const sandCuFt = Math.round(((dryVolumeCuFt * sRatio) / totalRatio) * 10) / 10;
  const sandTons = Math.round((sandCuFt / 22.2) * 100) / 100;

  const aggregateCuFt = Math.round(((dryVolumeCuFt * aRatio) / totalRatio) * 10) / 10;
  const aggregateTons = Math.round((aggregateCuFt / 20) * 100) / 100;

  // Water requirement: approx 25 to 28 Liters per bag of cement
  const waterLiters = Math.round(cementBags * 26);

  return {
    volumeCuFt: Math.round(volumeCuFt * 100) / 100,
    volumeCuM: Math.round(volumeCuM * 100) / 100,
    dryVolumeCuFt: Math.round(dryVolumeCuFt * 100) / 100,
    cementBags,
    sandCuFt,
    sandTons,
    aggregateCuFt,
    aggregateTons,
    waterLiters,
  };
}

// -------------------------------------------------------------
// Floor Tile & Flooring Calculator
// -------------------------------------------------------------

export interface FloorCalcInput {
  roomLength: number; // in feet
  roomWidth: number; // in feet
  tileLengthInches: number; // e.g. 24 inch (2 ft)
  tileWidthInches: number; // e.g. 24 inch (2 ft)
  tilesPerBox: number; // e.g. 4 tiles per box
  wastagePercent: number; // standard 10%
  mortarThicknessInches: number; // e.g. 2 inches cement bed
}

export interface FloorCalcOutput {
  roomAreaSqFt: number;
  singleTileAreaSqFt: number;
  tilesNeededRaw: number;
  tilesWithWastage: number;
  boxesNeeded: number;
  cementBagsForBed: number;
  sandCuFtForBed: number;
  tileAdhesiveBags: number; // 20kg bags (if tile adhesive used)
}

export function calculateFlooring(input: FloorCalcInput): FloorCalcOutput {
  const roomAreaSqFt = input.roomLength * input.roomWidth;
  const singleTileAreaSqFt = (input.tileLengthInches / 12) * (input.tileWidthInches / 12);

  const tilesNeededRaw = Math.ceil(roomAreaSqFt / singleTileAreaSqFt);
  const tilesWithWastage = Math.ceil(tilesNeededRaw * (1 + input.wastagePercent / 100));
  const boxesNeeded = Math.ceil(tilesWithWastage / (input.tilesPerBox || 4));

  // Mortar bed volume calculation (1:4 cement:sand mix)
  const bedVolumeCuFt = roomAreaSqFt * (input.mortarThicknessInches / 12);
  const dryBedVolumeCuFt = bedVolumeCuFt * 1.33;
  const cementVolCuFt = (dryBedVolumeCuFt * 1) / 5;
  const cementBagsForBed = Math.ceil((cementVolCuFt / 1.226) * 10) / 10;
  const sandCuFtForBed = Math.round(((dryBedVolumeCuFt * 4) / 5) * 10) / 10;

  // Tile adhesive: 1 bag of 20kg covers ~45-50 sq.ft
  const tileAdhesiveBags = Math.ceil(roomAreaSqFt / 45);

  return {
    roomAreaSqFt: Math.round(roomAreaSqFt * 100) / 100,
    singleTileAreaSqFt: Math.round(singleTileAreaSqFt * 100) / 100,
    tilesNeededRaw,
    tilesWithWastage,
    boxesNeeded,
    cementBagsForBed,
    sandCuFtForBed,
    tileAdhesiveBags,
  };
}

// -------------------------------------------------------------
// Iron Rod / Rebar Steel Weight Calculator
// -------------------------------------------------------------

export interface IronRodCalcInput {
  diameterMm: number; // 8, 10, 12, 16, 20, 25, 32
  rodLengthMeters: number; // standard full length is 12m (40 ft)
  numberOfRods: number;
}

export interface IronRodCalcOutput {
  weightPerRodKg: number;
  totalWeightKg: number;
  totalWeightTons: number;
  totalLengthMeters: number;
  totalLengthFeet: number;
  formulaUsed: string;
  recommendedUse: string;
}

export function calculateIronRodWeight(input: IronRodCalcInput): IronRodCalcOutput {
  // Standard formula: W = (D^2 / 162.2) * Length in meters
  const weightPerMeter = (input.diameterMm * input.diameterMm) / 162.2;
  const weightPerRodKg = weightPerMeter * input.rodLengthMeters;
  const totalWeightKg = weightPerRodKg * input.numberOfRods;
  const totalWeightTons = totalWeightKg / 1000;

  const totalLengthMeters = input.rodLengthMeters * input.numberOfRods;
  const totalLengthFeet = totalLengthMeters * 3.28084;

  const usesByDiameter: Record<number, string> = {
    8: "Stirrups (Rings) & Slab Distribution Bar",
    10: "Main Slab Reinforcement & Staircase Bars",
    12: "Beam Reinforcement & Slab Main Bars",
    16: "Column Reinforcement & Heavy Load Beams",
    20: "Heavy Structural Columns & Foundation Footings",
    25: "Multi-Storey Columns & Heavy Girders",
    32: "Bridge Piers, Industrial Foundations & High-Rise Core",
  };

  return {
    weightPerRodKg: Math.round(weightPerRodKg * 1000) / 1000,
    totalWeightKg: Math.round(totalWeightKg * 100) / 100,
    totalWeightTons: Math.round(totalWeightTons * 1000) / 1000,
    totalLengthMeters: Math.round(totalLengthMeters * 10) / 10,
    totalLengthFeet: Math.round(totalLengthFeet * 10) / 10,
    formulaUsed: `W = (d² / 162.2) × Length = (${input.diameterMm}² / 162.2) × ${input.rodLengthMeters}m`,
    recommendedUse: usesByDiameter[input.diameterMm] || "General RCC Reinforcement",
  };
}

"use client";

import { useState, useId } from "react";
import Link from "next/link";
import {
  calculateBricks,
  calculateConcrete,
  calculateFlooring,
  calculateIronRodWeight,
  BrickCalcInput,
  ConcreteCalcInput,
  FloorCalcInput,
  IronRodCalcInput,
} from "@/utils/calculators";
import { Calculator, Copy, Check, ArrowRight, Layers, Box, Cpu, Grid } from "lucide-react";

export function EngineeringCalculators() {
  const [activeTab, setActiveTab] = useState<"brick" | "concrete" | "floor" | "steel">("steel");
  const [copied, setCopied] = useState(false);

  // Generate unique IDs for input fields to ensure accessibility compliance
  const wallLenId = useId();
  const wallHgtId = useId();
  const wallThickId = useId();
  const mortarRatioId = useId();
  const brickWastageId = useId();

  const concLenId = useId();
  const concWidId = useId();
  const concDepthId = useId();
  const concGradeId = useId();
  const concWastageId = useId();

  const roomLenId = useId();
  const roomWidId = useId();
  const tileLenId = useId();
  const tileWidId = useId();
  const tileWastageId = useId();

  const steelDiaId = useId();
  const steelLenId = useId();
  const steelCountId = useId();

  // Brick State
  const [brickInput, setBrickInput] = useState<BrickCalcInput>({
    wallLength: 50,
    wallHeight: 10,
    wallThickness: 10, // 10 inch wall
    mortarRatio: "1:6",
    brickLength: 9,
    brickWidth: 4.25,
    brickHeight: 2.75,
    wastagePercent: 5,
  });

  // Concrete State
  const [concreteInput, setConcreteInput] = useState<ConcreteCalcInput>({
    length: 30,
    width: 20,
    depth: 5, // 5 inch RCC slab
    grade: "M20",
    wastagePercent: 5,
  });

  // Flooring State
  const [floorInput, setFloorInput] = useState<FloorCalcInput>({
    roomLength: 20,
    roomWidth: 15,
    tileLengthInches: 24,
    tileWidthInches: 24,
    tilesPerBox: 4,
    wastagePercent: 10,
    mortarThicknessInches: 2,
  });

  // Steel Iron Rod State
  const [steelInput, setSteelInput] = useState<IronRodCalcInput>({
    diameterMm: 12,
    rodLengthMeters: 12, // standard length
    numberOfRods: 50,
  });

  // Calculated Results
  const brickResult = calculateBricks(brickInput);
  const concreteResult = calculateConcrete(concreteInput);
  const floorResult = calculateFlooring(floorInput);
  const steelResult = calculateIronRodWeight(steelInput);

  const copySummary = () => {
    let text = "";
    if (activeTab === "steel") {
      text = `[ArchiMate Steel Calculation]\nRod Diameter: ${steelInput.diameterMm} mm\nLength: ${steelInput.rodLengthMeters} m | Rods: ${steelInput.numberOfRods}\nTotal Weight: ${steelResult.totalWeightKg} kg (${steelResult.totalWeightTons} Tons)\nFormula: ${steelResult.formulaUsed}\nUse: ${steelResult.recommendedUse}`;
    } else if (activeTab === "brick") {
      text = `[ArchiMate Brick Calculation]\nWall: ${brickInput.wallLength}' L x ${brickInput.wallHeight}' H x ${brickInput.wallThickness}" Thick\nBricks Needed: ${brickResult.bricksWithWastage} (incl. ${brickInput.wastagePercent}% wastage)\nCement Bags: ${brickResult.cementBags} bags\nSand Needed: ${brickResult.sandCuFt} cu.ft (${brickResult.sandTons} tons)`;
    } else if (activeTab === "concrete") {
      text = `[ArchiMate Concrete Calculation]\nSlab: ${concreteInput.length}' x ${concreteInput.width}' x ${concreteInput.depth}" (${concreteInput.grade})\nConcrete Vol: ${concreteResult.volumeCuFt} cu.ft (${concreteResult.volumeCuM} m³)\nCement: ${concreteResult.cementBags} bags\nSand: ${concreteResult.sandCuFt} cu.ft\nAggregate: ${concreteResult.aggregateCuFt} cu.ft\nWater: ${concreteResult.waterLiters} Liters`;
    } else {
      text = `[ArchiMate Flooring Calculation]\nRoom Area: ${floorResult.roomAreaSqFt} sq.ft\nTiles Needed: ${floorResult.tilesWithWastage} tiles (${floorResult.boxesNeeded} boxes)\nCement Bed: ${floorResult.cementBagsForBed} bags\nSand: ${floorResult.sandCuFtForBed} cu.ft`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Header Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#0d0d0d] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#e07a3a]/15 border border-[#e07a3a]/30 flex items-center justify-center text-[#e07a3a]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Civil Engineering Calculators
            </h3>
            <p className="text-xs text-[#888]">
              Instant IS-compliant material, concrete, brick & steel estimators
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-3 sm:mt-0 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab("steel")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "steel"
                ? "bg-[#e07a3a] text-white shadow-lg shadow-[#e07a3a]/20"
                : "text-[#888] hover:text-white hover:bg-white/5"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> Steel Rebar
          </button>
          <button
            onClick={() => setActiveTab("brick")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "brick"
                ? "bg-[#e07a3a] text-white shadow-lg shadow-[#e07a3a]/20"
                : "text-[#888] hover:text-white hover:bg-white/5"
            }`}
          >
            <Box className="w-3.5 h-3.5" /> Brick Masonry
          </button>
          <button
            onClick={() => setActiveTab("concrete")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "concrete"
                ? "bg-[#e07a3a] text-white shadow-lg shadow-[#e07a3a]/20"
                : "text-[#888] hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Concrete Slab
          </button>
          <button
            onClick={() => setActiveTab("floor")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "floor"
                ? "bg-[#e07a3a] text-white shadow-lg shadow-[#e07a3a]/20"
                : "text-[#888] hover:text-white hover:bg-white/5"
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Flooring Tiles
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* TAB 1: IRON ROD STEEL CALCULATOR */}
          {activeTab === "steel" && (
            <>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#e07a3a] uppercase">
                  Rebar Diameter & Thickness
                </span>
                <label htmlFor={steelDiaId} className="block text-sm font-semibold text-white mt-1 mb-2">
                  Select Steel Rod Thickness (d in mm):
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {[8, 10, 12, 16, 20, 25, 32].map((dia) => (
                    <button
                      key={dia}
                      onClick={() => setSteelInput({ ...steelInput, diameterMm: dia })}
                      className={`py-2.5 rounded-md text-xs font-bold transition-all border ${
                        steelInput.diameterMm === dia
                          ? "bg-[#e07a3a] border-[#e07a3a] text-white shadow-md shadow-[#e07a3a]/30"
                          : "bg-white/5 border-white/10 text-[#bbb] hover:border-white/30"
                      }`}
                    >
                      {dia} mm
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={steelLenId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Length per Rod (Meters)
                  </label>
                  <input
                    id={steelLenId}
                    type="number"
                    value={steelInput.rodLengthMeters}
                    onChange={(e) =>
                      setSteelInput({ ...steelInput, rodLengthMeters: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                  <span className="text-[11px] text-[#666] mt-1 block">Standard full rod = 12m (40 ft)</span>
                </div>

                <div>
                  <label htmlFor={steelCountId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Total Quantity (Pieces)
                  </label>
                  <input
                    id={steelCountId}
                    type="number"
                    value={steelInput.numberOfRods}
                    onChange={(e) =>
                      setSteelInput({ ...steelInput, numberOfRods: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                  <span className="text-[11px] text-[#666] mt-1 block">Number of steel bars</span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-xs text-[#aaa]">
                <strong className="text-white block mb-1">Standard IS Formula:</strong>
                <code className="text-[#d4a853] font-mono">{steelResult.formulaUsed}</code>
                <p className="mt-2 text-[#888]">
                  Unit weight per meter = (d² / 162.2) kg/m. Used widely for structural estimation in columns, beams, footings, and slabs.
                </p>
              </div>
            </>
          )}

          {/* TAB 2: BRICK CALCULATOR */}
          {activeTab === "brick" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor={wallLenId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Wall Length (Feet)
                  </label>
                  <input
                    id={wallLenId}
                    type="number"
                    value={brickInput.wallLength}
                    onChange={(e) =>
                      setBrickInput({ ...brickInput, wallLength: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
                <div>
                  <label htmlFor={wallHgtId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Wall Height (Feet)
                  </label>
                  <input
                    id={wallHgtId}
                    type="number"
                    value={brickInput.wallHeight}
                    onChange={(e) =>
                      setBrickInput({ ...brickInput, wallHeight: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
                <div>
                  <label htmlFor={wallThickId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Thickness (Inches)
                  </label>
                  <select
                    id={wallThickId}
                    value={brickInput.wallThickness}
                    onChange={(e) =>
                      setBrickInput({ ...brickInput, wallThickness: Number(e.target.value) })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  >
                    <option value={5}>5 Inch (Single Brick Partition)</option>
                    <option value={10}>10 Inch (Double Brick Main Wall)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={mortarRatioId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Mortar Cement Ratio
                  </label>
                  <select
                    id={mortarRatioId}
                    value={brickInput.mortarRatio}
                    onChange={(e) =>
                      setBrickInput({
                        ...brickInput,
                        mortarRatio: e.target.value as "1:4" | "1:6",
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  >
                    <option value="1:6">1 : 6 (Standard Outer Wall)</option>
                    <option value="1:4">1 : 4 (Rich Structural Mortar)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={brickWastageId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Wastage Factor (%)
                  </label>
                  <input
                    id={brickWastageId}
                    type="number"
                    value={brickInput.wastagePercent}
                    onChange={(e) =>
                      setBrickInput({ ...brickInput, wastagePercent: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
              </div>
            </>
          )}

          {/* TAB 3: CONCRETE CALCULATOR */}
          {activeTab === "concrete" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor={concLenId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Length (Feet)
                  </label>
                  <input
                    id={concLenId}
                    type="number"
                    value={concreteInput.length}
                    onChange={(e) =>
                      setConcreteInput({ ...concreteInput, length: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
                <div>
                  <label htmlFor={concWidId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Width (Feet)
                  </label>
                  <input
                    id={concWidId}
                    type="number"
                    value={concreteInput.width}
                    onChange={(e) =>
                      setConcreteInput({ ...concreteInput, width: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
                <div>
                  <label htmlFor={concDepthId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Slab Depth (Inches)
                  </label>
                  <input
                    id={concDepthId}
                    type="number"
                    value={concreteInput.depth}
                    onChange={(e) =>
                      setConcreteInput({ ...concreteInput, depth: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={concGradeId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Concrete Grade
                  </label>
                  <select
                    id={concGradeId}
                    value={concreteInput.grade}
                    onChange={(e) =>
                      setConcreteInput({
                        ...concreteInput,
                        grade: e.target.value as "M10" | "M15" | "M20" | "M25",
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  >
                    <option value="M20">M20 (1 : 1.5 : 3) — Standard RCC Slab</option>
                    <option value="M25">M25 (1 : 1 : 2) — Heavy Columns & Footings</option>
                    <option value="M15">M15 (1 : 2 : 4) — PCC & Flooring Base</option>
                    <option value="M10">M10 (1 : 3 : 6) — Levelling Course</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={concWastageId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Wastage (%)
                  </label>
                  <input
                    id={concWastageId}
                    type="number"
                    value={concreteInput.wastagePercent}
                    onChange={(e) =>
                      setConcreteInput({
                        ...concreteInput,
                        wastagePercent: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
              </div>
            </>
          )}

          {/* TAB 4: FLOORING CALCULATOR */}
          {activeTab === "floor" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={roomLenId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Room Length (Feet)
                  </label>
                  <input
                    id={roomLenId}
                    type="number"
                    value={floorInput.roomLength}
                    onChange={(e) =>
                      setFloorInput({ ...floorInput, roomLength: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
                <div>
                  <label htmlFor={roomWidId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Room Width (Feet)
                  </label>
                  <input
                    id={roomWidId}
                    type="number"
                    value={floorInput.roomWidth}
                    onChange={(e) =>
                      setFloorInput({ ...floorInput, roomWidth: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor={tileLenId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Tile Size L (Inches)
                  </label>
                  <input
                    id={tileLenId}
                    type="number"
                    value={floorInput.tileLengthInches}
                    onChange={(e) =>
                      setFloorInput({
                        ...floorInput,
                        tileLengthInches: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
                <div>
                  <label htmlFor={tileWidId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Tile Size W (Inches)
                  </label>
                  <input
                    id={tileWidId}
                    type="number"
                    value={floorInput.tileWidthInches}
                    onChange={(e) =>
                      setFloorInput({ ...floorInput, tileWidthInches: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
                <div>
                  <label htmlFor={tileWastageId} className="block text-xs text-[#888] uppercase tracking-wider mb-1 font-semibold">
                    Wastage (%)
                  </label>
                  <input
                    id={tileWastageId}
                    type="number"
                    value={floorInput.wastagePercent}
                    onChange={(e) =>
                      setFloorInput({ ...floorInput, wastagePercent: Number(e.target.value) || 0 })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* OUTPUTS COLUMN */}
        <div className="lg:col-span-6 bg-black/50 border border-white/10 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-white pointer-events-none">
            <Calculator className="w-48 h-48" />
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4a853]">
                Calculation Results
              </span>
              <button
                onClick={copySummary}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#e07a3a] hover:text-white bg-[#e07a3a]/10 hover:bg-[#e07a3a] px-3 py-1.5 rounded transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Estimate
                  </>
                )}
              </button>
            </div>

            {/* RESULTS FOR STEEL */}
            {activeTab === "steel" && (
              <div className="space-y-4">
                <div className="bg-[#e07a3a]/10 border border-[#e07a3a]/30 rounded-lg p-4">
                  <div className="text-xs text-[#aaa] font-medium">Total Steel Weight</div>
                  <div className="text-3xl md:text-4xl font-black text-white mt-1">
                    {steelResult.totalWeightKg}{" "}
                    <span className="text-lg text-[#e07a3a] font-bold">kg</span>
                    <span className="text-sm text-[#888] font-normal ml-3">
                      ({steelResult.totalWeightTons} Metric Tons)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white/5 rounded-md border border-white/5">
                    <span className="text-[#888] block mb-1">Weight per 12m Rod</span>
                    <span className="text-sm font-bold text-white">{steelResult.weightPerRodKg} kg</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-md border border-white/5">
                    <span className="text-[#888] block mb-1">Total Rod Length</span>
                    <span className="text-sm font-bold text-white">
                      {steelResult.totalLengthMeters} m ({steelResult.totalLengthFeet} ft)
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-md border border-white/5 text-xs">
                  <span className="text-[#888] block mb-1">Recommended Application:</span>
                  <span className="text-white font-semibold">{steelResult.recommendedUse}</span>
                </div>
              </div>
            )}

            {/* RESULTS FOR BRICK */}
            {activeTab === "brick" && (
              <div className="space-y-4">
                <div className="bg-[#e07a3a]/10 border border-[#e07a3a]/30 rounded-lg p-4">
                  <div className="text-xs text-[#aaa] font-medium">Bricks Required</div>
                  <div className="text-3xl md:text-4xl font-black text-white mt-1">
                    {brickResult.bricksWithWastage}{" "}
                    <span className="text-lg text-[#e07a3a] font-bold">Pcs</span>
                    <span className="text-xs text-[#888] block mt-1">
                      Includes {brickInput.wastagePercent}% site wastage ({brickResult.totalBricksNeeded} net)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white/5 rounded-md border border-white/5">
                    <span className="text-[#888] block mb-1">Cement Needed</span>
                    <span className="text-sm font-bold text-white">{brickResult.cementBags} Bags (50kg)</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-md border border-white/5">
                    <span className="text-[#888] block mb-1">Sand Needed</span>
                    <span className="text-sm font-bold text-white">
                      {brickResult.sandCuFt} cu.ft ({brickResult.sandTons} tons)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* RESULTS FOR CONCRETE */}
            {activeTab === "concrete" && (
              <div className="space-y-4">
                <div className="bg-[#e07a3a]/10 border border-[#e07a3a]/30 rounded-lg p-4">
                  <div className="text-xs text-[#aaa] font-medium">Concrete Volume & Cement</div>
                  <div className="text-3xl font-black text-white mt-1">
                    {concreteResult.cementBags}{" "}
                    <span className="text-lg text-[#e07a3a] font-bold">Cement Bags</span>
                    <span className="text-xs text-[#888] block mt-1">
                      Total Wet Vol: {concreteResult.volumeCuFt} cu.ft ({concreteResult.volumeCuM} m³)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-white/5 rounded-md border border-white/5">
                    <span className="text-[#888] block text-[10px]">Sand</span>
                    <span className="font-bold text-white">{concreteResult.sandCuFt} cu.ft</span>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-md border border-white/5">
                    <span className="text-[#888] block text-[10px]">Aggregate (Jelly)</span>
                    <span className="font-bold text-white">{concreteResult.aggregateCuFt} cu.ft</span>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-md border border-white/5">
                    <span className="text-[#888] block text-[10px]">Water</span>
                    <span className="font-bold text-white">{concreteResult.waterLiters} Liters</span>
                  </div>
                </div>
              </div>
            )}

            {/* RESULTS FOR FLOORING */}
            {activeTab === "floor" && (
              <div className="space-y-4">
                <div className="bg-[#e07a3a]/10 border border-[#e07a3a]/30 rounded-lg p-4">
                  <div className="text-xs text-[#aaa] font-medium">Tiles & Boxes Required</div>
                  <div className="text-3xl font-black text-white mt-1">
                    {floorResult.tilesWithWastage}{" "}
                    <span className="text-lg text-[#e07a3a] font-bold">Tiles</span>
                    <span className="text-sm text-[#888] font-normal ml-2">
                      ({floorResult.boxesNeeded} Boxes)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white/5 rounded-md border border-white/5">
                    <span className="text-[#888] block mb-1">Mortar Cement Bed</span>
                    <span className="text-sm font-bold text-white">
                      {floorResult.cementBagsForBed} Bags
                    </span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-md border border-white/5">
                    <span className="text-[#888] block mb-1">Tile Adhesive Alternative</span>
                    <span className="text-sm font-bold text-white">
                      {floorResult.tileAdhesiveBags} Bags (20kg)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#888]">
              Need detailed CAD drawings or site quantity verification?
            </span>
            <Link
              href={`/contact?note=${encodeURIComponent(
                `Calculated: ${activeTab.toUpperCase()} Estimation`
              )}`}
              className="px-4 py-2 bg-[#e07a3a] hover:bg-[#c9682b] text-white text-xs font-bold uppercase tracking-wider rounded-md inline-flex items-center gap-1.5 transition-all shadow-md shadow-[#e07a3a]/20"
            >
              Get Free Consultation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

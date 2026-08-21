"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Headquarters Coordinates (India HQ Center)
const INDIA_HQ = {
  id: "india_hq",
  name: "India (HQ)",
  flag: "🇮🇳",
  lat: 20.5937,
  lng: 78.9629,
  city: "New Delhi / National Hub",
  region: "South Asia",
  isHQ: true,
  distance: 0,
};

// Served Client Locations
const CLIENT_COUNTRIES_RAW = [
  { id: "saudi", name: "Saudi Arabia", flag: "🇸🇦", lat: 24.7136, lng: 46.6753, city: "Riyadh", region: "Middle East" },
  { id: "uae", name: "UAE", flag: "🇦🇪", lat: 25.2048, lng: 55.2708, city: "Dubai", region: "Middle East" },
  { id: "qatar", name: "Qatar", flag: "🇶🇦", lat: 25.2854, lng: 51.5310, city: "Doha", region: "Middle East" },
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", lat: 51.5074, lng: -0.1278, city: "London", region: "Europe" },
  { id: "usa", name: "United States", flag: "🇺🇸", lat: 37.0902, lng: -95.7129, city: "Washington D.C.", region: "North America" },
  { id: "canada", name: "Canada", flag: "🇨🇦", lat: 56.1304, lng: -106.3468, city: "Ottawa", region: "North America" },
  { id: "australia", name: "Australia", flag: "🇦🇺", lat: -25.2744, lng: 133.7751, city: "Canberra / Sydney", region: "Oceania" },
  { id: "nz", name: "New Zealand", flag: "🇳🇿", lat: -40.9006, lng: 174.8860, city: "Wellington", region: "Oceania" },
  { id: "bangladesh", name: "Bangladesh", flag: "🇧🇩", lat: 23.6850, lng: 90.3563, city: "Dhaka", region: "South Asia" },
  { id: "srilanka", name: "Sri Lanka", flag: "🇱🇰", lat: 6.9271, lng: 79.8612, city: "Colombo", region: "South Asia" }
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

const CLIENT_COUNTRIES = CLIENT_COUNTRIES_RAW.map((c) => ({
  ...c,
  distance: calculateDistance(INDIA_HQ.lat, INDIA_HQ.lng, c.lat, c.lng),
}));

const ALL_LOCATIONS = [INDIA_HQ, ...CLIENT_COUNTRIES];

const GLOBE_RADIUS = 100;
const ACCENT_COLOR = 0xbcdc00;
const ARC_DRAW_SPEED = 0.014;
const ARC_HOLD_FRAMES = 60;     // Pause after each arc completes
const RESET_HOLD_FRAMES = 120;  // Pause showing all arcs before resetting

function latLngToVector3(lat: number, lng: number, radius: number, altitude = 0) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  const r = radius + altitude;

  const x = -(r * Math.sin(phi) * Math.cos(theta));
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function buildArcCurve(startPos: THREE.Vector3, endPos: THREE.Vector3, segments = 64) {
  const startDir = startPos.clone().normalize();
  const endDir = endPos.clone().normalize();
  const dot = startDir.dot(endDir);
  const angularDist = Math.acos(THREE.MathUtils.clamp(dot, -1, 1));
  const maxAlt = 2.0 + Math.min(angularDist * GLOBE_RADIUS * 0.08, 18.0);

  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;

    let dir;
    if (Math.abs(dot) > 0.9999) {
      const perp = new THREE.Vector3(0, 1, 0);
      if (Math.abs(startDir.dot(perp)) > 0.95) perp.set(1, 0, 0);
      const mid = startDir.clone().add(perp).normalize();
      if (t <= 0.5) {
        dir = startDir.clone().lerp(mid, t * 2).normalize();
      } else {
        dir = mid.clone().lerp(endDir, (t - 0.5) * 2).normalize();
      }
    } else {
      const sinTotal = Math.sin(angularDist);
      const a = Math.sin((1 - t) * angularDist) / sinTotal;
      const b = Math.sin(t * angularDist) / sinTotal;
      dir = startDir.clone().multiplyScalar(a).add(endDir.clone().multiplyScalar(b)).normalize();
    }

    const alt = Math.sin(t * Math.PI) * maxAlt;
    pts.push(dir.multiplyScalar(GLOBE_RADIUS + 0.5 + alt));
  }
  return new THREE.CatmullRomCurve3(pts);
}

function createLandWaterTexture(geojson: any) {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  ctx.fillStyle = "#e2e8f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#1c2933";
  ctx.strokeStyle = "#0e171e";
  ctx.lineWidth = 1;

  function drawRing(ring: any) {
    if (!ring || ring.length === 0) return;
    ctx!.beginPath();
    let started = false;
    for (let i = 0; i < ring.length; i++) {
      const pt = ring[i];
      const x = ((pt[0] + 180) / 360) * canvas.width;
      const y = ((90 - pt[1]) / 180) * canvas.height;
      if (i > 0) {
        const prevPt = ring[i - 1];
        if (Math.abs(pt[0] - prevPt[0]) > 180) {
          ctx!.closePath();
          ctx!.fill();
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.moveTo(x, y);
          continue;
        }
      }
      if (!started) {
        ctx!.moveTo(x, y);
        started = true;
      } else {
        ctx!.lineTo(x, y);
      }
    }
    ctx!.closePath();
    ctx!.fill();
    ctx!.stroke();
  }

  if (geojson && geojson.features) {
    geojson.features.forEach((feature: any) => {
      const geom = feature.geometry;
      if (geom.type === "Polygon") {
        geom.coordinates.forEach((ring: any) => drawRing(ring));
      } else if (geom.type === "MultiPolygon") {
        geom.coordinates.forEach((poly: any) => {
          poly.forEach((ring: any) => drawRing(ring));
        });
      }
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const markersContainerRef = useRef<HTMLDivElement>(null);

  // Spotlight State
  const [spotlightData, setSpotlightData] = useState<any>(null);

  // Orbit controls / animation refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);

  const autoRotateRef = useRef(true);
  const rotationSpeedRef = useRef(0.0015);
  const isTourActiveRef = useRef(false);
  const tourIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentTourIndexRef = useRef(0);
  const targetCameraPosRef = useRef<THREE.Vector3 | null>(null);

  const htmlMarkersRef = useRef<any[]>([]);

  // Sequential Arc System variables
  const arcSequenceDataRef = useRef<any[]>([]);
  const currentArcIndexRef = useRef(0);
  const arcDrawProgressRef = useRef(0);
  const arcPhaseRef = useRef<"drawing" | "holding" | "resetting">("drawing");
  const arcHoldTimerRef = useRef(0);
  const activeTubeMeshRef = useRef<THREE.Mesh | null>(null);
  const activeGlowMeshRef = useRef<THREE.Mesh | null>(null);
  const activeFlyPointRef = useRef<THREE.Mesh | null>(null);
  const completedMeshesRef = useRef<THREE.Mesh[]>([]);
  const completedClientMarkersRef = useRef<THREE.Mesh[]>([]);
  const currentResetOpacityRef = useRef(1.0);

  const selectCountry = (country: any) => {
    const targetVec = latLngToVector3(country.lat, country.lng, GLOBE_RADIUS);
    if (globeGroupRef.current) {
      const worldVec = targetVec.clone().applyMatrix4(globeGroupRef.current.matrixWorld);
      targetCameraPosRef.current = worldVec.clone().normalize().multiplyScalar(260);
    }
    setSpotlightData(country);
  };

  const stopTour = () => {
    isTourActiveRef.current = false;
    if (tourIntervalRef.current) {
      clearInterval(tourIntervalRef.current);
      tourIntervalRef.current = null;
    }
    autoRotateRef.current = true;
  };

  useEffect(() => {
    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 120, 320);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1.0;
    controls.minDistance = 140;
    controls.maxDistance = 600;

    controls.addEventListener("start", () => {
      if (!isTourActiveRef.current) autoRotateRef.current = false;
    });
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(200, 300, 200);
    scene.add(dirLight);

    // 6. Globe Master Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Solid Sphere
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const globeTexture = createLandWaterTexture(null);
    const sphereMat = new THREE.MeshPhongMaterial({
      map: globeTexture,
      specular: 0x222222,
      shininess: 12,
    });
    const globeSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeSphere);

    // Latitude / Longitude Wireframe Grid
    const gridGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(GLOBE_RADIUS + 0.1, 32, 16));
    const gridMat = new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.25 });
    const gridLines = new THREE.LineSegments(gridGeo, gridMat);
    globeGroup.add(gridLines);

    // Dynamic sequential helper methods
    const startDrawingArc = () => {
      if (activeTubeMeshRef.current) {
        globeGroup.remove(activeTubeMeshRef.current);
        activeTubeMeshRef.current.geometry.dispose();
        activeTubeMeshRef.current = null;
      }
      if (activeGlowMeshRef.current) {
        globeGroup.remove(activeGlowMeshRef.current);
        activeGlowMeshRef.current.geometry.dispose();
        activeGlowMeshRef.current = null;
      }

      const data = arcSequenceDataRef.current[currentArcIndexRef.current];
      if (!data) return;

      if (activeFlyPointRef.current) {
        activeFlyPointRef.current.visible = true;
        activeFlyPointRef.current.position.copy(data.curve.getPoint(0));
      }

      arcDrawProgressRef.current = 0;
      arcPhaseRef.current = "drawing";
      arcHoldTimerRef.current = 0;
    };

    const finalizeCurrentArc = () => {
      const data = arcSequenceDataRef.current[currentArcIndexRef.current];
      if (!data) return;

      if (activeTubeMeshRef.current) {
        globeGroup.remove(activeTubeMeshRef.current);
        activeTubeMeshRef.current.geometry.dispose();
        activeTubeMeshRef.current = null;
      }
      if (activeGlowMeshRef.current) {
        globeGroup.remove(activeGlowMeshRef.current);
        activeGlowMeshRef.current.geometry.dispose();
        activeGlowMeshRef.current = null;
      }

      // Permanent Tube
      const tubeGeo = new THREE.TubeGeometry(data.curve, 80, 0.32, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({ color: ACCENT_COLOR });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      globeGroup.add(tubeMesh);
      completedMeshesRef.current.push(tubeMesh);

      // Glow Tube
      const glowGeo = new THREE.TubeGeometry(data.curve, 80, 0.75, 8, false);
      const glowMat = new THREE.MeshBasicMaterial({ color: ACCENT_COLOR, transparent: true, opacity: 0.3 });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      globeGroup.add(glowMesh);
      completedMeshesRef.current.push(glowMesh);

      // Target Beacon Ring & Dot
      const cRingGeo = new THREE.RingGeometry(1.4, 2.6, 32);
      const cRingMat = new THREE.MeshBasicMaterial({
        color: ACCENT_COLOR,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const cRing = new THREE.Mesh(cRingGeo, cRingMat);
      cRing.position.copy(data.clientPos);
      cRing.lookAt(data.clientPos.clone().multiplyScalar(2));
      globeGroup.add(cRing);
      completedClientMarkersRef.current.push(cRing);

      const cDotGeo = new THREE.SphereGeometry(1.6, 16, 16);
      const cDotMat = new THREE.MeshBasicMaterial({ color: ACCENT_COLOR });
      const cDot = new THREE.Mesh(cDotGeo, cDotMat);
      cDot.position.copy(data.clientPos);
      globeGroup.add(cDot);
      completedClientMarkersRef.current.push(cDot);
    };

    const clearAllCompletedArcs = () => {
      completedMeshesRef.current.forEach((m) => {
        globeGroup.remove(m);
        if (m.geometry) m.geometry.dispose();
      });
      completedMeshesRef.current = [];
      completedClientMarkersRef.current.forEach((m) => {
        globeGroup.remove(m);
        if (m.geometry) m.geometry.dispose();
      });
      completedClientMarkersRef.current = [];
    };

    const updateSequentialArc = () => {
      if (arcSequenceDataRef.current.length === 0) return;
      const data = arcSequenceDataRef.current[currentArcIndexRef.current];
      if (!data) return;

      if (arcPhaseRef.current === "drawing") {
        arcDrawProgressRef.current += ARC_DRAW_SPEED;
        if (arcDrawProgressRef.current >= 1) {
          arcDrawProgressRef.current = 1;
          arcPhaseRef.current = "holding";
          arcHoldTimerRef.current = 0;
          finalizeCurrentArc();
          if (activeFlyPointRef.current) activeFlyPointRef.current.visible = false;
        }

        if (arcPhaseRef.current === "drawing") {
          if (activeTubeMeshRef.current) {
            globeGroup.remove(activeTubeMeshRef.current);
            activeTubeMeshRef.current.geometry.dispose();
          }
          if (activeGlowMeshRef.current) {
            globeGroup.remove(activeGlowMeshRef.current);
            activeGlowMeshRef.current.geometry.dispose();
          }

          const segCount = Math.max(2, Math.floor(80 * arcDrawProgressRef.current));
          const partialPts = [];
          for (let i = 0; i <= segCount; i++) {
            const t = (i / segCount) * arcDrawProgressRef.current;
            partialPts.push(data.curve.getPoint(t));
          }
          const partialCurve = new THREE.CatmullRomCurve3(partialPts);

          const tubeGeo = new THREE.TubeGeometry(partialCurve, segCount, 0.32, 8, false);
          const tubeMat = new THREE.MeshBasicMaterial({ color: ACCENT_COLOR });
          activeTubeMeshRef.current = new THREE.Mesh(tubeGeo, tubeMat);
          globeGroup.add(activeTubeMeshRef.current);

          const glowGeo = new THREE.TubeGeometry(partialCurve, segCount, 0.75, 8, false);
          const glowMat = new THREE.MeshBasicMaterial({ color: ACCENT_COLOR, transparent: true, opacity: 0.3 });
          activeGlowMeshRef.current = new THREE.Mesh(glowGeo, glowMat);
          globeGroup.add(activeGlowMeshRef.current);

          if (activeFlyPointRef.current) {
            activeFlyPointRef.current.position.copy(data.curve.getPoint(arcDrawProgressRef.current));
          }
        }
      } else if (arcPhaseRef.current === "holding") {
        arcHoldTimerRef.current++;
        const isLastArc = currentArcIndexRef.current >= arcSequenceDataRef.current.length - 1;
        const holdDuration = isLastArc ? RESET_HOLD_FRAMES : ARC_HOLD_FRAMES;

        if (arcHoldTimerRef.current >= holdDuration) {
          if (isLastArc) {
            arcPhaseRef.current = "resetting";
            arcHoldTimerRef.current = 0;
          } else {
            currentArcIndexRef.current++;
            startDrawingArc();
          }
        }
      } else if (arcPhaseRef.current === "resetting") {
        arcHoldTimerRef.current++;
        const fadeProgress = arcHoldTimerRef.current / 40;
        currentResetOpacityRef.current = Math.max(0, 1 - fadeProgress);

        completedMeshesRef.current.forEach((m) => {
          const mat = m.material as THREE.MeshBasicMaterial;
          if (!mat.transparent) mat.transparent = true;
          mat.opacity = Math.max(0, 1 - fadeProgress);
        });
        completedClientMarkersRef.current.forEach((m) => {
          const mat = m.material as THREE.MeshBasicMaterial;
          if (!mat.transparent) mat.transparent = true;
          mat.opacity = Math.max(0, 1 - fadeProgress);
        });

        if (fadeProgress >= 1) {
          clearAllCompletedArcs();
          currentArcIndexRef.current = 0;
          currentResetOpacityRef.current = 1.0;
          startDrawingArc();
        }
      }
    };

    const createVectorArcsAndFlyPoints = () => {
      const hqPos = latLngToVector3(INDIA_HQ.lat, INDIA_HQ.lng, GLOBE_RADIUS + 0.5);

      // HQ ring & dot
      const hqRingGeo = new THREE.RingGeometry(2.0, 3.6, 32);
      const hqRingMat = new THREE.MeshBasicMaterial({
        color: ACCENT_COLOR,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
      });
      const hqRing = new THREE.Mesh(hqRingGeo, hqRingMat);
      hqRing.position.copy(hqPos);
      hqRing.lookAt(hqPos.clone().multiplyScalar(2));
      globeGroup.add(hqRing);

      const hqDotGeo = new THREE.SphereGeometry(2.0, 16, 16);
      const hqDotMat = new THREE.MeshBasicMaterial({ color: ACCENT_COLOR });
      const hqDot = new THREE.Mesh(hqDotGeo, hqDotMat);
      hqDot.position.copy(hqPos);
      globeGroup.add(hqDot);

      // Pre-compute curves
      CLIENT_COUNTRIES.forEach((client) => {
        const clientPos = latLngToVector3(client.lat, client.lng, GLOBE_RADIUS + 0.5);
        const curve = buildArcCurve(hqPos, clientPos, 80);
        arcSequenceDataRef.current.push({
          client,
          clientPos,
          curve,
        });
      });

      // Flying photon
      const pointGeo = new THREE.SphereGeometry(1.8, 16, 16);
      const pointMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const flyPoint = new THREE.Mesh(pointGeo, pointMat);
      const haloGeo = new THREE.SphereGeometry(3.4, 16, 16);
      const haloMat = new THREE.MeshBasicMaterial({ color: ACCENT_COLOR, transparent: true, opacity: 0.7 });
      flyPoint.add(new THREE.Mesh(haloGeo, haloMat));
      flyPoint.visible = false;
      globeGroup.add(flyPoint);
      activeFlyPointRef.current = flyPoint;

      startDrawingArc();
    };

    const initHTMLMarkers = () => {
      const container = markersContainerRef.current;
      if (!container) return;
      container.innerHTML = "";
      htmlMarkersRef.current = [];

      ALL_LOCATIONS.forEach((loc: any) => {
        const el = document.createElement("div");
        el.className =
          "globe-label flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md border border-gray-200 text-xs font-bold text-gray-800 hover:border-[#bcdc00] hover:text-lime-700";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease, left 0.1s, top 0.1s";

        if (loc.isHQ) {
          el.innerHTML = `<span class="h-2 w-2 rounded-full bg-[#bcdc00] animate-ping"></span><span>🇮🇳</span> <span class="text-lime-700 font-black">HQ: INDIA</span>`;
          el.classList.add("ring-2", "ring-[#bcdc00]", "ring-offset-1");
        } else {
          el.innerHTML = `<span class="text-xs">${loc.flag}</span> <span>${loc.name}</span>`;
        }

        el.onclick = () => {
          stopTour();
          selectCountry(loc);
        };

        container.appendChild(el);

        htmlMarkersRef.current.push({
          element: el,
          pos3D: latLngToVector3(loc.lat, loc.lng, GLOBE_RADIUS + 1.5),
          isHQ: !!loc.isHQ,
        });
      });
    };

    const updateHTMLMarkersPosition = () => {
      if (!cameraRef.current || !globeGroupRef.current) return;
      const tempV = new THREE.Vector3();
      let clientIdx = 0;

      htmlMarkersRef.current.forEach((m) => {
        tempV.copy(m.pos3D);
        tempV.applyMatrix4(globeGroupRef.current!.matrixWorld);

        const distanceToCam = tempV.distanceTo(cameraRef.current!.position);
        const globeCenterDist = cameraRef.current!.position.distanceTo(globeGroupRef.current!.position);

        tempV.project(cameraRef.current!);

        const isBehind = distanceToCam > globeCenterDist;
        const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
        const y = (tempV.y * -0.5 + 0.5) * window.innerHeight;
        const offScreen = Math.abs(tempV.x) > 1.1 || Math.abs(tempV.y) > 1.1;

        if (m.isHQ) {
          if (isBehind || offScreen) {
            m.element.style.opacity = "0";
            m.element.style.pointerEvents = "none";
          } else {
            m.element.style.display = "flex";
            m.element.style.left = `${x}px`;
            m.element.style.top = `${y}px`;
            m.element.style.opacity = "1";
            m.element.style.pointerEvents = "auto";
          }
        } else {
          const myIdx = clientIdx;
          clientIdx++;

          let isVisible = false;
          if (arcPhaseRef.current === "resetting") {
            isVisible = myIdx <= currentArcIndexRef.current;
          } else if (myIdx < currentArcIndexRef.current) {
            isVisible = true;
          } else if (myIdx === currentArcIndexRef.current) {
            isVisible =
              (arcPhaseRef.current === "drawing" && arcDrawProgressRef.current > 0.5) ||
              arcPhaseRef.current === "holding";
          }

          if (isBehind || offScreen || !isVisible) {
            m.element.style.opacity = "0";
            m.element.style.pointerEvents = "none";
          } else {
            m.element.style.display = "flex";
            m.element.style.left = `${x}px`;
            m.element.style.top = `${y}px`;
            m.element.style.opacity =
              arcPhaseRef.current === "resetting" ? `${currentResetOpacityRef.current}` : "1";
            m.element.style.pointerEvents = "auto";
          }
        }
      });
    };

    const renderVectorLandmasses = (geojson: any) => {
      const landGroup = new THREE.Group();

      geojson.features.forEach((feature: any) => {
        const geom = feature.geometry;
        if (geom.type === "Polygon") {
          geom.coordinates.forEach((ring: any) => drawPolyRing(ring, landGroup));
        } else if (geom.type === "MultiPolygon") {
          geom.coordinates.forEach((poly: any) => {
            poly.forEach((ring: any) => drawPolyRing(ring, landGroup));
          });
        }
      });

      globeGroup.add(landGroup);
    };

    const drawPolyRing = (coords: any[], parentGroup: THREE.Group) => {
      const points: THREE.Vector3[] = [];
      coords.forEach((pt) => {
        const lng = pt[0];
        const lat = pt[1];
        points.push(latLngToVector3(lat, lng, GLOBE_RADIUS + 0.3));
      });

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x0f172a,
        linewidth: 1,
        transparent: true,
        opacity: 0.6,
      });
      const line = new THREE.Line(geometry, material);
      parentGroup.add(line);
    };

    // Load Natural Earth Land Vectors
    fetch("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson")
      .then((res) => res.json())
      .then((data) => {
        sphereMat.map = createLandWaterTexture(data);
        sphereMat.needsUpdate = true;
        renderVectorLandmasses(data);
      })
      .catch(() => {
        console.warn("GeoJSON land vector fallback enabled.");
      });

    createVectorArcsAndFlyPoints();
    initHTMLMarkers();

    // Initial Camera Focus
    const indiaVec = latLngToVector3(INDIA_HQ.lat, INDIA_HQ.lng, GLOBE_RADIUS);
    camera.position.copy(indiaVec.clone().normalize().multiplyScalar(300));
    controls.update();

    // Event Listeners
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (autoRotateRef.current && globeGroupRef.current) {
        globeGroupRef.current.rotation.y += rotationSpeedRef.current;
      }

      updateSequentialArc();

      if (targetCameraPosRef.current && cameraRef.current) {
        cameraRef.current.position.lerp(targetCameraPosRef.current, 0.05);
        if (cameraRef.current.position.distanceTo(targetCameraPosRef.current) < 1.0) {
          targetCameraPosRef.current = null;
        }
      }

      if (controlsRef.current) controlsRef.current.update();
      updateHTMLMarkersPosition();

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);

      sphereGeo.dispose();
      sphereMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white select-none">
      {/* 3D Three.js Vector Globe Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-1 grab active:grabbing" />

      {/* HTML Marker Overlay Container */}
      <div ref={markersContainerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden" />

      {/* Selected Country HUD Spotlight Card */}
      {spotlightData && (
        <div className="absolute bottom-6 left-4 md:left-6 z-20 w-80 glass-panel-dark rounded-2xl p-4 transition-all duration-500 shadow-xl border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{spotlightData.flag}</span>
              <div>
                <h3 className="font-bold text-base text-white leading-tight">{spotlightData.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{spotlightData.city} • {spotlightData.region}</p>
              </div>
            </div>
            <button
              onClick={() => setSpotlightData(null)}
              className="text-gray-400 hover:text-white pointer-events-auto p-1 cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-800 text-xs font-mono">
            <div className="bg-slate-800/80 p-2 rounded-lg">
              <span className="text-gray-400 text-[10px] block font-sans">DISTANCE FROM HQ</span>
              <span className="text-[#bcdc00] font-bold text-sm">
                {spotlightData.isHQ ? "0 km (HUB)" : `${spotlightData.distance.toLocaleString()} km from HQ`}
              </span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg">
              <span className="text-gray-400 text-[10px] block font-sans">LINK STATUS</span>
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1 mt-0.5">
                {spotlightData.isHQ ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping"></span> CENTRAL HQ
                  </>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ACTIVE BEAM
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

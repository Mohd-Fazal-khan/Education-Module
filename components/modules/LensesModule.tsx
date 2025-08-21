"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation"; // Add this import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Info, RotateCcw, Move, ChevronLeft, ChevronRight } from "lucide-react";

type OpticalElement =
  | "convex-lens"
  | "concave-lens"
  | "convex-mirror"
  | "concave-mirror";

const opticalElements = {
  "convex-lens": {
    name: "Convex Lens",
    symbol: "🔍",
    type: "lens",
    converging: true,
  },
  "concave-lens": {
    name: "Concave Lens",
    symbol: "🔍",
    type: "lens",
    converging: false,
  },
  "convex-mirror": {
    name: "Convex Mirror",
    symbol: "🪞",
    type: "mirror",
    converging: false,
  },
  "concave-mirror": {
    name: "Concave Mirror",
    symbol: "🪞",
    type: "mirror",
    converging: true,
  },
};

export default function LensesModule() {
  const [selectedElement, setSelectedElement] =
    useState<OpticalElement>("convex-lens");
  const [objectDistance, setObjectDistance] = useState([150]); // in pixels from center
  const [focalLength, setFocalLength] = useState([100]); // in pixels
  const [objectHeight, setObjectHeight] = useState([40]); // in pixels

  // Add these MCQ states:
  const [selectedAnswer1, setSelectedAnswer1] = useState<string | null>(null);
  const [showFeedback1, setShowFeedback1] = useState(false);
  const [selectedAnswer2, setSelectedAnswer2] = useState<string | null>(null);
  const [showFeedback2, setShowFeedback2] = useState(false);

  const router = useRouter(); // Add this line

  const resetSimulation = () => {
    setObjectDistance([150]);
    setFocalLength([100]);
    setObjectHeight([40]);
  };

  const {
    imageDistance,
    imageHeight,
    magnification,
    imageType,
    imageOrientation,
    imageSize,
  } = useMemo(() => {
    const u = objectDistance[0]; // object distance
    const f = focalLength[0]; // focal length
    const h = objectHeight[0]; // object height

    const element = opticalElements[selectedElement];
    const isLens = element.type === "lens";
    const isConverging = element.converging;

    // Apply sign conventions
    const fSigned = isConverging ? f : -f;
    const uSigned = -u; // object distance is negative in sign convention

    // Lens/Mirror equation: 1/f = 1/u + 1/v
    let v: number;
    if (Math.abs(uSigned) === Math.abs(fSigned)) {
      // Object at focal point
      v = Number.POSITIVE_INFINITY;
    } else {
      v = (fSigned * uSigned) / (uSigned - fSigned);
    }

    // Magnification: m = v/u = hi/ho
    const m = isFinite(v) ? v / uSigned : Number.POSITIVE_INFINITY;
    const hi = isFinite(m) ? m * h : Number.POSITIVE_INFINITY;

    // Determine image characteristics
    const isReal = isLens ? v > 0 : v < 0;
    const isVirtual = !isReal;
    const isInverted = m < 0;
    const isUpright = m > 0;
    const isMagnified = Math.abs(m) > 1;
    const isDiminished = Math.abs(m) < 1;
    const isSameSize = Math.abs(m) === 1;

    return {
      imageDistance: Math.abs(v),
      imageHeight: Math.abs(hi),
      magnification: Math.abs(m),
      imageType: isReal ? "Real" : "Virtual",
      imageOrientation: isInverted ? "Inverted" : "Upright",
      imageSize: isMagnified
        ? "Magnified"
        : isDiminished
        ? "Diminished"
        : "Same Size",
    };
  }, [selectedElement, objectDistance, focalLength, objectHeight]);

  const drawRayDiagram = useCallback(() => {
    const centerX = 250;
    const centerY = 200;
    const element = opticalElements[selectedElement];
    const isLens = element.type === "lens";
    const isConverging = element.converging;

    const objX = centerX - objectDistance[0];
    const objY = centerY - objectHeight[0];
    const f = focalLength[0];

    // Calculate image position
    const imgX = centerX + (isFinite(imageDistance) ? imageDistance : 300);
    const imgY =
      centerY +
      (isFinite(imageHeight)
        ? element.converging
          ? imageHeight
          : -imageHeight
        : 0);

    return {
      centerX,
      centerY,
      objX,
      objY,
      imgX,
      imgY,
      f,
      isLens,
      isConverging,
    };
  }, [
    selectedElement,
    objectDistance,
    focalLength,
    objectHeight,
    imageDistance,
    imageHeight,
  ]);

  const rayData = drawRayDiagram();

  // Navigation handlers
  const handlePrev = () => {
    router.push("/modules/refraction");
  };
  const handleNext = () => {
    router.push("/modules/human-eye");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 relative min-h-screen">
      {/* Prev Arrow - Left Center */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 z-50 cursor-pointer group"
        onClick={handlePrev}
        style={{ userSelect: "none" }}
        aria-label="Previous"
      >
        <ChevronLeft className="w-12 h-12 text-blue-600 group-hover:text-blue-800 transition" />
      </div>
      {/* Next Arrow - Right Center */}
      <div
        className="fixed right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 z-50 cursor-pointer group"
        onClick={handleNext}
        style={{ userSelect: "none" }}
        aria-label="Next"
      >
        <ChevronRight className="w-12 h-12 text-blue-600 group-hover:text-blue-800 transition" />
      </div>

      <section className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2"> Lenses & Mirrors</h2>
        </div>
      </section>

      <div className="p-4 bg-gray-900  rounded-lg border">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
            <Card className="bg-gray-800 mb-8">
              <CardContent className="flex flex-col gap-6">
                {/* Mirrors Section */}
                <div className="p-4 bg-[#10182880] rounded-lg border">
                  <p>
                    A <span className="text-green-400">mirror</span> is a smooth
                    reflecting surface that forms images by reflection of light.
                  </p>
                  <ul className="list-decimal ml-6 mt-2 space-y-2">
                    <li>
                      <strong className="text-purple-400">
                        Types of Mirrors
                      </strong>
                      <ul className="list-disc ml-4 mt-1 text-sm space-y-1">
                        <li>
                          <b>Plane Mirror:</b> Flat reflecting surface. Produces
                          virtual, erect, and same-size images. Image appears
                          behind the mirror at the same distance as the object.
                        </li>
                        <li>
                          <b>Concave Mirror (Converging):</b> Curved inward like
                          a cave. Can form real or virtual images depending on
                          object position. Used in shaving mirrors, headlights,
                          telescopes.
                        </li>
                        <li>
                          <b>Convex Mirror (Diverging):</b> Curved outward.
                          Always forms virtual, erect, and diminished images.
                          Used in vehicle rear-view mirrors, security mirrors.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong className="text-purple-400">
                        Important Terms for Mirrors
                      </strong>
                      <ul className="list-disc ml-4 mt-1 text-sm space-y-1">
                        <li>
                          <b>Pole (P):</b> Center of the mirror’s surface.
                        </li>
                        <li>
                          <b>Center of Curvature (C):</b> Center of the sphere
                          from which the mirror is a part.
                        </li>
                        <li>
                          <b>Radius of Curvature (R):</b> Distance between C and
                          P.
                        </li>
                        <li>
                          <b>Focal Point (F):</b> Point where parallel rays
                          converge (concave) or appear to diverge (convex).
                        </li>
                        <li>
                          <b>Focal Length (f):</b> Distance between F and P.
                        </li>
                        <li>
                          <b>Relation:</b>{" "}
                          <span className="font-mono">f = R / 2</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                {/* Lenses Section */}
                <div className="p-4 bg-[#10182880] rounded-lg border">
                  <h3 className="font-semibold mb-2 text-blue-400">
                    2. Lenses
                  </h3>
                  <p>
                    A <span className="text-blue-400">lens</span> is a
                    transparent optical device that forms images by refraction
                    of light.
                  </p>
                  <ul className="list-decimal ml-6 mt-2 space-y-2">
                    <li>
                      <strong className="text-blue-400">Types of Lenses</strong>
                      <ul className="list-disc ml-4 mt-1 text-sm space-y-1">
                        <li>
                          <b>Convex Lens (Converging):</b> Thicker at the center
                          than edges. Converges parallel light rays to a real
                          focal point. Forms real or virtual images depending on
                          object position. Used in magnifying glasses, cameras,
                          eye lenses.
                        </li>
                        <li>
                          <b>Concave Lens (Diverging):</b> Thinner at the center
                          than edges. Diverges parallel light rays; focal point
                          is virtual. Forms virtual, erect, and diminished
                          images. Used in spectacles for myopia.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong className="text-blue-400">
                        Important Terms for Lenses
                      </strong>
                      <ul className="list-disc ml-4 mt-1 text-sm space-y-1">
                        <li>
                          <b>Optical Center (O):</b> The center of the lens;
                          rays passing through it do not deviate.
                        </li>
                        <li>
                          <b>Principal Axis:</b> Line passing through the center
                          of curvature or optical center.
                        </li>
                        <li>
                          <b>Focal Point (F):</b> Point where parallel rays
                          converge (convex) or appear to diverge (concave).
                        </li>
                        <li>
                          <b>Focal Length (f):</b> Distance between optical
                          center and focal point.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                {/* Mirror & Lens Formula Section */}
                <div className="p-4 bg-[#10182880] rounded-lg border">
                  <h3 className="font-semibold mb-2 text-purple-400">
                    3. Mirror & Lens Formula
                  </h3>
                  <ul className="list-decimal ml-6 mt-2 space-y-2">
                    <li>
                      <strong className="text-purple-400">
                        Mirror Formula:
                      </strong>
                      <div className="bg-gray-800 p-2 rounded text-center font-mono mt-1">
                        1/f = 1/v + 1/u
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        f = focal length, v = image distance, u = object
                        distance
                      </div>
                    </li>
                    <li>
                      <strong className="text-purple-400">Lens Formula:</strong>
                      <div className="bg-gray-800 p-2 rounded text-center font-mono mt-1">
                        1/f = 1/v - 1/u
                      </div>
                    </li>
                    <li>
                      <strong className="text-purple-400">
                        Magnification (m):
                      </strong>
                      <div className="bg-gray-800 p-2 rounded text-center font-mono mt-1">
                        m = hi/ho = v/u
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        hi = image height, ho = object height
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Left: Theory Section */}

          {/* Right: Interactive + MCQ */}
          <section className="flex flex-col gap-8">
            <div className="px-4 py-8 space-y-6 rounded-lg border bg-gray-800">
              <div className="text-center mb-4">
                <h2 className="text-3xl font-bold mb-2">
                  Interactive Simulation
                </h2>
                <p className="text-muted-foreground">
                  Adjust parameters and visualize ray diagrams
                </p>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Move className="w-5 h-5" />
                    Ray Diagram Simulation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <svg viewBox="0 0 500 400" className="w-full h-96">
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="8"
                          markerHeight="6"
                          refX="7"
                          refY="3"
                          orient="auto"
                        >
                          <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
                        </marker>
                      </defs>

                      {/* Principal axis */}
                      <line
                        x1="20"
                        y1={rayData.centerY}
                        x2="480"
                        y2={rayData.centerY}
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                        opacity="0.5"
                      />
                      <text
                        x="25"
                        y={rayData.centerY - 5}
                        className="text-xs fill-current"
                      >
                        Principal Axis
                      </text>

                      {/* Optical element */}
                      {rayData.isLens ? (
                        // Draw lens
                        <g>
                          {opticalElements[selectedElement].converging ? (
                            // Convex lens
                            <path
                              d={`M ${rayData.centerX} 120 Q ${
                                rayData.centerX + 15
                              } ${rayData.centerY} ${rayData.centerX} 280 Q ${
                                rayData.centerX - 15
                              } ${rayData.centerY} ${rayData.centerX} 120`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                          ) : (
                            // Concave lens
                            <path
                              d={`M ${rayData.centerX} 120 Q ${
                                rayData.centerX - 15
                              } ${rayData.centerY} ${rayData.centerX} 280 Q ${
                                rayData.centerX + 15
                              } ${rayData.centerY} ${rayData.centerX} 120`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                          )}
                          <text
                            x={rayData.centerX - 20}
                            y="110"
                            className="text-sm fill-current font-semibold"
                          >
                            {opticalElements[selectedElement].name}
                          </text>
                        </g>
                      ) : (
                        // Draw mirror
                        <g>
                          <line
                            x1={rayData.centerX}
                            y1="120"
                            x2={rayData.centerX}
                            y2="280"
                            stroke="currentColor"
                            strokeWidth="6"
                          />
                          {opticalElements[selectedElement].converging ? (
                            // Concave mirror (reflecting surface on left)
                            <path
                              d={`M ${rayData.centerX - 5} 120 Q ${
                                rayData.centerX - 20
                              } ${rayData.centerY} ${rayData.centerX - 5} 280`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          ) : (
                            // Convex mirror (reflecting surface on right)
                            <path
                              d={`M ${rayData.centerX + 5} 120 Q ${
                                rayData.centerX + 20
                              } ${rayData.centerY} ${rayData.centerX + 5} 280`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          )}
                          <text
                            x={rayData.centerX - 30}
                            y="110"
                            className="text-sm fill-current font-semibold"
                          >
                            {opticalElements[selectedElement].name}
                          </text>
                        </g>
                      )}

                      {/* Focal points */}
                      <circle
                        cx={rayData.centerX - rayData.f}
                        cy={rayData.centerY}
                        r="3"
                        fill="#ef4444"
                      />
                      <text
                        x={rayData.centerX - rayData.f - 5}
                        y={rayData.centerY + 15}
                        className="text-xs fill-red-500"
                      >
                        F₁
                      </text>
                      <circle
                        cx={rayData.centerX + rayData.f}
                        cy={rayData.centerY}
                        r="3"
                        fill="#ef4444"
                      />
                      <text
                        x={rayData.centerX + rayData.f - 5}
                        y={rayData.centerY + 15}
                        className="text-xs fill-red-500"
                      >
                        F₂
                      </text>

                      {/* Object */}
                      <line
                        x1={rayData.objX}
                        y1={rayData.centerY}
                        x2={rayData.objX}
                        y2={rayData.objY}
                        stroke="#3b82f6"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead)"
                      />
                      <text
                        x={rayData.objX - 15}
                        y={rayData.objY - 10}
                        className="text-sm fill-blue-600 font-semibold"
                      >
                        Object
                      </text>

                      {/* Image (if finite) */}
                      {isFinite(imageDistance) && isFinite(imageHeight) && (
                        <>
                          <line
                            x1={rayData.imgX}
                            y1={rayData.centerY}
                            x2={rayData.imgX}
                            y2={rayData.imgY}
                            stroke={
                              imageType === "Real" ? "#22c55e" : "#f59e0b"
                            }
                            strokeWidth="3"
                            markerEnd="url(#arrowhead)"
                            strokeDasharray={
                              imageType === "Virtual" ? "5,5" : "none"
                            }
                          />
                          <text
                            x={rayData.imgX + 10}
                            y={rayData.imgY - 10}
                            className={`text-sm font-semibold ${
                              imageType === "Real"
                                ? "fill-green-600"
                                : "fill-amber-600"
                            }`}
                          >
                            {imageType} Image
                          </text>
                        </>
                      )}

                      {/* Principal rays */}
                      {/* Ray 1: Parallel to principal axis */}
                      <line
                        x1={rayData.objX}
                        y1={rayData.objY}
                        x2={rayData.centerX}
                        y2={rayData.objY}
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                      <line
                        x1={rayData.centerX}
                        y1={rayData.objY}
                        x2={rayData.centerX + rayData.f}
                        y2={rayData.centerY}
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        opacity="0.8"
                      />

                      {/* Ray 2: Through optical center */}
                      <line
                        x1={rayData.objX}
                        y1={rayData.objY}
                        x2={rayData.imgX}
                        y2={rayData.imgY}
                        stroke="#ec4899"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                    </svg>
                  </div>

                  {/* Legend (keep as is) */}
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-4 text-sm flex-wrap justify-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-blue-500"></div>
                        <span>Object</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-1 ${
                            imageType === "Real"
                              ? "bg-green-500"
                              : "bg-amber-500"
                          }`}
                        ></div>
                        <span>{imageType} Image</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-purple-500"></div>
                        <span>Principal Rays</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Focal Points</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* MCQ Section */}
            <section className="px-4 py-8 space-y-6 rounded-lg border bg-gray-800">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Quick Quiz</h2>
                <p className="text-muted-foreground">
                  Test your understanding of reflection!
                </p>
              </div>
              <div className="space-y-4">
                {/* Question 1 */}
                <div>
                  <p className="font-medium mb-2">
                    1. Which lens forms a real, inverted, and magnified image
                    when the object is placed between f and 2f?
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      "A) Concave Lens",
                      "B) Plane Mirror",
                      "C) Convex Lens",
                    ].map((option) => (
                      <button
                        key={option}
                        className={`px-4 py-2 rounded border transition ${
                          selectedAnswer1 === option
                            ? "bg-blue-200 dark:bg-blue-400 font-bold"
                            : "hover:bg-blue-100 dark:hover:bg-blue-400"
                        }`}
                        disabled={showFeedback1}
                        onClick={() => {
                          setSelectedAnswer1(option);
                          setShowFeedback1(true);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {showFeedback1 && (
                    <div
                      className={`mt-2 font-semibold ${
                        selectedAnswer1 === "C) Convex Lens"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedAnswer1 === "C) Convex Lens"
                        ? "Correct!"
                        : "Incorrect. The correct answer is C) Convex Lens."}
                    </div>
                  )}
                </div>
                {/* Question 2 */}
                <div>
                  <p className="font-medium mb-2">
                    2. What is the formula for magnification in lens/mirror
                    systems?
                  </p>
                  <div className="flex flex-col gap-2">
                    {["A) m = v/u = hi/ho", "B) m = u/v", "C) m = f/v"].map(
                      (option) => (
                        <button
                          key={option}
                          className={`px-4 py-2 rounded border transition ${
                            selectedAnswer2 === option
                              ? "bg-blue-200 dark:bg-blue-400 font-bold"
                              : "hover:bg-blue-100 dark:hover:bg-blue-400"
                          }`}
                          disabled={showFeedback2}
                          onClick={() => {
                            setSelectedAnswer2(option);
                            setShowFeedback2(true);
                          }}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                  {showFeedback2 && (
                    <div
                      className={`mt-2 font-semibold ${
                        selectedAnswer2 === "A) m = v/u = hi/ho"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedAnswer2 === "A) m = v/u = hi/ho"
                        ? "Correct!"
                        : "Incorrect. The correct answer is A) m = v/u = hi/ho."}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Add this import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Pause,
  RotateCcw,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ReflectionModule() {
  const [incidentAngle] = useState([30]);
  const [isAnimating] = useState(true);
  const [animationStep, setAnimationStep] = useState(60); // Start at mid-animation
  const [mirrorType, setMirrorType] = useState<"plane" | "concave" | "convex">(
    "plane"
  );

  const [selectedAnswer1, setSelectedAnswer1] = useState<string | null>(null);
  const [showFeedback1, setShowFeedback1] = useState(false);
  const [selectedAnswer2, setSelectedAnswer2] = useState<string | null>(null);
  const [showFeedback2, setShowFeedback2] = useState(false);

  const router = useRouter(); // Add this line

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const reflectedAngle = incidentAngle[0]; // Law of reflection: angle of incidence = angle of reflection

  // Navigation handlers
  const handlePrev = () => {
    router.push("/");
  };
  const handleNext = () => {
    router.push("/modules/refraction");
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

      {/* Theory Section */}
      <section className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Reflection of Light</h2>
        </div>
      </section>
      <div className="p-4 bg-gray-900  rounded-lg border">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Side: Theory */}
          <div>
            <Card className="bg-gray-800 mb-8">
              <CardContent className="flex flex-col gap-6">
                {/* Definition */}
                <div className="p-4 bg-[#10182880]  rounded-lg border">
                  <h3 className="font-semibold mb-2 text-green-400">
                    1. Definition
                  </h3>
                  <p>
                    <span className="text-green-400">Reflection </span>of light
                    is the phenomenon in which light rays bounce back when they
                    strike a smooth surface instead of passing through it.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <strong className="text-green-400">Example:</strong> Seeing
                    your image in a mirror is due to reflection.
                  </p>
                </div>
                {/* Laws of Reflection */}
                <div className="p-4 bg-[#10182880]  rounded-lg border">
                  <h3 className="font-semibold mb-2 text-purple-400">
                    2. Laws of Reflection
                  </h3>
                  <p>There are two fundamental laws of reflection:</p>
                  <ul className="list-decimal ml-6 mt-2 space-y-1">
                    <li>
                      <strong className="text-purple-400">First Law:</strong>{" "}
                      The incident ray, the reflected ray, and the normal to the
                      surface at the point of incidence all lie in the same
                      plane.
                    </li>
                    <li>
                      <strong className="text-purple-400">Second Law:</strong>{" "}
                      The angle of incidence (<em>i</em>) is equal to the angle
                      of reflection (<em>r</em>
                      ).
                    </li>
                  </ul>
                  <div className="mt-2 bg-gray-800 p-2 rounded text-center font-mono">
                    <span className="text-purple-400">i = r</span>
                  </div>
                </div>
                {/* Types of Reflection */}
                <div className="p-4 bg-[#10182880]  rounded-lg border">
                  <h3 className="font-semibold mb-2 text-blue-400">
                    3. Types of Reflection
                  </h3>
                  <div className="mb-2">
                    <strong className="text-blue-400">
                      Regular Reflection (Specular Reflection):
                    </strong>
                    <ul className="list-disc ml-6 mt-1 text-sm">
                      <li>
                        Occurs on smooth and shiny surfaces like mirrors or
                        still water.
                      </li>
                      <li>Reflected rays remain parallel.</li>
                      <li>Produces a clear image.</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-blue-400">
                      Diffuse Reflection:
                    </strong>
                    <ul className="list-disc ml-6 mt-1 text-sm">
                      <li>Occurs on rough surfaces like paper or wall.</li>
                      <li>Reflected rays scatter in all directions.</li>
                      <li>No clear image is formed.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Interactive Simulation ONLY */}
          <div className="flex flex-col gap-8">
            {/* Interactive Simulation Section */}
            <section className="px-4 py-8 space-y-6 rounded-lg border bg-gray-800">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  Interactive Simulation
                </h2>
                <p className="text-muted-foreground">
                  Observe the law of reflection in action
                </p>
              </div>
              <div className="grid grid-cols-1">
                {/* Interactive Simulation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ray Diagram Simulation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <svg viewBox="0 0 500 350" className="w-full h-80">
                        {/* Background grid */}
                        <defs>
                          <pattern
                            id="grid"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 20 0 L 0 0 0 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="0.5"
                              opacity="0.1"
                            />
                          </pattern>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon
                              points="0 0, 10 3.5, 0 7"
                              fill="currentColor"
                            />
                          </marker>
                          <marker
                            id="blueArrow"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                          </marker>
                          <marker
                            id="redArrow"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                          </marker>
                        </defs>
                        <rect width="500" height="350" fill="url(#grid)" />

                        {/* Mirror */}
                        <line
                          x1="50"
                          y1="280"
                          x2="450"
                          y2="280"
                          stroke="currentColor"
                          strokeWidth="6"
                        />
                        <text
                          x="250"
                          y="305"
                          textAnchor="middle"
                          className="text-sm fill-current font-semibold"
                        >
                          Plane Mirror
                        </text>

                        {/* Normal */}
                        <line
                          x1="250"
                          y1="80"
                          x2="250"
                          y2="280"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="8,4"
                          opacity="0.7"
                        />
                        <text
                          x="260"
                          y="100"
                          className="text-sm fill-current font-medium"
                        >
                          Normal
                        </text>

                        {/* Incident Ray */}
                        <line
                          x1={
                            250 -
                            Math.sin((incidentAngle[0] * Math.PI) / 180) * 120
                          }
                          y1={
                            280 -
                            Math.cos((incidentAngle[0] * Math.PI) / 180) * 120
                          }
                          x2="250"
                          y2="280"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          markerEnd="url(#blueArrow)"
                          opacity={
                            isAnimating ? Math.min(animationStep / 30, 1) : 1
                          }
                        />
                        <text
                          x={
                            250 -
                            Math.sin((incidentAngle[0] * Math.PI) / 180) * 100
                          }
                          y={
                            280 -
                            Math.cos((incidentAngle[0] * Math.PI) / 180) * 100 -
                            25
                          }
                          className="text-sm fill-blue-600 font-medium"
                          textAnchor="middle"
                        >
                          Incident Ray
                        </text>

                        {/* Reflected Ray */}
                        <line
                          x1="250"
                          y1="280"
                          x2={
                            250 +
                            Math.sin((reflectedAngle * Math.PI) / 180) * 120
                          }
                          y2={
                            280 -
                            Math.cos((reflectedAngle * Math.PI) / 180) * 120
                          }
                          stroke="#ef4444"
                          strokeWidth="3"
                          markerEnd="url(#redArrow)"
                          opacity={
                            isAnimating
                              ? Math.min((animationStep - 30) / 30, 1)
                              : 1
                          }
                        />
                        <text
                          x={
                            250 +
                            Math.sin((reflectedAngle * Math.PI) / 180) * 100
                          }
                          y={
                            280 -
                            Math.cos((reflectedAngle * Math.PI) / 180) * 100 -
                            25
                          }
                          className="text-sm fill-red-600 font-medium"
                          textAnchor="middle"
                        >
                          Reflected Ray
                        </text>

                        {/* Angle arcs and labels */}
                        <path
                          d={`M 250 280 A 40 40 0 0 0 ${
                            250 -
                            Math.sin((incidentAngle[0] * Math.PI) / 180) * 40
                          } ${
                            280 -
                            Math.cos((incidentAngle[0] * Math.PI) / 180) * 40
                          }`}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          opacity="0.8"
                        />
                        <text
                          x={250 - 50}
                          y={260}
                          className="text-sm fill-blue-600 font-bold"
                          textAnchor="middle"
                        >
                          θᵢ = {incidentAngle[0]}°
                        </text>

                        <path
                          d={`M 250 280 A 40 40 0 0 1 ${
                            250 +
                            Math.sin((reflectedAngle * Math.PI) / 180) * 40
                          } ${
                            280 -
                            Math.cos((reflectedAngle * Math.PI) / 180) * 40
                          }`}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="2"
                          opacity="0.8"
                        />
                        <text
                          x={250 + 50}
                          y={260}
                          className="text-sm fill-red-600 font-bold"
                          textAnchor="middle"
                        >
                          θᵣ = {reflectedAngle}°
                        </text>

                        {/* Point of incidence */}
                        <circle cx="250" cy="280" r="4" fill="currentColor" />
                        <text x="265" y="275" className="text-xs fill-current">
                          Point of Incidence
                        </text>
                      </svg>
                    </div>

                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-1 bg-blue-500"></div>
                          <span>Incident Ray</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-1 bg-red-500"></div>
                          <span>Reflected Ray</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-1 border-t-2 border-dashed border-current"></div>
                          <span>Normal</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* MCQ or Example Section BELOW animation */}
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
                    1. What is the angle of reflection if the angle of incidence
                    is 30°?
                  </p>
                  <div className="flex flex-col gap-2">
                    {["A) 15°", "B) 30°", "C) 60°"].map((option) => (
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
                        selectedAnswer1 === "B) 30°"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedAnswer1 === "B) 30°"
                        ? "Correct!"
                        : "Incorrect. The correct answer is B) 30°."}
                    </div>
                  )}
                </div>
                {/* Question 2 */}
                <div>
                  <p className="font-medium mb-2">
                    2. Which law states that the incident ray, reflected ray,
                    and normal all lie in the same plane?
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      "A) First Law of Reflection",
                      "B) Second Law of Reflection",
                      "C) Law of Refraction",
                    ].map((option) => (
                      <button
                        key={option}
                        className={`px-4 py-2 rounded border transition ${
                          selectedAnswer2 === option
                            ? "bg-blue-200 dark:bg-blue-900 font-bold"
                            : "hover:bg-blue-100 dark:hover:bg-blue-900"
                        }`}
                        disabled={showFeedback2}
                        onClick={() => {
                          setSelectedAnswer2(option);
                          setShowFeedback2(true);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {showFeedback2 && (
                    <div
                      className={`mt-2 font-semibold ${
                        selectedAnswer2 === "A) First Law of Reflection"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedAnswer2 === "A) First Law of Reflection"
                        ? "Correct!"
                        : "Incorrect. The correct answer is A) First Law of Reflection."}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

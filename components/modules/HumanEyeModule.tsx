"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Play, Pause, RotateCcw, AlertCircle, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation"; // Added for client-side navigation

type VisionCondition = "normal" | "myopia" | "hypermetropia";

const visionConditions = {
  normal: {
    name: "Normal Vision",
    description: "Light focuses exactly on the retina",
    focalPoint: 0,
    color: "#22c55e",
    icon: CheckCircle,
    correction: "None needed",
    lensType: "None",
  },
  myopia: {
    name: "Myopia (Nearsightedness)",
    description: "Light focuses before the retina",
    focalPoint: -30,
    color: "#ef4444",
    icon: AlertCircle,
    correction: "Concave lens (diverging)",
    lensType: "Concave",
  },
  hypermetropia: {
    name: "Hypermetropia (Farsightedness)",
    description: "Light focuses behind the retina",
    focalPoint: 30,
    color: "#f59e0b",
    icon: AlertCircle,
    correction: "Convex lens (converging)",
    lensType: "Convex",
  },
};

export default function HumanEyeModule() {
  const router = useRouter(); // For client-side navigation
  const [visionCondition] = useState<VisionCondition>("normal");
  const [showCorrection] = useState(false);
  const [eyeballLength] = useState([24]); // normal eye length in mm
  const [objectDistance] = useState([25]); // distance in cm
  const [isAnimating] = useState(true); // Animation always playing
  const [animationStep, setAnimationStep] = useState(0);
  const [selectedAnswer1, setSelectedAnswer1] = useState<string | null>(null);
  const [showFeedback1, setShowFeedback1] = useState(false);
  const [selectedAnswer2, setSelectedAnswer2] = useState<string | null>(null);
  const [showFeedback2, setShowFeedback2] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const calculations = useMemo(() => {
    const condition = visionConditions[visionCondition];
    const eyeLength = eyeballLength[0];
    const objDistance = objectDistance[0];

    // Simplified eye optics calculations
    const normalFocalLength = 17; // mm (approximate for relaxed eye)
    const actualFocalLength = normalFocalLength + (eyeLength - 24) * 0.5;

    let imagePosition = "On Retina";
    let visionQuality = "Clear";
    let magnification = 1;

    if (visionCondition === "myopia") {
      imagePosition = showCorrection
        ? "On Retina (Corrected)"
        : "Before Retina";
      visionQuality = showCorrection ? "Clear" : "Blurry (distant objects)";
      magnification = showCorrection ? 1 : 0.8;
    } else if (visionCondition === "hypermetropia") {
      imagePosition = showCorrection
        ? "On Retina (Corrected)"
        : "Behind Retina";
      visionQuality = showCorrection ? "Clear" : "Blurry (near objects)";
      magnification = showCorrection ? 1 : 1.2;
    }

    return {
      eyeLength,
      focalLength: actualFocalLength,
      imagePosition,
      visionQuality,
      magnification,
      correctionNeeded: condition.correction,
      lensType: condition.lensType,
    };
  }, [visionCondition, showCorrection, eyeballLength, objectDistance]);

  // Use Next.js router for navigation
  const handlePrev = () => {
    router.push("/modules/lenses");
  };
  const handleNext = () => {
    router.push("/modules/reflection");
  };

  return (
    <div className="container mx-auto px-4 py-8 relative min-h-screen">
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
          <h2 className="text-3xl font-bold mb-2">
            Human Eye & Vision Defects
          </h2>
        </div>
      </section>

      <div className="p-4 bg-gray-900  rounded-lg border">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left: Theory Section */}
          <section className="flex flex-col gap-6">
            <Card className="bg-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-green-400">
                  1. Human Eye: Structure and Function
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  The human eye is a sense organ that helps us see objects by
                  detecting light and converting it into electrical signals sent
                  to the brain.
                </p>
                <h4 className="font-semibold text-green-400 mt-2">
                  a) Structure of the Human Eye
                </h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    <b>Cornea:</b> Transparent front layer; refracts (bends)
                    light into the eye.
                  </li>
                  <li>
                    <b>Aqueous Humor:</b> Clear fluid between cornea and lens;
                    maintains eye pressure and nourishes cornea/lens.
                  </li>
                  <li>
                    <b>Lens:</b> Flexible, transparent structure; focuses light
                    on the retina by changing shape (accommodation).
                  </li>
                  <li>
                    <b>Iris:</b> Colored part; controls the size of the pupil
                    (amount of light entering).
                  </li>
                  <li>
                    <b>Pupil:</b> Opening in the iris through which light
                    enters.
                  </li>
                  <li>
                    <b>Vitreous Humor:</b> Gel-like substance filling the eye;
                    maintains shape.
                  </li>
                  <li>
                    <b>Retina:</b> Light-sensitive layer at the back of the eye;
                    contains photoreceptor cells (rods and cones).
                  </li>
                  <li>
                    <b>Optic Nerve:</b> Carries signals from retina to brain for
                    interpretation.
                  </li>
                </ul>
                <h4 className="font-semibold text-green-400 mt-2">
                  b) Functioning of the Eye
                </h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    Light rays from objects pass through the cornea, aqueous
                    humor, lens, and vitreous humor.
                  </li>
                  <li>
                    The lens focuses the light onto the retina to form a real
                    and inverted image.
                  </li>
                  <li>
                    The optic nerve transmits the image to the brain, which
                    interprets it upright.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-purple-400">
                  2. Vision Defects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Vision defects occur when the eye cannot focus light correctly
                  on the retina. Common defects include:
                </p>
                <table className="w-full text-left border border-gray-300 rounded">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="p-2 border text-blue-400">Defect</th>
                      <th className="p-2 border text-blue-400">Cause</th>
                      <th className="p-2 border text-blue-400">Correction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border">Myopia (Nearsightedness)</td>
                      <td className="p-2 border">
                        Eye is too long or cornea too curved → image forms in
                        front of retina
                      </td>
                      <td className="p-2 border">
                        Concave lens (diverges light rays)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border">
                        Hypermetropia (Farsightedness)
                      </td>
                      <td className="p-2 border">
                        Eye is too short or lens too weak → image forms behind
                        retina
                      </td>
                      <td className="p-2 border">
                        Convex lens (converges light rays)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Presbyopia</td>
                      <td className="p-2 border">
                        Lens loses flexibility with age → difficulty focusing on
                        near objects
                      </td>
                      <td className="p-2 border">
                        Convex lens for near vision
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Astigmatism</td>
                      <td className="p-2 border">
                        Uneven curvature of cornea → distorted images
                      </td>
                      <td className="p-2 border">Cylindrical lens</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Cataract</td>
                      <td className="p-2 border">
                        Clouding of lens → blurred vision
                      </td>
                      <td className="p-2 border">
                        Surgical removal of lens or artificial lens
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>

          {/* Right: Interactive + MCQ */}
          <div className="flex flex-col gap-8">
            <section className="px-4 py-8 space-y-6 rounded-lg border bg-gray-800">
              <div className="text-center mb-4">
                <h2 className="text-3xl font-bold mb-2">
                  Interactive Simulation
                </h2>
                <p className="text-muted-foreground">
                  Experiment with vision conditions and corrections
                </p>
              </div>
              <div className="grid grid-cols-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Eye Animation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <svg viewBox="0 0 500 250" className="w-full h-64">
                        {/* Object */}
                        <line
                          x1="50"
                          y1="100"
                          x2="50"
                          y2="150"
                          stroke="#3b82f6"
                          strokeWidth="4"
                        />
                        <polygon points="50,100 45,110 55,110" fill="#3b82f6" />
                        <text
                          x="25"
                          y="95"
                          className="text-sm fill-blue-600 font-semibold"
                        >
                          Object
                        </text>

                        {/* Animated light rays */}
                        <line
                          x1="50"
                          y1="100"
                          x2={showCorrection ? "120" : "150"}
                          y2="115"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          opacity={
                            isAnimating
                              ? 0.5 + 0.5 * Math.sin(animationStep * 0.1)
                              : 0.7
                          }
                        />
                        <line
                          x1="50"
                          y1="125"
                          x2={showCorrection ? "120" : "150"}
                          y2="125"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          opacity={
                            isAnimating
                              ? 0.5 + 0.5 * Math.sin(animationStep * 0.1 + 0.5)
                              : 0.7
                          }
                        />
                        <line
                          x1="50"
                          y1="150"
                          x2={showCorrection ? "120" : "150"}
                          y2="135"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          opacity={
                            isAnimating
                              ? 0.5 + 0.5 * Math.sin(animationStep * 0.1 + 1)
                              : 0.7
                          }
                        />

                        {/* Corrective lens */}
                        {showCorrection && visionCondition !== "normal" && (
                          <>
                            {visionCondition === "myopia" ? (
                              <path
                                d="M 120 100 Q 110 125 120 150 Q 130 125 120 100"
                                fill="none"
                                stroke="#8b5cf6"
                                strokeWidth="3"
                              />
                            ) : (
                              <path
                                d="M 120 100 Q 130 125 120 150 Q 110 125 120 100"
                                fill="none"
                                stroke="#8b5cf6"
                                strokeWidth="3"
                              />
                            )}
                            <text
                              x="100"
                              y="85"
                              className="text-xs fill-purple-600 font-semibold"
                            >
                              {calculations.lensType} Lens
                            </text>
                          </>
                        )}

                        {/* Eye with variable length */}
                        <ellipse
                          cx="200"
                          cy="125"
                          rx={60 + (eyeballLength[0] - 24) * 2}
                          ry="40"
                          fill="#f8fafc"
                          stroke="currentColor"
                          strokeWidth="2"
                        />

                        {/* Eye components */}
                        <ellipse
                          cx="140"
                          cy="125"
                          rx="12"
                          ry="18"
                          fill="#e0f2fe"
                          stroke="#0ea5e9"
                          strokeWidth="1"
                        />
                        <ellipse
                          cx="180"
                          cy="125"
                          rx="8"
                          ry="12"
                          fill="#fef3c7"
                          stroke="#f59e0b"
                          strokeWidth="1"
                        />

                        {/* Retina */}
                        <line
                          x1={200 + 60 + (eyeballLength[0] - 24) * 2 - 20}
                          y1="95"
                          x2={200 + 60 + (eyeballLength[0] - 24) * 2 - 20}
                          y2="155"
                          stroke="#ef4444"
                          strokeWidth="3"
                        />

                        {/* Focus visualization based on condition */}
                        {visionCondition === "normal" || showCorrection ? (
                          <>
                            <line
                              x1="150"
                              y1="115"
                              x2={200 + 60 + (eyeballLength[0] - 24) * 2 - 20}
                              y2="135"
                              stroke="#22c55e"
                              strokeWidth="2"
                            />
                            <line
                              x1="150"
                              y1="125"
                              x2={200 + 60 + (eyeballLength[0] - 24) * 2 - 20}
                              y2="125"
                              stroke="#22c55e"
                              strokeWidth="2"
                            />
                            <line
                              x1="150"
                              y1="135"
                              x2={200 + 60 + (eyeballLength[0] - 24) * 2 - 20}
                              y2="115"
                              stroke="#22c55e"
                              strokeWidth="2"
                            />
                            <circle
                              cx={200 + 60 + (eyeballLength[0] - 24) * 2 - 20}
                              cy="125"
                              r="3"
                              fill="#22c55e"
                            />
                          </>
                        ) : (
                          <>
                            {visionCondition === "myopia" ? (
                              <>
                                <line
                                  x1="150"
                                  y1="115"
                                  x2="220"
                                  y2="135"
                                  stroke="#ef4444"
                                  strokeWidth="2"
                                />
                                <line
                                  x1="150"
                                  y1="125"
                                  x2="220"
                                  y2="125"
                                  stroke="#ef4444"
                                  strokeWidth="2"
                                />
                                <line
                                  x1="150"
                                  y1="135"
                                  x2="220"
                                  y2="115"
                                  stroke="#ef4444"
                                  strokeWidth="2"
                                />
                                <circle
                                  cx="220"
                                  cy="125"
                                  r="3"
                                  fill="#ef4444"
                                />
                              </>
                            ) : (
                              <>
                                <line
                                  x1="150"
                                  y1="115"
                                  x2="280"
                                  y2="135"
                                  stroke="#f59e0b"
                                  strokeWidth="2"
                                />
                                <line
                                  x1="150"
                                  y1="125"
                                  x2="280"
                                  y2="125"
                                  stroke="#f59e0b"
                                  strokeWidth="2"
                                />
                                <line
                                  x1="150"
                                  y1="135"
                                  x2="280"
                                  y2="115"
                                  stroke="#f59e0b"
                                  strokeWidth="2"
                                />
                                <circle
                                  cx="280"
                                  cy="125"
                                  r="3"
                                  fill="#f59e0b"
                                />
                              </>
                            )}
                          </>
                        )}

                        <text
                          x="250"
                          y="30"
                          className="text-lg fill-current font-semibold text-center"
                          textAnchor="middle"
                        >
                          {visionConditions[visionCondition].name}
                        </text>
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

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
                    1. Which part of the eye controls the amount of light
                    entering?
                  </p>
                  <div className="flex flex-col gap-2">
                    {["A) Cornea", "B) Retina", "C) Iris"].map((option) => (
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
                        selectedAnswer1 === "C) Iris"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedAnswer1 === "C) Iris"
                        ? "Correct!"
                        : "Incorrect. The correct answer is C) Iris."}
                    </div>
                  )}
                </div>
                {/* Question 2 */}
                <div>
                  <p className="font-medium mb-2">
                    2. Which defect is corrected using a concave lens?
                  </p>
                  <div className="flex flex-col gap-2">
                    {["A) Myopia", "B) Presbyopia", "C) Hypermetropia"].map(
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
                        selectedAnswer2 === "A) Myopia"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedAnswer2 === "A) Myopia"
                        ? "Correct!"
                        : "Incorrect. The correct answer is A) Myopia."}
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

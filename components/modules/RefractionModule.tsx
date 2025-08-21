
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const materials = {
  air: { name: "Air", n: 1.0, color: "#e0f2fe" },
  water: { name: "Water", n: 1.33, color: "#0ea5e9" },
  glass: { name: "Glass", n: 1.5, color: "#22d3ee" },
  diamond: { name: "Diamond", n: 2.42, color: "#a855f7" },
};

export default function RefractionModule() {
  const router = useRouter();

  const [incidentAngle, setIncidentAngle] = useState([30]);
  const [medium1, setMedium1] = useState<keyof typeof materials>("air");
  const [medium2, setMedium2] = useState<keyof typeof materials>("glass");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [selectedAnswer1, setSelectedAnswer1] = useState<string | null>(null);
  const [showFeedback1, setShowFeedback1] = useState(false);
  const [selectedAnswer2, setSelectedAnswer2] = useState<string | null>(null);
  const [showFeedback2, setShowFeedback2] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAnimating) {
      interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 100);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  const { refractedAngle, criticalAngle, isTotalInternalReflection } =
    useMemo(() => {
      const n1 = materials[medium1].n;
      const n2 = materials[medium2].n;
      const theta1Rad = (incidentAngle[0] * Math.PI) / 180;

      const criticalAngleRad = n1 > n2 ? Math.asin(n2 / n1) : Math.PI / 2;
      const criticalAngleDeg = (criticalAngleRad * 180) / Math.PI;

      const isTIR = n1 > n2 && incidentAngle[0] > criticalAngleDeg;

      let refractedAngleRad = 0;
      if (!isTIR) {
        const sinTheta2 = (n1 / n2) * Math.sin(theta1Rad);
        refractedAngleRad = Math.asin(Math.min(sinTheta2, 1));
      }
      const refractedAngleDeg = (refractedAngleRad * 180) / Math.PI;

      return {
        refractedAngle: refractedAngleDeg,
        criticalAngle: criticalAngleDeg,
        isTotalInternalReflection: isTIR,
      };
    }, [incidentAngle, medium1, medium2]);

  const resetAnimation = () => {
    setAnimationStep(0);
    setIsAnimating(false);
  };

  const handlePrev = () => router.push("/modules/reflection");
  const handleNext = () => router.push("/modules/lenses");

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 relative min-h-screen">
      {/* Prev Arrow - Left Center */}
      <button
        className="fixed left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 z-50 cursor-pointer group"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <ChevronLeft className="w-12 h-12 text-blue-600 group-hover:text-blue-800 transition" />
      </button>

      {/* Next Arrow - Right Center */}
      <button
        className="fixed right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 z-50 cursor-pointer group"
        onClick={handleNext}
        aria-label="Next"
      >
        <ChevronRight className="w-12 h-12 text-blue-600 group-hover:text-blue-800 transition" />
      </button>

      {/* Theory Section */}
      <section className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Refraction of Light</h2>
        </div>
      </section>

      <div className="p-4 bg-gray-900 rounded-lg border">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left: Theory */}
          <div>
            <Card className="bg-gray-800 mb-8">
              <CardContent className="flex flex-col gap-6">
                {/* Definition */}
                <div className="p-4 bg-[#10182880] rounded-lg border">
                  <h3 className="font-semibold mb-2 text-green-400">
                    1. Definition
                  </h3>
                  <p>
                    <span className="text-green-400">Refraction of light </span>
                    is the bending of light when it passes from one transparent
                    medium to another due to a change in its speed.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <strong className="text-green-400">Example:</strong> A straw
                    appears bent when placed in a glass of water.
                  </p>
                </div>

                {/* Cause */}
                <div className="p-4 bg-[#10182880] rounded-lg border">
                  <h3 className="font-semibold mb-2 text-purple-400">
                    2. Cause of Refraction
                  </h3>
                  <ul className="list-decimal ml-6 mt-2 space-y-1">
                    <li>
                      Light travels at different speeds in different media.
                    </li>
                    <li>
                      When light enters a new medium at an angle, its speed
                      changes, causing it to bend.
                    </li>
                  </ul>
                </div>

                {/* Laws */}
                <div className="p-4 bg-[#10182880] rounded-lg border">
                  <h3 className="font-semibold mb-2 text-blue-400">
                    3. Laws of Refraction (Snell&apos;s Laws)
                  </h3>
                  <div className="mb-2">
                    <strong className="text-blue-400">First Law:</strong>
                    <ul className="list-disc ml-6 mt-1 text-sm">
                      <li>
                        The incident ray, the refracted ray, and the normal lie
                        in the same plane.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-blue-400">
                      Second Law (Snell&apos;s Law):
                    </strong>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        fontSize: "20px",
                        marginTop: "10px",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <div style={{ borderBottom: "2px solid white" }}>
                          sin i
                        </div>
                        <div>sin r</div>
                      </div>
                      <div>=</div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ borderBottom: "2px solid white" }}>
                          v₁
                        </div>
                        <div>v₂</div>
                      </div>
                      <div>=</div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ borderBottom: "2px solid white" }}>
                          n₂
                        </div>
                        <div>n₁</div>
                      </div>
                    </div>
                    <p style={{ marginTop: "20px" }}>
                      Where: <br />
                      i = angle of incidence <br />
                      r = angle of refraction <br />
                      v₁, v₂ = speeds of light in medium 1 and 2 <br />
                      n₁, n₂ = refractive indices of medium 1 and 2
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Interactive Simulation + Quiz */}
          <div className="flex flex-col gap-8">
            {/* Interactive Simulation */}
            <div className="px-4 py-8 space-y-6 rounded-lg border bg-gray-800">
              <div className="text-center mb-4">
                <h2 className="text-3xl font-bold mb-2">
                  Interactive Simulation
                </h2>
                <p className="text-muted-foreground">
                  Experiment with different materials and angles to see Snell's
                  law in action
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Refraction Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 rounded-lg p-4 border">
                    {/* SVG Simulation */}
                    <svg viewBox="0 0 500 400" className="w-full h-64 md:h-96">
                      <defs>
                        <filter id="glow">
                          <feGaussianBlur
                            stdDeviation="3"
                            result="coloredBlur"
                          />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>

                        <radialGradient
                          id="lightSource"
                          cx="50%"
                          cy="50%"
                          r="50%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#fbbf24"
                            stopOpacity="0.8"
                          />
                          <stop
                            offset="100%"
                            stopColor="#f59e0b"
                            stopOpacity="0.3"
                          />
                        </radialGradient>

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
                        <marker
                          id="greenArrow"
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
                        </marker>
                      </defs>

                      {/* Mediums */}
                      <rect
                        x="0"
                        y="0"
                        width="500"
                        height="200"
                        fill={materials[medium1].color}
                        opacity="0.4"
                      />
                      <rect
                        x="0"
                        y="200"
                        width="500"
                        height="200"
                        fill={materials[medium2].color}
                        opacity="0.4"
                      />

                      {/* Interface Line */}
                      <line
                        x1="0"
                        y1="200"
                        x2="500"
                        y2="200"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <line
                        x1="0"
                        y1="198"
                        x2="500"
                        y2="198"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        opacity="0.5"
                      />

                      {/* Incident Light */}
                      <circle
                        cx={
                          250 -
                          Math.sin((incidentAngle[0] * Math.PI) / 180) * 140
                        }
                        cy={
                          200 -
                          Math.cos((incidentAngle[0] * Math.PI) / 180) * 140
                        }
                        r="6"
                        fill="url(#lightSource)"
                        filter="url(#glow)"
                        opacity={
                          isAnimating
                            ? Math.sin(animationStep * 0.2) * 0.3 + 0.7
                            : 0.8
                        }
                      />

                      <line
                        x1={
                          250 -
                          Math.sin((incidentAngle[0] * Math.PI) / 180) * 140
                        }
                        y1={
                          200 -
                          Math.cos((incidentAngle[0] * Math.PI) / 180) * 140
                        }
                        x2="250"
                        y2="200"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        markerEnd="url(#blueArrow)"
                        opacity={
                          isAnimating ? Math.min(animationStep / 30, 1) : 1
                        }
                        filter="url(#glow)"
                        strokeDasharray={
                          isAnimating ? `${animationStep * 2} 10` : "none"
                        }
                      />

                      {/* Refracted / Reflected Light */}
                      {isTotalInternalReflection ? (
                        <line
                          x1="250"
                          y1="200"
                          x2={
                            250 +
                            Math.sin((incidentAngle[0] * Math.PI) / 180) * 120
                          }
                          y2={
                            200 -
                            Math.cos((incidentAngle[0] * Math.PI) / 180) * 120
                          }
                          stroke="#ef4444"
                          strokeWidth="4"
                          markerEnd="url(#redArrow)"
                          opacity={
                            isAnimating
                              ? Math.min((animationStep - 30) / 30, 1)
                              : 1
                          }
                          filter="url(#glow)"
                          strokeDasharray={
                            isAnimating
                              ? `${Math.max(0, (animationStep - 30) * 2)} 10`
                              : "none"
                          }
                        />
                      ) : (
                        <line
                          x1="250"
                          y1="200"
                          x2={
                            250 +
                            Math.sin((refractedAngle * Math.PI) / 180) * 120
                          }
                          y2={
                            200 +
                            Math.cos((refractedAngle * Math.PI) / 180) * 120
                          }
                          stroke="#22c55e"
                          strokeWidth="4"
                          markerEnd="url(#greenArrow)"
                          opacity={
                            isAnimating
                              ? Math.min((animationStep - 30) / 30, 1)
                              : 1
                          }
                          filter="url(#glow)"
                          strokeDasharray={
                            isAnimating
                              ? `${Math.max(0, (animationStep - 30) * 2)} 10`
                              : "none"
                          }
                        />
                      )}

                      {/* Animation Particles */}
                      {isAnimating && (
                        <>
                          <circle
                            cx={
                              250 -
                              Math.sin((incidentAngle[0] * Math.PI) / 180) *
                                (140 - (animationStep % 60) * 2)
                            }
                            cy={
                              200 -
                              Math.cos((incidentAngle[0] * Math.PI) / 180) *
                                (140 - (animationStep % 60) * 2)
                            }
                            r="2"
                            fill="#3b82f6"
                            opacity="0.8"
                          />
                          {animationStep > 30 && (
                            <circle
                              cx={
                                isTotalInternalReflection
                                  ? 250 +
                                    Math.sin(
                                      (incidentAngle[0] * Math.PI) / 180
                                    ) *
                                      ((animationStep - 30) % 60) *
                                      2
                                  : 250 +
                                    Math.sin((refractedAngle * Math.PI) / 180) *
                                      ((animationStep - 30) % 60) *
                                      2
                              }
                              cy={
                                isTotalInternalReflection
                                  ? 200 -
                                    Math.cos(
                                      (incidentAngle[0] * Math.PI) / 180
                                    ) *
                                      ((animationStep - 30) % 60) *
                                      2
                                  : 200 +
                                    Math.cos((refractedAngle * Math.PI) / 180) *
                                      ((animationStep - 30) % 60) *
                                      2
                              }
                              r="2"
                              fill={
                                isTotalInternalReflection
                                  ? "#ef4444"
                                  : "#22c55e"
                              }
                              opacity="0.8"
                            />
                          )}
                        </>
                      )}

                      {/* Normal Line */}
                      <line
                        x1="250"
                        y1="50"
                        x2="250"
                        y2="350"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="8,4"
                        opacity="0.7"
                      />
                      <text
                        x="260"
                        y="70"
                        fill="currentColor"
                        fontSize="12"
                        fontWeight="500"
                      >
                        Normal
                      </text>

                      <circle cx="250" cy="200" r="4" fill="currentColor" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Quiz */}
            <section className="px-4 py-8 space-y-6 rounded-lg border bg-gray-800">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Quick Quiz</h2>
                <p className="text-muted-foreground">
                  Test your understanding of refraction!
                </p>
              </div>
              <div className="space-y-4">
                {/* Question 1 */}
                <div>
                  <p className="font-medium mb-2">
                    1. What is the law that governs the bending of light at the
                    interface of two media?
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      "A) Snell's Law",
                      "B) Ohm's Law",
                      "C) Reflection Law",
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
                        selectedAnswer1 === "A) Snell's Law"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedAnswer1 === "A) Snell's Law"
                        ? "Correct!"
                        : "Incorrect. The correct answer is A) Snell's Law."}
                    </div>
                  )}
                </div>

                {/* Question 2 */}
                <div>
                  <p className="font-medium mb-2">
                    2. What happens when the angle of incidence exceeds the
                    critical angle while light travels from glass to air?
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      "A) Light is absorbed",
                      "B) Total Internal Reflection occurs",
                      "C) Refraction occurs",
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
                        selectedAnswer2 ===
                        "B) Total Internal Reflection occurs"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedAnswer2 === "B) Total Internal Reflection occurs"
                        ? "Correct!"
                        : "Incorrect. The correct answer is B) Total Internal Reflection occurs."}
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

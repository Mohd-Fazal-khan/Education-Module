"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Eye,
  Wifi,
  Microscope,
  Lightbulb,
  Zap,
  Atom,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import { useRouter } from "next/navigation";

const realWorldApplications = [
  {
    title: "Cameras & Lenses",
    description: "Photography and imaging systems",
    icon: Camera,
    color: "bg-blue-500",
  },
  {
    title: "Human Eye & Vision",
    description: "How we see and vision correction",
    icon: Eye,
    color: "bg-green-500",
  },
  {
    title: "Fiber Optics Communication",
    description: "High-speed data transmission",
    icon: Wifi,
    color: "bg-purple-500",
  },
  {
    title: "Microscopes & Telescopes",
    description: "Magnification and observation",
    icon: Microscope,
    color: "bg-orange-500",
  },
];

const subtopics = [
  {
    id: "reflection",
    title: "Reflection of Light",
    description: "Laws of reflection and plane mirrors",
    icon: Lightbulb,
    difficulty: "Basic",
  },
  {
    id: "refraction",
    title: "Refraction of Light",
    description: "Snell's law and total internal reflection",
    icon: Zap,
    difficulty: "Intermediate",
  },
  {
    id: "lenses",
    title: "Lenses & Mirrors",
    description: "Image formation and ray diagrams",
    icon: Eye,
    difficulty: "Intermediate",
    // http://localhost:3000/modules/LensesModule
  },
  {
    id: "human-eye",
    title: "Human Eye & Vision Defects",
    description: "Eye structure and vision correction",
    icon: Atom,
    difficulty: "Advanced",
  },
];

export default function HomePage() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModuleIndex((prev) => (prev + 1) % subtopics.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId);
    // window.location.href = `/modules/${moduleId}`;
    router.push(`/modules/${moduleId}`);
  };

  // const nextModule = () => {
  //   if (!isAnimating) {
  //     setIsAnimating(true);
  //     setCurrentModuleIndex((prev) => (prev + 1) % subtopics.length);
  //     setTimeout(() => setIsAnimating(false), 300);
  //   }
  // };

  // const prevModule = () => {
  //   if (!isAnimating) {
  //     setIsAnimating(true);
  //     setCurrentModuleIndex(
  //       (prev) => (prev - 1 + subtopics.length) % subtopics.length
  //     );
  //     setTimeout(() => setIsAnimating(false), 300);
  //   }
  // };
  const nextModule = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      const nextIndex = (currentModuleIndex + 1) % subtopics.length;
      const nextModuleId = subtopics[nextIndex].id;

      router.push(`/modules/${nextModuleId}`);

      setCurrentModuleIndex(nextIndex);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const prevModule = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      const prevIndex = (currentModuleIndex - 1 + subtopics.length) % subtopics.length;
      const prevModuleId = subtopics[prevIndex].id;

      router.push(`/modules/${prevModuleId}`);

      setCurrentModuleIndex(prevIndex);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Left Navigation Arrow */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 z-40 cursor-pointer group"
        onClick={prevModule}
        style={{ userSelect: "none" }}
        aria-label="Previous Module"
      >
        <ChevronLeft className="w-12 h-12 text-blue-600 group-hover:text-blue-800 transition" />
      </div>
      {/* Right Navigation Arrow */}
      <div
        className="fixed right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 z-40 cursor-pointer group"
        onClick={nextModule}
        style={{ userSelect: "none" }}
        aria-label="Next Module"
      >
        <ChevronRight className="w-12 h-12 text-blue-600 group-hover:text-blue-800 transition" />
      </div>
      {/* Header Section */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent leading-tight">
            Optics – The Study of Light
          </h1>
          <div className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto px-4 space-y-4">
            <p>
              Optics is the branch of physics that studies the behavior and
              properties of light, including its interactions with matter and
              the construction of instruments that use or detect it.
            </p>
            <p className="text-base sm:text-lg">
              Light travels in straight lines, reflects off surfaces, bends when
              passing through different materials, and can be focused or
              dispersed by lenses and mirrors. Understanding these principles
              helps us explain how cameras work, why we need glasses, how fiber
              optic cables transmit data, and how telescopes let us see distant
              stars.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/80">
              Through interactive simulations, you&apos;ll discover the mathematical
              relationships that govern light behavior and see how these
              concepts apply to everyday technology and natural phenomena.
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Badge variant="secondary" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Class 10 Physics • NCERT Curriculum
            </Badge>
          </div>
        </div>

        {/* Real-World Applications */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center">
            Real-World Applications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {realWorldApplications.map((app, index) => {
              const IconComponent = app.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 border-border/50 hover:scale-105"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 ${app.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">
                      {app.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center text-sm">
                      {app.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Interactive Learning Modules */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Interactive Learning Journey
            </h2>
            <div className="max-w-6xl mx-auto mb-6 flex justify-center">
              <div className="relative w-full max-w-4xl h-56 sm:h-72 md:h-80 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-red-900/20 rounded-2xl overflow-hidden border border-primary/30 shadow-2xl">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 600 240"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Enhanced Background gradient and effects */}
                  <defs>
                    <linearGradient
                      id="lightGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop
                        offset="30%"
                        stopColor="#8b5cf6"
                        stopOpacity="0.4"
                      />
                      <stop
                        offset="70%"
                        stopColor="#ef4444"
                        stopOpacity="0.4"
                      />
                      <stop
                        offset="100%"
                        stopColor="#f59e0b"
                        stopOpacity="0.4"
                      />
                    </linearGradient>
                    <linearGradient
                      id="whiteLight"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop
                        offset="100%"
                        stopColor="#ffffff"
                        stopOpacity="0.3"
                      />
                    </linearGradient>
                    <radialGradient id="lightSource" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                      <stop
                        offset="70%"
                        stopColor="#f59e0b"
                        stopOpacity="0.8"
                      />
                      <stop
                        offset="100%"
                        stopColor="#d97706"
                        stopOpacity="0.4"
                      />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Light Source */}
                  <g>
                    <circle
                      cx="60"
                      cy="120"
                      r="18"
                      fill="url(#lightSource)"
                      filter="url(#glow)"
                    >
                      <animate
                        attributeName="r"
                        values="15;22;15"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="60" cy="120" r="10" fill="#fbbf24">
                      <animate
                        attributeName="opacity"
                        values="0.8;1;0.8"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    {[...Array(12)].map((_, i) => (
                      <line
                        key={i}
                        x1="60"
                        y1="120"
                        x2={60 + Math.cos((i * Math.PI) / 6) * 35}
                        y2={120 + Math.sin((i * Math.PI) / 6) * 35}
                        stroke="#fbbf24"
                        strokeWidth="2"
                        opacity="0.6"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.2;0.9;0.2"
                          dur={`${1.5 + i * 0.15}s`}
                          repeatCount="indefinite"
                        />
                      </line>
                    ))}
                  </g>

                  {/* White Light Beam */}
                  <g>
                    <line
                      x1="78"
                      y1="120"
                      x2="220"
                      y2="120"
                      stroke="url(#whiteLight)"
                      strokeWidth="8"
                      filter="url(#glow)"
                    >
                      <animate
                        attributeName="stroke-width"
                        values="6;12;6"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </line>
                    {[...Array(8)].map((_, i) => (
                      <circle key={i} r="2.5" fill="#ffffff" opacity="0.9">
                        <animateMotion
                          dur={`${1.2 + i * 0.2}s`}
                          repeatCount="indefinite"
                          path="M 78,120 L 220,120"
                        />
                      </circle>
                    ))}
                  </g>

                  {/* Prism */}
                  <g>
                    <polygon
                      points="220,90 260,120 220,150"
                      fill="rgba(255,255,255,0.2)"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="4"
                      filter="url(#glow)"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 240 120; 8 240 120; 0 240 120"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </polygon>
                    <line
                      x1="230"
                      y1="105"
                      x2="245"
                      y2="115"
                      stroke="#ffffff"
                      strokeWidth="2"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.3;0.8;0.3"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </line>
                    <line
                      x1="230"
                      y1="135"
                      x2="245"
                      y2="125"
                      stroke="#ffffff"
                      strokeWidth="2"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.3;0.8;0.3"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </line>
                  </g>

                  {/* Dispersed Light Spectrum */}
                  <g>
                    {[
                      { color: "#ef4444", y: 80, delay: "0s" },
                      { color: "#f97316", y: 95, delay: "0.2s" },
                      { color: "#eab308", y: 110, delay: "0.4s" },
                      { color: "#22c55e", y: 120, delay: "0.6s" },
                      { color: "#3b82f6", y: 130, delay: "0.8s" },
                      { color: "#6366f1", y: 145, delay: "1s" },
                      { color: "#8b5cf6", y: 160, delay: "1.2s" },
                    ].map((ray, i) => (
                      <g key={i}>
                        <line
                          x1="260"
                          y1="120"
                          x2="540"
                          y2={ray.y}
                          stroke={ray.color}
                          strokeWidth="6"
                          filter="url(#glow)"
                        >
                          <animate
                            attributeName="opacity"
                            values="0.5;1;0.5"
                            dur="3s"
                            begin={ray.delay}
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="stroke-width"
                            values="4;8;4"
                            dur="3s"
                            begin={ray.delay}
                            repeatCount="indefinite"
                          />
                        </line>
                        <path
                          d={`M 270 ${120 + (ray.y - 120) * 0.15} Q 350 ${
                            ray.y - 8
                          } 430 ${ray.y} T 520 ${ray.y}`}
                          stroke={ray.color}
                          strokeWidth="2"
                          fill="none"
                          opacity="0.7"
                        >
                          <animate
                            attributeName="opacity"
                            values="0.4;0.9;0.4"
                            dur="2s"
                            begin={ray.delay}
                            repeatCount="indefinite"
                          />
                        </path>
                        <circle r="2" fill={ray.color}>
                          <animateMotion
                            dur="2.5s"
                            begin={ray.delay}
                            repeatCount="indefinite"
                            path={`M 260,120 L 540,${ray.y}`}
                          />
                        </circle>
                      </g>
                    ))}
                  </g>

                  {/* Labels */}
                  <text
                    x="60"
                    y="170"
                    fill="#fbbf24"
                    fontSize="14"
                    textAnchor="middle"
                    fontWeight="bold"
                    filter="url(#glow)"
                  >
                    Light Source
                  </text>
                  <text
                    x="240"
                    y="185"
                    fill="#ffffff"
                    fontSize="14"
                    textAnchor="middle"
                    fontWeight="bold"
                    filter="url(#glow)"
                  >
                    Prism
                  </text>
                  <text
                    x="520"
                    y="210"
                    fill="#ffffff"
                    fontSize="14"
                    textAnchor="middle"
                    fontWeight="bold"
                    filter="url(#glow)"
                  >
                    Visible Spectrum
                  </text>
                </svg>
              </div>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base mt-6 max-w-4xl mx-auto px-4">
              Experience the complete world of optics in action! Watch white
              light disperse through a prism into its component colors, observe
              lens focusing effects, and see mirror reflections - all
              fundamental phenomena that explain how light behaves in our
              universe and powers modern technology.
            </p>
          </div>
          {/* Module Slider */}
        
        </section>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center text-muted-foreground">
          <div className="border-t border-border/50 pt-6 sm:pt-8">
            <p className="text-sm sm:text-base">
              Interactive Physics Learning • Built for Class 10 Students
            </p>
            <p className="text-xs sm:text-sm mt-2 opacity-75">
              Master the fundamental principles of optics through hands-on
              simulations and real-world applications
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

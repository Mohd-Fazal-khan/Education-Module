"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import ReflectionModule from "@/components/modules/ReflectionModule"
import RefractionModule from "@/components/modules/RefractionModule"
import LensesModule from "@/components/modules/LensesModule"
import HumanEyeModule from "@/components/modules/HumanEyeModule"

const moduleComponents = {
  reflection: ReflectionModule,
  refraction: RefractionModule,
  lenses: LensesModule,
  "human-eye": HumanEyeModule,
}

const moduleNames = {
  reflection: "Reflection of Light",
  refraction: "Refraction of Light",
  lenses: "Lenses & Mirrors",
  "human-eye": "Human Eye & Vision Defects",
}

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params.id as string

  const ModuleComponent = moduleComponents[moduleId as keyof typeof moduleComponents]
  const moduleName = moduleNames[moduleId as keyof typeof moduleNames]

  if (!ModuleComponent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Module Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested learning module could not be found.</p>
          <Button onClick={() => router.push("/")} className="w-full sm:w-auto">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="shrink-0">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <h1 className="text-lg sm:text-xl font-semibold truncate">{moduleName}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <ModuleComponent />
    </div>
  )
}

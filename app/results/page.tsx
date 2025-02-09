"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Gift, Sparkles } from "lucide-react"

export default function ResultsPage() {
  const [ideas, setIdeas] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    // Get ideas from localStorage when component mounts
    const storedIdeas = localStorage.getItem("giftIdeas")
    if (storedIdeas) {
      setIdeas(JSON.parse(storedIdeas))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-indigo-800">
          Your Personalized Gift Ideas
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          {ideas.map((idea: string, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
                <Gift className="text-white h-8 w-8 mb-2" />
                <h2 className="text-xl font-semibold text-white">Gift Idea {index + 1}</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700">{idea}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 flex items-center justify-center"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Generate More Ideas
          </Button>
        </div>
      </div>
    </div>
  )
}

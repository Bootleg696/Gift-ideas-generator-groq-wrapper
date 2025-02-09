"use client"

import { useState } from "react"
import GiftForm from "./components/GiftForm"
import GiftResults from "./components/GiftResults"
import { Card, CardContent } from "../components/ui/card"

export default function Home() {
  const [giftIdeas, setGiftIdeas] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-indigo-800">Gift Idea Generator</h1>
        <Card className="backdrop-blur-sm bg-white/70">
          <CardContent className="p-6">
            <GiftForm setGiftIdeas={setGiftIdeas} />
            {giftIdeas.length > 0 && <GiftResults giftIdeas={giftIdeas} />}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

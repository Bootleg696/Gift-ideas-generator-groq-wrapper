import { Card } from "../../components/ui/card"

interface GiftResultsProps {
  giftIdeas: string[]
}

export default function GiftResults({ giftIdeas }: GiftResultsProps) {
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Gift Ideas</h2>
      {giftIdeas.map((idea, index) => (
        <Card key={index} className="p-4 bg-white/80">
          <p className="text-gray-800">{idea}</p>
        </Card>
      ))}
    </div>
  )
}

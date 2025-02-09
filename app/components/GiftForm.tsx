"use client"

import { useState } from "react";
import { useChat } from "ai/react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Checkbox } from "../../components/ui/checkbox";
import { LoaderCircle, Loader2 } from "lucide-react"; // Alternative loading icon
import { useRouter } from 'next/navigation';


const CATEGORIES = [
  "Sports",
  "Cosmetics",
  "Flowers",
  "Electronics",
  "Books",
  "Clothing",
  "Home Decor",
  "Food & Drink",
  "Jewelry",
  "Travel",
];

const RELATIONSHIPS = [
  "Boyfriend",
  "Girlfriend",
  "Husband",
  "Wife",
  "Mother",
  "Father",
  "Brother",
  "Sister",
  "Grandma",
  "Grandpa",
  "Friend",
  "Coworker",
];

interface GiftFormProps {
  setGiftIdeas: (ideas: string[]) => void;
}

export default function GiftForm({ setGiftIdeas }: GiftFormProps) {
  const router = useRouter();
  const [relationship, setRelationship] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [response, setResponse] = useState("");

  const { messages, isLoading, handleSubmit } = useChat({
    api: "/api/chat",
    onResponse: (response) => {
      console.log("Received response:", response); // Debug log
    },
    onFinish: (message) => {
      console.log("Finished message:", message); // Debug log
      const ideas = message.content.split("\n").filter((idea) => idea.trim() !== "");
      setGiftIdeas(ideas);
      setResponse(message.content);
    },
    onError: (error) => {
      console.error("Chat error:", error); // Debug log
    }
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    const prompt = `Suggest 5 gift ideas for my ${relationship}. They like ${categories.join(
      ", "
    )}. Their interests include ${interests}. Budget: ${budget}. For each gift idea, provide a brief description and a generic online store where it can be purchased.`;
    
    console.log("Sending request to API...");
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received response:", data);
      
      // Extract content from the correct path in the response
      const content = data.choices[0].message.content;
      const ideas = content.split('\n').filter((idea: string) => idea.trim() !== '');
      
      // Store the ideas and navigate
      localStorage.setItem('giftIdeas', JSON.stringify(ideas));
      router.push('/results');
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
<div>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-800">Who are you buying for?</h2>
          <RadioGroup value={relationship} onValueChange={setRelationship}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {RELATIONSHIPS.map((rel) => (
                <div key={rel} className="flex items-center space-x-2">
                  <RadioGroupItem value={rel} id={rel} />
                  <Label htmlFor={rel}>{rel}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-800">Select gift categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CATEGORIES.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={categories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setCategories([...categories, category]);
                    } else {
                      setCategories(categories.filter((c) => c !== category));
                    }
                  }}
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="budget" className="text-lg font-medium text-indigo-800">
              Budget
            </Label>
            <Input
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. $50-$100"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="interests" className="text-lg font-medium text-indigo-800">
              Recipient's Interests
            </Label>
            <Input
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g. hiking, cooking, photography"
              className="mt-1"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !relationship || categories.length === 0 || !budget || !interests}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="animate-spin" />
              Generating Ideas...
            </>
          ) : (
            "Get Gift Ideas"
          )}
        </Button>
      </form>

      {response && (
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold text-indigo-800">AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

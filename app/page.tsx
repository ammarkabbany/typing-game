"use client";

import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import TypingArea from "@/components/typing/TypingArea";
import Stats from "@/components/stats/Stats";

/**
 * Home page component
 * Manages the main application state and layout
 */
export default function Home() {
  const [completed, setCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const handleComplete = useCallback((stats: { wpm: number; accuracy: number }) => {
    setWpm(stats.wpm);
    setAccuracy(stats.accuracy);
    setCompleted(true);
  }, []);

  const handleReset = useCallback(() => {
    setCompleted(false);
    setWpm(0);
    setAccuracy(0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {/* Introduction section */}
        {/* <section className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Welcome to FlowType</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Improve your typing speed and accuracy through focused practice.
            Our carefully curated texts help you build muscle memory and confidence.
          </p>
        </section> */}

        {/* Main typing area */}
        <div className="p-6 space-y-6">
          <TypingArea
            onComplete={handleComplete}
            completed={completed}
          />
        </div>

        {/* Results section */}
        {completed && (
          <div className="space-y-6">
            <Stats wpm={wpm} accuracy={accuracy} />
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Tips section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Typing Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Maintain proper posture and hand position</li>
              <li>• Focus on accuracy first, speed will follow</li>
              <li>• Take regular breaks to prevent fatigue</li>
              <li>• Practice with varied text content</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Why Practice Matters</h3>
            <p className="text-sm text-muted-foreground">
              Regular typing practice helps improve productivity, reduces errors,
              and builds muscle memory. Just 15 minutes of daily practice can
              significantly enhance your typing speed and accuracy.
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
}
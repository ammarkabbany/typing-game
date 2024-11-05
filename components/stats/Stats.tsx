import { Keyboard, Target } from "lucide-react";
import StatCard from "./StatsCard";

interface StatsProps {
  wpm: number;
  accuracy: number;
}

/**
 * Statistics display component showing WPM and accuracy
 */
export default function Stats({ wpm, accuracy }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        icon={Keyboard}
        label="Words per minute"
        value={wpm}
      />
      <StatCard
        icon={Target}
        label="Accuracy"
        value={accuracy}
        unit="%"
      />
    </div>
  );
}
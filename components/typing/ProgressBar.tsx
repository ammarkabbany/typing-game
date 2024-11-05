"use client";

interface ProgressBarProps {
  timeLeft: number;
  progress: number;
  wpm: number;
}

/**
 * Displays the timer and typing progress
 */
export default function ProgressBar({ timeLeft, progress, wpm }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col text-base">
        <span className="text-purple-300 font-bold">{timeLeft} s</span>
        <span className="text-purple-300 font-bold">WPM: {wpm}</span>
      </div>
      {/* <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div> */}
    </div>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";
import TextDisplay from "./TypingDisplay";
import ProgressBar from "./ProgressBar";
import { TIMER_DURATION } from "@/lib/constants";
import { getRandomQuote } from "@/lib/quotes";
import { Skeleton } from "../ui/skeleton";

interface TypingAreaProps {
  onComplete: (stats: { wpm: number; accuracy: number }) => void;
  completed: boolean;
}

export default function TypingArea({ onComplete, completed }: TypingAreaProps) {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [errors, setErrors] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalCharactersTyped, setTotalCharactersTyped] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Add refs to track current values
  const statsRef = useRef({
    totalCharactersTyped: 0,
    input: "",
    totalErrors: 0,
    errors: 0,
  });

  // Update ref values when they change
  useEffect(() => {
    statsRef.current = {
      totalCharactersTyped,
      input,
      totalErrors,
      errors,
    };
  }, [totalCharactersTyped, input, totalErrors, errors]);

  // Fetch random quote on mount
  useEffect(() => {
    getRandomQuote().then(setQuote);
  }, []);

  // Start the timer when typing begins
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            intervalRef.current = null;
  
            // Calculate final stats using ref values
            const { totalCharactersTyped, input, totalErrors, errors } = statsRef.current;
            const totalTyped = totalCharactersTyped + input.length;
            const tErrors = totalErrors + errors;
            const accuracy = totalTyped > 0 
              ? Math.round(((totalTyped - tErrors) / totalTyped) * 100) 
              : 100;

            const timeElapsedMinutes = TIMER_DURATION / 60;
            const grossWPM = Math.round((totalTyped / 5) / timeElapsedMinutes);
            
            onComplete({
              wpm: grossWPM > 0 ? grossWPM : 0,
              accuracy,
            });
  
            return 0;
          }
          return time - 1;
        });
      }, 1000);
  
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isActive, onComplete]); // Only depend on isActive and onComplete

  // Separate effect for WPM updates
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timeElapsedMinutes = (TIMER_DURATION - timeLeft) / 60;
      const totalTyped = totalCharactersTyped + input.length;
      const grossWPM = timeElapsedMinutes < 0.016 ? 0 : Math.round((totalTyped / 5) / timeElapsedMinutes);
      setWpm(grossWPM);
    }
  }, [timeLeft, totalCharactersTyped, input.length, isActive]);

  // Handle input changes and error counting
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    if (!isActive && newInput.length === 1) {
      setIsActive(true);
    }
  
    setInput(newInput);
  
    if (quote) {
      // Calculate new errors based on current input
      const newErrors = Array.from(newInput).reduce(
        (acc, char, i) => (char !== quote.text[i] ? acc + 1 : acc),
        0
      );
      setErrors(newErrors);
  
      // If the quote is fully typed
      if (newInput.length === quote.text.length) {
        // Log total characters and errors
        // Update totals for accuracy calculations
        setTotalCharactersTyped((prev) => prev + newInput.length);
        setTotalErrors((prev) => prev + newErrors);
  
        // Prepare for new quote
        setInput(""); // Reset input
        getRandomQuote().then(setQuote); // Fetch new quote
      }
    }
  };
  
  useEffect(() => {
    const textarea = inputRef.current;

    const preventTextSelection = (e: MouseEvent) => {
        e.preventDefault();
    };

    if (textarea) {
        textarea.addEventListener("mousedown", preventTextSelection);
    }


    return () => {
        if (textarea) {
            textarea.removeEventListener("mousedown", preventTextSelection);
        }
    };
  }, []);

  // force focus on the textarea
  useEffect(() => {
    inputRef.current?.focus();
  });

  if (!quote) {
    // skeleton of the quote
    return <div className="">
      <div className="p-6 h-52 flex flex-col gap-4">
        <Skeleton className="w-full h-4" />
        <Skeleton className="size-full" />
      </div>
    </div>
  }

  return (
    <div className="space-y-6">
      <ProgressBar timeLeft={timeLeft} progress={(input.length / quote.text.length) * 100} wpm={wpm} />
      <div className="relative">
        <div className="p-6 h-full">
          <TextDisplay text={quote.text} input={input} />
        </div>
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInput}
          className="absolute inset-0 w-full h-full p-12 bg-transparent border-none resize-none focus:outline-none focus:ring-0 font-mono text-xl leading-relaxed text-transparent caret-current spellcheck-none select-none pointer-events-none opacity-0"
          placeholder={quote.text}
          disabled={completed || timeLeft === 0 || input.length === quote.text.length}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
      />
      </div>
    </div>
  );
}

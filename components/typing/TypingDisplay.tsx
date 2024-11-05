"use client";

interface TextDisplayProps {
  text: string;
  input: string;
}

/**
 * Displays the text to be typed with visual feedback
 * - Green for correct characters
 * - Red for incorrect characters
 * - Gray for remaining characters
 */
export default function TextDisplay({ text, input }: TextDisplayProps) {
  return (
    <div
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
      className="font-mono text-2xl leading-relaxed p-6 rounded-lg z-10 pointer-events-none">
      <div className="relative">
        {text.split("").map((char, index) => {
          let className = "text-muted-foreground";
          
          if (index < input.length) {
            className = input[index] === char
              ? "text-foreground relative break-words"
              : "text-red-500 relative break-words";
          }
          
          const showCaret = index === input.length - 1;
          
          return (
            <span key={index} className={className}>
              {char}
              {/* {showCaret && (
                <span 
                  className="w-[1px] h-[1.75rem] -top-0.5 bg-purple-500"
                  style={{ left: 'calc(100% + 1px)' }}
              />
              )} */}
            </span>
          );
        })}
      </div>
    </div>
  );
}
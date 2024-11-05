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
      <div className="relative break-words">
        {text.split("").map((char, index) => {
          let className = "text-muted-foreground";

          if (index < input.length) {
            className = input[index] === char && input[index] !== " "
              ? "text-foreground relative"
              : "text-red-500 relative";
            if (char === " " && input[index] !== " ") {
              // make the char appear as the text in input[index]
              char = input[index]
              className = "text-red-500 underline relative"
            }
          }
          const showCaret = index === input.length - 1;

          return (
            <span key={index} className={className}>
              {char}
              {showCaret && (
                <span
                  className="absolute w-[1px] h-[1.75rem] -top-0.5 bg-purple-500"
                  style={{ left: 'calc(100% + 1px)' }}
                />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

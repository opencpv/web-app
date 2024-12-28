import { greatVibes } from "@/app/fonts/font";

interface SectionHeadingProps {
  text: string;
  className?: string;
}

export function SectionHeading({ text, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`${greatVibes.className} text-4xl text-center 2 ${className}`}
    >
      {text}
    </h2>
  );
}

interface ButtonProps {
  text: string;
  color: "primary" | "secondary" | "tertiary" | "white";
  width: "sm" | "md" | "lg" | "full";
  height: "sm" | "md" | "lg" | "full";
  variant: "outline" | "solid" | "ghost";
  onClick: () => void;
}
export default function ButtonComponent({
  text,
  color,
  width,
  height,
  variant,
  onClick,
}: ButtonProps) {
  const sizeClass =
    width === "sm"
      ? "px-2"
      : width === "md"
      ? "px-6"
      : width === "lg"
      ? "px-12"
      : "w-full";
  const heightClass =
    height === "sm"
      ? "py-1"
      : height === "md"
      ? "py-3"
      : height === "lg"
      ? "py-5"
      : "h-full";
  const colorClass =
    color === "primary"
      ? "yellow"
      : color === "secondary"
      ? "blue"
      : color === "white"
      ? "white"
      : "green";

  const variantClass =
    variant === "outline"
      ? `border-2 border-${colorClass}-400 text-${
          colorClass === "white" ? "white" : `${colorClass}-400`
        } bg-transparent`
      : variant === "solid"
      ? `bg-${colorClass}-400 text-${
          color === "primary" ? "black" : color === "white" ? "black" : "white"
        }`
      : `text-${
          colorClass === "white" ? "white" : `${colorClass}-400`
        } bg-transparent hover:bg-${colorClass}-50`;

  return (
    <button
      onClick={onClick}
      className={`${sizeClass} ${heightClass} ${variantClass} rounded-md transition duration-300`}
    >
      {text}
    </button>
  );
}

interface SpacerProps {
  height?: number;
}
export function Spacer({ height = 10 }: SpacerProps) {
  return <div className={`h-${height}`}></div>;
}

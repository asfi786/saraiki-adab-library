import { cn } from "@/lib/utils";

interface AjrakStarProps {
  size?: number;
  color?: string;
  className?: string;
  rotate?: number;
}

/** 8-pointed star (Tara) motif — the signature Ajrak medallion. */
export function AjrakStar({ size = 24, color = "currentColor", className, rotate = 0 }: AjrakStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn("shrink-0", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {/* outer 8-pointed star */}
      <path
        d="M50 2 L61 27 L88 12 L73 39 L98 50 L73 61 L88 88 L61 73 L50 98 L39 73 L12 88 L27 61 L2 50 L27 39 L12 12 L39 27 Z"
        fill={color}
      />
      {/* inner diamond */}
      <path d="M50 30 L70 50 L50 70 L30 50 Z" fill="#F7F2E7" opacity="0.9" />
      {/* center dot */}
      <circle cx="50" cy="50" r="7" fill={color} />
    </svg>
  );
}

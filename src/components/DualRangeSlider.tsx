import { useState, useRef, useEffect, useCallback } from "react";

interface DualRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
}

export default function DualRangeSlider({
  min,
  max,
  step = 100,
  value,
  onChange,
  formatLabel = (v) => `$${v.toLocaleString()}`,
}: DualRangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);

  const getPercent = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max]
  );

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const raw = min + percent * (max - min);
      return Math.round(raw / step) * step;
    },
    [min, max, step]
  );

  const handlePointerMove = useCallback(
    (clientX: number) => {
      const val = getValueFromPosition(clientX);
      if (dragging === "min") {
        onChange([Math.min(val, value[1] - step), value[1]]);
      } else if (dragging === "max") {
        onChange([value[0], Math.max(val, value[0] + step)]);
      }
    },
    [dragging, getValueFromPosition, onChange, step, value]
  );

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      handlePointerMove(e.clientX);
    };
    const onUp = () => setDragging(null);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, handlePointerMove]);

  const minPercent = getPercent(value[0]);
  const maxPercent = getPercent(value[1]);

  return (
    <div className="px-1 pt-2 pb-4">
      {/* Labels */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-stone-500 font-medium tracking-wide">
          {formatLabel(value[0])}
        </span>
        <span className="text-xs text-stone-500 font-medium tracking-wide">
          {formatLabel(value[1])}
        </span>
      </div>

      {/* Track */}
      <div ref={trackRef} className="relative h-2 bg-stone-200 rounded-full cursor-pointer">
        {/* Active range */}
        <div
          className="absolute h-full rounded-full bg-gradient-to-r from-amber-700 to-amber-600"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />

        {/* Min Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-amber-800 border-2 border-white shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
          style={{ left: `${minPercent}%` }}
          onPointerDown={(e) => {
            e.preventDefault();
            setDragging("min");
          }}
        >
          <div className="absolute inset-1 rounded-full bg-white/30" />
        </div>

        {/* Max Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-amber-800 border-2 border-white shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
          style={{ left: `${maxPercent}%` }}
          onPointerDown={(e) => {
            e.preventDefault();
            setDragging("max");
          }}
        >
          <div className="absolute inset-1 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

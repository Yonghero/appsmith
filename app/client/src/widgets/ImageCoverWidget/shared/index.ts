import { LineConfig } from "konva/lib/shapes/Line";

export function generateLineOptions(): Partial<LineConfig> {
  return {
    stroke: "red",
    strokeWidth: 2,
    lineCap: "round",
    lineJoin: "round",
  };
}

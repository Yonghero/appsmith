import { LineConfig } from "konva/lib/shapes/Line";

export function generateLineOptions(): Partial<LineConfig> {
  return {
    stroke: "red",
    strokeWidth: 5,
    lineCap: "round",
    lineJoin: "round",
  };
}

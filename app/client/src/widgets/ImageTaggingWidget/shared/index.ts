import { LineConfig } from "konva/lib/shapes/Line";

export function generateLineOptions(): Partial<LineConfig> {
  return {
    stroke: "red",
    strokeWidth: 2,
    lineCap: "round",
    lineJoin: "round",
  };
}

export function getLastItemInMap(map: Map<any, any>): any {
  return Array.from(map)[map.size - 1];
}
export function getLastKeyInMap(map: Map<any, any>): any {
  return Array.from(map)[map.size - 1][0];
}
export function getLastValueInMap(map: Map<any, any>): any {
  return Array.from(map)[map.size - 1][1];
}

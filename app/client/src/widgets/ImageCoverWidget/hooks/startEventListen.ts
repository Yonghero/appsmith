import Konva from "konva";
import { mouseWheel } from "../events";

export function startEventListen(container: Konva.Layer) {
  const canvasEventMap: Record<string, any> = {
    wheel: mouseWheel,
  };

  Object.keys(canvasEventMap).forEach((eventName) => {
    container.on(eventName, canvasEventMap[eventName].bind(container));
  });

  return 1;
}

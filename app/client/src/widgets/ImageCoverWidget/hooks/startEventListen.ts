import Konva from "konva";
import { mouseWheel, mouseDown, mouseUp, mouseMove } from "../events";

export interface ListenObj {
  layer: Konva.Layer;
  stage: Konva.Stage;
}

export function startEventListen({ layer, stage }: ListenObj) {
  const canvasEventMap: Record<string, any> = {
    wheel: mouseWheel,
    mousedown: mouseDown,
    mouseup: mouseUp,
    mousemove: mouseMove,
  };

  // canvas容器事件监听处理
  Object.keys(canvasEventMap).forEach((eventName) => {
    layer.on(
      eventName,
      canvasEventMap[eventName].bind(layer, { layer, stage }),
    );
  });

  return 1;
}

import Konva from "konva";
import { mouseWheel, mouseDown, mouseUp, mouseMove } from "../events";
import CvatStore from "../store";

export interface ListenObj {
  layer: any;
  stage: Konva.Stage;
}

export function startEventListen(
  cvatStore: CvatStore,
  { layer, stage }: ListenObj,
) {
  const canvasEventMap: Record<string, any> = {
    wheel: mouseWheel,
    mousedown: mouseDown,
    mouseup: mouseUp,
    mousemove: mouseMove,
  };

  // canvas容器事件监听处理
  Object.keys(canvasEventMap).forEach((eventName) => {
    stage.on(
      eventName,
      canvasEventMap[eventName].bind(cvatStore, { layer, stage }),
    );
  });

  return 1;
}

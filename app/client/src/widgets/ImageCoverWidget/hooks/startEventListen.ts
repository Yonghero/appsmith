import { useState } from "react";
import { Layer } from "konva/lib/Layer";
import Konva from "konva";
import {
  mouseWheel,
  mouseDown,
  mouseUp,
  mouseMove,
  keyDown,
  keyUp,
} from "../events";
import CvatStore from "../store";

export interface ListenObj {
  layer: Konva.Layer;
  stage: Konva.Stage;
}

export function startEventListen(
  cvatStore: CvatStore,
  { layer, stage }: ListenObj,
  containerId: string,
) {
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
      canvasEventMap[eventName].bind(cvatStore, { layer, stage }),
    );
  });

  // 键盘监听事件
  const keyboardEvent = {
    keyDown,
    keyUp,
  };

  const container = document.getElementById(`${containerId}`);

  Object.keys(keyboardEvent).forEach((eventName) => {
    keyboardEvent[eventName].call(cvatStore, { layer, stage }, container);
  });

  return 1;
}

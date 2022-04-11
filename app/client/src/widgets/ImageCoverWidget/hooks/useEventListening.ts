import Konva from "konva";
import { useEffect } from "react";
import CvatStore from "../store";
import { startEventListen } from "./startEventListen";

export function useEventListening(
  cvatStore: CvatStore,
  layer: Konva.Layer | undefined,
  stage: Konva.Stage | undefined,
  containerId: string,
) {
  // 事件监听
  useEffect(() => {
    if (layer && stage) {
      startEventListen(cvatStore, { layer, stage }, containerId);
    }
  }, [layer && stage]);
}

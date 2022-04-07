import { useState } from "react";
import { ListenObj } from "./../hooks/startEventListen";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import { generateLineOptions } from "../shared";

// 辅助线
const [auxiliaryLine, setAuxiliaryLine] = useState<Konva.Line[]>([]);

// 鼠标滚轮
export function mouseWheel(
  { layer, stage }: ListenObj,
  e: KonvaEventObject<WheelEvent>,
): void {
  console.log("layer, stage : ", layer, stage, e);

  const scaleBy = 1.01;
  e.evt.preventDefault();

  const oldScale = stage.scaleX();
  const pointer: any = stage.getPointerPosition();

  const mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };

  // how to scale? Zoom in? Or zoom out?
  let direction = e.evt.deltaY > 0 ? 1 : -1;

  // when we zoom on trackpad, e.evt.ctrlKey is true
  // in that case lets revert direction
  if (e.evt.ctrlKey) {
    direction = -direction;
  }

  const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  stage.scale({ x: newScale, y: newScale });

  const newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };
  stage.position(newPos);
}

// 鼠标按下
export function mouseDown(
  { layer, stage }: ListenObj,
  e: KonvaEventObject<MouseEvent>,
) {
  console.log("mouseDown");
}

// 鼠标抬起
export function mouseUp(
  { layer, stage }: ListenObj,
  e: KonvaEventObject<MouseEvent>,
) {
  console.log("mouseUp");
}

// 鼠标移动
export function mouseMove(
  { layer, stage }: ListenObj,
  e: KonvaEventObject<MouseEvent>,
) {
  console.log("mousemove", e, layer.getAttr("width"), layer.getAttr("height"));
  if (auxiliaryLine.length) {
  } else {
    // generator lines
    const vline = new Konva.Line({
      points: [5, 70, 140, 23, 250, 60, 300, 20],
      ...generateLineOptions(),
    });
    const cline = new Konva.Line({
      points: [15, 70, 140, 23],
      ...generateLineOptions(),
    });

    layer.add(vline);
    layer.add(cline);

    layer.draw();

    setAuxiliaryLine([vline, cline]);
  }
}

import { setMouseDownTarget } from "./../store/action/index";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { ListenObj } from "../hooks";
import { generateLineOptions } from "../shared";
import CvatStore, { DrawType } from "../store";
import {
  pushRect,
  setAuxiliaryLines,
  setMouseMoveInitXY,
} from "../store/action";

function generateRect(cvatStore: CvatStore, { layer, stage }: ListenObj) {
  const pointer = stage.getPointerPosition();
  // 生成矩形
  const rect = new Konva.Rect({
    x: pointer?.x,
    y: pointer?.y,
    width: 0,
    height: 0,
    draggable: true,
  });
  layer.add(rect);
  // 增加矩形操作功能
  const rectTr = new Konva.Transformer({
    nodes: [rect],
    boundBoxFunc: (oldBox, newBox) => {
      const box = getClientRect(newBox);
      const isOut =
        box.x < 0 ||
        box.y < 0 ||
        box.x + box.width > stage.width() ||
        box.y + box.height > stage.height();

      if (isOut) {
        return oldBox;
      }
      return newBox;
    },
  });

  // rectTr.on("dragstart", () => {
  //   console.log("dragstart: ");

  //   cvatStore.dispatch(setMouseDownTarget("shape"));
  // });
  // rectTr.on("dragmove", () => {
  // const boxes = rectTr.nodes().map((node) => node.getClientRect());
  // const box = getTotalBox(boxes);
  // rectTr.nodes().forEach((shape) => {
  //   const absPos = shape.getAbsolutePosition();
  //   // where are shapes inside bounding box of all shapes?
  //   const offsetX = box.x - absPos.x;
  //   const offsetY = box.y - absPos.y;
  //   // we total box goes outside of viewport, we need to move absolute position of shape
  //   const newAbsPos = { ...absPos };
  //   if (box.x < 0) {
  //     newAbsPos.x = -offsetX;
  //   }
  //   if (box.y < 0) {
  //     newAbsPos.y = -offsetY;
  //   }
  //   if (box.x + box.width > stage.width()) {
  //     newAbsPos.x = stage.width() - box.width - offsetX;
  //   }
  //   if (box.y + box.height > stage.height()) {
  //     newAbsPos.y = stage.height() - box.height - offsetY;
  //   }
  //   shape.setAbsolutePosition(newAbsPos);
  // });
  // });
  // rectTr.on("dragend", () => {
  //   // cvatStore.dispatch(setMouseDownTarget("shape"));
  // });
  layer.add(rectTr);

  cvatStore.dispatch(pushRect({ shape: rect, transform: rectTr }));
}

export function drawShapeIntoCanvas(
  type: DrawType,
  cvatStore: CvatStore,
  { layer, stage }: ListenObj,
  e: KonvaEventObject<MouseEvent>,
  status: "move" | "down",
) {
  const pointer = stage.getPointerPosition();
  if (!pointer || !cvatStore.state.readyDraw) return;
  // 鼠标按下绘制
  if (type === "rect" && status === "down") {
    generateRect(cvatStore, { layer, stage });
  }

  // 鼠标移动绘制
  if (status === "move" && cvatStore.state.rectList.length) {
    const { x, y } = cvatStore.state.mouseDownParma;

    // 矩形框
    cvatStore.state.rectList[
      cvatStore.state.rectList.length - 1
    ].shape.setAttrs({
      width: pointer.x - x,
      height: pointer.y - y,
    });
    // console.log("currentRect: ", currentRect);
  }
}

export function generateAuxiliaryLines(
  cvatStore: CvatStore,
  { layer, stage }: ListenObj,
) {
  const pointer = stage.getPointerPosition();
  if (!pointer) {
    return;
  }
  if (cvatStore.state.auxiliaryLines.length >= 2) {
    cvatStore.state.auxiliaryLines[0].points([
      0,
      pointer.y,
      layer.getAttr("width"),
      pointer.y,
    ]);
    cvatStore.state.auxiliaryLines[1].points([
      pointer.x,
      0,
      pointer.x,
      layer.getAttr("height"),
    ]);
  } else {
    // 辅助线未存在 生成
    // 横向
    const cline = new Konva.Line({
      points: [0, pointer?.y, layer.getAttr("width"), pointer?.y],
      ...generateLineOptions(),
    });
    const vline = new Konva.Line({
      points: [pointer?.x, 0, pointer?.x, layer.getAttr("height")],
      ...generateLineOptions(),
    });

    layer.add(cline);
    layer.add(vline);
    cvatStore.dispatch(setAuxiliaryLines([cline, vline]));
    cvatStore.dispatch(setMouseMoveInitXY({ x: pointer?.x, y: pointer?.y }));
  }
}

export function getCorner(
  pivotX: any,
  pivotY: any,
  diffX: any,
  diffY: any,
  angle: any,
) {
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);

  /// find angle from pivot to corner
  angle += Math.atan2(diffY, diffX);

  /// get new x and y and round it off to integer
  const x = pivotX + distance * Math.cos(angle);
  const y = pivotY + distance * Math.sin(angle);

  return { x: x, y: y };
}

export function getClientRect(rotatedBox: any) {
  const { height, width, x, y } = rotatedBox;
  const rad = rotatedBox.rotation;

  const p1 = getCorner(x, y, 0, 0, rad);
  const p2 = getCorner(x, y, width, 0, rad);
  const p3 = getCorner(x, y, width, height, rad);
  const p4 = getCorner(x, y, 0, height, rad);

  const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
  const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

function getTotalBox(boxes: any) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  boxes.forEach((box: any) => {
    minX = Math.min(minX, box.x);
    minY = Math.min(minY, box.y);
    maxX = Math.max(maxX, box.x + box.width);
    maxY = Math.max(maxY, box.y + box.height);
  });
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

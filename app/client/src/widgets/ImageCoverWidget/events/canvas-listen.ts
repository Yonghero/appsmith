import { ListenObj } from "./../hooks/startEventListen";
import { KonvaEventObject } from "konva/lib/Node";
import CvatStore from "../store";
import { setMouseDownParam, setReadyDraw } from "../store/action";
import { drawShapeIntoCanvas, generateAuxiliaryLines } from "./baseHandlers";
import _ from "lodash";

// 鼠标滚轮
export function mouseWheel(
  { layer, stage }: ListenObj,
  e: KonvaEventObject<WheelEvent>,
): void {
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
  this: CvatStore,
  { layer, stage }: ListenObj,
  e: KonvaEventObject<MouseEvent>,
) {
  const pointer = stage.getPointerPosition();
  e.target.preventDefault();
  console.log("mouseDown");
  if (e.target.className !== "Rect") {
    // 按下启动绘制模式
    this.dispatch(setReadyDraw(true));
    // 记录鼠标按下的坐标点位
    this.dispatch(setMouseDownParam(pointer));

    // layer.setAttr("draggable", false);
    _.throttle(() => {
      drawShapeIntoCanvas("rect", this, { layer, stage }, e, "down");
    }, 100)();
  }
}

// 鼠标抬起
export function mouseUp(
  this: CvatStore,
  { layer, stage }: ListenObj,
  e: KonvaEventObject<MouseEvent>,
) {
  // 鼠标抬起 关闭绘制模式
  this.dispatch(setReadyDraw(false));
  // layer.draggable(false);
  // layer.setAttr("draggable", true);
  console.log("mouseUp");
}

// 鼠标移动
export function mouseMove(
  this: CvatStore,
  { layer, stage }: ListenObj,
  e: KonvaEventObject<MouseEvent>,
) {
  console.log("move-----");
  // 展示辅助线
  generateAuxiliaryLines(this, { layer, stage });

  // 图形绘制
  drawShapeIntoCanvas("rect", this, { layer, stage }, e, "move");
}

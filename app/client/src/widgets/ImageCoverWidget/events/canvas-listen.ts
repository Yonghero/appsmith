import { setKeyDownTarget } from "./../store/action/index";
import { ListenObj } from "./../hooks/startEventListen";
import { KonvaEventObject } from "konva/lib/Node";
import CvatStore from "../store";
import { setMouseDownParam, setReadyDraw } from "../store/action";
import { drawShapeIntoCanvas, generateAuxiliaryLines } from "./baseHandlers";

// 鼠标滚轮缩放
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

  stage.draw();
}

// 鼠标按下
export function mouseDown(
  this: CvatStore,
  { layer, stage }: ListenObj,
  e: KonvaEventObject<MouseEvent>,
) {
  const pointer = stage.getPointerPosition();
  e.cancelBubble = true;
  console.log("mouseDown");
  if (e.target.className !== "Rect" && this.state.keyDownTarget === undefined) {
    // 按下启动绘制模式
    this.dispatch(setReadyDraw(true));
    // 记录鼠标按下的坐标点位
    this.dispatch(setMouseDownParam(pointer));

    drawShapeIntoCanvas("rect", this, { layer, stage }, e, "down");
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
  console.log("mouseUp");
}

// 鼠标移动
export function mouseMove(
  this: CvatStore,
  { layer, stage }: ListenObj,
  e: KonvaEventObject<MouseEvent>,
) {
  // 展示辅助线
  generateAuxiliaryLines(this, { layer, stage });

  // 图形绘制
  drawShapeIntoCanvas("rect", this, { layer, stage }, e, "move");
}

// 键盘按下
export function keyDown(
  this: CvatStore,
  { layer, stage }: ListenObj,
  container: HTMLElement,
) {
  container!.tabIndex = 1;
  container!.focus();
  container!.addEventListener("keydown", (e) => {
    if (e.key === "Shift") {
      onKeyDownShift(this, { layer, stage });
    }
  });
}

// 键盘抬起
export function keyUp(
  this: CvatStore,
  { layer, stage }: ListenObj,
  container: HTMLElement,
) {
  container.addEventListener("keyup", (e) => {
    if (e.key === "Shift") {
      onKeyUpShift(this, { layer, stage });
    }
  });
  console.log("keyup");
}

function onKeyDownShift(cvatStore: CvatStore, { layer, stage }: ListenObj) {
  cvatStore.dispatch(setKeyDownTarget("shift"));
  // 启动画布可移动模式
  layer.draggable(true);
}

function onKeyUpShift(cvatStore: CvatStore, { layer, stage }: ListenObj) {
  cvatStore.dispatch(setKeyDownTarget(undefined));
  // 关闭画布可移动模式
  layer.draggable(false);
}

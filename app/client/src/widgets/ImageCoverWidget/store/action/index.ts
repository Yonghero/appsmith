import Konva from "konva";
import { Pointer } from "..";

const CANITMOVETYPE = "move";
const READYDRWA = "ready draw";
const MOUSEDOWN = "mouse down";
const RECTPUSH = "rect add";
const SETDRAWRTPE = "set draw type";
const SETMOUSEMOVEINITXY = "SETMOUSEMOVEINITXY";
const SETAUXIlLARYLINES = "auxiliaryLines";
export const SETMOUSEDOWNTARGET = "SETMOUSEDOWNTARGET";

export interface ActionType {
  type: string;
  payLoad: any;
}

export interface ShapeForm {
  shape: Konva.Rect;
  transform: Konva.Transformer;
}

export type MouseDownTarget = "layer" | "shape";

export const setMouseDownTarget = (payLoad: MouseDownTarget) => ({
  type: SETMOUSEDOWNTARGET,
  payLoad,
});

const setCanIMove = (payLoad: any) => ({
  type: CANITMOVETYPE,
  payLoad,
});

const setReadyDraw = (payLoad: any) => ({
  type: READYDRWA,
  payLoad,
});

const setMouseDownParam = (payLoad: any) => ({
  type: MOUSEDOWN,
  payLoad,
});

const pushRect = (payLoad: ShapeForm) => ({
  type: RECTPUSH,
  payLoad,
});

const setDrawType = (payLoad: any) => ({
  type: SETDRAWRTPE,
  payLoad,
});

const setMouseMoveInitXY = (payLoad: Pointer) => ({
  type: SETMOUSEMOVEINITXY,
  payLoad,
});

const setAuxiliaryLines = (payLoad: Konva.Line[]) => ({
  type: SETAUXIlLARYLINES,
  payLoad,
});

export {
  CANITMOVETYPE,
  READYDRWA,
  MOUSEDOWN,
  RECTPUSH,
  SETDRAWRTPE,
  SETMOUSEMOVEINITXY,
  SETAUXIlLARYLINES,
  setCanIMove,
  setReadyDraw,
  setMouseDownParam,
  pushRect,
  setDrawType,
  setMouseMoveInitXY,
  setAuxiliaryLines,
};

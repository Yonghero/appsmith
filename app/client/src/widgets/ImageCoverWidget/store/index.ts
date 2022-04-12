import {
  KeyDownTarget,
  MouseDownTarget,
  RECTPOP,
  SETKEYDOWNTARGET,
  SETMOUSEDOWNTARGET,
  SETRECTOPTIONS,
  ShapeForm,
} from "./action/index";
import Konva from "konva";
import {
  CANITMOVETYPE,
  MOUSEDOWN,
  READYDRWA,
  RECTPUSH,
  SETDRAWRTPE,
  ActionType,
  SETMOUSEMOVEINITXY,
  SETAUXIlLARYLINES,
} from "./action";
import { TransformerConfig } from "konva/lib/shapes/Transformer";

export type DrawType = "rect";

export type Pointer = { x: any; y: any };
export interface StoreState {
  canIMove: boolean;
  readyDraw: boolean;
  drawType: DrawType;
  rectMap: Map<Konva.Rect, ShapeForm>;
  rectOptions: TransformerConfig;
  auxiliaryLines: Konva.Line[];
  mouseDownParma: Pointer;
  mouseMoveInitXY: Pointer;
  mouseDownTarget: MouseDownTarget;
  keyDownTarget: KeyDownTarget;
}

export default class CvatStore {
  initialstate: StoreState = {
    canIMove: false,
    readyDraw: false,
    drawType: "rect",
    rectMap: new Map(),
    rectOptions: {
      anchorSize: 7,
    },
    auxiliaryLines: [],
    mouseDownTarget: "layer",
    keyDownTarget: undefined,
    mouseMoveInitXY: {
      x: undefined,
      y: undefined,
    },
    mouseDownParma: {
      x: undefined,
      y: undefined,
    },
  };

  state: StoreState;

  constructor() {
    this.state = this.initialstate;
  }

  public dispatch(action: ActionType) {
    if (typeof action === "object") {
      this.state = this.cvatReducer(action);
    }
  }

  get storeState() {
    return this.state;
  }

  cvatReducer(action: ActionType): StoreState {
    const { payLoad, type } = action;
    switch (type) {
      case CANITMOVETYPE:
        return { ...this.state, canIMove: payLoad };
      case READYDRWA:
        return { ...this.state, readyDraw: payLoad };
      case MOUSEDOWN:
        return { ...this.state, mouseDownParma: payLoad };
      case RECTPUSH:
        this.state.rectMap.set(payLoad.shape, payLoad);
        return this.state;
      case RECTPOP:
        this.state.rectMap.delete(payLoad);
        return this.state;
      case SETDRAWRTPE:
        return { ...this.state, drawType: payLoad };
      case SETMOUSEMOVEINITXY:
        return { ...this.state, mouseMoveInitXY: payLoad };
      case SETAUXIlLARYLINES:
        return { ...this.state, auxiliaryLines: payLoad };
      case SETMOUSEDOWNTARGET: {
        return { ...this.state, mouseDownTarget: payLoad };
      }
      case SETKEYDOWNTARGET: {
        return { ...this.state, keyDownTarget: payLoad };
      }
      case SETRECTOPTIONS: {
        return {
          ...this.state,
          rectOptions: { ...this.state.rectOptions, ...payLoad },
        };
      }
      default:
        return this.state;
    }
  }
}

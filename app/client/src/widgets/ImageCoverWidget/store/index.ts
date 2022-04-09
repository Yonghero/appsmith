import { map } from "lodash";
import {
  KeyDownTarget,
  MouseDownTarget,
  RECTPOP,
  SETKEYDOWNTARGET,
  SETMOUSEDOWNTARGET,
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

export type DrawType = "rect";

export type Pointer = { x: any; y: any };
export interface StoreState {
  canIMove: boolean;
  readyDraw: boolean;
  drawType: DrawType;
  rectMap: Map<Konva.Rect, ShapeForm>;
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
    //   const [state, dispatchCvat] = useReducer(
    //     this.cvatReducer,
    //     this.initialstate,
    //   );
    //   this.state = state;
    //   this.dispatch = dispatchCvat;
    this.state = this.initialstate;
  }

  public dispatch(action: ActionType) {
    if (typeof action === "object") {
      this.state = this.cvatReducer(this.state, action);
    }
  }

  cvatReducer(state: StoreState, action: ActionType): StoreState {
    const { payLoad, type } = action;
    switch (type) {
      case CANITMOVETYPE:
        return { ...state, canIMove: payLoad };
      case READYDRWA:
        return { ...state, readyDraw: payLoad };
      case MOUSEDOWN:
        return { ...state, mouseDownParma: payLoad };
      case RECTPUSH:
        state.rectMap.set(payLoad.shape, payLoad);
        return state;
      case RECTPOP:
        state.rectMap.delete(payLoad);
        return state;
      case SETDRAWRTPE:
        return { ...state, drawType: payLoad };
      case SETMOUSEMOVEINITXY:
        return { ...state, mouseMoveInitXY: payLoad };
      case SETAUXIlLARYLINES:
        return { ...state, auxiliaryLines: payLoad };
      case SETMOUSEDOWNTARGET: {
        return { ...state, mouseDownTarget: payLoad };
      }
      case SETKEYDOWNTARGET: {
        return { ...state, keyDownTarget: payLoad };
      }
      default:
        return state;
    }
  }
}

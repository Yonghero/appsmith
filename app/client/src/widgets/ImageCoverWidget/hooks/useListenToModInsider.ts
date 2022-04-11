import Konva from "konva";
import { useEffect } from "react";
import { ImageCoverComponentProps } from "../component";
import { provideRectLife } from "../events/baseHandlers";
import CvatStore from "../store";
import { popRect, setRectOptions, ShapeForm } from "../store/action";

/**
 * 监听props 与panel交互
 * @param cvatStore
 * @param props
 */
export function useListenToModInsider(
  cvatStore: CvatStore,
  layer: Konva.Layer | undefined,
  stage: Konva.Stage | undefined,
  props: ImageCoverComponentProps,
) {
  // 颜色监听
  useEffect(() => {
    if (props.rectColor) {
      cvatStore.dispatch(setRectOptions({ borderStroke: props.rectColor }));
    }
  }, [props.rectColor]);

  // 矩形数据监听
  useEffect(() => {
    console.log("props.defaultBboxs: ", props.defaultBboxs);
    if (props.defaultBboxs && layer && stage) {
      try {
        let boxs = props.defaultBboxs;
        boxs = JSON.parse(boxs);
        clearRect();
        // 重新绘制
        Array.from(boxs).forEach((item: any) => {
          const [borderStroke, x, y, width, height] = item;
          provideRectLife(
            cvatStore,
            { layer, stage },
            {
              borderStroke,
              x,
              y,
              width,
              height,
            },
          );
        });
      } catch (e) {
        clearRect();
      }
    }
    if (!props.defaultBboxs) {
      clearRect();
    }
  }, [props.defaultBboxs, layer, stage, cvatStore]);

  function clearRect() {
    // 清空画布上的矩形
    cvatStore.state.rectMap.forEach((rect: ShapeForm) => {
      cvatStore.dispatch(popRect(rect.shape));
      rect.shape.destroy();
      rect.transform.destroy();
    });
  }
}

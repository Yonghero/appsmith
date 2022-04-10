import { useEffect } from "react";
import { ImageCoverComponentProps } from "../component";
import CvatStore from "../store";
import { setRectOptions } from "../store/action";

/**
 * 监听props 与panel交互
 * @param cvatStore
 * @param props
 */
export function useListenToModInsider(
  cvatStore: CvatStore,
  props: ImageCoverComponentProps,
) {
  function triggerColor() {
    cvatStore.dispatch(setRectOptions({ borderStroke: props.rectColor }));
  }
  useEffect(() => {
    triggerColor();
  }, [props.rectColor]);
}

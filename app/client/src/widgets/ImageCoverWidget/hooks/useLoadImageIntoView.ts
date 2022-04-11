import { useEffect, useState } from "react";
import Konva from "konva";
import TestJpg from "assets/test.jpg";
import { ImageConfig } from "konva/lib/shapes/Image";
import { ImageCoverComponentProps } from "../component";

export interface ImageOptions {
  width?: number;
  height?: number;
}

export function useLoadImageIntoView(
  props: ImageCoverComponentProps,
  container: Konva.Layer | undefined,
  options: Partial<ImageConfig>,
): any {
  // main API:
  const [yoda, setYoda] = useState<Konva.Image>();

  const imageObj = document.createElement("img");
  const [isRePaint, setIsRePaint] = useState<boolean>(true);

  function clearContainer() {
    if (yoda && container) {
      yoda.destroy();
      container.removeChildren();
    }
  }

  useEffect(() => {
    if (!container) return;
    imageObj.onload = () => {
      setYoda(() => {
        const _yoda: Konva.Image = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj,
          width: options.width,
          height: options.height,
          ...options,
        });
        container.add(_yoda);
        container.draw();
        return _yoda;
      });
    };

    if (props.imageUrl && isRePaint) {
      // 更新图片
      clearContainer();
      imageObj.src = props.imageUrl;

      setIsRePaint(false);
    } else if (!yoda && !props.imageUrl) {
      // 第一次加载默认图片
      setIsRePaint(true);
      imageObj.src = TestJpg;
    } else if (yoda && !props.imageUrl && !isRePaint) {
      // 替换图片
      clearContainer();
      imageObj.src = TestJpg;

      setIsRePaint(true);
    }
  }, [props.imageUrl, container]);
}

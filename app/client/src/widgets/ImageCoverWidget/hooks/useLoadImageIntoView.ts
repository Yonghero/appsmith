import { useEffect, useState } from "react";
import Konva from "konva";
import TestJpg from "assets/test.jpg";
import { ImageConfig } from "konva/lib/shapes/Image";
import { Layer } from "konva/lib/Layer";

export interface ImageOptions {
  width?: number;
  height?: number;
}

export function useLoadImageIntoView(
  src: any,
  container: Konva.Layer | undefined,
  options: Partial<ImageConfig>,
) {
  loadImageIntoView(src, container, options);
}
export function loadImageIntoView(
  src: string,
  container: Konva.Layer | undefined,
  options: Partial<ImageConfig>,
) {
  // main API:

  const [yoda, setYoda] = useState<Konva.Image>();

  const imageObj = document.createElement("img");

  useEffect(() => {
    if (yoda && container) {
      container.add(yoda);
      container.draw();
    } else {
      if (!container) return;
      imageObj.onload = () => {
        setYoda(
          new Konva.Image({
            x: 0,
            y: 0,
            image: imageObj,
            width: options.width,
            height: options.height,
            ...options,
          }),
        );
      };
      imageObj.src = TestJpg;
    }
  }, [yoda, container]);
}

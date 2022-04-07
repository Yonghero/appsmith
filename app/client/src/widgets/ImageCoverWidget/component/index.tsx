import React, { useEffect, useState } from "react";
import { useLoadImageIntoView, startEventListen, useInitStage } from "../hooks";

function ImageCoverComponent(props: ImageCoverComponentProps) {
  const [containerId] = useState(`canvas-${Math.random()}`);

  // 初始化舞台
  const { layer, stage } = useInitStage(containerId);

  // 加载图片进入舞台
  useLoadImageIntoView("", layer, {
    width: 700,
    height: 500,
    draggable: true,
  });

  useEffect(() => {
    if (!layer || !stage) return;

    // startEventListen(layer);
    const scaleBy = 1.01;
    layer.on("wheel", (e) => {
      // stop default scrolling
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
    });

    // draw the image
  }, [props.color, layer, stage, containerId]);

  return <div id={containerId} key={props.color} />;
}

export interface ImageCoverComponentProps {
  color: string;
}

export default ImageCoverComponent;

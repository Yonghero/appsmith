import React, { useEffect, useState } from "react";
import {
  useLoadImageIntoView,
  // , startEventListen,
  useInitStage,
} from "../hooks";

function ImageCoverComponent(props: ImageCoverComponentProps) {
  // 舞台唯一id
  const [containerId] = useState(`canvas-${Math.random()}`);

  // 初始化舞台
  const { layer, stage } = useInitStage(containerId);

  // 加载图片进入舞台
  useLoadImageIntoView("", layer, {
    width: 700,
    height: 500,
    draggable: true,
  });

  // 事件监听
  if (layer && stage) {
    // startEventListen({ layer, stage });
  }

  useEffect(() => {
    // layer.on("mousedown", (e) => {});
  }, []);

  return <div id={containerId} key={props.color} />;
}

export interface ImageCoverComponentProps {
  color: string;
}

export default ImageCoverComponent;

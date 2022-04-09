import React, { useState } from "react";
import { useLoadImageIntoView, startEventListen, useInitStage } from "../hooks";
import CvatStore from "../store";

function ImageCoverComponent(props: ImageCoverComponentProps) {
  // 舞台唯一id
  const [containerId] = useState(`canvas-${Math.random()}`);

  // 初始化全局数据
  const cvatStore = new CvatStore();

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
    startEventListen(cvatStore, { layer, stage });
  }

  return <div id={containerId} key={props.color} />;
}

export interface ImageCoverComponentProps {
  color: string;
}

export default ImageCoverComponent;

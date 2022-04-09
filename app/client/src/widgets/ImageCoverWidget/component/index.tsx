import React, { useEffect, useState } from "react";
import { useLoadImageIntoView, startEventListen, useInitStage } from "../hooks";
import CvatStore from "../store";

function ImageCoverComponent(props: ImageCoverComponentProps) {
  // 舞台唯一id
  const [containerId] = useState(`canvas-${Math.random()}`);

  useEffect(() => {
    const container = document.getElementById(`${containerId}`);
    if (!container) return;
    container!.tabIndex = 1;
    // focus it
    // also stage will be in focus on its click
    container!.focus();
    container!.addEventListener("keydown", (e) => {
      console.log(e, "-----");
    });
  }, [containerId]);

  // 初始化全局数据
  const cvatStore = new CvatStore();

  // 初始化舞台
  const { layer, stage } = useInitStage(containerId);

  // 加载图片进入舞台
  const yoda = useLoadImageIntoView("", layer, {
    width: 700,
    height: 500,
  });

  // 事件监听
  useEffect(() => {
    if (layer && stage) {
      startEventListen(cvatStore, { layer, stage }, containerId);
    }
  }, [layer && stage]);

  return <div id={containerId} key={props.color} />;
}

export interface ImageCoverComponentProps {
  color: string;
}

export default ImageCoverComponent;

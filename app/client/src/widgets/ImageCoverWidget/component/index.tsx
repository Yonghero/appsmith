import React, { useState } from "react";
import styled from "styled-components";
import { ComponentProps } from "widgets/BaseComponent";
import {
  useLoadImageIntoView,
  useInitStage,
  useEventListening,
  useListenToModInsider,
} from "../hooks";
import CvatStore from "../store";
import { ShapeForm } from "../store/action";

const Wrapper = styled("div")`
  button {
    border: 1px solid red;
    width: 100px;
    height: 50px;
  }
`;

function ImageTaggingComponent(props: ImageCoverComponentProps) {
  // 舞台唯一id
  const [containerId] = useState(`canvas-${Math.random()}`);

  // 初始化全局数据
  const [cvatStore] = useState(new CvatStore());

  // 初始化舞台
  const { layer, stage } = useInitStage(containerId);

  // 加载图片进入舞台
  useLoadImageIntoView(props, layer, {
    width: 700,
    height: 500,
  });

  // 传递当前画布上最新的矩形数据
  const dispatchBboxs = () => {
    const bboxs: any = [];
    cvatStore.state.rectMap.forEach((rect: ShapeForm) => {
      const { x, y } = rect.shape.position();
      bboxs.push([
        rect.transform.borderStroke(),
        x,
        y,
        rect.shape.width(),
        rect.shape.height(),
      ]);
    });
    props.onUpdateMeta("bboxs", bboxs);
  };

  // 鼠标、键盘事件监听
  useEventListening(cvatStore, layer, stage, containerId, dispatchBboxs);

  // props 监听
  useListenToModInsider(cvatStore, layer, stage, props);

  return (
    <Wrapper>
      <div id={containerId} />
    </Wrapper>
  );
}

export interface ImageCoverComponentProps extends ComponentProps {
  rectColor: string;
  imageUrl: string;
  defaultBboxs: string;
  onUpdateMeta: (key: string, value: any) => void;
}

export default ImageTaggingComponent;

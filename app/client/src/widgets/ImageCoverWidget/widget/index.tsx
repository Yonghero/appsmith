import React from "react";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import { DerivedPropertiesMap } from "utils/WidgetFactory";

import ImageCoverComponent from "../component";

class ImageCoverWidget extends BaseWidget<ImageCoverWidgetProps, WidgetState> {
  static getPropertyPaneConfig() {
    return [
      {
        sectionName: "Styles",
        children: [
          {
            propertyName: "rectColor",
            helpText: "Changes the color of the Rect",
            label: "Rect Color",
            controlType: "COLOR_PICKER",
            isBindProperty: true,
            isTriggerProperty: false,
          },
        ],
      },
    ];
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {};
  }

  static getMetaPropertiesMap(): Record<string, any> {
    return {};
  }

  getPageView() {
    const { color } = this.props;
    return <ImageCoverComponent color={color} />;
  }

  static getWidgetType(): string {
    return "IMAGECOVER_WIDGET";
  }
}

export interface ImageCoverWidgetProps extends WidgetProps {
  rectColor: string;
}

export default ImageCoverWidget;

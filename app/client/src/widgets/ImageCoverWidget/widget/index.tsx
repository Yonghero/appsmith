import React from "react";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import { DerivedPropertiesMap } from "utils/WidgetFactory";

import ImageTaggingComponent from "../component";
import { ValidationTypes } from "constants/WidgetValidation";

class ImageCoverWidget extends BaseWidget<ImageCoverWidgetProps, WidgetState> {
  constructor(props: ImageCoverWidgetProps) {
    super(props);
  }

  static getPropertyPaneConfig() {
    return [
      {
        sectionName: "General",
        children: [
          {
            helpText: "Sets the image to be displayed",
            propertyName: "image",
            label: "Image",
            controlType: "INPUT_TEXT",
            placeholderText: "URL / Base64",
            isBindProperty: true,
            isTriggerProperty: false,
            isJSConvertible: true,
            validation: { type: ValidationTypes.IMAGE_URL },
          },
        ],
      },
      {
        sectionName: "Styles",
        children: [
          {
            propertyName: "rectColor",
            helpText: "Changes the color of the Rect",
            label: "Rect Color",
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
          },
          {
            propertyName: "defaultBboxs",
            helpText: "Set rects into View",
            label: "default_bboxs",
            controlType: "INPUT_TEXT",
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
    return {
      bboxs: [],
    };
  }

  onUpdateMeta = (key: string, value: any) => {
    this.props.updateWidgetMetaProperty(key, value);
  };

  getPageView() {
    const { defaultBboxs, image, rectColor, widgetId } = this.props;
    return (
      <ImageTaggingComponent
        defaultBboxs={defaultBboxs}
        imageUrl={image}
        onUpdateMeta={this.onUpdateMeta}
        rectColor={rectColor}
        widgetId={widgetId}
      />
    );
  }

  static getWidgetType(): string {
    return "IMAGECOVER_WIDGET";
  }
}

export interface ImageCoverWidgetProps extends WidgetProps {
  rectColor: string;
  image: string;
  defaultBboxs: any;
}

export default ImageCoverWidget;

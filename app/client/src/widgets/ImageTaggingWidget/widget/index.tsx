import React from "react";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import { DerivedPropertiesMap } from "utils/WidgetFactory";

import ImageTaggingComponent from "../component";
import { ValidationTypes } from "constants/WidgetValidation";

class ImageCoverWidget extends BaseWidget<ImageCoverWidgetProps, WidgetState> {
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
    const { color, image, widgetId } = this.props;
    return (
      <ImageTaggingComponent
        imageUrl={image}
        rectColor={color}
        widgetId={widgetId}
      />
    );
  }

  static getWidgetType(): string {
    return "IMAGECOVER_WIDGET";
  }
}

export interface ImageCoverWidgetProps extends WidgetProps {
  color: string;
  image: string;
}

export default ImageCoverWidget;

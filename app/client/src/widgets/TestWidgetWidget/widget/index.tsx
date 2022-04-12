import React from "react";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import { DerivedPropertiesMap } from "utils/WidgetFactory";

import TestWidgetComponent from "../component";

class TestWidgetWidget extends BaseWidget<TestWidgetWidgetProps, WidgetState> {
  static getPropertyPaneConfig() {
    return [
      {
        sectionName: "General",
        children: [
          {
            helpText: "Test",
            propertyName: "isValue",
            label: "bboxs",
            controlType: "INPUT_TEXT",
            isJSConvertible: true,
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
    return <TestWidgetComponent />;
  }

  static getWidgetType(): string {
    return "TESTWIDGET_WIDGET";
  }
}

export type TestWidgetWidgetProps = WidgetProps;

export default TestWidgetWidget;

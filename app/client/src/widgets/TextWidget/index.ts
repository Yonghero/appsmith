import IconSVG from "./icon.svg";
import Widget from "./widget";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "ImageCvit",
  iconSVG: IconSVG,
  isCanvas: true,
  defaults: {
    text: "Label",
    fontSize: "PARAGRAPH",
    fontStyle: "BOLD",
    textAlign: "LEFT",
    textColor: "#231F20",
    truncateButtonColor: "#FFC13D",
    rows: 10,
    columns: 20,
    widgetName: "Test",
    shouldScroll: false,
    shouldTruncate: false,
    version: 1,
    animateLoading: true,
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
  },
};

export default Widget;

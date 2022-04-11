import { Colors } from "constants/Colors";
import Widget from "./widget";
import IconSVG from "./icon.svg";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "ImageCover", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
  iconSVG: IconSVG,
  needsMeta: true, // Defines if this widget adds any meta properties
  isCanvas: true, // Defines if this widget has a canvas within in which we can drop other widgets
  defaults: {
    widgetName: "ImageCover",
    rows: 13,
    columns: 20,
    version: 1,
    rectColor: Colors.PURE_ORANGE,
    image: "",
    // defaultBboxs: [["#f40", "40", "40", "150", "100"]],
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
  },
};

export default Widget;

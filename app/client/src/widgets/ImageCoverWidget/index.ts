import { Colors } from "constants/Colors";
import Widget from "./widget";
import IconSVG from "./icon.svg";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "ImageCover", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
  iconSVG: IconSVG,
  needsMeta: false, // Defines if this widget adds any meta properties
  isCanvas: true, // Defines if this widget has a canvas within in which we can drop other widgets
  defaults: {
    widgetName: "ImageCover",
    rows: 5,
    columns: 10,
    version: 1,
    color: Colors.PURE_ORANGE,
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
  },
};

export default Widget;

import { truncateString } from "../../../utils/helpers";
import { useEffect, useState } from "react";
import Konva from "konva";

export function useInitStage(containerId: any) {
  const [stage, setStage] = useState<Konva.Stage>();
  const [layer, setLayer] = useState<Konva.Layer>();

  // add the layer to the stage
  useEffect(() => {
    if (stage && layer) {
      stage.add(layer);
    } else {
      setStage(
        new Konva.Stage({
          container: containerId, // id of container <div>
          width: 700,
          height: 500,
          draggable: true,
        }),
      );
      // then create layer
      setLayer(
        new Konva.Layer({
          draggable: false,
        }),
      );
    }
  }, [stage, layer, containerId]);

  return {
    layer,
    stage,
  };
}

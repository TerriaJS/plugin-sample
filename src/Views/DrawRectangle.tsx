import React, { useEffect } from "react";
import Rectangle from "terriajs-cesium/Source/Core/Rectangle";
import { UserDrawing, useViewState } from "terriajs-plugin-api";

interface PropsType {
  onDrawingComplete: (rectangle: Rectangle | undefined) => void;
}

export const DrawRectangle: React.FC<PropsType> = ({ onDrawingComplete }) => {
  const terria = useViewState().terria;

  useEffect(function startUserDrawing() {
    const userDrawing = new UserDrawing({
      terria,
      messageHeader: "Select two points on the map to draw a 3D box",
      drawRectangle: true,
      onDrawingComplete: ({ rectangle }) => {
        onDrawingComplete(rectangle);
      }
    });
    userDrawing.enterDrawMode();

    return () => {
      userDrawing.endDrawing();
    };
  }, []);

  return <p>Draw a rectangle on the screen to create a box</p>;
};

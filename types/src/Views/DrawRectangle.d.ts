import React from "react";
import Rectangle from "terriajs-cesium/Source/Core/Rectangle";
interface PropsType {
    onDrawingComplete: (rectangle: Rectangle | undefined) => void;
}
export declare const DrawRectangle: React.FC<PropsType>;
export {};

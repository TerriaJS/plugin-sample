import cubeIcon from "assets/icons/cube.svg";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Rectangle from "terriajs-cesium/Source/Core/Rectangle";
import { WorkflowPanel, useViewState } from "terriajs-plugin-api";
import Box3dCatalogItem from "../Models/Box3dCatalogItem";
import { ViewBoxMeasurements } from "./ViewBoxMeasurements";
import { DrawRectangle } from "./DrawRectangle";

interface PropsType {
  boxItem?: Box3dCatalogItem;
}

/**
 * The main tool component
 */
const Main: React.FC<PropsType> = (props) => {
  const viewState = useViewState();
  const terria = viewState.terria;
  const [boxItem, setBoxItem] = useState<Box3dCatalogItem | undefined>(
    props.boxItem
  );

  const createBoxItem = useCallback((rectangle: Rectangle | undefined) => {
    if (rectangle) {
      // Create a 3D box for the rectangle that user drew on the map
      const boxItem = Box3dCatalogItem.fromRectangle(rectangle, terria);
      setBoxItem(boxItem);
      // Add it to the workbench so that it appears on the map
      terria.workbench.add(boxItem);
    }
  }, []);

  // WorkflowPanel opens as a left-side panel replacein the Workbench
  // It can be used to implement custom workflow UIs
  return (
    <WorkflowPanel
      viewState={viewState}
      title="3D box"
      icon={cubeIcon}
      onClose={() => viewState.closeTool()}
      closeButtonText="Close"
    >
      <Container>
        {!boxItem && <DrawRectangle onDrawingComplete={createBoxItem} />}
        {boxItem && <ViewBoxMeasurements boxItem={boxItem} />}
      </Container>
    </WorkflowPanel>
  );
};

const Container = styled.div`
  color: ${(p) => p.theme.textLight};
  padding: 10px;
`;

export default Main;

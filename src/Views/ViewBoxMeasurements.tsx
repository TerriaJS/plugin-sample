import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import Box3dCatalogItem from "../Models/Box3dCatalogItem";

interface PropsType {
  boxItem: Box3dCatalogItem;
}

/**
 * Displays box position, dimensions and rotation
 */
export const ViewBoxMeasurements: React.FC<PropsType> = observer(
  ({ boxItem }) => {
    return (
      <div>
        <p>Use your mouse to move, scale or rotate the box</p>
        <Section>
          <Title>Position</Title>
          <Label>
            Longitude
            <input
              type="text"
              disabled
              value={format(boxItem.position.longitude, "°")}
            />
          </Label>
          <Label>
            Latitude
            <input
              type="text"
              disabled
              value={format(boxItem.position.latitude, "°")}
            />
          </Label>
          <Label>
            Height from ground
            <input
              type="text"
              disabled
              value={format(boxItem.bottomHeight, "m")}
            />
          </Label>
        </Section>
        <Section>
          <Title>Dimensions</Title>
          <Label>
            Length
            <input
              type="text"
              disabled
              value={format(boxItem.dimensions.length, "m")}
            />
          </Label>
          <Label>
            Width
            <input
              type="text"
              disabled
              value={format(boxItem.dimensions.width, "m")}
            />
          </Label>
          <Label>
            Height
            <input
              type="text"
              disabled
              value={format(boxItem.dimensions.height, "m")}
            />
          </Label>
        </Section>
        <Section>
          <Title>Rotation</Title>
          <Label>
            Heading
            <input
              type="text"
              disabled
              value={format(boxItem.rotation.heading, "°")}
            />
          </Label>
          <Label>
            Pitch
            <input
              type="text"
              disabled
              value={format(boxItem.rotation.pitch, "°")}
            />
          </Label>
          <Label>
            Roll
            <input
              type="text"
              disabled
              value={format(boxItem.rotation.roll, "°")}
            />
          </Label>
        </Section>
      </div>
    );
  }
);

function format(num?: number, units?: string): string {
  if (num === undefined) {
    return "";
  }
  const factor = Math.pow(10, 4);
  const rounded = Math.round((num + Number.EPSILON) * factor) / factor;
  return `${rounded}${units}`;
}

const Title = styled.h3`
  font-weight: bold;
  font-size: 0.9em;
  margin: 0;
`;

const Label = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Section = styled.div`
  margin: 1em 0;
`;

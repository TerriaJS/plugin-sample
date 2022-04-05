import { computed } from "mobx";
import {
  Icon,
  SelectableDimensionGroup,
  SelectableDimensionWorkflow
} from "terriajs-plugin-api";
import BoxDrawingCatalogItem from "./BoxDrawingCatalogItem";

/**
 * A workflow for manually editing the box transformation.
 */
export default class EditBoxTransformWorkflow
  implements SelectableDimensionWorkflow {
  readonly name = "Edit box transform";
  readonly icon = Icon.GLYPHS.cube;

  constructor(readonly item: BoxDrawingCatalogItem) {}

  /**
   * The `selectableDimensions` method declaratively defines the input controls for this catalog item.
   *
   * Here we define 2 sets of input controls, first for changing the lat, lon and height-from-terrain of the box
   * and the second one for defining the width, length and height of the box.
   *
   */
  @computed
  get selectableDimensions(): SelectableDimensionGroup[] {
    return [this.positionControls, this.dimensionsControls];
  }

  @computed
  get positionControls(): SelectableDimensionGroup {
    const position = this.item.position;
    return {
      type: "group",
      id: "position",
      name: "Position",
      selectableDimensions: [
        {
          type: "numeric",
          id: "latitude",
          name: "Latitude",
          // Because we defined `positionControls` as a mobx `@computed` method and because `position.latitude` is an `observable` trait,
          // `positionControls` is recomputed whenever `position.latitude` changes.
          // This means when we move the box on the map, change in `position.latitude`
          // will trigger a recompute of this method which inturn triggers a re-rendering of the react UI.
          // By using mobx computed and observables we can ensure that state change threads through from the model layer to the UI layer.
          value: position.latitude,
          min: -90.0,
          max: 90.0,
          // We update the item trait with the changed input value
          setDimensionValue: (stratumId, value) => {
            if (value !== undefined) {
              this.item.position.setTrait(stratumId, "latitude", value);
            }
          }
        },
        {
          type: "numeric",
          id: "longitude",
          name: "Longitude",
          value: position.longitude,
          min: -180.0,
          max: 180.0,
          setDimensionValue: (stratumId, value) => {
            if (value !== undefined) {
              this.item.position.setTrait(stratumId, "longitude", value);
            }
          }
        },
        {
          type: "numeric",
          id: "height",
          name: "Height",
          value: position.height,
          setDimensionValue: (stratumId, value) => {
            if (value !== undefined) {
              this.item.position.setTrait(stratumId, "height", value);
            }
          }
        }
      ]
    };
  }

  @computed
  get dimensionsControls(): SelectableDimensionGroup {
    const dimensions = this.item.dimensions;
    return {
      type: "group",
      id: "dimensions",
      name: "Dimensions (in meters)",
      selectableDimensions: [
        {
          type: "numeric",
          id: "width",
          name: "Width",
          min: 1.0,
          value: dimensions.width,
          setDimensionValue: (stratumId, value) => {
            if (value !== undefined) {
              this.item.dimensions.setTrait(stratumId, "width", value);
            }
          }
        },
        {
          type: "numeric",
          id: "length",
          name: "Length",
          min: 1.0,
          value: dimensions.length,
          setDimensionValue: (stratumId, value) => {
            if (value !== undefined) {
              this.item.dimensions.setTrait(stratumId, "length", value);
            }
          }
        },
        {
          type: "numeric",
          id: "height",
          name: "Height",
          min: 1.0,
          value: dimensions.height,
          setDimensionValue: (stratumId, value) => {
            if (value !== undefined) {
              this.item.dimensions.setTrait(stratumId, "height", value);
            }
          }
        }
      ]
    };
  }
}

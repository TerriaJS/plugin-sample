import { Terria } from "terriajs-plugin-api";
import Box3dCatalogItem from "../../src/Models/Box3dCatalogItem";

describe("Box3dCatalogItemSpec", function () {
  let terria: Terria;

  beforeEach(function () {
    terria = new Terria();
  });

  it("can be created", function () {
    const box3d = new Box3dCatalogItem("test", terria);
    expect(box3d).toBeDefined();
  });
});

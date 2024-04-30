beforeAll(() => {
  // Set base href to root. This is required for correctly loading Cesium
  // assets from a Karma context or debug file.
  setBaseHref("/");
});

/**
 * Set the base href tag
 */
function setBaseHref(href: string) {
  let base = document.getElementsByTagName("base")[0];
  if (!base) {
    base = document.createElement("base");
    document.head.appendChild(base);
  }
  base.href = href;
}

declare module "assets/icons/*.svg" {
  const icon: import("terriajs-plugin-api").IconGlyph;
  export default icon;
}

declare module "sprite.svg" {
  const sprite: string;
  export default sprite;
}

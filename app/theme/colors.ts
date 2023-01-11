// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  blue: "#523cf8",
  white: "#fff",
  gray_100: "#fefefe",
  gray_200: "#c4c4c4",
  gray_300: "#16110d",
  brown: "#f76654",
} as const

const paletteBlack = {
  white: "#fff",
  blue: "#523cf8",
  gray_100: "#fefefe",
  gray_200: "#c4c4c4",
  gray_300: "#646464",
  gray_400: "#2f2e33",
  gray_500: "#16110d",
  brown: "#f76654",
  red: "#ee4f31",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette, paletteBlack,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.white,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.blue,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}

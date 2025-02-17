export type Unit = "" | "px" | "mm";

const svg = (
  width: number,
  height: number,
  unit: Unit,
  content: () => string,
) =>
  "<svg " +
  'xmlns="http://www.w3.org/2000/svg" ' +
  `width="${width}${unit}" ` +
  `height="${height}${unit}" ` +
  `viewBox="0 0 ${width}${unit} ${height}${unit}">` +
  content() +
  "</svg>";

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  fillOpacity: number;
  stroke: string;
  strokeWidth: number;
  strokeOpacity: number;
};

const move = ({ x, y, ...props }: Rect, dx: number, dy: number): Rect => ({
  x: x + dx,
  y: y + dy,
  ...props,
});

const toSVG = (rect: Rect, unit: Unit) =>
  `<rect ` +
  `x="${rect.x}${unit}" ` +
  `y="${rect.y}${unit}" ` +
  `width="${rect.width}${unit}" ` +
  `height="${rect.height}${unit}" ` +
  `fill="${rect.fill}" ` +
  `fill-opacity="${rect.fillOpacity}" ` +
  `stroke="${rect.stroke}" ` +
  `stroke-width="${rect.strokeWidth}${unit}" ` +
  `stroke-opacity="${rect.strokeOpacity}" />`;

export type Config = {
  page: { width: number; height: number };
  writingMode: "horizontal" | "vertical";
  direction: "ltr" | "rtl";
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  letterCount: number;
  rowCount: number;
  columnCount: number;
  columnGap: number;
  startingPoint:
    | { top: number; foreEdge: number }
    | { top: number; gutter: number }
    | { bottom: number; foreEdge: number }
    | { bottom: number; gutter: number };
};

export type Options = {
  unit: Unit;
  color: string;
  opacity: number;
  strokeWidth: number;
  trimHalfLeading: boolean;
};

export const defaultOptions: Readonly<Options> = {
  unit: "",
  color: "#a6e2a6",
  opacity: 1,
  strokeWidth: 1,
  trimHalfLeading: false,
};

export function generateLayoutGridSVG(
  config: Config,
  opts: Partial<Options> = {},
) {
  const {
    page,
    writingMode,
    direction,
    fontSize,
    letterSpacing,
    lineHeight,
    letterCount,
    rowCount,
    columnCount,
    columnGap,
    startingPoint,
  } = config;
  const { unit, color, opacity, strokeWidth, trimHalfLeading } = {
    ...defaultOptions,
    ...opts,
  };

  const rects: Rect[] = [];

  /**
   * `writingMode === "horizontal" && direction === "ltr"`
   * ```
   *   ---->
   * | いろはにほへと
   * v ちりぬるを
   * ```
   *
   * `writingMode === "horizontal" && direction === "rtl"`
   * ```
   *            <----
   *   とへほにはろい |
   *   　　をるぬりち v
   * ```
   *
   * `writingMode === "vertical" && direction === "ltr"`
   * ```
   *   -->
   * | いち
   * v ろり
   *   はぬ
   *   にる
   *   ほを
   *   へ
   *   と
   * ```
   *
   * `writingMode === "vertical" && direction === "rtl"`
   * ```
   *    <--
   *   ちい |
   *   りろ v
   *   ぬは
   *   るに
   *   をほ
   *   　へ
   *   　と
   * ```
   */

  const dLetter =
    (fontSize + letterSpacing) *
    (writingMode === "horizontal" && direction === "rtl" ? -1 : 1);
  const dLine =
    lineHeight * (writingMode === "vertical" && direction === "rtl" ? -1 : 1);

  const lettersLength = Math.abs(dLetter) * letterCount - letterSpacing;
  const linesLength = trimHalfLeading
    ? fontSize + Math.abs(dLine) * (rowCount - 1)
    : Math.abs(dLine) * rowCount;

  const columnWidth =
    writingMode === "horizontal" ? lettersLength : linesLength;
  const columnHeight =
    writingMode === "horizontal" ? linesLength : lettersLength;

  const contentHeight =
    writingMode === "horizontal"
      ? columnHeight
      : (columnHeight + columnGap) * columnCount - columnGap;
  const contentWidth =
    writingMode === "horizontal"
      ? (columnWidth + columnGap) * columnCount - columnGap
      : columnWidth;

  rects.push({
    x: 0,
    y: 0,
    width: columnWidth,
    height: columnHeight,
    fill: color,
    fillOpacity: 0,
    stroke: color,
    strokeWidth,
    strokeOpacity: opacity,
  });
  const halfLeading = (lineHeight - fontSize) / 2;
  const startX =
    direction === "rtl"
      ? columnWidth -
        fontSize -
        (writingMode === "vertical" && !trimHalfLeading ? halfLeading : 0)
      : writingMode === "vertical" && !trimHalfLeading
        ? halfLeading
        : 0;
  const startY =
    writingMode === "horizontal" && !trimHalfLeading ? halfLeading : 0;
  const dx = writingMode === "horizontal" ? dLetter : dLine;
  const dy = writingMode === "horizontal" ? dLine : dLetter;
  for (
    let x = 0;
    x < (writingMode === "horizontal" ? letterCount : rowCount);
    x++
  )
    for (
      let y = 0;
      y < (writingMode === "horizontal" ? rowCount : letterCount);
      y++
    )
      rects.push({
        x: startX + dx * x,
        y: startY + dy * y,
        width: fontSize,
        height: fontSize,
        fill: color,
        fillOpacity: (
          writingMode === "horizontal" ? (x + 1) % 10 === 0 : (y + 1) % 10 === 0
        )
          ? opacity
          : 0,
        stroke: color,
        strokeWidth,
        strokeOpacity: opacity,
      });

  const marginTop =
    "top" in startingPoint
      ? startingPoint.top
      : page.height - startingPoint.bottom - contentHeight;

  /**
   * @param {number} marginLeft
   */
  const generatePage = (marginLeft: number) =>
    svg(page.width, page.height, unit, () =>
      Array.from({ length: columnCount })
        .map((_, i) =>
          rects
            .map((rect) =>
              toSVG(
                move(
                  rect,
                  marginLeft +
                    (writingMode === "horizontal"
                      ? (columnWidth + columnGap) * i
                      : 0),
                  marginTop +
                    (writingMode === "horizontal"
                      ? 0
                      : (columnHeight + columnGap) * i),
                ),
                unit,
              ),
            )
            .join(""),
        )
        .join(),
    );

  const marginLeftOfLeftPage =
    "foreEdge" in startingPoint
      ? startingPoint.foreEdge
      : page.width - startingPoint.gutter - contentWidth;
  const marginLeftOfRightPage =
    "gutter" in startingPoint
      ? startingPoint.gutter
      : page.width - startingPoint.foreEdge - contentWidth;

  return {
    left: generatePage(marginLeftOfLeftPage),
    right: generatePage(marginLeftOfRightPage),
  };
}

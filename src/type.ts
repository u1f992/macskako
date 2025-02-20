export type Unit = "" | "px" | "mm";

export type Config = {
  page: { width: number; height: number };
  writingMode: "horizontal" | "vertical";
  direction: "ltr" | "rtl";
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  letterCount: number;
  lineCount: number;
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

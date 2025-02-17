import fs from "node:fs";
import { generateLayoutGridSVG } from "@u1f992/generate-layout-grid";

const { left, right } = generateLayoutGridSVG(
  {
    page: { width: 148, height: 210 },
    writingMode: "vertical",
    direction: "rtl",
    fontSize: 3.3,
    letterSpacing: 0,
    lineHeight: 5.6,
    letterCount: 25,
    rowCount: 19,
    columnCount: 2,
    columnGap: 6.6,
    startingPoint: { top: 21, foreEdge: 18.2 },
  },
  { unit: "mm", strokeWidth: 0.1 },
);
fs.writeFileSync("left.svg", left, { encoding: "utf-8" });
fs.writeFileSync("right.svg", right, { encoding: "utf-8" });

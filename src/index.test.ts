import fs from "node:fs";
import { Config, Options, generateLayoutGridSVG } from "./index.js";

const encoding = "utf-8";

const config: Config = {
  page: { width: 148, height: 210 },
  writingMode: "horizontal",
  direction: "ltr",
  fontSize: 5,
  letterSpacing: 0,
  lineHeight: 10,
  letterCount: 11,
  lineCount: 10,
  columnCount: 1,
  columnGap: 0,
  startingPoint: { top: 10, foreEdge: 15 },
};

const opts: Partial<Options> = { unit: "mm", strokeWidth: 0.1 };

let ret = generateLayoutGridSVG(config, opts);
fs.writeFileSync("horizontal-ltr-top-foreEdge-left.svg", ret.left, {
  encoding,
});
fs.writeFileSync("horizontal-ltr-top-foreEdge-right.svg", ret.right, {
  encoding,
});

config.startingPoint = { top: 10, gutter: 15 };
ret = generateLayoutGridSVG(config, opts);
fs.writeFileSync("horizontal-ltr-top-gutter-left.svg", ret.left, { encoding });
fs.writeFileSync("horizontal-ltr-top-gutter-right.svg", ret.right, {
  encoding,
});

config.startingPoint = { bottom: 10, foreEdge: 15 };
ret = generateLayoutGridSVG(config, opts);
fs.writeFileSync("horizontal-ltr-bottom-foreEdge-left.svg", ret.left, {
  encoding,
});
fs.writeFileSync("horizontal-ltr-bottom-foreEdge-right.svg", ret.right, {
  encoding,
});

config.startingPoint = { bottom: 10, gutter: 15 };
ret = generateLayoutGridSVG(config, opts);
fs.writeFileSync("horizontal-ltr-bottom-gutter-left.svg", ret.left, {
  encoding,
});
fs.writeFileSync("horizontal-ltr-bottom-gutter-right.svg", ret.right, {
  encoding,
});

const { left, right } = generateLayoutGridSVG(
  {
    page: { width: 148, height: 210 },
    writingMode: "vertical",
    direction: "rtl",
    fontSize: 3.3,
    letterSpacing: 0,
    lineHeight: 5.6,
    letterCount: 25,
    lineCount: 19,
    columnCount: 2,
    columnGap: 6.6,
    startingPoint: { top: 21, foreEdge: 21 },
  },
  { unit: "mm", strokeWidth: 0.1 },
);

fs.writeFileSync("example-left.svg", left, {
  encoding,
});
fs.writeFileSync("example-right.svg", right, {
  encoding,
});

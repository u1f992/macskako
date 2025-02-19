#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

import JSON5 from "json5";

import { VERSION } from "./version.js";
import {
  Config,
  defaultOptions,
  generateLayoutGridSVG,
  Options,
} from "./index.js";

type MaybeUnknown<T> = {
  [K in keyof T]: unknown;
};

const findClosest = (filename: string, dir = process.cwd()): string | null =>
  fs.existsSync(path.join(dir, filename))
    ? path.join(dir, filename)
    : dir === path.dirname(dir) // root
      ? null
      : findClosest(filename, path.dirname(dir));

const {
  version,
  help,
  "output-left": outputLeft,
  "output-right": outputRight,
  config: configOptsFile,
  "page-width": pageWidth,
  "page-height": pageHeight,
  "writing-mode": writingMode,
  direction,
  "font-size": fontSize,
  "letter-spacing": letterSpacing,
  "line-height": lineHeight,
  "letter-count": letterCount,
  "line-count": lineCount,
  "column-count": columnCount,
  "column-gap": columnGap,
  "starting-point-top": startingPointTop,
  "starting-point-bottom": startingPointBottom,
  "starting-point-fore-edge": startingPointForeEdge,
  "starting-point-gutter": startingPointGutter,
  unit,
  color,
  opacity,
  "stroke-width": strokeWidth,
  "trim-half-leading": trimHalfLeading,
} = parseArgs({
  options: {
    version: { type: "boolean", short: "v" },
    help: { type: "boolean", short: "h" },
    "output-left": { type: "string", short: "l" },
    "output-right": { type: "string", short: "r" },
    /*****/
    config: {
      type: "string",
      short: "c",
      default: findClosest("macskako.config.jsonc") ?? undefined,
    },
    /*****/
    "page-width": { type: "string" },
    "page-height": { type: "string" },
    "writing-mode": { type: "string" },
    direction: { type: "string" },
    "font-size": { type: "string" },
    "letter-spacing": { type: "string" },
    "line-height": { type: "string" },
    "letter-count": { type: "string" },
    "line-count": { type: "string" },
    "column-count": { type: "string" },
    "column-gap": { type: "string" },
    "starting-point-top": { type: "string" },
    "starting-point-bottom": { type: "string" },
    "starting-point-fore-edge": { type: "string" },
    "starting-point-gutter": { type: "string" },
    /*****/
    unit: { type: "string", default: defaultOptions.unit },
    color: { type: "string", default: defaultOptions.color },
    opacity: { type: "string", default: defaultOptions.opacity.toString() },
    "stroke-width": {
      type: "string",
      default: defaultOptions.strokeWidth.toString(),
    },
    "trim-half-leading": {
      type: "boolean",
      default: defaultOptions.trimHalfLeading,
    },
  },
}).values;

if (version) {
  console.log(VERSION);
  process.exit(0);
}
if (help) {
  console.log(
    `Usage: macskako [options]

Options:
  -v, --version                               output the version number
  -h, --help                                  display help for command
  -l, --output-left <file>                    required: output path for left page
  -r, --output-right <file>                   required: output path for right page
  -c, --config <file>                         default: "macskako.config.jsonc" from the closest ancestor
  --page-width <number>                       override \`config.page.width\`
  --page-height <number>                      override \`config.page.height\`
  --writing-mode "horizontal" | "vertical"    override \`config.writingMode\`
  --direction "ltr" | "rtl"                   override \`config.direction\`
  --font-size <number>                        override \`config.fontSize\`
  --letter-spacing <number>                   override \`config.letterSpacing\`
  --line-height <number>                      override \`config.lineHeight\`
  --letter-count <number>                     override \`config.letterCount\`
  --line-count <number>                       override \`config.lineCount\`
  --column-count <number>                     override \`config.columnCount\`
  --column-gap <number>                       override \`config.columnGap\`
  --starting-point-top <number>               override \`config.startingPoint.top\`
  --starting-point-bottom <number>            override \`config.startingPoint.bottom\`
  --starting-point-fore-edge <number>         override \`config.startingPoint.foreEdge\`
  --starting-point-gutter <number>            override \`config.startingPoint.gutter\`
  --unit "" | "px" | "mm"                     default: "${defaultOptions.unit}"; override \`options.unit\`
  --color <string>                            default: "${defaultOptions.color}"; override \`options.color\`
  --opacity <number>                          default: ${defaultOptions.opacity}; override \`options.opacity\`
  --stroke-width <number>                     default: ${defaultOptions.strokeWidth}; override \`options.strokeWidth\`
  --trim-half-leading                         default: ${defaultOptions.trimHalfLeading}; override \`options.trimHalfLeading\``,
  );
  process.exit(0);
}

if (typeof outputLeft === "undefined" || typeof outputRight === "undefined") {
  throw new Error("outputLeft and outputRight are required");
}

const {
  config,
  options,
}: {
  config: MaybeUnknown<Partial<Config>>;
  options: MaybeUnknown<Partial<Options>>;
} =
  typeof configOptsFile !== "undefined"
    ? ((_) => {
        _.config ??= {};
        _.options ??= {};
        return _;
      })(JSON5.parse(fs.readFileSync(configOptsFile, { encoding: "utf-8" })))
    : { config: {}, options: {} };

config.page ??= {};
if (typeof pageWidth !== "undefined") {
  (config.page! as Record<string, unknown>).width = parseFloat(pageWidth);
}
if (typeof pageHeight !== "undefined") {
  (config.page! as Record<string, unknown>).height = parseFloat(pageHeight);
}
if (
  typeof (config.page! as Record<string, unknown>).width !== "number" ||
  typeof (config.page! as Record<string, unknown>).height !== "number"
) {
  throw new Error("pageWidth and pageHeight must be number");
}

if (typeof writingMode !== "undefined") {
  config.writingMode = writingMode;
}
if (
  !(config.writingMode === "horizontal" || config.writingMode === "vertical")
) {
  throw new Error('writingMode must be "horizontal" | "vertical"');
}

if (typeof direction !== "undefined") {
  config.direction = direction;
}
if (!(config.direction === "ltr" || config.direction === "rtl")) {
  throw new Error('direction must be "ltr" | "rtl"');
}

if (typeof fontSize !== "undefined") {
  config.fontSize = parseFloat(fontSize);
}
if (typeof config.fontSize !== "number") {
  throw new Error("fontSize must be number");
}

if (typeof letterSpacing !== "undefined") {
  config.letterSpacing = parseFloat(letterSpacing);
}
if (typeof config.letterSpacing !== "number") {
  throw new Error("letterSpacing must be number");
}

if (typeof lineHeight !== "undefined") {
  config.lineHeight = parseFloat(lineHeight);
}
if (typeof config.lineHeight !== "number") {
  throw new Error("lineHeight must be number");
}

if (typeof letterCount !== "undefined") {
  config.letterCount = parseFloat(letterCount);
}
if (typeof config.letterCount !== "number") {
  throw new Error("letterCount must be number");
}

if (typeof lineCount !== "undefined") {
  config.lineCount = parseFloat(lineCount);
}
if (typeof config.lineCount !== "number") {
  throw new Error("lineCount must be number");
}

if (typeof columnCount !== "undefined") {
  config.columnCount = parseFloat(columnCount);
}
if (typeof config.columnCount !== "number") {
  throw new Error("columnCount must be number");
}

if (typeof columnGap !== "undefined") {
  config.columnGap = parseFloat(columnGap);
}
if (typeof config.columnGap !== "number") {
  throw new Error("columnGap must be number");
}

config.startingPoint ??= {};
if (typeof startingPointTop !== "undefined") {
  (config.startingPoint! as Record<string, unknown>).top =
    parseFloat(startingPointTop);
}
if (typeof startingPointBottom !== "undefined") {
  (config.startingPoint! as Record<string, unknown>).bottom =
    parseFloat(startingPointBottom);
}
if (typeof startingPointForeEdge !== "undefined") {
  (config.startingPoint! as Record<string, unknown>).foreEdge = parseFloat(
    startingPointForeEdge,
  );
}
if (typeof startingPointGutter !== "undefined") {
  (config.startingPoint! as Record<string, unknown>).gutter =
    parseFloat(startingPointGutter);
}
if (
  (typeof (config.startingPoint! as Record<string, unknown>).top ===
    "undefined") ===
    (typeof (config.startingPoint! as Record<string, unknown>).bottom ===
      "undefined") ||
  (typeof (config.startingPoint! as Record<string, unknown>).foreEdge ===
    "undefined") ===
    (typeof (config.startingPoint! as Record<string, unknown>).gutter ===
      "undefined")
) {
  throw new Error(
    "startingPoint must be specified by one of top | bottom and one of foreEdge | gutter",
  );
}

const opts = {
  unit,
  color,
  opacity: parseFloat(opacity),
  strokeWidth: parseFloat(strokeWidth),
  trimHalfLeading,
};
Object.assign(opts, options);
if (!(opts.unit === "" || opts.unit === "px" || opts.unit === "mm")) {
  throw new Error('unit must be "" | "px" | "mm"');
}
if (typeof opts.color !== "string") {
  throw new Error("color must be string");
}
if (typeof opts.opacity !== "number") {
  throw new Error("opacity must be number");
}
if (typeof opts.strokeWidth !== "number") {
  throw new Error("strokeWidth must be number");
}
if (typeof opts.trimHalfLeading !== "boolean") {
  throw new Error("trimHalfLeading must be boolean");
}

const { left, right } = generateLayoutGridSVG(
  config as Config,
  opts as Options,
);

fs.writeFileSync(outputLeft, left, { encoding: "utf-8" });
fs.writeFileSync(outputRight, right, { encoding: "utf-8" });

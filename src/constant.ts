/*
 * Macskako - Generates SVG images resembling layout grids used in Japanese typesetting.
 * Copyright (C) 2025  Koutaro Mukai
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Options } from "./type.js";

export const defaultOptions: Readonly<Options> = {
  unit: "",
  color: "#a6e2a6",
  opacity: 1,
  strokeWidth: 1,
  trimHalfLeading: false,
};

export const HELP = `Usage: macskako [options]

Options:
  -v, --version                               output the version number
  -h, --help                                  display help for command
  -l, --output-left <file>                    required: output path for left page
  -r, --output-right <file>                   required: output path for right page
  -c, --config <file>                         default: /^macskako.config.json[rc]?$/ from the closest ancestor
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
  --trim-half-leading                         default: ${defaultOptions.trimHalfLeading}; override \`options.trimHalfLeading\``;

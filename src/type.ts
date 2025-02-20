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

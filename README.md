# Macskako

[_Layout grid_](https://helpx.adobe.com/indesign/using/layout-grids.html) is a guide commonly used in Japanese typesetting with Adobe InDesign. This function/CLI application generates SVG images that closely resemble layout grids. It is primarily intended for use in CSS typesetting, where it can be inserted as a background image to help visualize page layouts.

## Usage

```
$ macskako --help
Usage: macskako [options]

Options:
  -v, --version                               output the version number
  -h, --help                                  display help for command
  -l, --output-left <file>                    required: output path for left page
  -r, --output-right <file>                   required: output path for right page
  -c, --config <file>                         default: "macskako.config.jsonc" from the closest ancestor
  --page-width <number>                       override `config.page.width`
  --page-height <number>                      override `config.page.height`
  --writing-mode "horizontal" | "vertical"    override `config.writingMode`
  --direction "ltr" | "rtl"                   override `config.direction`
  --font-size <number>                        override `config.fontSize`
  --letter-spacing <number>                   override `config.letterSpacing`
  --line-height <number>                      override `config.lineHeight`
  --letter-count <number>                     override `config.letterCount`
  --line-count <number>                       override `config.lineCount`
  --column-count <number>                     override `config.columnCount`
  --column-gap <number>                       override `config.columnGap`
  --starting-point-top <number>               override `config.startingPoint.top`
  --starting-point-bottom <number>            override `config.startingPoint.bottom`
  --starting-point-fore-edge <number>         override `config.startingPoint.foreEdge`
  --starting-point-gutter <number>            override `config.startingPoint.gutter`
  --unit "" | "px" | "mm"                     default: ""; override `options.unit`
  --color <string>                            default: "#a6e2a6"; override `options.color`
  --opacity <number>                          default: 1; override `options.opacity`
  --stroke-width <number>                     default: 1; override `options.strokeWidth`
  --trim-half-leading                         default: false; override `options.trimHalfLeading`
```

<!-- prettier-ignore-start -->
<!-- EAWの違いでGitHub上の表示とVS Codeのプレビューの両方が崩れないように、GitHubと同じフォント（`getComputedStyle($0).fontFamily`）を指定。GitHubでは単に無視される。 -->
<pre><code style="font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;">           pageWidth
├─────────────────────────────┤
┌───────────────┬─────────────┬─────────────┬───────────────┐ ─┬─
│               │ top         │             │ top           │  │
│          □□□□□□□□□■□        │        □□□□□□□□□■□          │  │
│          □□□□□□□□□■□        │        □□□□□□□□□■□          │  │
│          □□□□□□□□□■□        │        □□□□□□□□□■□          │  │
│          □□□□□□□□□■□        │        □□□□□□□□□■□          │  │
│          □□□□□□□□□■□        │        □□□□□□□□□■□          │  │
│ foreEdge □□□□□□□□□■□        │ gutter □□□□□□□□□■□          │  │
├──────────□□□□□□□□□■□────────┼────────□□□□□□□□□■□──────────┤  │ pageHeight
│          □□□□□□□□□■□ gutter │        □□□□□□□□□■□ foreEdge │  │
│          □□□□□□□□□■□        │        □□□□□□□□□■□          │  │
│          □□□□□□□□□■□        │        □□□□□□□□□■□          │  │
│          □□□□□□□□□■□        │        □□□□□□□□□■□          │  │
│          □□□□□□□□□■□        │        □□□□□□□□□■□          │  │
│          □□□□□□□□□■□        │        □□□□□□□□□■□          │  │
│        bottom │             │      bottom │               │  │
└───────────────┴─────────────┴─────────────┴───────────────┘ ─┴─

           columnCount
├───────────────────────────────┤
│ letterCount                   │
├─────────────┤                 │
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□ ─┬─
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□  │
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□  │
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□  │ lineCount
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□  │
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□  │
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□ ─┴─
               ├─┤
            columnGap

   fontSize
    ├────┤        ─────┬─ halfLeading
─┬─ ┌────┐     ┌────┐ ─┼─
 │  │    │     │    │  │
─┴─ └────┘     └────┘  │
                  ─────┼─
    ┌────┐     ┌────┐  │
    │    │     │    │  │ lineHeight
    └────┘     └────┘  │
                  ─────┼─
    ┌────┐     ┌────┐  │
    │    │     │    │  │
    └────┘     └────┘  │
         ├─────┤  ─────┼─
      letterSpacing</code></pre>

<dl>
<dt><code>writingMode === "horizontal" && direction === "ltr"</code></dt><dd><pre><code>  ---->
| いろはにほへと
v ちりぬるを</code></pre></dd>
<dt><code>writingMode === "horizontal" && direction === "rtl"</code></dt><dd><pre><code>         <----
とへほにはろい |
　　をるぬりち v</code></pre></dd>
<dt><code>writingMode === "vertical" && direction === "ltr"</code></dt><dd><pre><code>  -->
| いち
v ろり
  はぬ
  にる
  ほを
  へ
  と</code></pre></dd>
<dt><code>writingMode === "vertical" && direction === "rtl"</code></dt><dd><pre><code> <--
ちい |
りろ v
ぬは
るに
をほ
　へ
　と</code></pre></dd>
</dl>

<!-- prettier-ignore-end -->

## License

This project is licensed under [GPL-3.0](LICENSE), except that everything in the `example` directory is released under CC0. Additionally, the typesetting sample includes excerpts from 宮沢賢治『ポラーノの広場』 which is effectively in the public domain in Japan due to the expiration of its copyright protection.

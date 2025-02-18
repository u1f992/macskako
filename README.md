# generate-layout-grid-svg

```
$ generate-layout-grid-svg --help
Usage: generate-layout-grid-svg [options]

Options:
  -v, --version                               output the version number
  -h, --help                                  display help for command
  -l, --output-left <file>                    required: output path for left page
  -r, --output-right <file>                   required: output path for right page
  -c, --config <file>                         default: "layout-grid.config.json" from the nearest ancestor or `{}`
  --page-width <number>                       override `config.config.page.width`
  --page-height <number>                      override `config.config.page.height`
  --writing-mode "horizontal" | "vertical"    override `config.config.writingMode`
  --direction "ltr" | "rtl"                   override `config.config.direction`
  --font-size <number>                        override `config.config.fontSize`
  --letter-spacing <number>                   override `config.config.letterSpacing`
  --line-height <number>                      override `config.config.lineHeight`
  --letter-count <number>                     override `config.config.letterCount`
  --line-count <number>                       override `config.config.lineCount`
  --column-count <number>                     override `config.config.columnCount`
  --column-gap <number>                       override `config.config.columnGap`
  --starting-point-top <number>               override `config.config.startingPoint.top`
  --starting-point-bottom <number>            override `config.config.startingPoint.bottom`
  --starting-point-fore-edge <number>         override `config.config.startingPoint.foreEdge`
  --starting-point-gutter <number>            override `config.config.startingPoint.gutter`
  --unit "" | "px" | "mm"                     default: ""; override `config.options.unit`
  --color <string>                            default: "#a6e2a6"; override `config.options.color`
  --opacity <number>                          default: 1; override `config.options.opacity`
  --stroke-width <number>                     default: 1; override `config.options.strokeWidth`
  --trim-half-leading                         default: false; override `config.options.trimHalfLeading`
```

<!-- prettier-ignore-start -->
<!-- EAWの違いでGitHub上の表示とVS Codeのプレビューの両方が崩れないように、GitHubと同じフォント（`getComputedStyle($0).fontFamily`）を指定。GitHubでは単に無視される。 -->
<pre><code style="font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;">           pageWidth
├─────────────────────────────┤
┏━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━┳━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┓ ┬
┃               │ top         ┃             │ top           ┃ │
┃          □□□□□□□□□■□        ┃        □□□□□□□□□■□          ┃ │
┃          □□□□□□□□□■□        ┃        □□□□□□□□□■□          ┃ │
┃          □□□□□□□□□■□        ┃        □□□□□□□□□■□          ┃ │
┃          □□□□□□□□□■□        ┃        □□□□□□□□□■□          ┃ │
┃          □□□□□□□□□■□        ┃        □□□□□□□□□■□          ┃ │
┃ foreEdge □□□□□□□□□■□        ┃ gutter □□□□□□□□□■□          ┃ │
┠──────────□□□□□□□□□■□────────╂────────□□□□□□□□□■□──────────┨ │ pageHeight
┃          □□□□□□□□□■□ gutter ┃        □□□□□□□□□■□ foreEdge ┃ │
┃          □□□□□□□□□■□        ┃        □□□□□□□□□■□          ┃ │
┃          □□□□□□□□□■□        ┃        □□□□□□□□□■□          ┃ │
┃          □□□□□□□□□■□        ┃        □□□□□□□□□■□          ┃ │
┃          □□□□□□□□□■□        ┃        □□□□□□□□□■□          ┃ │
┃          □□□□□□□□□■□        ┃        □□□□□□□□□■□          ┃ │
┃        bottom │             ┃      bottom │               ┃ │
┗━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━┻━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┛ ┴

           columnCount
├───────────────────────────────┤
│ letterCount                   │
├─────────────┤                 │
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□ ┬
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□ │
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□ │
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□ │ lineCount
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□ │
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□ │
□□□□□□□□□■□□□□□   □□□□□□□□□■□□□□□ ┴
               ├─┤
            columnGap

 fontSize
  ├────┤        ╌╌╌╌╌┬─ halfLeading
┬ ┏━━━━┓     ┏━━━━┓ ─┼─
│ ┃    ┃     ┃    ┃  │
┴ ┗━━━━┛     ┗━━━━┛  │
                ╌╌╌╌╌┼
  ┏━━━━┓     ┏━━━━┓  │
  ┃    ┃     ┃    ┃  │ lineHeight
  ┗━━━━┛     ┗━━━━┛  │
                ╌╌╌╌╌┼
  ┏━━━━┓     ┏━━━━┓  │
  ┃    ┃     ┃    ┃  │
  ┗━━━━┛     ┗━━━━┛  │
       ├─────┤  ╌╌╌╌╌┼
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

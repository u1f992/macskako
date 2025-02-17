# generate-layout-grid-svg

```
$ generate-layout-grid-svg \
--page-width \
--page-height \
--writing-mode \
--direction \
--font-size \
--letter-spacing \
--line-height \
--row-count \
--column-count \
--column-gap \
--starting-point-top \
--starting-point-bottom \
--starting-point-fore-edge \
--starting-point-gutter \

--unit
--color
--opacity
--stroke-width
--trim-half-leading
```

<!-- prettier-ignore-start -->

```
　　　　　　pageWidth
├──────────────┤
┏━━━━━━━┯━━━━━━┳━━━━━━┯━━━━━━━┓┬
┃　　　　　　　│top 　　　　┃　　　　　　│top 　　　　　┃│
┃　　　　□□□□□□□　　　┃　　　□□□□□□□　　　　┃│
┃　　　　□□□□□□□　　　┃　　　□□□□□□□　　　　┃│
┃　　　　□□□□□□□　　　┃　　　□□□□□□□　　　　┃│
┃　　　　□□□□□□□　　　┃　　　□□□□□□□　　　　┃│
┃　　　　□□□□□□□　　　┃　　　□□□□□□□　　　　┃│
┃foreEdge□□□□□□□　　　┃gutter□□□□□□□　　　　┃│
┠────□□□□□□□───╂───□□□□□□□────┨│pageHeight
┃　　　　□□□□□□□gutter┃　　　□□□□□□□foreEdge┃│
┃　　　　□□□□□□□　　　┃　　　□□□□□□□　　　　┃│
┃　　　　□□□□□□□　　　┃　　　□□□□□□□　　　　┃│
┃　　　　□□□□□□□　　　┃　　　□□□□□□□　　　　┃│
┃　　　　□□□□□□□　　　┃　　　□□□□□□□　　　　┃│
┃　　　　□□□□□□□　　　┃　　　□□□□□□□　　　　┃│
┃　　　　bottom│　　　　　　┃　　　bottom│　　　　　　　┃│
┗━━━━━━━┷━━━━━━┻━━━━━━┷━━━━━━━┛┴


　　　　letterCount
├────────────┤ 　　　　　　　　　　　　　　　┬
 □□□□□□□□□■□□□　　　□□□□□□□□□■□□□│
 □□□□□□□□□■□□□　　　□□□□□□□□□■□□□│
 □□□□□□□□□■□□□　　　□□□□□□□□□■□□□│
 □□□□□□□□□■□□□　　　□□□□□□□□□■□□□│rowCount
 □□□□□□□□□■□□□　　　□□□□□□□□□■□□□│
 □□□□□□□□□■□□□　　　□□□□□□□□□■□□□│
 □□□□□□□□□■□□□　　　□□□□□□□□□■□□□│
 　　　　　　　　　　　　 ├──┤　 　　　　　　　　　　　┴
 　　　　　　　　　　　　 columnGap
```

<!-- prettier-ignore-end -->

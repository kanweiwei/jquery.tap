## 介绍

这个基于jQuery的tap事件插件，所以使用前请务必先引入jQuery类库。

## 用法

```javascript
<ul id="oul">
  <li>第一个</li>
  <li>第二个</li>
  <li>第三个</li>
</ul>

<script src="jquery.tap.js"></script>
<script>
  $("#oul li").tap(function(e) {
    console.log("li was tapped!");
  });
</script>
```
或者
```javascript
<script src="jquery.tap.js"></script>
<script>
  $("#oul li").on('tap', function(e) {
    console.log("li was tapped!");
  });
</script>
```
## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present, Weiwei(Camol) Kan

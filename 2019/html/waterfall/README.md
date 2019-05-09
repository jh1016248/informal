``` html
<div id="waterfall-wrap"></div>
```

``` javascript
/**
* 1.config
* el: 容器元素
* colCount: 每行个数，默认3个
* gap: 间距，默认20
* imgList: 图片列表，(子项目可为对象，需传'imgKey',对应图片的key, 默认为'img')
* template: 自定义模板，可用{{key}}绑定imgList对象的属性
*/
const config = {
    el: '#waterfall-wrap',
    colCount: 3,
    gap: 20,
    imgList: [], 
    imgKey: 'img', 
}

// 2.创建对象
const waterFall = new WaterFall(config);

/**
 *  3.调用方法
 *  push() //插入图片，可传对象、字符串，列表
 *  addEventListener()  注册事件
*/
// 触底回调    必须调用next(), 否则不会再次触发回调
waterFall.addEventListener('reachBottom', (next) => {
    console.log('loading...')
    waterFall.push(imgs)
    next()
})
// 点击事件
waterFall.addEventListener('itemClick', (item) => {
    console.log(item)
})
```
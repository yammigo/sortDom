## sortDom.js 
>解决页面中的dom记忆排序问题

## 依赖
jquery

## Examples

```html
 <script src="http://libs.baidu.com/jquery/1.7.1/jquery.min.js"></script>
 <script src="./sortDom.js"></script>

 <ul id="ulList">
            <li>元素0</li>
            <li>元素1</li>
            <li>元素2</li>
            <li>元素3</li>
            <li>元素4</li>
 </ul>
 <script>
     $(function(){
         //使用方法
         $("#ulList").sortDom('ulList');

         //清除方法
        //  $("ulList").resetSortDom('ulList');
     })
 </script>
 ```
### api
* `$(select).sortDom(命名空间)` (注册)
* `$(select).resetSortDom(命名空间)` (移除)

以下方法可用于更改命名空间的的排列顺序
* `$.fn.dbUtil.setData(key,val)` (工具方法--存储数据)
* `$.fn.dbUtil.getData(key)` (工具方法--获取数据数据)
* `$.fn.dbUtil.removeData(key)` (工具方法--删除数据) 





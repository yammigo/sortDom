
/**
 * name sortDom
 * desc DOM 排序记忆
 * fanjiantao
 * 1418154909@qq.com
 */
$.fn.extend({
    dbUtil:{
        dbType:!!window.localStorage?"local":navigator.cookieEnabled?"cookie":"var",
        // dbType:'cookie',
        setData:function(key,value,t){
            
            if(this.dbType=='cookie'){
                var oDate=new Date();
                oDate.setDate(oDate.getDate()+(t||30));
                document.cookie=key+"="+value+"; expires="+oDate.toDateString();

            }
            if(this.dbType=="local"){
                window.localStorage.setItem(key,value)
            }
            if(this.dbType=="var"){
                window[key]=value;
            }
           
        },
        getData:function(key){
            if(this.dbType=="cookie"){
            var arr1=document.cookie.split("; ");
            for(var i=0;i<arr1.length;i++){
                var arr2=arr1[i].split("=");
                if(arr2[0]==key){
                    return decodeURI(arr2[1]);
                }
                }
            }
            if(this.dbType=="local"){
              return window.localStorage.getItem(key);
            }
            if(this.dbType=="var"){
               return window[key];
            }
        },
        removeData:function(key){
            if(this.dbType=="cookie"){
              this.setData(key,"",-1); // 把cookie设置为过期
            }
            if(this.dbType=="local"){
                window.localStorage.removeItem(key)
            }
            if(this.dbType=="var"){
                window[key]=null;
            }
        }
    },
    sortDom: function (namespace) {
        // console.log($(this));
        var dbUtil = $.fn.dbUtil;
        var _this=$(this);
        var childrens=$(this).children();
        function setCache(data) {
            dbUtil.setData(namespace,JSON.stringify(data));
        }
        var sortThread = {};

        try {
            var cacheTime =JSON.parse(dbUtil.getData(namespace));
            
        } catch (error) {
           
            var cacheTime =[];
        }
        (!cacheTime || cacheTime.length == 0) && (cacheTime = [],dbUtil.setData(namespace, '[]'));
        var time =0;
        $(this).children().each(function (index, item) {
            $(item).attr("data-index",index);
            $(item).attr('data-sort',cacheTime[index]||time);
            cacheTime[index] = cacheTime[index]||time;
        })
        childrens.on('click', function () {
            var index=$(this).attr('data-index'),time=(+new Date);
            $(this).attr('data-sort',time);
            cacheTime[index]=time;
            setCache(cacheTime);
        })
        sortThread.sortAscending = true;
        function sortDom() {
            // console.log("执行排序方法",childrens);
            if(cacheTime.length==0) return;
            sortThread.sortAscending = !sortThread.sortAscending;
            childrens.sort(function (a, b) {
                var sort1 = a.getAttribute('data-sort') * 1;
                var sort2 = b.getAttribute('data-sort') * 1;
                var sortNum = 1;
                if (!sortThread.sortAscending)
                    sortNum = -1;
                if (sort1 > sort2)
                    return 1 * sortNum;
                if (sort1 < sort2)
                    return -1 * sortNum;
                return 0;
            });
           
            setCache(cacheTime,true);
            childrens.detach().appendTo(_this);
          
            
        }
        sortDom();//初始化
        return $(this);
    },
    resetSortDom:function(namespace){
        $.fn.dbUtil.removeData(namespace);
        return true;
    }
})

//js-core 核心
var arrdata=[5,4,2,3,1,0]
function sortData(index){
        var newarray = arrdata.slice();
        var val = newarray[index];
        arrdata[index]=Math.max.apply(null,arrdata);
        $.each(newarray,(index2,item)=>{
            if(index!==index2&&arrdata[index2]-1>=val){
                arrdata[index2]-=1;
            }
            
        })
}
sortData(4);
console.log(arrdata);


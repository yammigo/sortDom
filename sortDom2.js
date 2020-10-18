
/**
 * name sortDom
 * desc DOM 排序记忆
 * fanjiantao
 * 1418154909@qq.com
 */
$.fn.extend({
    dbUtil:{
        dbType:!!window.localStorage?"local":navigator.cookieEnabled?"cookie":"var",
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
    sortDom: function (namespace,childrens) {
        var dbUtil = $.fn.dbUtil;
        var _this=$(this);
        var childrens=childrens||$(this).children();
        var childrenSize = childrens.size();
        function setCache(data) {
            dbUtil.setData(namespace,JSON.stringify(data));
        }
        //js-core diff
        function sortData(index,arrdata){
            var domIndex=arrdata.slice().sort(function(a,b){return a-b>0&&-1});
            console.log(domIndex,"sss");
            var maxVal= Math.max.apply(null,arrdata.slice());
            if(!(index>=0)||!(index<=arrdata.length)){
               throw "参数不正确"
            }
            var itemIndex=arrdata.indexOf(domIndex[index]);
            var step=arrdata[itemIndex]+1;
            while(step<=maxVal){ 
                arrdata[arrdata.indexOf(step)]-=1;
                step++;
            }
            arrdata[itemIndex]=maxVal;
            return arrdata;
        }
        var sortThread = {sortAscending:false};
        try {
            var cacheTime =JSON.parse(dbUtil.getData(namespace));
        } catch (error) {
            var cacheTime =[];
        }
        (!cacheTime || cacheTime.length == 0) && (cacheTime = [],dbUtil.setData(namespace, '[]'));
        //标记子元素
        childrens.each(function (index, item) {
            $(item).attr('data-sort',(cacheTime.length>0&&cacheTime[index]||cacheTime[index]==0)?cacheTime[index]:childrenSize-index-1);
            cacheTime[index]=cacheTime.length>0&&(cacheTime[index]||cacheTime[index]==0)?cacheTime[index]:childrenSize-index-1;
        })
        childrens.on('click', function () {
            var cacheData=sortData($(this).index(),cacheTime);
            sortDom(cacheData);
            setCache(cacheTime,cacheData);
        })
        sortThread.sortAscending = true;
        function sortDom(cacheData) {
            //打标记
        //     if(cacheData){
        //         childrens.each(function (index, item) {
        //             $(item).attr('data-sort',cacheData[index]);
        //         })
        //    }
            //
            if(cacheTime.length==0) return;
            sortThread.sortAscending = !sortThread.sortAscending;
            childrens.sort(function (a, b) {
                var sort1 = $(a).attr('data-sort') * 1;
                var sort2 = $(b).attr('data-sort') * 1;
                var sortNum = 1;
                if (!sortThread.sortAscending)
                    sortNum = -1;
                if (sort1 > sort2)
                    return 1 * sortNum;
                if (sort1 < sort2)
                    return -1 * sortNum;
                return 0;
            });
            //删除挂载在元素上的属性
            childrens.each(function(index,item){
                $(item).removeAttr('data-sort');
            })
            childrens.detach().appendTo(_this);  
        }
        sortDom();//初始化
        return $(this);
    },
    resetSortDom:function(namespace,childrens){
        $.fn.dbUtil.removeData(namespace);
        //childrens&&$(this).sortDom(namespace,childrens);
        return true;
    }
})

//js-core 优化算法
// function sortData(index,arrdata){
//     var domIndex=arrdata.slice().reverse();
//     var maxVal= Math.max.apply(null,arrdata.slice());
//     if(!(index>=0)||!(index<=arrdata.length)){
//        throw "参数不正确"
//     }
//     var itemIndex=arrdata.indexOf(domIndex[index]);
//     var step=arrdata[itemIndex]+1;
//     while(step<=5){ 
//         arrdata[arrdata.indexOf(step)]-=1;
//         step++;
//     }
//     arrdata[itemIndex]=maxVal;
//     return arrdata;
// }
// console.log(sortData(1,[5,3,1,2,4,0]));





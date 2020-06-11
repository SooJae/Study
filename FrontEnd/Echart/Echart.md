https://cho2.tistory.com/entry/EChart-%EC%B0%A8%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-Echart-%EC%A0%95%EB%A6%AC


# 예제
https://www.dbface.com/assets/echarts/doc/example/line1.html#-en
```js

tooltip : {
    trigger: 'axis' //  axis로 하면 그래프에 마우스를 올려놓을때 툴팁이 나온다.
},
{
    name:'最低气温',
    type:'line',
    data:[1, -2, 2, 5, 3, 2, 0], // 데이터
    markPoint : {
        data : [
            {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}, // xAxis : x축으로 몇칸인지.( data 배일의 인덱스를 보면 될것 같다.) 
                                                                  // yAxis: y축으로 몇칸인지. ( data 배열의 해당 값을 보면 될것 같다.
            {name : '周最低', value : 5, xAxis: 3, yAxis: 5}     // 결론 xAxis: i, yAxis: data[i]
        ]
    },
    markLine : {
        data : [
            {type : 'average', name : '平均值'}
        ]
    }
}
```


dbface.com/assets/echarts/doc/example/dataZoom1.html#-en

```js

option = {
    tooltip : {
        trigger: 'axis'
    },
   
    calculable : true,
    dataZoom : { // 데이터 줌 아이콘 표시
        show : true,
        realtime : true,
        start : 0, // 백분위로 한다.
        end : 100 // 백분위로 한다.
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : function (){
                var list = [];
                for (var i = 1; i <= 30; i++) {
                    list.push('2013-03-' + i);
                }
                return list;
            }()
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'最高',
            type:'line',
            data:function (){
                var list = [];
                for (var i = 1; i <= 30; i++) {
                    list.push(Math.round(Math.random()* 30));
                }
                return list;
            }()
        },
        {
            name:'最低',
            type:'line',
            data:function (){
                var list = [];
                for (var i = 1; i <= 30; i++) {
                    list.push(Math.round(Math.random()* 10));
                }
                return list;
            }()
        }
    ]
};
```


평균을 구해서 해당 값들과 평균의 차이를 각각 제곱해서 더한후 제곱근을 구한다. 

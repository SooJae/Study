# 엘리먼트 속성 정리
## element.offsetHeight, element.offsetWidth
일반적으로 엘리먼트의 전체 크기를 알고 싶다면, offsetWidth와 offsetHeight 속성을 가져오면 된다. 이 속성은 엘리먼트의 *패딩과 보더,
스크롤바*의 사이즈를 포함한 값을 리턴한다.

## element.clientHeight, element.clientWidth
실제로 보여지고 있는 컨텐츠가 얼마만큼의 공간을 차지하고 있는지 확인하고 싶다면, clientWidth와 clientHeight 속성을 사용하는 것이 좋다. 
이 속성은 보더와 스크롤바의 크기를 제외한 실제 컨텐츠의 크기를 리턴한다. (패딩은 포함하고 있다)

## element.scrollHeight, element.scrollWidth
보이는 것과 상관 없이 실제 컨텐츠 영역이 얼마만큼의 크기를 갖고 있는지 확인하고 싶다면, scrollWidth와 scrollHeight 속성을 확인하면 된다. 
이 속성은 전체 스크롤바를 사용하게 되어 숨겨진 영역까지 포함한 크기를 리턴한다.


https://github.com/jinyowo/JS-Calendar/wiki/**offsetHeight,-innerWidth-%EC%99%80-%EB%B9%84%EC%8A%B7%ED%95%9C-%EC%86%8D%EC%84%B1%EB%93%A4-%EC%A0%95%EB%A6%AC



# BoundingClientRect
https://opentutorials.org/module/904/7112
https://programmer-seva.tistory.com/57
https://heropy.blog/2019/10/27/intersection-observer/

```js
// 앵귤러 getBoundingClientRect() 사용
const detailLeft = this.elementRef.nativeElement.querySelector('.detail').getBoundingClientRect().left;
const detailTop = this.elementRef.nativeElement.querySelector('.detail').getBoundingClientRect().top;

// Jquery 사용
const $detailL = $('.detail').offset().left;
const $detailT = $('.detail').offset().top;
```

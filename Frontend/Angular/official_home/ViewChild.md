# 부모 Component의 직접적인 자식 요소 제어
## @Input Decorator
부모 Component에서 자식 Component로 데이터를 전달하는 방법

## @ViewChild Decorator
부모 Component에서 자식 Component 객체뿐만 아니라 자식으로 포함된 Directive에 직접 접근할 수 있고, 또한 Component가 Rendering하는 View자체에 직접 접근할 수 있다.

단점: 일단 간단하게 프로그램을 구현할 수 있으나 나중에 Component의 View가 변경되면 Component에서 처리하는 부분도 당연히 그에 맞게 바뀌어야 한다. Component의 재사용성과 유지보수성에 문제가 생길 여지가 있다.
필요한 경우가 아니면 지양해야한다.

**자식 Component 객체에 직접 접근하려면 @ViewChild** decorator를 이용하면 된다. 
조건에 부합되는 객체 1개를 찾게되고 그에 대한 property를 지정해서 사용할 수 있다. 만약 **@ViewChildren을 이용하면 조건에 부합되는 객체를 모두 찾게 되고 QueryList 형태로 객체들의 집합을 얻을 수 있다.** 
QueryList는 실제 배열이 아니기 때문에 toArray()method를 이용해 배열을 얻어내 이용할 수 있다.

[더 자세히 알고 싶다면?](https://js2prince.tistory.com/entry/Angular-ViewChild-%EB%8D%B0%EC%9D%B4%ED%84%B0%EA%B3%B5%EC%9C%A0)

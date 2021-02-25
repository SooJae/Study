## 컴포넌트 작성시 주의할점 
하나의 최상위 태그만 써야한다. 예를들어
```js
class Subject extends Component {
  render() {
    return (
        <header>
          <h1>WEB</h1>
          world wide web!
        </header>
    );
  }
}
``` 
에서 보면 header태그가 보이는데 header 태그 위에 다시 태그로 감싸면 안된다.

컴포넌트는 자바스크립트는 아니고 유사 자바스크립트 이다. 자바스크립트는 태그를 사용할 수 없기 때문에

리액트 디버깅 툴 :https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko


# Props, State
Props : 사용자가 제품을 사용(조작)하는 장치 (스마트폰 사용)
State : 생산자가 제품을 만들때 Props의 값에 따라서 내부에 필요한 데이터들 (스마트폰 안에 내부적 조작장치, 메커니즘 구현)

Props와 State는 철저히 격리 시켜야한다
(예: 제품을 사용(Props)하는 사용자가 전선(State)이 튀어나오는 것을 보는 격)
즉 사용하는 쪽과, 구현하는 쪽을 철저히 격리시켜서 각자의 편의성을 각자 도모하는 것.

state 값이 바뀌면 해당하는 컴포넌트의 render함수가 호출된다. 화면이 다시 그려진다 (하위 컴포넌트까지 싹다.)
render함수는 어떤 HTML을 그릴것인가? 를 결정하는 함수이다.
Props또는 State가 바뀌면 화면이 다시 그려진다.

```js
<a
    href="/"
    onClick={e => {
        e.preventDefault();
        alert('hi');
    }}
>
```
e.preventDefault();는 a태그의 기본 동작방식을 못하게 한다.

태그 프로퍼티 data-id 값은 e.target.dataset.id 값에 들어간다.

## Props vs State
- Props
읽기전용이다.
수정할 수 없다.

- State 
비동기적으로 바꿀 수 있다.
this.setState 메서드를 이용해서 수정할 수 있다.

즉 컴포넌트 안에서 this.props.name = 'soojae';이런식으로 바꿀 수 없고 컴포넌트 밖에서 this.state.setState({name: 'soojae'})이런식으로 바꿔야 한다.

Props와 State 모두 render() 함수 호출을 유발하기 때문에 Props와 State를 적절히 수정해서 UI를 바꿀 수 있다.


1. props는 스마트폰의 볼륨버튼이라면 사용자가 볼륨버튼을 누르면 state는 스마트폰안에서 스스로의 상태인 볼륨이 바뀌게 해놓은 모든 조치(회로,프로그래밍 등등)라고 할 수 있습니다. 
2. 상위 컴포넌트는 하위 컴포넌트에게 props를 통해 값을 전달해 내부의 state를 바꾸기 때문에 컴포넌트 스스로 외부에서 전달되는 props를 변경하는 것은 금지되어 있습니다.  또한 하위 컴포넌트가 상위 컴포넌트를 동작시키려면 props를 전달하는 것이 아니라 상위 컴포넌트 안에 이벤트를 심고 그 안에 setState로 값을 바꿔야 합니다.


상위 컴포넌트 > props > 하위 컴포넌트
하위 컴포넌트 > 이벤트 실행 > 상위 컴포넌트의 state 호출 > state 값 수정

사장과 직원개념으로 비유하면 사장=state, 직원=props로 사장이 일 목록을 만들면 직원은 목록에 있는 것을 골라서 일을 처리할 수 있지만 직원이 새로운 일을 하려면 기획안(이벤트)을 만들어 사장에게 허락을 구하는 것



### useRef 사용처
useRef Hook 은 DOM 을 선택하는 용도 외에도, 다른 용도가 한가지 더 있는데요, 바로, 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리하는 것 입니다.

useRef 로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링되지 않습니다. 리액트 컴포넌트에서의 상태는 상태를 바꾸는 함수를 호출하고 나서 그 다음 렌더링 이후로 업데이트 된 상태를 조회 할 수 있는 반면, useRef 로 관리하고 있는 변수는 설정 후 바로 조회 할 수 있습니다.

setTimeout, setInterval 을 통해서 만들어진 id
외부 라이브러리를 사용하여 생성된 인스턴스
scroll 위치


### 배열의 push, splice, sort 등의 함수를 사용하면 안됩니다.


## useEffect
주로, 마운트 시에 하는 작업들은 다음과 같은 사항들이 있습니다.

props 로 받은 값을 컴포넌트의 로컬 상태로 설정
외부 API 요청 (REST API 등)
라이브러리 사용 (D3, Video.js 등...)
setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약


## deps 주의 할 점
주의 하실 점은, 함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, deps 배열안에 포함시켜야 된다는 것 입니다. 만약에 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없습니다. props 로 받아온 함수가 있다면, 이 또한 deps 에 넣어주어야 해요.

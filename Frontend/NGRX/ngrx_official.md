# NgRx란?
NgRx는 앵귤러에서 반응형 어플리케이션 빌딩을 위한 프레임 워크입니다.
Ngrx는 상태 관리를 제공하고, 부작용에 독립적, 
엔티티 수집관리, 라우터 비인딩, 코드 생성, 그리고 어플리케이션의 다양한 타입들을 빌딩할때, 개발자 경험을 향상시켜줄 개발 툴
이 있습니다. 

# 상태 관리에 왜 NgRx를 사용하나요?
NgRx는 단일 상태를 저장하여 유지 관리 가능한 응용 프로그램을 만들기위한 상태 관리를 제공합니다.
그리고 상태 변화를 표현하기위한 action을 제공합니다.

## 직렬화
NgRx는 상태 변경을 정규화하고 관찰 가능 항목을 통해 전달함으로써 직렬화 기능을 제공하고 상태를 예측 가능하게 저장합니다. 
이를 통해 상태를 외부 저장소 (예 : localStorage)에 저장할 수 있습니다.
게다가, Store Devtools에서 검사, 다운로드, 업로드 및 디스패치를 할 수 있습니다.

## 타입 안전
프로그램의 정확성을 위해 TypeScript 컴파일러를 사용하여 아키텍처 전체에서 유형 안전이 향상됩니다.

## 캡슐화
NgRx Effects and Store를 사용하면 네트워크 요청, 웹 소켓 및 비즈니스 로직과 같은 외부 리소스 부작용과의 모든 상호 작용을 UI에서 분리 할 수 ​​있습니다. 이러한 격리는보다 순수하고 간단한 구성 요소를 허용하며 단일 책임 원칙을 유지합니다.

## 테스트 가능한
때문에 스토어 순수한 상태를 변경하고 상태 데이터를 선택하는 기능, 상기 UI에서 분리 부작용 기능을 사용하여, 테스트는 매우 간단해진다. NgRx는 또한 격리 테스트 provideMockStore와 같은 테스트 설정과 provideMockActions더 나은 테스트 경험을 제공합니다.

## 성능
Store 는 변경 불가능한 단일 데이터 상태를 기반으로하며 변경 감지는 OnPush전략을 사용하여 매우 쉬운 작업으로 전환됩니다 . NgRx는 또한 상태 쿼리 계산을 최적화하는 메모리 셀렉터 기능에 의해 구동됩니다.

## 내가 상태값 관리를 위해 NgRx를 사용해야 할때는? 
특히, 서비스 상태를 관리하는 것이 충분하지 않은 경우, 사용자가 어플리케이션을 빌드할 때(많은 사용자 상호작용과, 여러 데이터 소스가있는 응용 프로그램을 구축 할 때 ) NgRx를 사용할 것입니다. 

"NGRx가 필요합니까?"라는 질문에 대답 할 수있는 좋은 물질은 SHARI 원칙입니다.

Shared : 많은 구성 요소 및 서비스에 의해 액세스되는 상태.

Hydrated : 유지 및 외부 저장 장치로부터 재수화(rehydrated)되는 상태.

Available : 경로를 다시 진입 할 때 사용할 수 있어야 상태입니다.

Retrived : 부작용으로부터 떨어져 있어야 한다.

Impacted : 다른 소스로 부터의 actions에 의해 영향을 받는 상태.

그러나 NgRx를 사용한다는 것은 일부 상충 관계가 있음을 인식하는 것이 중요합니다. 코드를 작성하는 가장 짧거나 빠른 방법이 아니며 사용자에게 많은 파일을 사용하도록 권장하는 것은 아닙니다. 또한 종종 좋은의 이해를 포함하여, 가파른 학습 곡선을 필요로한다 RxJs하고 Redux.

# 패키지
Store - RxJS powered state management for Angular apps, inspired by Redux.
Store Devtools - Instrumentation for @ngrx/store enabling time-travel debugging.
Effects - Side effect model for @ngrx/store.
Router Store - Bindings to connect the Angular Router to @ngrx/store.
Entity - Entity State adapter for managing record collections.
NgRx Data - Extension for simplified entity data management.
Schematics - Scaffolding library for Angular applications using NgRx libraries.

# 액션
Actions는 NgRx의 주요 구성 요소 중 하나입니다. Actions는 응용 프로그램 전체에서 발생 하는 고유 한 이벤트를 나타냅니다. 페이지와의 사용자 상호 작용, 네트워크 요청을 통한 외부 상호 작용 및 장치 API와의 직접적인 상호 작용에서 이러한 이벤트와 더 많은 이벤트가 동작으로 설명됩니다.

## 소개 
NgRx의 여러 영역에서 작업이 사용됩니다. 동작은 NgRx에 있는 많은 시스템의 입력 및 출력입니다. 
작업은 응용 프로그램에서 이벤트가 처리되는 방식을 이해하는 데 도움이됩니다. 이 가이드는 애플리케이션에서 action을 작성하기위한 일반 규칙 및 예제를 제공합니다.

# Action 인터페이스
```js
interface Action {
  type: string;
}
```

인터페이스에는 type 문자열로 표시 되는 단일 속성이 있습니다. 
이 type 속성은 응용 프로그램에서 전달 될 동작을 설명하기위한 것입니다. 
유형의 값은 다음과 같은 형식으로 제공되며 [Source] Event작업의 범주와 작업이 발송 된 위치에 대한 컨텍스트를 제공하는 데 사용됩니다. 
조치에 추가 컨텍스트 또는 메타 데이터를 제공하기 위해 조치에 특성을 추가합니다.

아래는 일반 자바 스크립트 객체 (POJOS)로 작성된 작업의 예입니다.
```js
{
  type: '[Auth API] Login Success'
}
```

이 조치는 백엔드 API와 상호 작용 한 후 성공적인 인증으로 트리거되는 이벤트를 설명합니다.
```js
{
  type: '[Login Page] Login',
  username: string;
  password: string;
}
```

이 조치는 사용자가 로그인 페이지에서 로그인 단추를 클릭하여 사용자 인증을 시도하여 트리거되는 이벤트를 설명합니다. 
사용자 이름과 비밀번호는 로그인 페이지에서 제공되는 추가 메타 데이터로 정의됩니다.

## 작문 
응용 프로그램 내에서 올바른 작업을 작성하는 데 몇 가지 규칙이 있습니다.

Upfront - 기능을 개발하기 전에 조치를 작성하여 구현중인 기능에 대한 지식을 이해하고 공유하십시오.
Divide - 이벤트 소스를 기준으로 조치를 분류하십시오.
Many - 작업은 쓰기 비용이 저렴하므로 더 많은 작업을 작성할수록 응용 프로그램에서 흐름을 더 잘 표현할 수 있습니다.
Event-Driven - 이벤트 설명과 해당 이벤트 처리를 분리 할 때 명령이 아닌 이벤트를 캡처 합니다 .
Descriptive - 개발자 도구로 디버깅하는 데 도움이되는보다 자세한 정보를 사용하여 고유 한 이벤트를 대상으로하는 컨텍스트를 제공하십시오.

이 지침을 따르면 응용 프로그램 전체에서 이러한 작업이 어떻게 진행되는지 알 수 있습니다.

로그인 요청을 시작하는 예제 조치를 살펴 보겠습니다.

```js
export const login = createAction(
'[Login Page] Login',
props<{username: string; password: string}>()
)
```

이 createAction 함수는 호출 될 때 Action 인터페이스 모양의 객체를 반환하는 함수를 반환합니다. 
이 props 메소드는 작업 처리에 필요한 **추가 메타 데이터를 정의**하는 데 사용됩니다. 
액션 제작자는 전달되는 액션을 구성 할 수있는 일관되고 형식이 안전한 방법을 제공합니다.

액션 생성자를 사용하여 Action 디스패치시 반환합니다.

```js
onSubmit(username: string, password: string) {
  store.dispatch(login({ username: username, password: password }));
}
```

login action 작성자의 객체 수신 username와 password를 일반 자바 스크립트 객체를 반환 type의 프로퍼티 [Login Page] Login으로, username및 password추가 속성으로.

리턴 된 action은 조치가 발생한 위치와 발생한 이벤트에 대한 매우 구체적인 컨텍스트가 있습니다.

- Action 카테고리는 대괄호 안에 표시됩니다 [].
- 카테고리는 컴포넌트 페이지, 백엔드 API 또는 브라우저 API 등 특정 영역에 대한 조치를 그룹화하는 데 사용됩니다.
- 카테고리 뒤의 `Login` 텍스트는 이 조치에서 발생한 **이벤트에 대한 설명**입니다. 이 경우 사용자는 로그인 페이지에서 `Login` 버튼을 클릭하여 사용자 이름과 비밀번호로 인증을 시도했습니다.

참고 : NgRx 에서 action creator 가 도입되기 전에 미리 정의 된 방식 인 클래스 기반 액션 제작자를 사용하여 액션을 작성할 수도 있습니다. 
클래스 기반 조치 작성기의 예를 찾으려면 버전 7.x 이하 의 문서를 방문하십시오 .


# Reducers
NgRx의 Reducers 는 애플리케이션에서 한 상태에서 다음 상태로의 전환을 처리합니다. 
Reducers functions는 action 유형에 따라 처리 할 Actions를 결정하여 이러한 전환을 처리합니다.

## 소개 
Reducers는 주어진 입력에 대해 동일한 출력을 생성한다는 점에서 순수 함수(pure function)입니다. 
부작용이 없으며 각 상태 전달을 동기적으로 처리합니다. 
각 Reducer 함수는 최신 Action을 전달합니다. 
그리고 현재 상태를 가져와서 새로 수정 된 상태를 반환할지 원래 상태를 반환할지 결정합니다. 
이 가이드는 Reducer 기능을 작성하고, Store에 등록하고, 기능 상태를 작성하는 방법을 보여줍니다.

## Reducer 기능 
Reducer에서 관리하는 모든 상태 조각에는 일관된 부분이 있습니다.

- 상태의 모양을 정의하는 인터페이스 또는 유형입니다.
- 초기 상태 또는 현재 상태 및 현재 작업을 포함한 인수
- 연관된 action에 대한 상태 변경을 처리하는 함수.
다음은 스코어 보드의 상태를 처리하기위한 일련의 작업 및 관련 reducer 함수의 예입니다.

먼저, 상태와 상호 작용하기위한 몇 가지 작업을 정의하십시오.
```js
import { createAction, props } from '@ngrx/store';

export const homeScore = createAction('[Scoreboard Page] Home Score');
export const awayScore = createAction('[Scoreboard Page] Away Score');
export const resetScore = createAction('[Scoreboard Page] Score Reset');
export const setScores = createAction('[Scoreboard Page] Set Scores', props<{game: Game}>());
```
다음으로, actions를 가져오고 상태에 대한 shape를 정의하는 reducer 파일을 작성하십시오.


상태 모양 정의 각 reducer 함수는 action의 리스너입니다. 
위에서 정의한 스코어 보드 동작은 reducer가 처리 할수 있는 전환을 설명합니다. 
reducer 내에서 추가 상태를 전달하기 위해 여러 action들의 set을 가져옵니다.

숫자와 같은 단일 유형인지 또는 여러 속성을 가진 복잡한 객체인지 여부에 따라 캡처 대상에 따라 상태의 모양을 정의합니다.

## 초기 상태 설정
초기 상태는 상태에 초기 값을 제공하거나 현재 상태가 인 경우 값을 제공합니다 undefined. 
필수 상태 속성에 대한 초기 상태를 기본값으로 설정합니다.

하나 이상의 기본값으로 초기 상태를 캡처하는 변수를 작성하고 내보내십시오.

## Reducer 함수 생성 
Reducer 함수의 책임은 상태 전이를 불변의 방식으로 처리하는 것입니다. 
createReducer 함수를 사용하여 스코어 보드 상태 관리를위한 Action을 처리하는 Reducer 함수를 작성하십시오.

AOT 컴파일러 는 함수 호출을 지원하지 않으므로 exported reducer함수가 필요 합니다.

위의 예에서 감속기는 4 개 작업을 처리하는 : [Scoreboard Page] Home Score, [Scoreboard Page] Away Score, [Scoreboard Page] Score Reset와 [Scoreboard Page] Set Scores. 
각 동작은 강력하게 형식화됩니다. 
각 액션은 상태 전이를 불변 적으로 처리합니다. 
이는 상태 전이가 원래 상태를 수정하지 않지만 스프레드 연산자를 사용하여 새 상태 객체를 반환 함을 의미합니다. 
스프레드 구문은 속성을 현재 상태에서 객체로 복사하여 새 참조를 만듭니다. 
이렇게하면 변경의 순서를 유지하면서 각 변경마다 새로운 상태가 생성됩니다. 
또한 참조 무결성을 향상시켜 상태 변경이 발생할 때 이전 참조가 삭제되도록합니다.
```
Note: 확산 연산자는 단지 얕은 복사를 수행하고 중첩 객체를 처리하지 않습니다. 
 불변성을 보장하기 위해 오브젝트의 각 레벨을 복사해야합니다. 
 lodash 및 immer를 포함한 딥 카피를 처리하는 라이브러리가 있습니다 .
```
조치가 전달되면 등록된 모든 reducer가 조치를 수신합니다. 
이들이 작업을 처리하는지 여부는 on하나 이상의 작업을 주어진 상태 변경과 연결 하는 기능에 의해 결정됩니다 .
```
Note : NgRx에서 리듀서를 도입하기 전에 이전에 정의 된 방식 인 switch 문을 사용하여 리듀서를 작성할 수도 있습니다.
switch 문을 사용하는 감속기의 예를 찾으려면 버전 7.x 이하 의 설명서를 방문하십시오 .
```


### 7.x 이전
```js
export function reducer(
  state = initialState,
  action: Scoreboard.ActionsUnion
): State {
  switch (action.type) {
    case Scoreboard.ActionTypes.IncrementHome: {
      return {
        ...state,
        home: state.home + 1,
      };
    }
 
    case Scoreboard.ActionTypes.IncrementAway: {
      return {
        ...state,
        away: state.away + 1,
      };
    }
 
    case Scoreboard.ActionTypes.Reset: {
      return action.payload; // typed to { home: number, away: number }
    }
 
    default: {
      return state;
    }
  }
}
```
### 7.x 이후
```js
const scoreboardReducer = createReducer(
  initialState,
  on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 })),
  on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
  on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
  on(ScoreboardPageActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
);

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
```

## 루트 상태 등록
어플리케이션의 상태는 하나의 큰 객체로 정의됩니다. 
상태의 일부를 관리하기 위해 Reducer 함수를 등록하면 객체에 관련 값이있는 키만 정의됩니다. 
Store 애플리케이션 내에서 전역을 등록하려면 StoreModule.forRoot()상태를 정의하는 키 / 값 쌍의 맵과 함께 메소드를 사용하십시오. 
StoreModule.forRoot()는 컴포넌트 및 서비스에 주입한 Store 서비스를 포함하여 Actions를 디스패치하고 상태 조각을 선택하는 등 애플리케이션의 global provider를 등록합니다.


StoreModule.forRoot()에 상태를 등록하면 응용 프로그램 시작시 상태가 정의됩니다. 
일반적으로 항상 어플리케이션의 모든 영역에서 즉시 사용할 수 있어야하는 루트 상태를 등록합니다.

## feature state 등록
기능 상태는 루트 상태와 동일한 방식으로 작동하지만 응용 프로그램의 특정 기능 영역으로 정의 할 수 있습니다. 
상태는 하나의 큰 객체이며 기능 상태는 해당 객체에 추가 키와 값을 등록합니다.
예제 상태 개체를 살펴보면 기능 상태를 통해 상태를 점진적으로 구축하는 방법을 알 수 있습니다. 빈 상태 객체부터 시작하겠습니다.

```
Note: 기능 상태를 등록하고 호출 할 때 하드 코딩 문자열을 방지하려면 기능 키 문자열을 추상화하는 것이 좋습니다. createFeatureSelector.
```
키가 ScoreboardModule로드 되면 game키가 객체의 속성이되고 이제 상태에서 관리됩니다.
```
{
  game: { home: 0, away: 0 }
}
```
기능 상태가 열성적으로 또는 지연 적으로로드되는지 여부는 응용 프로그램의 요구에 따라 다릅니다. 기능 상태를 사용하여 시간이 지남에 따라 그리고 다른 기능 영역을 통해 상태 개체를 구축합니다.

# Selectors
Selectors는 저장 상태 조각을 얻는 데 사용되는 순수한 함수입니다. 
@ngrx / store는 이 선택을 최적화하기위한 몇 가지 helpers 함수를 제공합니다. 
Selectors는 상태 슬라이스를 선택할 때 많은 함수를 제공합니다.

- Portability
- Memoization
- Composition
- Testability
- Type Safety

createSelector및 createFeatureSelector함수를 사용할 때 @ ngrx / store는 선택기 함수가 호출 된 최신 인수를 추적합니다. 
Selector는 순수한 함수 이므로 선택자 함수를 다시 호출하지 않고 인수가 일치하면 마지막 결과가 리턴 될 수 있습니다. 
이는 특히 비싼 계산을 수행하는 선택기와 함께 성능상의 이점을 제공 할 수 있습니다. 
이 관행을 Memoization라고 합니다.

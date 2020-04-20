# 상태(State)란?

서버에서는 데이터베이스와 같이 상태를 저장할 수 있는 기능들이 있다.
하지만 클라이언트에서는 상태를 저장할 수 있는 기능들이 없었다.

어플리케이션 상태란?
- 서버의 응답데이터
- 유저 정보
- 유저의 입력
- UI 상태
- 라우터, 로케이션 상태

리덕스 : 3가지 원리

1. Single source of truth 단일 소스
2. 상태값은 읽기전용이다.
3. Pure functions update state

## Single source of truth 
- One state tree inside Store
- Predictability, maintainability
- SSR
- 테스팅, 디버깅 

## State is read-only
- Derive properties from state
- Dispatch actions to change the state
- Immutable update patterns

## Pure functions update state
- Pure functions are reducers
- Reducers respond to action types
- Reducers return new state

# 리덕스
중요 컨셉
- Single state tree
- Actions
- Reducers
- Store
- One-way dataflow

## Single state tree
- Plain Javascript Object
- Composed by reducers

```js
const state ={
    todos:[]
};
```

## Actions
- Two properties:
-- type: string, describes event
-- payload: optional data
- Dispatch actions to reducers

```js
const action ={
  type:'ADD_TODO',
  payload: {
    label:'Eat pizza',
    complete:false
  } 
}
```

## Reducers
- Pure functions
- Given dispatched action
-- Responds to action.type
-- Access to action.payload
-- Composes new state
-- Returns new state

```js
function reducer(state, action){
  switch(actino.type){
    case 'ADD_TODO':{
      const todo = action.payload;
      const todos = [...state.todos, todo];
      return {todos};
    }   
  }
  return state;
}
```

## STATE
```js
const state = {
  todos:[
    {label:'Eat pizza', complete:false}
  ]
}
```

## Store
- State container
- Components interact with the Store
-- Subscribe to slices of State
-- Dispatch Actions to the Store
- Store invokes Reducers with previous State and Action
- Reducers compose new State
- Store is updated, notifies subscribers

State: Angular Component가 화면에 보여줘야하는 데이터

Action: 서버와 통신(비동기)하고 데이터를 변경하는 역할

Selects: 데이터를 Angular Component에게 가져오는 역할

Store: State를 저장, action과 select를 관리/참조하는 중심

# Immutability
불변성 객체는 만들어진 이후에 변경이 불가능한 객체이다.

# Why Immutable?
- Predictability
- Explicit state changes
- Performance
- Mutation Tracking
- Undo state changes

# Mutability in Javascript

- Functions
- Objects
- Arrays

```js
const character = {name : 'Han Solo'};
character.role = 'Captain';

// {name: 'Han Solo', role: 'Captain} 원본이 바꼈으므로 디버깅이 힘들다.
console.log(character);
```

```js
const names = ['Han Solo', 'Darth Vader'];
names.push('R2-D2');

//['Han Solo', 'Darth Vader', 'R2-D2'] 원본이 변경된다.
console.log(names);
```

Immutability in Javascript
- Strings
- Numbers

```js
const name = 'Han Solo';

const uppercaseName = name.toUpperCase();
//'Han Solo', 'HAN SOLO'
console.log(name, uppercaseName);
```

```js
const character = {name:'Han Solo'};

//Object.assign({},character,{role:'Captain'});
const updatedCharacter = {...character, role:'Captain'};

//{name: 'Han Solo'};
console.log(character);
//{name:'Han Solo', role:'Captain'};
console.log(updatedCharacter);
```

# What is ngrx/store?

- Redux inspired reactive state management

## ngrx/store
- Based on Redux
- Written with Observables
- Made for Angular

## Benefits of ngrx/store

- single source of truth
- Testability
- Performance benefits
-- ChangeDetectionStrategy.OnPush
-- Immutable @Inputs
-- Object reference checks are fase
- Root and feature module support
-- Eagerly loaded modules
-- Lazily loaded modules

## Reactive Angular
### Container
- Aware of Store
- Dispatches Actions
- Reads data from Store

### Presentational
- Not aware of Store
- Invokes callbacks via @Output
- Read data from @Inputs


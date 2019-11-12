```js
// 주입할 인스턴스의 클래스 리스트
providers: [GreetingService]
```

```js
providers: [{
  provide: GreetingService,  // 토큰
  useClass: GreetingService  // 의존성 인스턴스를 생성할 클래스
}]
```

첫 번째 provide 프로퍼티는 인젝터가 관리하고 있는 컨테이너에서 주입 요청받은 인스턴스를 검색하거나 생성한 인스턴스를 등록할 때 **키(key) 역할을 하는 토큰(token)이며 일반적으로 주입 대상 인스턴스의 타입을 지정한다.**

두 번째 useClass 프로퍼티는 주입 대상 인스턴스를 생성하는 클래스(provider definition object)를 의미한다. **인젝터는 주입 요청받은 인스턴스를 컨테이너에서 검색할 수 없어서 인스턴스를 생성할 필요가 있을 때 이 클래스를 사용한다.** 위 코드는 GreetingService 클래스에 의해 생성된 GreetingService 타입의 인스턴스가 주입될 것을 의미한다.

위 코드는 AnotherGreetingService 클래스로 생성한 인스턴스를 GreetingService란 이름의 토큰으로 인젝터의 컨테이너에 등록하고 검색할 것이라는 의미이다. 즉, 컴포넌트에서 의존성 주입을 요청할 때, **GreetingService 타입의 인스턴스를 요청**하면 인젝터는 컨테이너에서 GreetingService란 키(토큰)으로 인스턴스를 검색하여 AnotherGreetingService 클래스로 생성된 GreetingService 타입의 인스턴스를 주입할 것이다. GreetingService와 AnotherGreetingService 두 클래스는 비록 같은 인터페이스를 구현하지는 않았지만, 같은 메소드를 가지고 있기 때문에 덕 타이핑(duck typing)에 의해 같은 타입으로 인정된다.

# TypeScript vs ES6 의존성 주입 비교

모든 컴포넌트는 @Component 어노테이션을 사용하기 때문에 위 코드만 있어도 동작한다.
왜냐하면 TypeScript 컴파일 옵션에 **emitDecoratorMetaData 값을 true로 설정**했기 때문에, 주입되는 객체에 대한 **메타데이터가 필요하면 Angular가 자동으로 생성**하기 때문이다.
```js
constructor(productService : ProductService);
constructor(@Inject(ProductService) productService);
```
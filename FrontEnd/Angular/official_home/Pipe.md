# 순수한 파이프
순수한 파이프는 파이프에 전달되는 값이 순수하게 바뀌었을 때만 동작합니다. 이 때 값이 순수하게 바뀌었다는 것은 **기본 자료형(String, Number, Boolean, Symbol)의 값**이 바뀌었거나, 객체(Date, Array, Function, Object)를 **참조하는 주소**가 바뀐 것을 의미합니다.

그래서 이 모드에서는 객체 안에서 일어나는 변화를 감지하지 않습니다. Date 객체의 일부 요소가 바뀐다던가, 배열에 항목이 추가된다던가, 객체의 프로퍼티값이 변경되는 것에는 반응하지 않습니다.

동작이 조금 이상해보이기도 하지만, 이 방식은 **실행속도를 빠르게 하기 위해 필요합니다. 왜냐하면 객체를 내부까지 모두 검사하는 것보다 참조하는 객체가 바뀌었는지만 검사하는 것이 당연히 빠르기 때문입니다.** 그래서 파이프를 실행하거나 뷰를 업데이트해야 할지 Angular가 판단할 때는 이 방식으로 동작합니다.

기본 변화 감지 정책으로도 원하는 변화를 감지할 수 있다면 순수한 파이프를 사용하는 것으로 충분합니다. 하지만 순수하지 않은 파이프를 사용해야만 하는 경우도 있습니다.


# 순수하지 않은 파이프
순수하지 않은 파이프를 사용하면 컴포넌트의 변화 감지 싸이클마다 파이프 로직을 다시 실행합니다. 어쩌면 키 입력이 있을때마다, 마우스가 움직일 때마다 파이프 로직이 계속 실행될 수도 있습니다.

그렇기 때문에 순수하지 않은 파이프는 조심해서 사용해야 합니다. 파이프 로직을 실행하는 시간이 오래 걸리면 사용자가 체감하는 앱 성능이 저하될 수 있습니다.
```js
 addHero(name: string) {
    name = name.trim();
    if (!name) { return; }
    let hero = {name, canFly: this.canFly};
    if (this.mutate) {
    // Pure pipe won't update display because heroes array reference is unchanged
    // Impure pipe will display
    this.heroes.push(hero);
    } else {
      // Pipe updates display because heroes array is a new object
      this.heroes = this.heroes.concat(hero);
    }
  }
```


Angular 팀과 Angular를 많이 다뤄본 개발자들은 배열을 필터링하거나 정렬하는 로직을 컴포넌트와 분리하도록 권장합니다. 꼭 필요하다면 컴포넌트에 filteredHeroes나 sortedHeroes 프로퍼티를 선언하고, 컴포넌트 클래스에 동작 로직을 구현하는 것도 고려해볼만 합니다. 이 방법을 사용하면 배열 필터링과 정렬 로직이 언제 어떻게 실행될지 개발자가 제어할 수 있습니다. 배열을 필터링하거나 정렬하는 로직을 서비스에 구현하고, 컴포넌트는 이 서비스를 주입받아 사용하는 방법도 있습니다.
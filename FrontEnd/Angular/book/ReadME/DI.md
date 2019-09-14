# 의존성 주입

앵귤러 애플리케이션은 컴포넌트와 디렉티브, 클래스를 조합해서 구성하며, 이중 서로 연관된 객체가 있을 수도 있다. 이때 컴포넌트 코드에서는 의존 관계에 있는 객체의 인스턴스를 명시적을 생성해서 사용할 수도 있지만, DI가 더 효율적.


## 의존성 주입 패턴
```js
const product = new Product();
createShipment(product);
```
createShipment() 함수는 Product객체를 인자로 받아야 하므로  createShipment() Product 객체와 의존성을 갖는다고 할 수 있다. 하지만 이 함수는 Product 객체를 생성하는 방법을 알지 못하기 때문에, Product 객체의 인스턴스는 함수 밖 어딘가에서 생성해서 이 함수에 전달해줘야 한다.

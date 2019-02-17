#스프링 프레임워크 실행과정
1. 스프링 프레임 워크 실행
2. 스프링이 사용하는 메모리 영역을 만듬 (Context)
3. 스프링이 자신이 객체를 생성하고 관리해야 하는 객체들에 대한 설정 (RootConfig.java)
4. @ComponentScan을 통해 패키지를 스캔.
5. @Component라는 어노테이션이 존재하는 클래스의 인스턴스를 생성
6. @Autowired라는 설정이 있으면 해당 객체의 레퍼런스를 @Autowired 어노테이션이 달려있는 객체에 주입

#JUnit 사용방법.
test패키지에서 해당 테스트 파일을 만듬.

테스트 할 자바파일 위에 
```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes= {RootConfig.class})
@Log4j
```
를 달아둠.

@ContextConfiguration은 자동으로 만들어줄 애플리케이션의 컨텍스트의 설정파일 위치를 지정해준다. classes 속성으로 @Configuration이 적용된 클래스를 지정 해줄 수도 있다.



```java
assertNotNull(restaurant); //restaurant의 변수가 null이 아니어야만 테스트가 성공한다
		
		log.info(restaurant); 
		log.info("---------------");
		log.info(restaurant.getChef());
```


## 테스트 주목할 점
new Restaurant()와 같이 Restaurant 클래스에서 객체를 생성한 적이 없는데도 객체가 만들어 졌다 
=>
스프링은 관리가 필요한 객체(Bean)를 어노테이션을 이용해서 객체를 생성하고 관리하는 일종의 컨테이너, 팩토리의 기능을 갖고있다.

## @Setter
### value
접근 제한 속성을 의미

###onMethod
setter메서드 생성시 메서드에 추가할 어노테이션을 지정.

###onParam
setter메서드의 파라미터에 어노테이션을 사용하는 경우.

##@Log4j
log.info()메서드를 이용해서 로그를 찍을 수 있다.

@Log와 같다.
클래스쪽에 붙여주면 내부적으로 static final로 Logger 객체가 생성.

# 묵시적 생성자 주입
4.3이후에는 @Autowired이 없어도 생성자 주입이 된다.

@AllArgsConstructor는 변수로 선언된 모든것을 파라미터로 받는 생성자를 작성한다.
@RequiredArgsConstructor는 @NonNull이다 final이 붙은 인스턴스 변수에 대한 생성자를 생성

#@Component와 @Bean의 차이

@Component는 클래스 상단에 적으며 그 default로 **클래스 이름이 bean**의 이름이 된다. 또한 spring에서 자동으로 찾고 관리해주는 bean이다.

@Bean은 @Configuration으로 선언된 클래스 내에 있는 메소드를 정의할 때 사용한다. **이 메소드가 반환하는 객체**가 bean이 되며 default로 **메소드 이름이 bean**의 이름이 된다.

# SQLSessionFactory

SQLSessionFactory는 내부적으로 SQLSession이라는 것을 만들어 낸다.
SQL을 통해서 Connection을 생성하거나 원하는 SQL을 전달하고, 결과를 리턴받는 구조


timeMapper.getClass().getName()은 실제 동작하는 클래스의 이름을 확인해준다.

# log4jdbc-log4j2 
MyBatis는 내부적으로 PreparedStatement를 이용해서 SQL을 처리한다.
복잡한 SQL의 경우 ?로 나오는 값이 제대로 되었는지 확인하기가 쉽지 않고, 실행된 SQL의 내용을 정확히 확인하기 어렵다.
이를 해결하기 위해 **log4jdbc-log4j2** 라이브러리를 사용한다.
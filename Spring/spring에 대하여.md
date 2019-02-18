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

# 프로젝트의 로딩구조

프로젝트 구동시 관여하는 XML은 web.xml, root-context.xml, servlet-context.xml.
이 파일중 web.xml은 Tomcat과 관련된 설정이고, 나머지 두 파일은 스프링과 과련된 설정입니다.
프로젝트의 구동은 web.xml에서 시작한다. web.xml 상단에는 가장 먼저 구동되는 Context Listener가 등록되어 있다.
root-context.xml이 처리되면 파일에 있는 빈(Bean)설정들이 동작한다. 그 후에 서블릿과 관련된 설정이 동작한다.

# log4j 에러...
1.2.15를 1.2.17로 바꾸고 log4j에 <exclusions>로 추가된 부분을 모두 주석처리(혹은 제거)해주면 됨.

# @Controller
Controller를 작성할때 가장 편리한 기능은 파라미터가 자동으로 수집되는 기능.
이 기능을 이용하면 매번 request.getParameter()를 이용하는 불편함을 없앨 수 있다.
Controller가 파라미터를 수집하는 방식은 파라미터 타입에 따라 자동으로 변환하는 방식을 이용한다.
예를 들어, **int 타입으로 선언된 age가 자동으로 숫자로 변환되는 것**을 확인 할 수 있다.

# @RequestParam

@RequestParam은 파라미터로 사용된 **변수의 이름과 전달되는 파라미터의 이름이 다른 경우**에 유용하게 사용된다.
동일한 이름의 파라미터가 전달되는 경우에 @RequestParam("e") ArrayList<String> d 등으로 처리 가능하다

# @InitBinder
파라미터의 수집을 다른 용어로 binding이라고 한다.
변환이 가능한 데이터는 자동으로 변환되지만, 파라미터를 변환해서 처리해야하는 경우도 존재한다.
2019-01-01 과 같이 문자열로 전달된 데이터를 java.util.Date 타입으로 변환하는 작업이 그러하다.
스프링 Controller에서는 파라미터를 바인딩할 때 자동으로 호출되는 @InitBinder를 이용해서 이러한 변환을 처리할 수 있다.

ex)
DTO.java
```java
private Date dueDate;
```

Controller.java
```java
@InitBinder
public void initBinder(WebDataBinder binder){
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    binder.registerCustomEditor(java.util.Date.class, new customDateEditor(dateFormat, false));
}

...생략....
@GetMapping("/ex03")
public void ex03(Dto dto){
    log.info("dto" + dto)
}
```

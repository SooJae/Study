IOC(Inversion of  Control)컨테이너는 POJO(Plain Old Java Object)를 구성하고 관리합니다. 스프링 프레임워크의 가장 중요한 의의가 이 **POJO로 자바 애플리케이션을 개발**하는 것이므로 스프링의 주요기능은 대부분 IoC 컨테이너 안에서 POJO를 구성 및 관리하는 일과 연관돼 있습니다.

클래스에 붙은 @Configuration은 이 클래스가 구성클래스임을 스프링에 알립니다.
스프링은 @Configuration이 달린 클래스를 보면 일단 그 안에서 빈 인스턴스의 정의부, 즉 @Bean을 붙인(빈 인스턴스를 생성해 반환하는) 자바메서드를 찾습니다.
구성 클래스의 메서드에 @Bean을 붙이면 그 메서드와 동일한 이름의 빈이 생성됩니다. 따로 명시하려면 @Bean(name="soojae")를 이용해 soojae라는 이름의 빈을 만듭니다.

애너테이션을 붙인 자바클래스를 스캐닝 하려면 IOC컨테이너를 인스턴스화 해야합니다. 스프링은 기본 구현체인 **빈 팩토리**와 이와 호환되는 고급 구현체인 **애플리케이션 컨텍스트**, 두가지 IOC컨테이너를 제공합니다. 
애플리케이션 컨텍스트는 빈팩토리보다 발전된 기능을 가지고 있습니다(스프링을 애플릿이나 모바일 기기에서 실행하는 등) 그러므로 가급적 애플리케이션 컨텍스트를 사용하는 것이 좋습니다.
BeanFactory와 ApplicationContext는 각각 **빈 팩토리와 애플리케이션 컨텍스트에 접근**하는 인터페이스입니다. ApplicationContext는 BeanFactory의 하위 인터페이스이므로 호환성이 보장됩니다.

ApplicationContext는 인터페이스이므로 구현체가 필요합니다. 가장 최근 작품이면서 유연한 AnnotationConfigApplicationContext를 권장합니다.
```java
ApplicationContext context = new AnnotationConfigApplicationContext(~~~Configuration.class)
```

애플리케이션 컨텍스트를 인스턴스화한 이후에 객체 레퍼런스는 POJO인스턴스 또는 빈에 액세스하는 창구 노릇을 합니다.

## IoC컨테이너에서 POJO 인스턴스/빈 가져오기
빈 팩토리 또는 애플리케이션 컨텍스트에서 가져오려면 getBean() 메서드의 인수로 호출합니다.
```java
SequenceGenerator generator = (SequenceGenerator) context.getBean("sequenceGenerator");
```
캐스팅을 안하려면 getBean() 메서드의 두번째 인수에 빈 클래스명을 지정합니다.
```java
SequenceGenerator generator = context.getBean("sequenceGenerator",SequenceGenerator.class);
```
빈이 하나면 생략도 가능합니다.
```java
SequenceGenerator generator = context.getBean(SequenceGenerator.class)
```

@Componenet는 스프링이 발견할 수 있게 POJO에 붙이는 범용 애너테이션입니다. 스프링에는 persistence, service, presentation, layer가 있는데, @Repository, @Service, @Controller는 각각 세 레이어를 가리키는 애너테이션입니다.


# ResponseEntity 타입
REST방식으로 호출하는 경우는 화면 자체가 아니라 **데이터 자체**를 전송하는 방식으로 처리되기 때문에 **데이터를 요청한 쪽**에서는 **정상적인 데이터인지 비정상적인 데이터인지를 구분할 수 있는 확실한 방법을 제공**해야 합니다.
ResponseEntity는 **데이터와 함께 HTTP 헤더의 상태 메시지 등을 같이 전달하는 용도로 사용**합니다. **HTTP의 상태 코드와 에러메시지** 등을 함께 전달할 수 있기 때문에 받는 입장에서는 확실하게 결과를 알 수 있습니다.
```java
ResponseEntity<Sample> result =null;

if(){
    result = ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(vo);
} else{
    result = ResponseEntity.status(HttpStatus.OK).body(vo);
}
    return result;
```

## @RequestBody
**JSON 데이터**를 원하는 **타입의 객체로 변환**해야 하는 경우에 주로 사용
내부적으로 HttpMessageConverter 객체들을 이용해서 다양한 포맷의 입력 데이터를 변환할 수 있다.
대부분의 경우에는 **JSON 데이터를 서버에 보내서 원하는 타입의 객체로 변환하는 용도**로 사용되지만, 
경우에 따라서는 원하는 포맷의 데이터를 보내고, 이를 **해석해서 원하는 타입으로 사용**된다.

```java
public interface StudyMapper {

	public List<StudyVO> getListWithPaging(@Param("scri") StudyCriteria scri) ;


	public int getTotal();

}
```

@Param("scri")를 사용하면 mybatis에서  LIMIT #{scri.pageStart}, #{scri.perPageNum} 로 사용이 가능하다.
@Param("scri")를 사용하지 않으면 자동으로 맵핑되어 LIMIT #{pageStart}, #{perPageNum} 로 사용 할 수있다. 이때 #{scri.pageStart}, #{scri.perPageNum}를 하면 오히려 에러가 발생한다.
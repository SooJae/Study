# ApplicationContext
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="bookService"
          class="me.jerry.applicationcontext.BookService">
        <property name="bookRepository" ref="bookRepository"/>
    </bean>

    <bean id="bookRepository"
          class="me.jerry.applicationcontext.BookRepository"/>
</beans>
```

이렇게 일일이 빈을 등록하기 번거롭다. 
해당 패키지 이하에 있는 컴포넌트를 모두 스캔 해주는 컴포넌트 스캔을 만들자

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="me.jerry.applicationcontext"/>
</beans>
```
이렇게 한 후, @Component 어노테이션을 달아준다. 

하지만 xml이 불편하다... 자바 설정 파일로 만들어 보자.

```java
@Configuration
public class ApplicationConfig {
  @Bean
  public BookRepository bookRepository(){
    return new BookRepository();
  }

  @Bean
  public BookService bookService(BookRepository bookRepository){
    BookService bookService = new BookService();
    bookService.setBookRepository(bookRepository());
    return bookService;
  }
}
```
일일이 빈으로 등록하는것도 힘들다...
컴포넌트 스캔을 사용해보자

```java

@Configuration
@ComponentScan(basePackageClasses = ApplicationContextApplication.class)
public class ApplicationConfig {

}
```
basePackageClasses과 basePackages의 차이점:
basePackages는 패키지명을 넣어줘야 하기 때문에 타입 safe하지 않다. 
basePackageClasses는 적어준 **클래스** 이하의 패키지를 컴포넌트 스캔한다.
더 타입 safe하다.

이것조차 @SpringBootApplication으로 컴포넌트 스캔을 따로 만들지 않아도 된다.

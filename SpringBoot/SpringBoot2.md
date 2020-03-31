#WebMvc

spring-boot-autoconfigure/spring.factories를 보면
WebMvcAutoConfiguration이 있는것을 확인 할수 있는데, 이 친구가 스프링MVC를 따로 설정해주지 않아도 사용하게 해준다.
  
그 외에 설정을 추가하고 싶으면
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
}
```
와 같이 만들면 된다.

주의! : @EnableWebMvc는 추가하면 안된다. 추가하는 순간 스프링부트가 지원해주는 기본적인 설정이 적용되지 않는다.
 
# HttpMessageConverters
HTTP 요청 본문을 객체로 변경하거나, 객체를 HTTP 응답 본문으로 변경할 때 사용 {“username”:”keesun”, “password”:”123”} <-> User
@RequestBody
@ResponseBody

컨트롤러가 @RestController일때
@ResponseBody는 생략이 가능하다
@RestController = @Controller + @ResponseBody 
```java
public @ResponseBody User create(@RequestBody User user) => public User create(@RequestBody User user)
```

APPLICATION_JSON_UTF8이 Deprecated됐다.
스프링 5.2 부터는 UTF-8 이 기본 Charset
스프링 부트 2.2.0 업그레이드 후 응답 Content-Type 에서 Charset가 빠졌다.
참고자료 : http://honeymon.io/tech/2019/10/23/spring-deprecated-media-type.html


```java
  @Test
  public void createUser_JSON(){
    String userJson = "";
    mockMvc.perform(post("/users/create")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON) // 난 JSON으로 받는것을 원한다.
            .content(userJson))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.username", is(equalTo("soojae")))) //is와 equalTo 모두 Matchers에 있는것들로 import해야한다.
           .andExpect(jsonPath("$.password", is(equalTo("1234"))))
  } // Json본문에 username이 soojae인지
```

# 뷰 리졸버
들어오는 요청의 accept헤더에 따라 응답이 달라진다.
accept헤더는 브라우저나 클라이언트가 어떠한 타입의 응답을 원한다고 서버에게 알려주는것.
그래서 accept헤더에 따라 응답이 달라질 수 있다.
accept헤더에 없는 것들이 있을때는
format이라는 파라미터를 이용할수도 있다. (예 : "/path?format=pdf")

# 정적 리소스
정적 리소스 맵핑 “ /**”
기본 리소스 위치
classpath:/static
classpath:/public
classpath:/resources/
classpath:/META-INF/resources
예) “/hello.html” => /static/hello.html
spring.mvc.static-path-pattern: 맵핑 설정 변경 가능
spring.mvc.static-locations: 리소스 찾을 위치 변경 가능
Last-Modified 헤더를 보고 304 응답을 보냄. (처음은 200이지만 변화없이 리프레시 하면 304응답)
ResourceHttpRequestHandler가 처리함.
WebMvcConfigurer의 addRersourceHandlers로 커스터마이징 할 수 있음


resources/static에 hello.html파일을 추가한 뒤,
http://localhost:8080/hello.html에 들어가보면 hello.html의 내용이 나온다.
hello.html의 내용을 바꾼후, 재 빌드 (커맨드 + f9)를 하면 바껴있다.

application.properties에서 
spring.mvc.static-path-pattern=/abcd/**
로 하면
localhost:8080/abcd/hello.html 로 찾아야 찾아진다.
그리고 spring.mvc.static-locations로 리소스를 찾을 위치를 변경할 수 있는데 차라리 WebConfig에서 수정하는 것이 더 좋다.
```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
registry.addResourceHandler("/m/**")
        .addResourceLocations("classpath:/m/") // 모바일로 봤을시에 처리해줄 수 있다.
        .setCachePeriod(20); // 캐싱 전략
}
```

# 웹JAR
자바 라이브러리 - Jquery나 부트스트랩 심지어 프론트 프레임워크도 웹 JAR파일로 있다.
mvnrepository에서 찾아서 pom.xml에 추가해주면 된다.

# Index페이지, 파비콘
기본 리소스 위치
classpath:/static
classpath:/public
classpath:/resources/
classpath:/META-INF/resources
4개중 아무 곳이나 index.html을 두면 홈파일로 사용한다.

파비콘 주소 : https://favicon.io/
파비콘도 위의 리소스에 놓자
파비콘이 안 바뀔때? https://stackoverflow.com/questions/2208933/how-do-i-force-a-favicon-refresh


# 템플릿 엔진
스프링 부트가 자동 설정을 지원하는 템플릿 엔진
FreeMarker
Groovy
Thymeleaf
Mustache

## JSP를 권장하지 않는 이유
JAR 패키징 할 때는 동작하지 않고, WAR 패키징 해야 함.
Undertow는 JSP를 지원하지 않음.
https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-jsp-limitations
Thymeleaf 사용하기
https://www.thymeleaf.org/
https://www.thymeleaf.org/doc/articles/standarddialect5minutes.html
의존성 추가: spring-boot-starter-thymeleaf
템플릿 파일 위치: /src/main/resources/template/
예제: https://github.com/thymeleaf/thymeleafexamples-stsm/blob/3.0-master/src/main/webapp/WEB-INF/templates/seedstartermng.html



# ExceptionHandler

html 요청한 응답일 경우 html로 반환, 그렇지 않을 경우 JSON으로 반환 
```java
@RequestMapping(
    produces = {"text/html"}
  )
  public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
    HttpStatus status = this.getStatus(request);
    Map<String, Object> model = Collections.unmodifiableMap(this.getErrorAttributes(request, this.isIncludeStackTrace(request, MediaType.TEXT_HTML)));
    response.setStatus(status.value());
    ModelAndView modelAndView = this.resolveErrorView(request, response, status, model);
    return modelAndView != null ? modelAndView : new ModelAndView("error", model);
  }

  @RequestMapping
  public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
    HttpStatus status = this.getStatus(request);
    if (status == HttpStatus.NO_CONTENT) {
      return new ResponseEntity(status);
    } else {
      Map<String, Object> body = this.getErrorAttributes(request, this.isIncludeStackTrace(request, MediaType.ALL));
      return new ResponseEntity(body, status);
    }
  }
```


스프링 @MVC 예외 처리 방법
@ControllerAdvice
@ExceptionHandler
스프링 부트가 제공하는 기본 예외 처리기
BasicErrorController
HTML과 JSON 응답 지원
커스터마이징 방법
ErrorController 구현
커스텀 에러 페이지
상태 코드 값에 따라 에러 페이지 보여주기
src/main/resources/static|template/error/
404.html
5xx.html
ErrorViewResolver 구현

```java
@RequestMapping({"${server.error.path:${error.path:/error}}"})
// 프로퍼티에 server.error.path가 정의 되어있으면 그 값을 사용하고 없으면 error.path값을 사용하고 없으면 error를 사용한다.
```
BasicErrorController를 상속받아 사용하는 것도 좋다.


ErrorViewResolver를 이용해서 동적으로 에러페이지를 생성할 수 있다.


Hypermedia As The Engine Of Application State
서버: 현재 리소스와 연관된 링크 정보를 클라이언트에게 제공한다.
클라이언트: 연관된 링크 정보를 바탕으로 리소스에 접근한다.
연관된 링크 정보
Relation
Hypertext Reference)
spring-boot-starter-hateoas 의존성 추가
https://spring.io/understanding/HATEOAS
https://spring.io/guides/gs/rest-hateoas/
https://docs.spring.io/spring-hateoas/docs/current/reference/html/
ObjectMapper 제공
spring.jackson.*
Jackson2ObjectMapperBuilder
LinkDiscovers 제공
클라이언트 쪽에서 링크 정보를 Rel 이름으로 찾을때 사용할 수 있는 XPath 확장 클래스



heteos를 사용하는이유?

요청 URI가 변경되더라도 클라이언트에서 동적으로 생성된 URI를 사용함으로써, 클라이언트가 URI 수정에 따른 코드를 변경하지 않아도 되는 편리함을 제공합니다.
하지만 api를 사용하는 클라이언트는 해당 uri 로 결국 한번의 요청은 해야지만 link정보를 가져오게



Resource -> EntityModel 로 변경되었습니다.
현재 스프링 부트 공식 페이지 보고 알았네요.

따라하시는 분들, 아마 Resource 임포트 안되실 겁니다.

강의 이후에 공식 클래스 이름이 바뀌었나보네요.

도큐먼트에 다음과 같이 나와있습니다. 참고하세요.

ResourceSupport is now RepresentationModel

Resource is now EntityModel

Resources is now CollectionModel

PagedResources is now PagedModel

마찬가지로 linkTo 임포트 안되시는 분들은 임포트 부분을 다음으로 바꿔보세요 ㅎㅎ


```java
@GetMapping("/hello")
public EntityModel<Hello> hello(){
Hello hello = new Hello();
hello.setPrefix("Hey,");
hello.setName("Soojae");

EntityModel<Hello> helloEntity = new EntityModel<>(hello);
helloEntity.add(linkTo(methodOn(SampleController.class).hello()).withSelfRel());

return helloEntity;
```


결과값   Body = {"prefix":"Hey,","name":"Soojae","_links":{"self":{"href":"http://localhost/hello"}}} 으로 self 링크가 들어간다.


# CORS
SOP과 CORS
Single-Origin Policy
Cross-Origin Resource Sharing
Origin?
URI 스키마 (http, https)
hostname (whiteship.me, localhost)
포트 (8080, 18080)
스프링 MVC @CrossOrigin
https://docs.spring.io/spring/docs/5.0.7.RELEASE/spring-framework-reference/web.html#mvc-cors
@Controller나 @RequestMapping에 추가하거나
WebMvcConfigurer 사용해서 글로벌 설정


어플리케이션 버튼으로 실행해도 되고,
$ mvn package 후
$ java -jar target/spring-boot-1.0-SNAPSHOT.jar
로 실행해도 된다.

@SpringBootApplication 어노테이션이 있는 스프링 실행 어플리케이션의 위치는(메인 어플리케이션 클래스)
가장 최상위에 위치시키는게 좋다.

@SpringBootApplication 가 컴포넌트 스캔을 하는데, 이 패키지부터 시작을 한다. 
그리고 그 패키지의 이하의 빈으로 등록할 수 있는것들은 모두 빈에 등록한다.
만약 루트에 위치시키면, 모든 패키지를 전부 스캔하겠다는 뜻이라 좋지 않다.
또, @SpringBootApplication 어노테이션이 있는 실행 어플리케이션 이하 패키지에 두어야한다. 
다른 패키지에 두면 컴포넌트 스캔을 하지 못한다.

스프링 부트는 아래와 같이 버전이 없는데 어떻게 의존성을 잘 관리가 되는 것일까?
```xml
<dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
```

spring-boot-starter-parent 를 눌러 올라가보자
그럼 spring-boot-dependencies가 보인다. 다시한번 눌러보자.
그럼 spring-boot-dependencies가 보이는데 이게 최상위이다.
dependencyManagement 태그가 보이는데 
```xml
<dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot</artifactId>
        <version>2.2.6.RELEASE</version>
      </dependency>
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-test</artifactId>
        <version>2.2.6.RELEASE</version>
      </dependency>
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-test-autoconfigure</artifactId>
        <version>2.2.6.RELEASE</version>
      </dependency>
      <dependency>
      ...
```
등 의존성이 정의 되어있다.

버전이 없는 의존성옆에 아이콘을 누르면 어떤것을 불러올지 확인 할 수있다.

스프링 부트가 나오면서 의존성에 대한 문제들이 사라졌다.(기본적으로 의존성을 잘 다듬어서 갖고온다.) 원래 스프링을 사용할땐, 의존성 충돌이 많이났었다.

parent를 사용하지 않아도 된다. 우리만의 상속구조가 있다고 했을때,
1. 우리만의 프로젝트의 parent에 starter-parent를 상속받으면 된다. (parent의 parent에)
2. 또는 dependencyManagement 엘리먼트안에 spring-boot-dependencies를 직접 넣으면 된다. 
하지만,  플러그, resource 필터링 설정등, parent에 포함되어 있기때문에, parent를 받지않는 2번방법은 추천하지 않는다.
https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-dependency-management


## 스프링 버전 일괄적으로 바꾸기
```xml
<properties>
    <spring.version>5.0.6.RELEASE</spring.version>
</properties>
```

다른것을 바꾸고 싶을때도 parent에 들어가서 해당 키워드를 찾고
properties안에 추가하면 된다.


# @SpringBootApplication 애너테이션
에 들어가면
@EnableAutoConfiguration을 찾아볼 수 있다.
```java
@SpringBootApplication
= 
@SpringBootConfiguration
@ComponentScan // 1단계. 빈 등록
@EnableAutoConfiguration // 2단계. 추가적인 빈 등록(이 단계가 없어도 사용할 수 있다.)
```

@EnableAutoConfiguration 없이 사용해보기
```java
@SpringBootConfiguration
@ComponentScan // 빈 등록
public class SpringInitApplication {

  public static void main(String[] args) {
    SpringApplication application = new SpringApplication(SpringInitApplication.class);
    application.setWebApplicationType(WebApplicationType.NONE);
    application.run(args);
  }
}
```
컴포넌트 스캔은 컴포넌트라는 애너테이션을 가진 컴포넌트를 스캔(하위 패키지까지)해서 빈으로 등록한다.


spring.factories안에 자동설정들이 들어있다.

WebMvcAutConfiguration 클래스에는
@ConditionalOnXxxYyyZzz같이 조건에 맞게 빈을 등록할지 안할지를 결정해주는 어노테이션이 있다.
@ConditionalOnWebApplicatoin(Type = Type.SERVLET) 타입이 서블릿일 경우.


```java
@Component
public class HolomanRunner implements ApplicationRunner {

  @Autowired
  Holoman holoman;

  @Override
  public void run(ApplicationArguments args) throws Exception {
  }
}
```
스프링 부트 어플리케이션이 만들어지고 띄었을때 자동으로 실행되는 빈을 만들고 싶을때 ApplicationRunner 인터페이스를 상속
빈을 따로 등록하지 않았는데 Holoman을 갖다 쓸 수 있다.

sysout => sout

## @ConditionalOnMissingBean
빈이 Override되도록 만들어주는 어노테이션이다.

일일히 빈을 만들어서 설정하기도 싫다! 변수만 바꾸고 싶을 뿐이다.하면

1. 빈이 있는 프로젝트에서 @ConfigurationProperties("holoman") 어노테이션을 달아준다.
2. pom.xml에서 아래 추가 (프로퍼티값 자동 완성)
```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-configuration-processor</artifactId>
   <optional>true</optional>
</dependency>
```

3.

```java
@Configuration
@EnableConfigurationProperties(HolomanProperties.class)
public class HolomanConfiguration {

  @Bean
  @ConditionalOnMissingBean
  public Holoman holoman(HolomanProperties properties){
    Holoman holoman = new Holoman();
    holoman.setHowLong(properties.getHowLong());
    holoman.setName(properties.getName());
    return holoman;

  }
}
```

2. 실행할 프로젝트에서 properties에서 바꾼다.

## 내장 톰캣
스프링 부트는 서버가 아니다. 
```java
SpringApplication app = new SpringAPplication(Applicaiton.class)
app.setWebApplicationType(WebApplicationType.NONE);
```
톰캣 객체 생성
포트 설정
톰캣에 컨텍스트 추가
서블릿 만들기
톰캣에 서블릿 추가
컨텍스트에 서블릿 맵핑
톰캣 실행 및 대기
이 모든 과정을 보다 상세히 또 유연하고 설정하고 실행해주는게 바로 스프링 부트의 자동 설정.
ServletWebServerFactoryAutoConfiguration (서블릿 웹 서버 생성)
TomcatServletWebServerFactoryCustomizer (서버 커스터마이징)
DispatcherServletAutoConfiguration
서블릿 만들고 등록


# HTTPS 
$ keytool -genkey -alias tomcat -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore keystore.p12 -validity 4000

$ curl -I -k https://localhost:8080/hello

Https를 이용하면 더이상 http를 사용할 수 없다. (추가 커넥터 설정 필요)
참고 : https://opentutorials.org/course/228/4894

# HTTP2
undertow는 따로 설정할 필요 X
$ curl -I -k --http2 https://localhost:8443/hello


```java
// 스프링 커스텀
/**
 * 기존 것을 그대로 사용하면 커스터마이즈 하기 힘들다.
 */
//  public static void main(String[] args) {
//    SpringApplication.run(SpringbootCustomizeApplication.class, args);
//  }
/**
 * 이렇게 바꿔보자
 */
  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(SpringbootCustomizeApplication.class);
    app.run(args);
  }
```
### Debug
Run/Debug Configuration 클릭
VM options에 -Ddebug 입력

## 기본 배너 변경
https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-spring-application


# EventListener
```java
@Component
public class SampleListener implements ApplicationListener<ApplicationStartingEvent> {

  @Override
  public void onApplicationEvent(ApplicationStartingEvent applicationStartingEvent) {
    System.out.println("=======================");
    System.out.println("Application is starting");
    System.out.println("=======================");
  }
}
```

애플리케이션 컨텍스트 만들어진 이후에 발생한 이벤트들은 빈을 실행할 수 있는데,
애플리케이션 컨텍스트 이전에 만들어진 이벤트는(ApplicationStartingEvent) 애플리케이션을 실행해도 리스너가 동작하지 않는다.
그럴 경우 main에 등록을 해줘야한다.
```java
public static void main(String[] args) {
    new SpringApplicationBuilder()
            .sources(SpringbootCustomizeApplication.class)
            .listeners(new SampleListener()) 
            .run(args);
}
```
등록을 했으니 빈 애너테이션은 없애도 된다.

2번째
ApplicationStartingEvent => ApplicationStartedEvent로 변경
애플리케이션 컨텍스트 이후에 만들어진 이벤트이므로 가능하다. 
실행의 거의 마지막쯤 뜨는걸 알 수 있다.

# 프로퍼티 우선 순위
유저 홈 디렉토리에 있는 spring-boot-dev-tools.properties
테스트에 있는 @TestPropertySource
@SpringBootTest 애노테이션의 properties 애트리뷰트
커맨드 라인 아규먼트
SPRING_APPLICATION_JSON (환경 변수 또는 시스템 프로티) 에 들어있는 프로퍼티
ServletConfig 파라미터
ServletContext 파라미터
java:comp/env JNDI 애트리뷰트
System.getProperties() 자바 시스템 프로퍼티
OS 환경 변수
RandomValuePropertySource
JAR 밖에 있는 특정 프로파일용 application properties
JAR 안에 있는 특정 프로파일용 application properties
JAR 밖에 있는 application properties
JAR 안에 있는 application properties
@PropertySource
기본 프로퍼티 (SpringApplication.setDefaultProperties)
application.properties 우선 순위 (높은게 낮은걸 덮어 씁니다.)
file:./config/
file:./
classpath:/config/
classpath:/
랜덤값 설정하기
${random.*}
플레이스 홀더
name = keesun
fullName = ${name} baik



## application을 Main과 Test에 각각 생성하기 귀찮을때
@TestPropertySource(locations = "classpath:/test.properties")
이제 test.properties에는 override할 프로퍼티만 작성해주면 된다.

## 필드 인젝션을 사용하면 안되는 이유
https://yaboong.github.io/spring/2019/08/29/why-field-injection-is-bad/
## 필드 주입 방식보다 생성자 주입방식이 좋은 이유
https://velog.io/@aidenshin/%ED%95%84%EB%93%9C%EC%A3%BC%EC%9E%85-%EC%83%9D%EC%84%B1%EC%9E%90-%EC%A3%BC%EC%9E%85%EB%B0%A9%EC%8B%9D%EC%9C%BC%EB%A1%9C-%EB%B3%80%EA%B2%BD

# 프로파일
application.properties
application-prod.properties
application-test.properties
application-proddb.properties

자바를 실행할때 --spring.profiles.active=prod를 붙여주면, prod가 application 파일을 오버라이딩 한다.
application-prod.properties파일 안에
spring.profiles.include=proddb 를 작성해주면, application-prod.properties 파일을 불러올때 proddb 파일을 불러와 오버라이딩이 된다.
불러올때 @Profile("prod") 같이 어노테이션이 있는 컴포넌트가 있어야 한다.


# 로거
## SLF4j
로깅 퍼사드의 장점 = 퍼사드는 로거 API들을 추상화 해놓은 것인데, 퍼사드를 이용하면 로거 API를 바꿔 낄수 있다.
Commons Logging =보냄=> SLF4j =보냄=> Logback
결국 Logback의 로그가 찍히는 것이다.

# 테스트
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
테스트는 서버를 띄우진 않는다. 서블릿 컨테이너를 테스트 용으로 띄우진 않고, 목업을 해서 서블릿을 목킹을 한것을 띄운다.
디스패처 서블릿이 만들어 지지만, 목업에서 디스패처 서블릿에 요청을 보내는 것 같이 실험은 할 수있다.
하지만 목업이 된 서블릿에 interaction을 하려면 MockMvc라는 클라이언트를 사용해야 한다.
```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
class SpringbootTestApplicationTests {

@Autowired
Mockmvc mockMvc;
...
}
```
이렇게 만들면 된다.
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)를
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)로 바꾸면, 실제로 서블릿 컨테이너가 뜬다. (내장 톰캣)
이때부터는 테스트용 RestTemplate 테스트용 클라이언트를 사용해야 한다.

```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SampleControllerTest {
  @Autowired
  TestRestTemplate testRestTemplate;

  @Test
  public void hello() throws Exception {
    String result = testRestTemplate.getForObject("/hello", String.class); // String.class = body 타입
    assertThat(result).isEqualTo("hello soojae")
  }
}
```
MockMvc에서 TestRestTemplate으로 바뀐것을 확인할 수 있다.
이것은 내장톰캣을 사용해서 실제로 서버가 뜬다.

여기서 문제점은 나는 컨트롤러단만 테스트하고 싶은데 서비스 단까지 테스트가 실행 된다는 점이다.

그럴땐 다음을 추가해준다. 
```java
@MockBean
SampleService mockSampleService;
```
이렇게 해주면 샘플 서비스(원본)를 테스트용 mock샘플 서비스로 교체해준다.
```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SampleControllerTest {
  @Autowired
  TestRestTemplate testRestTemplate;

  @MockBean
  SampleService mockSampleService;

  @Test
  public void hello() throws Exception {
    when(mockSampleService.getName()).thenReturn("soojae22");

    String result = testRestTemplate.getForObject("/hello", String.class);
    assertThat(result).isEqualTo("hello soojae22");
  }
}
```

그냥 testRestTemplate로 계속 쓰는게 좋을듯?

### 비동기로 동작하게 하기
```java
@Autowired
WebTestClient webTestClient;
```
Spring 5.0에서 추가된 것.
실제로 api동작하는 것처럼 동작시킬 수 있다.
```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SampleControllerTest {

  @MockBean
  SampleService mockSampleService;

  @Autowired
  WebTestClient webTestClient;

  @Test
  public void hello() throws Exception {
    when(mockSampleService.getName()).thenReturn("soojae22");

    webTestClient.get().uri("/hello").exchange()
            .expectStatus().isOk()
            .expectBody(String.class).isEqualTo("hello soojae22")
  }
}
```
webClient가 제일 좋다! 작성하기도 편하고, 테스트도 편하다. RestApi 콜도 할 수 있고!


# 하나씩만 슬라이스해서 테스트하기
어플리케이션 전체를 테스트하기에는 무거우므로 해당 레이어 별로 잘라서 테스트 한다.
단 서비스나 레파지토리는 등록이 안되므로 수동으로 등록(MockBean을 이용)해서 사용해야한다.
```java

@WebMvcTest(SampleController.class)
public class WebMvcTestTest {

  @MockBean
  SampleService mockSampleService;

  @Autowired
  MockMvc mockMvc;

  @Test
  public void hello() throws Exception {
    when(mockSampleService.getName()).thenReturn("soojae2");

    mockMvc.perform(get("/hello"))
            .andExpect(content().string("hello soojae2"));

  }

}
```
참고 : https://goddaehee.tistory.com/212

### OutputCapture - Deprecated
JUnit에 들어있는 유틸 - 로그를 비롯해서 콘솔의 모든 것들을 찍을 수 있다.
특정 로그 메시지가 출력이 되는지 테스트 코드로 확인하고 싶을 때 유용하게 쓸 수 있다. 

# Spring boot devtools
캐시 설정을 개발 환경에 맞게 변경.
클래스패스에 있는 파일이 변경 될 때마다 자동으로 재시작.
직접 껐다 켜는거 (cold starts)보다 빠른다. 왜?
릴로딩 보다는 느리다. (JRebel 같은건 아님)
리스타트 하고 싶지 않은 리소스는? spring.devtools.restart.exclude
리스타트 기능 끄려면? spring.devtools.restart.enabled = false
라이브 릴로드? 리스타트 했을 때 브라우저 자동 리프레시 하는 기능
브라우저 플러그인 설치해야 함.
라이브 릴로드 서버 끄려면? spring.devtools.liveload.enabled = false
글로벌 설정
~/.spring-boot-devtools.properties
리모트 애플리케이션


1. 캐쉬가 있으면 내가 바꾼게 바로바로 바뀌지 않으니 브라우저에서 캐쉬를 삭제해줘야하는 번거로움이 있는데
이것을 사용하면 해결
2. 리스타트 기능 - 내가 코드를 바꾸면 바로 바뀐다. 내가 톰캣을 껐다 키는것보다 빠름
클래스로더를 2개 사용하기 때문(우리가 바꾸지 않는, 의존성을 불러들이는 베이스 클래스로더, 우리 어플리케이션을 불러들이는 리스타트 클래스로더)
참고 자료 : https://haviyj.tistory.com/11
 

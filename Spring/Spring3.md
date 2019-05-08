web.xml



#UriComponentsBuilder
UriComponentsBuilder는 여러개의 파라미터를 연결해서 URL형태로 만들어준다.
URL을 만들어주면, 리다이렉트를 하거나, form 태그를 사용하는 상황을 많이 줄여줄 수 있다.
주로 **JavaScript를 사용할 수 없는 상황**에서 링크를 처리할 때 사용.

```java
public String getListLink() {
    UriComponentsBuilder builder = UriComponentsBuilder.fromPath("")
            .queryParam("bname",this.bname)
            .queryParam("page", this.page)
            .queryParam("perPageNum", this.perPageNum)
            .queryParam("type", this.type)
            .queryParam("keyword", this.keyword);
    
    return builder.toUriString();
}
```

```java
rttr.addAttribute("bname",this.bname)
rttr.addAttribute("page", cri.getPage()); 
rttr.addAttribute("perPageNum", cri.getPerPageNum()); 
rttr.addAttribute("type", cri.getType());
rttr.addAttribute("keyword", cri.getKeyword());
를
cri.getListLink(); 한줄로 가능
```

# REST 방식 
하나의 URI는 하나의 고유한 리소스를 대표하도록 설계된다는 개념에 전송방식을 결합해서 원하는 작업을 지정한다.
`/boards/123`은 게시물중에 123번이라는 고유한 의미를 가지도록 설계하고, 이에대한 처리는 GET, POST방식과 같이 추가적인 정보를 통해서 결정한다.

## REST방식의 구성
```yaml 
URI + GET/POST/PUT/DELETE/...
```

REST란 Representational State Transfer 의 약자로 소프트웨어 프로그램 개발의 아키텍처의 한 형식입니다. Representational State Transfer- '대표적인 상태 전달' 이 단어만 듣고 REST가 무슨 뜻인지 알 수 있는 사람은 영어권에서도 없을 것이라고 생각이 되는데요, 저는 개인적으로 이 단어를 변형해서 '자원(resource)의 대표(representation)에 의한 상태 전달' 이라고 설명하려 합니다. 그럼 '자원의 대표'와 '상태 전달'이 무슨 뜻인지 알아봅시다.

자원의 대표
여기서 '자원'이란 뜻은 넓은 의미로 해당 소프트웨어가 관리하는 모든 것이 될 수 있습니다. 문서가 될 수도 있고 그림이 될 수도 있고 데이터가 될 수도 있고 심지어 해당 소프트웨어 자체가 될 수도 있습니다.  예를 들어 DB에 학생 명부가 저장되어 있다고 한다면 이 학생들의 정보가 자원이 됩니다. 그리고 '자원의 대표'의 의미는 그 자원을 대표하기 위한 이름을 뜻합니다. 학생데이터를 대표하기 위한 이름은 무엇이 좋을까요? 물론 학생(students:복수형을 사용합니다)입니다. 학생 전체 명부가 아니라 명부상의 한 학생에 대한 자원을 얻고자 한다면 대표이름과 한 학생을 특정할 수 있는 값(id 등) 이 사용됩니다.

상태 전달
데이터가 요청되어지는 시점에서 자원의 상태(정보)를 전달하는 것을 뜻합니다. 데이터를 요청하는 시점에 따라 데이터가 바뀔 수도 있기 때문에 '상태'라는 표현을 쓴 것이라 추측해 봅니다. 프로그램이 학생 명부 전체 리스트를 요청받으면 요청받은 시점의 '상태' 즉 데이터를 전달하게 됩니다. 또한 새로운 학생 명부 '상태'를 프로그램에 전달하여 해당 자원을 수정할 수도 있습니다.

이처럼 자원을 이름으로 구분하고 해당 자원의 상태를 주고 받는 모든 것이 REST라고 할 수 있지만, 일반적으로 REST라고 하면 좁은 의미로 HTTP를 통해 CRUD를 실행하는 API를 뜻합니다.

HTTP 프로토콜을 이용하기 때문에 URL(route)를 통해 자원을 특정짓고 HTTP Verbs를 통해 할일(CRUD)을 지정합니다. 또한 JSON 혹은 XML를 통해 데이터를 주고 받는 것이 일반적입니다.

위 정의에 더하여 REST를 정의하기 위한 조건들은 다음과 같습니다.

'클라이언트-서버' 구조: 자원(resource)이 있는 쪽이 서버가 되며, 요청을 하는 쪽이 해당 서버에 대한 클라이언트가 됩니다.
무상태(Stateless): '서버'는 각각의 요청을 완전히 별개의 것으로 인식하고 처리해야하며, 이전 요청이 다음 요청의 처리에 연관이 되어서는 안됩니다. 물론 이전 요청이 DB를 수정하여 다음 요청이 DB에 의해 바뀌는 것은 괜찮습니다.(10분간 3번 비밀번호를 틀려서 더이상 로그인할 수 없는 경우 등). 서버의 처리 방식에 일관성을 부여하고 서버의 부담을 줄이기 위한 것으로 보입니다.
캐시 처리 가능(Cacheable): 대량의 요청을 효율적으로 처리하기 위해 캐시가 요구됩니다.
계층화(Layered System)
Code on demand (optional)
인터페이스 일관성



스프링은 @RequestMapping 이나 @ResponseBody와 같이 REST 방식의 데이터 처리를 위한 여러종류의 어노테이션 기능이 있다.
@RestController : Controller가 REST방식을 처리하기 위한 것임을 암시
(스프링 4 전에는 @Controller + @ResponseBody를 썼어야함)
@ResponseBody : 일반적인 JSP와 같은 뷰로 전달되는게 아니라 **데이터 자체**를 전달
@PathVariable : URL 경로에 있는 **값을 파라미터로 추출**하려고 할때 사용
@RequestBody : **JSON 데이터를 원하는 타입**으로 바인딩 처리

|     | URL                      | HTTP전송방식     |
| --- | ------------------------ | ------------ |
| 등록  | /replies/new             | POST         |
| 조회  | /replies/:rno            | GET          |
| 삭제  | /replies/:rno            | DELETE       |
| 수정  | /replies/:rno            | PUT or PATCH |
| 페이지 | /replies/pages/:bno/page | GET          |


|     | URL                              | HTTP전송방식     |
| --- | -------------------------------- | ------------ |
| 등록  | /members/new                     | POST         |
| 조회  | /members/{id}                    | GET          |
| 삭제  | /members/{id}                    | DELETE       |
| 수정  | /members/{id} + body(json 데이터 등) | PUT or PATCH |
| 페이지 | /members/pages/:bno/page         | GET          |


@Param 어노테이션

MyBatis는 두 개 이상이 데이터를 파라미터로 전달하기 위해서는
1. 별도의 객체로 구성한다.
2. Map을 이용한다.
3. Param을 이용해서 이름을 사용한다.
   
가장 간단하게 사용하는 방식은 @Param을 이용하는 방식이다.
@Param의 속성 값은 MyBatis에서 SQL을 이용할 때 '#{}'의 이름으로 사용이 가능하다.

```java
public List<ReplyVO> getListWithPaging(
    @Param("cri") Criteria cri,
    @Param("bno") Long bno
);
```
XML로 처리할때 cri와 bno를 모두 사용가능하다.
```sql
select * from board WHERE bno =#{bno}
```
XML에서 #{bno}가 @Param("bno")와 매칭되어서 사용된다는 것에 주의!




xml to java
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">
    <!-- The definition of the Root Spring Container shared by all Servlets and Filters -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/spring/root-context.xml</param-value>
    </context-param>

    <!-- Creates the Spring Container shared by all Servlets and Filters -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!-- Processes application requests -->
    <servlet>
        <servlet-name>appServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
          <init-param>
        <param-name>contextClass</param-name>
        <param-value>
            org.springframework.web.context.support.AnnotationConfigWebApplicationContext
        </param-value>
    </init-param>
        <init-param>
            <param-name>contextConfigLocatation</param-name>
            <param-value>com.mds.test.ServetConfig</param-value>
        </init-param>

        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>appServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping> 
</web-app>
```
```java
@Configuration
@ComponentScan(basePackages={"com.mds.test"})
@EnableWebMvc
public class ServletConfig extends WebMvcConfigurerAdapter{

    @Bean
    public ViewResolver internalResourceViewer(){

        InternalResourceViewResolver irvr= new InternalResourceViewResolver();
        irvr.setPrefix("/WEB-INF/views/");
        irvr.setSuffix(".jsp");
        return irvr;
    }

    @Bean(name="multipartResolver")
    public ExtendedMultipartResolver resolver(){
        return new ExtendedMultipartResolver();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // TODO Auto-generated method stub
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
    }   
}
```



 Xml

<beans:bean class="org.springframework.web.servlet.view.BeanNameViewResolver">
	<beans:property name="order" value="0" />
</beans:bean>

<beans:bean class="org.springframework.web.servlet.view.UrlBasedViewResolver">
	<beans:property name="viewClass" value="org.springframework.web.servlet.view.tiles3.TilesView"/>
	<beans:property name="order" value="1" />
</beans:bean>

<beans:bean id="tilesConfigurer" class="org.springframework.web.servlet.view.tiles3.TilesConfigurer">
	<beans:property name="definitions">
		<beans:value>/WEB-INF/tiles/tiles.xml</beans:value>
	</beans:property>
</beans:bean>

<beans:bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
	<beans:property name="prefix" value="/WEB-INF/views/" />
	<beans:property name="suffix" value=".jsp" />
	<beans:property name="order" value="2" />
</beans:bean>
- Java Config

/* ViewResolver*/
@Bean
public BeanNameViewResolver beanNameViewResolver() {
	BeanNameViewResolver resolver = new BeanNameViewResolver();
	resolver.setOrder(0);
	return resolver;
}
	/* Tiles */
@Bean
public UrlBasedViewResolver urlBasedViewResolver() {
	UrlBasedViewResolver resolver = new UrlBasedViewResolver();
	resolver.setViewClass(TilesView.class);
	resolver.setOrder(1);
	return resolver;
}
@Bean
public TilesConfigurer tilesConfigurer() {
	TilesConfigurer tilesConfigurer = new TilesConfigurer();
	tilesConfigurer.setDefinitions(new String[] { "/WEB-INF/tiles/tiles.xml" });
	tilesConfigurer.setCheckRefresh(true);
	return tilesConfigurer;
}
	/* Tiles */
@Bean
public InternalResourceViewResolver internalResourceViewResolver() {
	InternalResourceViewResolver resolver = new InternalResourceViewResolver();
	resolver.setPrefix("/WEB-INF/views/");
	resolver.setSuffix(".jsp");
	resolver.setOrder(2);
	return resolver;
}


Common Context

 서비스 로직에서는 @Controller는 스캔하지 않고 @Service와 @Repository를 스캔한다.

- Xml
```xml
<context:component-scan base-package="spring.web.app">
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Repository"/>
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Service"/>
	<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
```
- Java Config
```java
@Configuration
@ComponentScan(
	basePackages = "spring.web.app", 
	excludeFilters = {
		@Filter(type = FilterType.ASSIGNABLE_TYPE, classes = Controller.class)
	}, 
	includeFilters = { 
		@Filter(type = FilterType.ASSIGNABLE_TYPE, classes = Service.class),
		@Filter(type = FilterType.ASSIGNABLE_TYPE, classes = Repository.class)
	}
)
public class CommonConfig {
	
}
```


Scribe library용 Naver Login 구현체 추가
```java
 package com.naver.naverlogintutorial.oauth.model;
 
 import com.github.scribejava.core.builder.api.DefaultApi20;

 public class NaverLoginApi extends DefaultApi20{

 	protected NaverLoginApi(){
 	}
 
 	private static class InstanceHolder{
 		private static final NaverLoginApi INSTANCE = new NaverLoginApi();
 	}
 	
 	
 	public static NaverLoginApi instance(){
 		return InstanceHolder.INSTANCE;
 	}
 	
 	@Override
 	public String getAccessTokenEndpoint() {
 		return "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code";
 	}					
 
 	@Override
 	protected String getAuthorizationBaseUrl() {
 		return "https://nid.naver.com/oauth2.0/authorize";
 	}	
 
 }
```

```java
package com.naver.naverlogintutorial.oauth.bo;

import javax.servlet.http.HttpSession;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.naver.naverlogintutorial.oauth.model.NaverLoginApi;

public class NaverLoginBO {

	private final static String CLIENT_ID = "";
	private final static String CLIENT_SECRET = "";
	private final static String REDIRECT_URI = "http://127.0.0.1:8080/auth/naver/callback";
	
	/* 네아로 인증  URL 생성  Method */
	public String getAuthorizationUrl(HttpSession session) {

		/* Scribe에서 제공하는 인증 URL 생성 기능을 이용하여 네아로 인증 URL 생성 */
		OAuth20Service oauthService = new ServiceBuilder()
				.apiKey(CLIENT_ID)
				.apiSecret(CLIENT_SECRET)
				.callback(REDIRECT_URI)
				.state("RANDOM_STRING")
				.build(NaverLoginApi.instance());

		return oauthService.getAuthorizationUrl();
	}
}

```
```xml
<beans:bean id="naverClientID" class="java.lang.String">
    <beans:constructor-arg value="<naver clientId>"/>
<beans>
<beans:bean id="naverClientSecret" class="java.lang.String">
    <beans:constructor-arg value="<naver clientSecret>"/>
<beans>
<beans:bean id="naverRedirectUrl" class="java.lang.String">
    <beans:constructor-arg value="http://127.0.0.1:8080/auth/naver/callback"/>
<beans>
<beans:bean id="NaverSns" class="com.jade.swp.auth.SNS">
    <beans:constructor-arg value="naver"/>
    <beans:constructor-arg ref="naverClientID"/>
    <beans:constructor-arg ref="naverClientSecret"/>
    <beans:constructor-arg ref="naverRedirectUrl"/>
<beans:bean>
```

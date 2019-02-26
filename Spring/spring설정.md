#Spring 설정

## workspace UTF-8 설정

1. Window > Preferences > General > Workspace에서 UTF-8 변경
2. HTML, CSS, JSP 파일도  Window > Preferences > Web 메뉴를 통해 각각 UTF-8 로 변경

## Eclipse에 STS 설치
1. Spring 사이트에서 Eclipse용 플러그인 주소 복사 (https://spring.io/tools3/sts/all)
2. Help > install Software...
3. Add... > 이름 STS

※ 설치도중 다음과 같은 에러 발생시
```
An error occurred while collecting items to be installed session context was:(profile=C__Users_leesujae_eclipse_jee-2018-09_eclipse, phase=org.eclipse.equinox.internal.p2.engine.phases.Collect, operand=, action=). No repository found containing: osgi.bundle,oracle.eclipse.tools.rest.lib
```

 “Contact all update sites during install to find required software” 체크해제
##Tomcat 서버 설정

## spring 생성
※오류시 .m2밑에 'repository'폴더의 내용물을 삭제

# 프로젝트 생성 후
- web.xml 파일 삭제
- 스프링 관련 파일 삭제
- pom.xml의 수정 및 스프링 버전 변경
- 자바 설정 관련 패키지 설정

## pom 설정
spring 버전 체크, java 버전 체크

## lombok 라이브러리 설치

## XML 파일 삭제
'root-context.xml', 'servlet-context.xml' 삭제 => spring 폴더 삭제
'web.xml' 삭제
web.xml을 삭제하면 pom.xml에서 에러 발생 
(과거의 웹프로젝트들이 기본적으로 web.xml을 사용하는 것을 기본으로 설정했기 때문에) => 아래의 설정을 추가한다.
```xml
	<plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-war-plugin</artifactId>
        <version>3.2.2</version>
        <configuration>
            <failOnMissingWebXml>false</failOnMissingWebXml>
        </configuration>
    </plugin>
```

web.xml 대신 WebConfig 작성
```java
@Override
		protected Class<?>[] getRootConfigClasses() {
		    return new Class[] {RootConfig.class}; //root-context.xml을 대신하는 클래스
		}
```

##lombok 설치후 pom.xml에 lombok 추가.

## pom.xml에 JUnit, spring-test 추가

@Setter(onMethod_ = @Autowired) == setChef()에 Autowired 어노테이션 추가

## pom.xml에 HikariCP 추가및 DB 설정

```java
@Bean
	public DataSource dataSource() {
		HikariConfig hikariConfig = new HikariConfig();
		hikariConfig.setDriverClassName("org.mariadb.jdbc.Driver");
		hikariConfig.setJdbcUrl("jdbc:mariadb://localhost:3307/study");
		hikariConfig.setUsername("root");
		hikariConfig.setPassword("root");
		
		HikariDataSource dataSource = new HikariDataSource(hikariConfig);
		
		return dataSource;
	}
```

## pom.xml에 db 적용
- spring-jdbc, spring-tx (데이터베이스 처리와 트랙잭션 처리)
- mybatis, mybatis-spring (MyBatis와 스프링 연동용 라이브러리) 

## mybatis 설정

## pom.xml에 log4jdbc-log4j2 적용, 설정

## test 패키지 밑의 log4j.xml 설정 변경

# 경로 변경
Tomcat의 'Modules'메뉴로 이동해서 '/'경로로 프로젝트가 실행될 수 있도록 처리. ( 혹은 해당 프로젝트 Properties 의 'Web Project Settings' 속성을 '/'로 지정)

# ServletConfig 설정
1. @EnableWebMvc 어노테이션과 WebMvcConfigurer 인터페이스를 구현하는 방식(과거에는 WebMvcConfigurerAdapter 추상클래스를 사용했으나, 스프링 5부터 Deprecated 되었다.)

2. @Configuration과 WebMvcConfigurationSupport클래스를 상속하는 방식 - 일반 @Configuration 우선순위가 구분되지 않는 경우에 사용

#영속 계층 구성

1. 테이블의 칼럼 구조를 반영하는 VO(Value Object) 클래스의 생성
2. MyBatis의 Mapper 인터페이스의 작성 / XML 처리
3. 작성한 Mapper 인터페이스의 테스트

## Mapper.xml 작성시 주의할 점
XML을 작성할때 반드시 
**<mapper>의 namespace 속성 값을 Mapper 인터페이스와 동일**한 이름을 줘야한다.
**<select> 태그의 id 속성값은 메서드의 이름과 동일**하게 작성.
**resultType속성의 값은 select 쿼리의 결과를 특정 클래스의 객체**로 만들기 위해 설정


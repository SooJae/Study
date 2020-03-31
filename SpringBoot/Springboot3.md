# 스프링 데이터

## SQL DB
인메모리 데이터베이스 지원
DataSource 설정
DBCP 설정
JDBC 사용하기
스프링 데이터 JPA 사용하기
jOOQ 사용하기
데이터베이스 초기화
데이터베이스 마이그레이션 툴 연동하기

## NoSQL
Redis (Key/Value)
MongoDB (Document)
Neo4J (Graph)
Gemfire (IMDG)
Solr (Search)
Elasticsearch (Search & Analytics)
Cassandra
Couchbase
LDAP
InfluxDB


### 지원하는 인-메모리 데이터베이스  
H2 (추천, 콘솔 때문에...)
HSQL
Derby

### Spring-JDBC가 클래스패스에 있으면 자동 설정이 필요한 빈을 설정 해줍니다.
- DataSource
- JdbcTemplate

### 인-메모리 데이터베이스 기본 연결 정보 확인하는 방법
(EmbeddedDataSourceConfiguration - DataSourceProperties로 들어가보면 기본 설정이 나온다. )
URL: “testdb”
username: “sa”
password: “”

### H2 콘솔 사용하는 방법
spring-boot-devtools를 추가하거나...
spring.h2.console.enabled=true 만 추가.
/h2-console로 접속 (이 path도 바꿀 수 있음)

### 실습

1. 스프링 부트 생성할 때, JDBC와 H2를 선택해준다.
2. 우리가 설정하지 않아도 in-memory 데이터베이스를 사용하는 jdbc가 설정이 되어서 애플리케이션이 동작된다.
CREATE TABLE USER (ID INTEGER NOT NULL, name VARCHAR(255), PRIMARY KEY (id))
INSERT INTO USER VALUES (1, ‘soojae’)



## 지원하는 DBCP
HikariCP (기본)
https://github.com/brettwooldridge/HikariCP#frequently-used
Tomcat CP
Commons DBCP2
DBCP 설정
spring.datasource.hikari.*
spring.datasource.tomcat.*
spring.datasource.dbcp2.*
MySQL 커넥터 의존성 추가
<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
</dependency>
MySQL 추가 (도커 사용)
docker run -p 3306:3306 --name mysql_boot -e MYSQL_ROOT_PASSWORD=1 -e MYSQL_DATABASE=springboot -e MYSQL_USER=keesun -e MYSQL_PASSWORD=pass -d mysql
docker exec -i -t mysql_boot bash
mysql -u root -p
MySQL용 Datasource 설정
spring.datasource.url=jdbc:mysql://localhost:3306/springboot?useSSL=false
spring.datasource.username=keesun
spring.datasource.password=pass
MySQL 접속시 에러
MySQL 5.* 최신 버전 사용할 때
문제	Sat Jul 21 11:17:59 PDT 2018 WARN: Establishing SSL connection without server's identity verification is not recommended. According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn't set. For compliance with existing applications not using SSL the verifyServerCertificate property is set to 'false'. You need either to explicitly disable SSL by setting useSSL=false, or set useSSL=true and provide truststore for server certificate verification.
해결	jdbc:mysql:/localhost:3306/springboot?useSSL=falseMySQL 8.* 최신 버전 사용할 때
문제	com.mysql.jdbc.exceptions.jdbc4.MySQLNonTransientConnectionException: Public Key Retrieval is not allowed
해결	jdbc:mysql:/localhost:3306/springboot?useSSL=false&allowPublicKeyRetrieval=trueMySQL 라이센스 (GPL) 주의
MySQL 대신 MariaDB 사용 검토
소스 코드 공개 의무 여부 확인


# PostgreSQL
의존성 추가
<dependency>
   <groupId>org.postgresql</groupId>
   <artifactId>postgresql</artifactId>
</dependency>
PostgreSQL 설치 및 서버 실행 (docker)
docker run -p 5432:5432 -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=keesun -e POSTGRES_DB=springboot --name postgres_boot -d postgres

docker exec -i -t postgres_boot bash

su - postgres

psql springboot

데이터베이스 조회
\list

테이블 조회
\dt

쿼리
SELECT * FROM account;
PostgreSQL 경고 메시지
경고 :  org.postgresql.jdbc.PgConnection.createClob() is not yet implemented 해결 :  spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true


# 스프링 데이터 JPA 의존성 추가
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
스프링 데이터 JPA 사용하기
@Entity 클래스 만들기
Repository 만들기
스프링 데이터 리파지토리 테스트 만들기
H2 DB를 테스트 의존성에 추가하기
@DataJpaTest (슬라이스 테스트) 작성


# JPA를 사용한 데이터베이스 초기화
spring.jpa.hibernate.ddl-auto
spring.jpa.generate-dll=true로 설정 해줘야 동작함.
  SQL 스크립트를 사용한 데이터베이스 초기화
schema.sql 또는 schema-${platform}.sql
data.sql 또는 data-${platform}.sql
${platform} 값은 spring.datasource.platform 으로 설정 가능.


# 스프링 시큐리티
웹 시큐리티
메소드 시큐리티
다양한 인증 방법 지원
LDAP, 폼 인증, Basic 인증, OAuth, ...
스프링 부트 시큐리티 자동 설정
SecurityAutoConfiguration
UserDetailsServiceAutoConfiguration
spring-boot-starter-security
스프링 시큐리티 5.* 의존성 추가
모든 요청에 인증이 필요함.
기본 사용자 생성
Username: user
Password: 애플리케이션을 실행할 때 마다 랜덤 값 생성 (콘솔에 출력 됨.)
spring.security.user.name
spring.security.user.password
인증 관련 각종 이벤트 발생
DefaultAuthenticationEventPublisher 빈 등록
다양한 인증 에러 핸들러 등록 가능
스프링 부트 시큐리티 테스트
https://docs.spring.io/spring-security/site/docs/current/reference/html/test-method.html

Basic Authentication =  Accept 헤더에 따라 달라진다. (폼인지~ Basic인지~)
Headers = WWW-Authenticate:"Basic realm="Realm" 가 오면 안 이쁜 창이 뜬다.




### accept 미디어 타입을 TEXT_HTML로
400 에러가 아닌 302 Redirect가 발생한 것을 알수 있다.
```java
  public void hello() throws Exception {
    mockMvc.perform(get("/hello").accept(MediaType.TEXT_HTML))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(view().name("hello"));
  }
```
```bash
MockHttpServletResponse:
           Status = 302
    Error message = null
          Headers = [X-Content-Type-Options:"nosniff", X-XSS-Protection:"1; mode=block", Cache-Control:"no-cache, no-store, max-age=0, must-revalidate", Pragma:"no-cache", Expires:"0", X-Frame-Options:"DENY", Location:"http://localhost/login"]
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = http://localhost/login
          Cookies = []

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /hello
       Parameters = {}
          Headers = [Accept:"text/html"]
             Body = <no character encoding set>
    Session Attrs = {SPRING_SECURITY_SAVED_REQUEST=DefaultSavedRequest[http://localhost/hello]}

Handler:
             Type = null

Async:
    Async started = false
     Async result = null

Resolved Exception:
             Type = null

ModelAndView:
        View name = null
             View = null
            Model = null

FlashMap:
       Attributes = null

MockHttpServletResponse:
           Status = 302
    Error message = null
          Headers = [X-Content-Type-Options:"nosniff", X-XSS-Protection:"1; mode=block", Cache-Control:"no-cache, no-store, max-age=0, must-revalidate", Pragma:"no-cache", Expires:"0", X-Frame-Options:"DENY", Location:"http://localhost/login"]
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = http://localhost/login
          Cookies = []
```


### accept 타입 지정 X
```java
 public void my() throws Exception {
    mockMvc.perform(get("/my"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(view().name("my"));
  }
```

```bash

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /my
       Parameters = {}
          Headers = []
             Body = <no character encoding set>
    Session Attrs = {SPRING_SECURITY_SAVED_REQUEST=DefaultSavedRequest[http://localhost/my]}

Handler:
             Type = null

Async:
    Async started = false
     Async result = null

Resolved Exception:
             Type = null

ModelAndView:
        View name = null
             View = null
            Model = null

FlashMap:
       Attributes = null

MockHttpServletResponse:
           Status = 401
    Error message = Unauthorized
          Headers = [WWW-Authenticate:"Basic realm="Realm"", X-Content-Type-Options:"nosniff", X-XSS-Protection:"1; mode=block", Cache-Control:"no-cache, no-store, max-age=0, must-revalidate", Pragma:"no-cache", Expires:"0", X-Frame-Options:"DENY"]
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /my
       Parameters = {}
          Headers = []
             Body = <no character encoding set>
    Session Attrs = {SPRING_SECURITY_SAVED_REQUEST=DefaultSavedRequest[http://localhost/my]}

Handler:
             Type = null

Async:
    Async started = false
     Async result = null

Resolved Exception:
             Type = null

ModelAndView:
        View name = null
             View = null
            Model = null

FlashMap:
       Attributes = null

MockHttpServletResponse:
           Status = 401
    Error message = Unauthorized
          Headers = [WWW-Authenticate:"Basic realm="Realm"", X-Content-Type-Options:"nosniff", X-XSS-Protection:"1; mode=block", Cache-Control:"no-cache, no-store, max-age=0, must-revalidate", Pragma:"no-cache", Expires:"0", X-Frame-Options:"DENY"]
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

```

홈페이지로 들어가보면 띠용? 스프링 시큐리티에서 자동으로 만들어 준 로그인 페이지가 만들어진다.

DefaultAuthenticationEventPublisher를 받아서 빈으로 등록을 하면 커스텀해서 사용할 수 있다.????  
전반적으로 시큐리티가 해주는것 같은데 사실상 없다.
스프링 시큐리티가 하는 부분은 UserDetailServiceAutoConfiguration 이다. 유저를 만들어준다.
이것은 AuthenticationManager, AuthenticationProvider, UserDetailsService 가 없는 경우에만 이 설정파일이 적용된다.
스프링 부트가 지원해주는 시큐리티는 사실상 안 쓴다.... 
 
 # 스프링 시큐리티 커스텀
 웹 시큐리티 설정
 @Configuration
 public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/", "/hello").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .and()
            .httpBasic();
    }
 }
 
 WebSecurityConfigurerAdapter 파일 안의
 ((HttpSecurity)((HttpSecurity)((AuthorizedUrl)http.authorizeRequests().anyRequest()).authenticated().and()).formLogin().and()).httpBasic();
 와 같은데 antMatchers를 써서 저기로 들어온 것은 permitAll을 했다는 차이점만 있다. 
 
 UserDetailsServie 구현
 https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#jc-authentication-userdetailsservice
 PasswordEncoder 설정 및 사용
 https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#core-services-password-encoding


```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
            .antMatchers("/", "/hello").permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .and()
            .httpBasic();
  }

  @Bean
  public PasswordEncoder passwordEncoder(){
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }
}
```
### 를 딱 만든순간 Security Auto Configuration이 동작하지 않는다. 이제부터 커스텀으로 동작한다.


UserDetailService도 만들어줘야 한다~


```java
@Service
public class AccountService implements UserDetailsService {

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public Account createAccount(String username, String password) {
    Account account = new Account();
    account.setUsername(username);
    account.setPassword(passwordEncoder.encode(password)); // 유저에 저장하기 전에 인코딩 한 후 저장
    return accountRepository.save(account);
  }

  @Override // UserDetails에 패스워드가 담겨있다! 핵심적
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
     Optional<Account> byUsername = accountRepository.findByUsername(username);
     Account account = byUsername.orElseThrow(() -> new UsernameNotFoundException(username));
// 여기서의 User는 UserDetails 인터페이스에서 제공해준 것이다. 시큐리티가 이것을 보고 판단.
     return new User(account.getUsername(), account.getPassword(), authorities());
   }
 
   private Collection<? extends GrantedAuthority> authorities() {
     return Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
   }
```
여기서 빈 (@Service) 가 달라붙어 있어야 스프링에서 커스텀이라는 걸 알게되고 더 이상 스프링 부트가 앱 유저(아이디 user에 비밀번호 uuid인것)을 만들지 않는다.

CMD + P로 인자가 뭐가 들어가는지 확인 가능하다.

완성을 다하고 실행을 해도 패스워드 인코딩 문제때문에 정상적으로 작동하지 않는다 (스프링 5부터 인코딩 방식이 복잡해짐)


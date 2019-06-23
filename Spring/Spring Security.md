## 필터
현재 실행되는 서블릿 컨텍스트에 속하지만 스프링과 무관하다.
## 인터셉터 
스프링의 내부에서 컨트롤러를 호출할 때 관여합니다. => 스프링의 컨텍스트 내에 있는 **모든자원** 활용합니다.

## 인증(Authentication)
**자신**이 자격이 있다고 증명하는 것. (출입증 제시)
##권한 부여(Authorization)
**남에 의해**서 자격이 부여되는 것. (해당 기계를 만질 수 있게 권한을 부여 받음.)

커스터마이징 하는방법
1. AuthenticationProvider : 새로운 프로토콜이나, 인증구현 방식을 직접 구현
2. UserDetailService : 실제 처리를 담당.


username = id와 같다.


JSESSIONID는 Tomcat에서 발행하는 쿠기의 이름이다.


AccessDeniedHandler 인터페이스 : 인터페이스의 메서드는 handle()밖에 없고 HttpsServletRequest, HttpServletResponse를 파라미터를 사용하기 때문에 직접적으로 서블릿 API를 이용 가능

스프링 시큐리티에서 POST방식을 이용하는 경우 기본적으로 CSRF토큰을 이용합니다.
CSRF : 사이트간 요청 위조
서버에서 받아들이는 정보가 특별히 사전 조건을 검즈하지 않는 다는 단점을 이용한 해킹방식, 특정 사용자의 등급을 변경하는 URI가 존재하는 것을 알고, 파라미터가 필요하다는 것도 알았다.
피해자가 자주 방문하는 사이트에 \<form>태그를 이용해서 위의 URI를 추가한 게시물을 작성하고 submit으로 서버에 해당 값을 보내서 해킹합니다.
CSRF공격 자체가 사용자의 요청에 대한 출처를 검사하지 않아서 생기는 허점이기 때문에 사용자의 요청에 대한 출처를 의미하는 referer헤더를 체크하거나 일반적인 경우에 잘 사용되지 않고 REST방식에서 사용되는 PUT, DELETE와 같은 방식을 이용 하면 됩니다.

1. 서버에서 브라우저에 데이터를 보낼때 CSRF 토큰을 같이 전송.
2. 사용자가 **POST방식 등**으로 특정한 작업을 할 때는 **브라우저에서 전송된 CSRF토큰의 값**과 **서버가 보관하고 있는 값**을 비교 CSRF토큰이 다르면 작업 처리 X

공격자의 입장에서는 CSRF공격을 하려면 변경되는 CSRF 토큰값을 알아야만 하기 때문에 고정된 내용의 \<form>태그나 \<img>태그 등을 이용할 수 없다.

CSRF 동작방식
일반적으로 CSRF토큰은 세션을 통해서 보관, 브라우저에서 전송된 CSRF 토큰 값을 검사하는 방식으로 처리합니다.
스프링 시큐리티에서 CSRF 토큰 생성을 비활성화 하거나 CSRF 토큰을 쿠키를 이용해서 처리하는 등의 설정을 지원합니다.

AuthenticationSuccessHandler 인터페이스 : 로그인 한 사용자에 부여된 권한 Authentication객체를 객체를 이용해서 사용자가 가진 모든 권한을 문자열로 체크합니다.

스프링 시큐리티에서는 사용자를 확인하는 인증(Authentication)과 권한 등을 부여하는 인가 과정(Authorization)으로 나누어 볼 수 있다.

인증과 권한에 대한 처리는 **Authentication Manager**를 통해서 이루어지는데, 이때 인증이나 권한 정보를 제공하는 존재(Provider)가 필요하고, 다시 이를 위해서 UserDetailsService라는 인터페이스를 구현한 존재를 활용합니다.

UserDetailsService는 스프링 시큐리티 API 내에 이미 CachingUserDetailsService, InMemoryUserDetailsManager(문자열로 고정한 방식),JdbcDaoImpl, JdbcUserDetailsManager등 구현클래스들을 제공하고 있다.

JDBC를 이용해서 인증/권한을 체크하는 방식은 
1. 지정된 형식으로 테이블을 생성해서 사용하는 방식
2. 기존에 작성된 데이터베이스를 이용하는 방식

UserDetailsService 인터페이스는 loadUserByUsername() 이라는 메서드의 반환 타입인 UserDetails 역시 인터페이스로 사용자의 정보와 권한정보등을 담는 타입.
UserDetails 타입은 getAuthorities(), getPassword(), getUserName() 등의 여러 추상 메서드를 가지고 있어서 개발전에 직접구현할 것인지 UserDetails 인터페이스를 구현해둔 스프링 시큐리티의 여러 하위 클래스를 이용할 것인지 판단해야 합니다.

UserDetailsService 인터페이스를 상속받은 클래스에 Mapper까지 구현해줍니다.
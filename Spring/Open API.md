서비스 URL : http://sootudy.com/
```
Client ID : 앱이 가지고 있는 클라이언트 아이디 (사용자에게 노출됨)
Secret Key : 앱이 가지고 있는 비밀키 (서버 내부 동작임으로 사용자에게 노출되지않음)
Access Token 주소 : 엑세스 토큰을 발급해주는 주소입니다.
User Authorization 주소 : 로그인이 이뤄질 주소 웹이라면 다이얼로그(UI)가 구현되어 있는 주소로 보냄.
UserInfo 주소 : 유저 리소스에 접근하는 주소
허용 리다이렉트 주소 : 엉뚱한 곳으로 리다이렉트 하여 보안적 취약점을 만드는 것을 방어하기위해 리- 다이렉트를 허용할 주소를 설정합니다.
scope : 가져올 정보들 (전자우편, 생일등...)
```

네이버 아이디로 로그인 : http://sootudy.com/auth/naver/callback

1. 사용자가 우리 웹사이트로 접속
2. 우리가 구글이나 네이버에 접속할 수 있는 URL을 전달해줌
3. 사용자가 네이버 로그인을 함
4. 성공하면 서버에 날라감(callback 주소로)
5. 실제로는 성공 했다는 것만 받고 정보는 받지 못합니다. AccessToken을 받아야 합니다.(보안상의 문제로)
6. 엑세스 토큰을 달라고 요청합니다.
7. 네이버에서 넘어온 정보로 서버의 테이블과 대조해본다.



# 스프링 Auth maven 설정
## 1. 스프링 소셜을 이용하는 경우.
http://projects.spring.io/spring-social/
```xml
    <!-- https://mvnrepository.com/artifact/org.springframework.social/spring-social-config -->
<dependency>
    <groupId>org.springframework.social</groupId>
    <artifactId>spring-social-config</artifactId>
    <version>1.1.6.RELEASE</version>
</dependency>
    
    <!-- https://mvnrepository.com/artifact/org.springframework.social/spring-social-security -->
<dependency>
    <groupId>org.springframework.social</groupId>
    <artifactId>spring-social-security</artifactId>
    <version>1.1.6.RELEASE</version>
</dependency>
```
페이스북, 트위터, 링크드인을 제공(네이버, 카카오등은 제공 X)
제공해주지 않는 서비스에 대한 구현이 힘들다.


## 2.OAuth2 SSo(싱글사인온)
https://spring.io/guides/tutorials/spring-boot-oauth2/#_social_login_simple
간단용


## 3. OAuth2메뉴얼 (수동)
```xml
<dependency>
	<groupId>org.springframework.security.oauth</groupId>
	<artifactId>spring-security-oauth2</artifactId>
</dependency>
```



# Open API 만들기
1. OpenAPI 신청
네이버 : 네이버 디벨로퍼에 신청
구글 : 콘솔 구글에 신청

2. ServletConfig.java 파일에 naver에 대한 정보와 구글에 대한 정보 등록
3. ServletConfig에서 만든 bean을 이용할 SNS 클래스 생성
4. SnsUrls클래스를 생성하여 다음을 등록
```java
static final String NAVER_ACCESS_TOKEN = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code";
static final String NAVER_AUTH = "https://nid.naver.com/oauth2.0/authorize";
static final String GOOGLE_PROFILE_URL = "https://www.googleapis.com/plus/v1/people/me";
static final String NAVER_PROFILE_URL = "https://openapi.naver.com/v1/nid/me";
```


package.json


devDependencies
"@types/jquery": "^3.3.29",를 포함하지 않으면 에러가 발생한다

fetch -> 헤드값만 갖고오고 싶을때 (데이터 없이)
branch바꿀때 사용!

"@types/lodash": "^4.14.123",

로대쉬 : 각종 기능이 있다 네임 스페이스 기능이나 _기능 등등


tslint에 air bnb 규칙을 적용하고 싶다면



### tslint.json
```json
{
  "extends": "tslint-config-airbnb",
  "rules": {
    "max-line-length": [],
    "trailing-comma": false,
    "no-var-self": false
  }
}

```
다음과 같이 확장하면 된다.

출처 : https://pravusid.kr/javascript/2019/03/10/eslint-prettier.html\


swagger에서는 데이터를 모두 넣어야 작동한다.\


상태 Css 관련해서 사용하고 싶다면 getActionCss를 첨부하자

## 프록시를 이용해서 해당 주소로 접속하면 서버에 접근함

### proxy.conf.json
```json
 {
   "/api/*":
   {
    //  서버주소
     "target":"http://localhost:8080",
     "secure":false,
     "logLevel":"debug"
   }
 }
```

예 : localhost:4200/api/ 로 접속
http://locathost:8080



## 참고자료
https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/


## MultipartFile parameter is not present 에러!

임의대로 CommonsMultipartResolver를 바꿀 시 에러가 생긴다. (예민한 듯 하다.)


### 예) WebMvcConfig.java
```java
    @Bean
    public MultipartResolver multipartResolver() {
        return new CommonsMultipartResolverMine();
    }


    public static class CommonsMultipartResolverMine extends CommonsMultipartResolver {

        @Override
        public boolean isMultipart(HttpServletRequest request) {
            final String header = request.getHeader("Content-Type");
            if(header == null){
                return false;
            }
            return header.contains("multipart/form-data");
        }

    }
```

## 해결 방안
1. 임의대로 확장시킨 CommonsMultipartResolver를 없앤다.
2. org.springframework.web.multipart.commons.CommonsMultipartResolver를 사용하지 말고 org.springframework.web.multipart.support.StandardServletMultipartResolver를 사용한다.
   
## 문제 발생의 이유
참고 사이트를 참조하자

참고 사이트 : https://java.ihoney.pe.kr/351



### 400 BadRequest
json.stringify 는 스프링에서 requestbody로 받아야 한다.

### 405 Method Not Allowed



## a링크를 disabled 시키기
https://bryan7.tistory.com/206


## javax.persistence.EntityNotFoundException: Unable to find ... with id 0 에러

데이터를 저장할 때 @OneToOne, @OneToMany.. 등의 annotation이 선언되어 있을 경우에는 매핑된 id값이 0이거나 매핑되어있는 id의 자식객체가 없을 때 오류가 발생하는 경우가 있다. 이 경우 매핑되는 애들이 없을 때 값을 null 처리를 하게되면 문제없이 조회를 할 수 있다. 



즉, 매핑 id 값을 null로 처리하자.



출처: https://bkjeon1614.tistory.com/35 [아무거나]


# 스프링 pageable
page : 요청할 페이지를 뜻한다. 3페이지면 page에 3을 넣어 요청한다.

sort : 어떤 노드를 기준으로 정렬할 것인지 설정한다.

sort.dir : 정렬의 내림차순과 오름차순을 설정한다.

offset : 페이지 offset을 설정한다. 10으로 설정하면 10개의 리스트가 return 된다.
https://www.popit.kr/spring-boot-jpa-%ED%8E%98%EC%9D%B4%EC%A7%95-api-%EB%A7%8C%EB%93%A4%EA%B8%B0/
https://m.blog.naver.com/PostView.nhn?blogId=bluelivesky&logNo=220629546864&proxyReferer=https%3A%2F%2Fwww.google.com%2F

https://www.popit.kr/spring-boot-jpa-%ED%8E%98%EC%9D%B4%EC%A7%95-api-%EB%A7%8C%EB%93%A4%EA%B8%B0/
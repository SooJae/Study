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




# clickOutside 사용하기
1. $ npm i ng-click-outside
2. clickOutside 함수 사용
3. (clickOutside)="clickOutSide($event)"


# 맥에서 8080포트 죽이기
https://didadico.tistory.com/entry/Mac%EC%97%90%EC%84%9C-8080%ED%8F%AC%ED%8A%B8-%EC%82%AC%EC%9A%A9%EC%A4%91%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%EC%B0%BE%EA%B8%B0



## Can't bind to 'ngForOf' since it isn't a known property of 'li'에러
안에 있는 모듈에 CommonModule을 해줘야한다.
https://hassantariqblog.wordpress.com/2016/10/28/angular2-error-cant-bind-to-ngforof-since-it-isnt-a-known-property/

## Cannot read property 'nativeElement' of undefined
https://stackoverflow.com/questions/42826105/angular-2-get-input-element-value

mplements AfterViewInit is just a Typescript construct which gets removed on transpilation to javascript..It is used to make sure you have implemented the correct lifecycle hook.. that really doesnt make a difference in this case 


## Error:Component HomeComponent is not part of any NgModule or the module has not been imported into your module.
declare를 안해서 생긴 원인

https://stackoverflow.com/questions/44827999/component-is-not-part-of-any-ngmodule-or-the-module-has-not-been-imported-into-y

If your are not using lazy loading, you need to import your HomeComponent in app.module and mention it under declarations. Also, don't forget to remove from imports

## 화면에 위치가 맞지 않다면?
아래와 같이 html부분을 의심해보자
```html
<!-- 문제 발생 -->
<!doctype html>
<html lang="en">
<!-- 문제 해결 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
```


## 400 error: "Bad Request"
message: "JSON parse error: Cannot deserialize instance of '' out of START_ARRAY token; nested exception is com.fasterxml.jackson.databind.exc.MismatchedInputException: Cannot deserialize instance of 
'' out of START_ARRAY token↵ at [Source: (PushbackInputStream); line: 1, column: 1]


Basic Auth
```js
 public abc(url: string) {
    const scope = this;
    return this.httpClient
      .get(url, {
        headers: new HttpHeaders({
          Accept: '*/*;',
          'Authorization': 'Basic ' + btoa('username:password'),
          // 'Content-Type': 'application/json'
        }),
      })
      .then((response) => response)
      .catch(error => scope.errorHandler(scope, error));
  }
  ```


## postman to curl 만들기






curl -L -X POST 'http://abc' -H 'Authorization: Basic ZGVtcGFo' -F 'jarFile=@/Users/soojae/Documents/example.jar' -v -0



```text
* HTTP/2 stream 0 was not closed cleanly: PROTOCOL_ERROR (err 1)
* stopped the pause stream!
* Connection #1 to host examples-java-1-76a5-f42b.flow.svc.dev.apm.cloud.metatron.app left intact
curl: (92) HTTP/2 stream 0 was not closed cleanly: PROTOCOL_ERROR (err 1)
* Closing connection 1
```

HTTP를 강제로 HTTP/2로 전송해서 생기는 오류, -0을 붙여주면 된다. (HTTP/1을 사용하겠다는 의미)
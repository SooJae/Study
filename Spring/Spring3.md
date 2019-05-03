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
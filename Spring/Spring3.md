# REST 방식 
하나의 URI는 하나의 고유한 리소스를 대표하도록 설계된다는 개념에 전송방식을 결합해서 원하는 작업을 지정한다.
`/boards/123`은 게시물중에 123번이라는 고유한 의미를 가지도록 설계하고, 이에대한 처리는 GET, POST방식과 같이 추가적인 정보를 통해서 결정한다.

## REST방식의 구성
```yaml 
URI + GET/POST/PUT/DELETE/...
```

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
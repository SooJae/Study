주의! Version 1.4.199를 사용해주세요.

 1.4.199 버전 다운로드 링크
윈도우 설치 버전: https://h2database.com/h2-setup-2019-03-13.exe
윈도우, 맥, 리눅스 실행 버전: https://h2database.com/h2-2019-03-13.zip
https://www.h2database.com
다운로드 및 설치

$ sh ./h2.sh 실행
주소 localhost로 변경

데이터베이스 파일 생성 방법
jdbc:h2:~/jpashop
~/jpashop.mv.db
(최소 한번)
파일 생성 확인 홍에서 jpashop.mv.db 찾기
그 후에 연결 끊기 클릭
이후 부터는 jdbc:h2:tcp://localhost/~/jpashop 이렇게 접속
세션키를 물고 있게 하기위해서 이렇게 번거롭게 한다.

MVCC=TRUE옵션을 넣어주면 여러개가 동시에 접근할때 좀더 빠르다.


```java
public Long save(Member member){
    em.persist(member);
    return member.getId(); // 왜 멤버를 반환하지 않고, 아이디만 반환하지? => 커맨드와 쿼리를 분리해라! 원칙. save는 사이드 이펙트를 일으키는 커맨드 성이기 때문에 최대한 반환값이 없어야 한다.
  }
```

설정 -> livetemplate에서 커스텀을 만들 수 있다.
custom -> tdd 라고 만든후 Define으로 Java 체크
```java
@Test
public void $NAME$() throws Exception {
    //given
    $END$
    //when
    
    //then
}
```


### error: cannot find symbol @RunWith(SpringRunner.class) 해결 방법
implementation 'org.springframework.boot:spring-boot-devtools' , 'junit:junit:4.12'
를 추가하면 된다.
https://ormgm.tistory.com/m/50

깃 추적 삭제 : git rm -r --cached . 


H2실행시 @Entity 주석이 달린 클래스를 보고 테이블을 생성한다.
@Transactional 주석이 test케이스에 있는 경우 전부 실행한 후 db를 롤백 해버린다. (그래서 영향이 없다.)

아래와 같이 @Rollback(false)를 추가해주면 db가 롤백하지 않는다.
```java
@Test
@Transactional
@Rollback(false)
void test() {
}
```

```java
Assertions.assertThat(findMember.getId()).isEqualTo(member.getId());
Assertions.assertThat(findMember.getUsername()).isEqualTo(member.getUsername());
Assertions.assertThat(findMember).isEqualTo(member);

System.out.println("findMember == member" + (findMember == member));
```

같은 영속성 컨텍스트 안에서는 아이디값이 같으면 같은 엔티티로 식별한다.
위에 보면 한 테스트 메소드에서 저장하고 조회까지 하므로(맞나?)
나 영속성 컨텍스트가 있는데? 라고 생각해서 1차캐시에서 바로 갖고온다. (쿼리문도 안날린다.) 


gradle clean build를 하면 build/libs에 jar가 생성된 것을 확인 할 수 있다.

# 쿼리 파라미터 로그 남기기
```yaml
logging:
  level:
    org.hibernate.SQL: debug
    org.hibernate.type: trace
```

이걸로도 만족을 못한다면? 외부 라이브러리를 사용하자
https://github.com/gavlyukovskiy/spring-boot-data-source-decorator

implementation("com.github.gavlyukovskiy:p6spy-spring-boot-starter:1.6.1") 추가하자

## 그래이들 경고
Deprecated Gradle features were used in this build, making it incompatible with Gradle 7.0.
Use '--warning-mode all' to show the individual deprecation warnings.
해결 : https://lollolzkk.tistory.com/26

도메일 모델과 테이블 설계로
회원은 여러 주문을 할 수 있다. (1대 다)
회원이 한번 주문할때 여러개의 상품을 주문할 수 있고, 상품도 여러개의 주문에 담길 수 있기 때문에 다대다 관계가 된다.
하지만 실제로 이런 다대다 관계는 관계형 데이터베이스는 물론이고, 엔티티에서도 거의 사용하지 않아서, 중간에 주문상품이라는 엔티티를 추가해
다대다 => 1대 다, 다대 1로 풀어낸다.
운영에서는 다대다 사용하면 안된다! 일대 다 다대 일로 풀어내야 한다.
그리고 양방향보다는 단방향으로 만드는게 좋다.
회원 - 주문 동급으로 생각
회원을 통해 주문을 한다(x) 주문할때 회원정보가 필요하다 (o)
주문내역이 필요하면 회원의 상세정보에서 갖고오는 것이 아닌, 주문내역에 회원이라는 필터가 들어가면 된다.

ORDER가 아닌 ORDERS로 사용해야하는 이유 : DB의 Orderby 예약어 때문에 잘 안먹을 수도 있기 때문에


@Embeddable
JPA의 내장타입이라는 뜻 - 어딘가에 내장될 수 도 있다.
@Embedded과 짝꿍 (사실 하나만 있어도 된다.)

```java
@OneToMany(mappedBy = "member")
private List<Order> orders = new ArrayList<>();
```
Order 테이블에있는 member필드에 의해 나는 매핑된거야 (readonly) 
그래서 orders에 값을 넣는다고 해도 foreign 키 값이 변하지 않는다.

```java
@ManyToOne
@JoinColumn(name = "member_id")
private Member member;
```
member값을 세틸하면 member_id foreign key 값이 다른멤버로 변경된다.

1:1에서는 액세스가 많은 쪽에 foreign key를 넣는다.

셀프로 양방향 영관계
```java
@ManyToOne
@JoinColumn(name = "parent_id")
private Category parent;

@OneToMany(mappedBy = "parent")
private List<Category> child = new ArrayList<>();
```
이름만 Self고 다른 엔티티와 매핑하는 것이 같다.

# FetchType.Eager을 FetchType.Lazy로 바꾸자!
EAGER를 사용하는 경우가
한건 조회 할때는 상관 없다.
JPQL select o from order o; 를 했을때
select * from order 가 실행되는데
이때 결과값 100개(그 상품을 산 사람 100명)가 나오면 member 조회 단건 쿼리가 100번 날라간다.
N+1(order)

@XXXToOne은 Eager이 기본값이다.... Lazy로 바꿔주자...

LAZY로딩을 하면 트랜잭션 밖에서 안되는 이슈들이 있다.
하지만 이런건 트랜잭션을 일찍 갖고온다던지, 해서 해결이 된다.

```java
//  == 연관관계 편의 메서드 //

  public void setMember(Member member){
    this.member = member;
    member.getOrders().add(this);
  }
  
  public void addOrderItem(OrderItem orderItem){
    orderItems.add(orderItem);
    orderItem.setOrder(this);
  }


//  public static void main(String[] args) {
//    Member member = new Member();
//    Order order = new Order();
//
//    member.getOrders().add(order); // member.getOrders().add(this);로 인해 이 코드는 사실 필요 없어짐
//    order.setMember(member);
//  }
```


option + cmd + v (해당 메소드를 담을 결과값을 생성해준다.)
option + cmd + N (한줄로 만들어 준다.)

SQL: 테이블을 대상으로 쿼리
JPQL: 엔티티 객체를 대상으로 쿼리


## @RequiredArgsConstructor
```java
private final MemberRepository memberRepository;
```
final로 선언한 변수만 받아서 생성자를 만든다.


```java
  @Test
  @DisplayName("회원가입")
  void join() throws Exception {
    //given
    Member member = new Member();
    member.setName("soo");
    //when
    Long saveId = memberService.join(member);

    //then
    assertEquals(member, memberRepository.findOne(saveId));
  }
```

JPA에서 같은 Transactional안에서 같은 엔티티 같은 PK값이면, 같은 영속성 컨텍스트에서 2,3개 생기지 않고 똑같은 애로 관리한다.
그래서 가능하다.

persist라고 해도 db에 쿼리문이 안날라간다.
transaction commit될때 플러쉬가 되면서 쿼리가 날라간다.

스프링에서 @Transactional에는 기본적으로 롤백한다.
@Rollback(false)
어노테이션을 넣으면 롤백되지 않는다.
영속성 컨텍스트가 플러쉬 하지 않는다.
```java
@Autowired 
EntityManager em;

em.flush();
```
로 만들어서 insert문은 보고 DB에는 들어가지 않도록 할수도 있다.


## create vs create-drop
create : 내가 가지고 있는 엔티티를 drop하고 create하고 애플리케이션 실행
create-drop : 마지막에 어플리케이션 종료할때 전부 날려준다.

JPA쓰면서 Protected는 사용하지 말라는 뜻이다.
```java
protected OrderItem(){} 대신 아래와 같이 쓸 수도 있다.
@NoArgsConstructor(access= AccessLevel.PROTECTED)
```


```java
  @PostMapping("/members/new")
  public String create(@Valid MemberForm form, BindingResult result) {

    if (result.hasErrors()){
      return "member/createMemberForm";
    }

    Address address = new Address(form.getCity(), form.getStreet(), form.getZipcode());

    Member member = new Member();
    member.setName(form.getName());
    member.setAddress(address);

    memberService.join(member);
    return "redirect:/";
  }
```
스프링에서 오류가 발생하면 튕기지만, BindingResult가 있으면 오류가 result에 담겨서 클라이언트로 보낼 수 있다.

## 데이터베이스 스키마 자동생성
*운영 장비에는 절대 create, create-drop, update를 사용하면 안된다.*

개발 초기단계는 create 또는 update
테스트 서버는 update 또는 validate
스테이징 운영서버는 validate 또는 none

@Temporal은 사실 사용안해도 된다. Data => LocalDate 또는 LocalDateTime 을 사용하자

@Lob
Lob에는 지정할 수 있는 속성이 없다.
CLOB : String, char[], java.sql.CLOB
BLOB: Byte, java.sql.BLOB

# IDENTITY 전략
기본 키 생성을 데이터베이스에 위임
• 주로 MySQL, PostgreSQL, SQL Server, DB2에서 사용  (예: MySQL의 AUTO_ INCREMENT)
• JPA는 보통 트랜잭션 커밋 시점에 INSERT SQL 실행
• AUTO_ INCREMENT는 데이터베이스에 INSERT SQL을 실행
한 이후에 ID 값을 알 수 있음
• IDENTITY 전략은 em.persist() 시점에 즉시 INSERT SQL 실행 하고 DB에서 식별자를 조회

persist시점에 즉시 INSERT_SQL실행을 하므로 모았다가 쏘는 버퍼링 방식을 이용하지 못하는게 단점이다. ( 사실 한 트랜잭션안에서 여러 네트워크를 타는것은 그닥 성능저하를 못느낀다. 여러 트랜잭션일때 문제가 되는거지)


# SEQUENCE 전략
데이터베이스 시퀀스는 유일한 값을 순서대로 생성하는 특별한 데이터베이스 오브젝트(예: 오라클 시퀀스)
오라클, PostgreSQL, DB2, H2 데이터베이스에서 사용

데이터베이스에서 시퀀스 값만 살짝 갖고온다. (INSERT는 하지 않는다.) commit시점에 insert한다. (버퍼링 가능)
데이터베이스에서 시퀀스 값만 next call로 갖고오면 네트워크가 발생하는데 차라리 insert하는게 낫지 않나?

그래서 allocationSize를 사용한다. (default가 50, 미리 50개를 땡긴다.) 
DB에는 51을 이미 가리키고 있다.(데이터를 50개 넣지 않았는데도)
50개를 다 채우면 next call을 호출한다.
call next value for MEMBER_SEQ;

[twice_call_next](./twice_call_next.png)
call next가 2번 호출된 이유는??

JPA: 처음 호출했을때 1이 호출됐네? 성능 최적화로 인해 50개를 호출해야하는데 왜 1만 오지 다시 호출해보자
DB_SEQ 51이 옴 
그래서 2번 호출이 되는 것이다. 그 다음부터는 메모리에서 호출한다. (DB접근 없이)

DB SEQ = 1 | 1 (1, 51 2번 호출)
DB SEQ = 51 | 2 (MEM)
DB SEQ = 51 | 3 (MEM)
...
DB SEQ = 51 | 50(MEM)

51을 만나는 순간 미리 101까지 호출해야 하므로 next call이 일어난다




# DTO, VO ENTITY
https://stackoverflow.com/questions/21554977/should-services-always-return-dtos-or-can-they-also-return-domain-models

## API를 만들 땐 이유를 불문하고 절대 엔티티를 웹으로 넘기면 안된다. 
API라는 것은 스펙인데, 멤버 엔티티를 반환할때, password가 있으면 지워줘야하는데, 그렇게 되면 
로직이 들어가게 되고 API스펙이 변한다.
그러니 꼭 ! 서버에서 클라이언트에게 값을 전달할 때 멤버 DTO로 변환해서 전송해주자

# (중요)변경 감지와 병합?
## 준영속 엔티티?
영속성 컨텍스트가 더는 관리하지 않는 엔티티를 말한다.

이것은 DB에 접근해서 식별값 (Id)를 갖고옴으로 비영속 상태이다.
데이터베이스에 갔다와서 식별자가 존재하는 것
JPA가 식별할 수 있는 값을 갖고 있다.

```java
Book book = new Book();
book.setId(form.getId());
book.setName(form.getName());
book.setPrice(form.getPrice());
book.setStockQuantity(form.getStockQuantity());
book.setAuthor(form.getAuthor());
book.setIsbn(form.getIsbn());
```
    

DB에서 영속상태인 아이템을 갖고온다.
```java
@Transactional
public void updateItem(Long itemId, Book bookParam){
Item findItem = itemRepository.findOne(itemId);
findItem.setPrice(bookParam.getPrice());
findItem.setName(bookParam.getName());
findItem.setStockQuantity(bookParam.getStockQuantity());
}
```

@Transactional이 끝나면
flush를 하는데 이때 변경된 애를 찾는다.
@Transactional *안에서* 엔티티를 조회해야 영속 상태로 조회가 되고, 거기서 값 변경을 해야 변경감지가 일어난다. 

2. merge

```java
Book book = new Book();
book.setId(form.getId());
book.setName(form.getName());
book.setPrice(form.getPrice());
book.setStockQuantity(form.getStockQuantity());
book.setAuthor(form.getAuthor());
book.setIsbn(form.getIsbn());
```
에서 
이 것을 em.merge(item)을 하면 된다.

기존에 넘어온 파라미터인 item은 영속성 상태로 변하진 않는다.
Item mergeItem = em.merge(item);의 mergeItem 영속성 상태이다.

merge는 전체를 갈아치운다 (Patch라는 개념이 없다 무조건 PUT)
하지만! 값이 없으면 null로 업데이트 된다 그러므로 실무에서는 사용하지 말자



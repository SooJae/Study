# JPA 구동방식

1. Persistence에서 설정정보 조회( META-INF/persistence.xml )
2. 엔티티매니저 팩토리 생성
3. 엔티티 매니저 생성

# JPA로 CRU 하기


```java
EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello"); // 데이터베이스당 하나씩 묶여서 돌아감 hello는 설정파일의 설정 타이틀인 hello을 보고 갖고온다.
EntityManager em = emf.createEntityManager(); // 고객 요청이 올때마다 DB작업을 해야하면 em으로 작업해야 한다.

EntityTransaction tx = em.getTransaction(); // 트랜잭션
```



```java
/**
             * Insert
             */
//            Member member = new Member();
//            member.setId(1L);
//            member.setName("HelloA");
//            em.persist(member);

            /**
             * select
             */
//            Member findMember = em.find(Member.class, 1L);
//            System.out.println("findMember.id = " + findMember.getId());
//            System.out.println("findMember.name = " + findMember.getName());

            /**
             * Update
             */
//            Member findMember = em.find(Member.class, 1L);
//            findMember.setName("helloJPA");

            /**
             * JPQL
             */
            List<Member> result = em.createQuery("select m from Member as m", Member.class)
//                    pagination
                    .setFirstResult(1)
                    .setMaxResults(10)
                    .getResultList();
            // JPQL은 테이블을 대상 X 객체를 대상으로 O, 즉 테이블이 대상이 아니라 객체를 대상으로 쿼리를 날린다.
```

# 영속성
JPA에서 가장 중요한 2가지
- 객체와 관계형 데이터 베이스 매핑하기
- 영속성 컨텍스트

## 영속성 컨텍스트
- JPA를 이해하는데 가장 중요한 용어
- **엔티티를 영구저장하는 환경** 이라는 뜻
- EntityManager.persist(entity) : DB에 저장한다는 것이 아닌, 엔티티를 영속성 컨텍스트 라는 곳에 저장한다는 뜻
- 영속성 컨텍스트는 논리적인 개념
- 눈에 보이지 않는다.
- 엔티티 매니저를 통해서 영속성 컨텍스트에 접근 

EntityManager ---1:1---> PersistenceContext

## J2EE, 스프링 프레임워크 같은 컨테이너 환경
엔티티 매니저와 영속성 컨텍스트가 N:1
EntityManager ->
EntityManager -> PersistenceContext
EntityManager ->

## 영속성 컨텍스트의 이점
- 1차 캐시
- 동일성 보장
- 트랜잭션을 지원하는 쓰기 지연
- 변경 감지
- 지연 로딩

2차캐시 어플리케이션 전체
1차캐시 트랜잭션 내


```java
//Member2 member1 = new Member2(150L, "A");
//Member2 member2 = new Member2(160L, "B");

//em.persist(member1);
//em.persist(member2);

System.out.println("=================");

Member2 member21 = em.find(Member2.class, 150L);
member21.setName("ZZZZ");
em.persist(member21);
```

위에서 잘 못된 부분은? em.persist는 사용하면 안된다!!
컬렉션을 수정할때, 수정하고나서 다시 컬렉션에 집어넣나? 아니다.
참조값을 갖고와서 변경하기 때문에 (맞나? 내 생각이다.) em.persist(member21)부분은 의미가 없을뿐더러 오히려 사용하면 안된다.


## 변경감지

1. flush()
2. 엔티티와 스냅샷 비교 (1차캐시안에 ID, Entity, 스냅샷이 있는데 1차캐시에 최초로 들어온 영속성 컨텍스트를 스냅샷을 떠둔다.)
3. UPDATE SQL 생성

출처 : https://ict-nroo.tistory.com/130

JPA : JPA에서 엔티티를 업데이트할때는 if문을 사용하면 안된다. 나
(데이터가 변경시 데이터가 이전 데이터와 다르면(if문을 써서) update를 할꺼야 X => JPA는 데이터를 변경하면 tx.commit되는 시점에 무조건 업데이트 쿼리를 날리는구나)


# 플러시
영속성 컨텍스트의 변경내용을 데이터베이스에 반영

## 플러시 발생
데이터베이스 커밋될시 자동으로 발생

- 변경 감지
- 수정된 엔티티 쓰기 지연 SQL 저장소에 등록
- 쓰기지연 SQL 저장소의 쿼리를 데이터베이스에 전(등록, 수정, 삭제 쿼리)

## 영속성 컨텍스트를 플러시하는 방법

- em.flush() -직접 
- 트랜잭션 커밋 - 자동
-JPQL 쿼리 실행 -자동

```java
Member2 member1 = new Member2(150L, "A");
em.persist(member);
// tx 커밋까지 못 기다리고 DB에 보내야 할 경우  <----------- em.flush를 써주면 된다.
...

tx.commit();
```
쓰기지연 SQL 저장소에 있는 바뀐 데이터를 데이터에 보내는 것이지 flush를 쓴다고 해서 1차캐시가 비워지는 것은 아니다.

### JPQL실행시 플러시가 자동으로 호출 되는 이유
```java
em.persist(memberA);
em.persist(memberB);
em.persist(memberC);

query = em.createQuery("select m from Member m", Member.class);
List<Member> members = query.getResultList();
```
일경우 사실 persist만 하면 플러시가 발생하지 않는다. (commit을 해야 플러시가 발생하니)
그럴경우 JPQL에서는 조회할 것이 없다. 이런 상황을 방지하기 위해 JPQL을 사용할때는 flush()를 미리 실행한다.


## 결론
플러시는 영속성 컨텍스트를 비우지 않음
영속성 컨텍스트의 변경내용을 데이터베이스에 동기화
(중요)트랜잭션이라는 작업 단위가 중요 -> 커밋 직전에만 동기화 하면 된다.

# 준영속 상태
- 영속(em.persist, em.find로 DB에서 갖고왔을때, 1차캐시에 없을 경우 DB에서 조회해와 1차캐시에 저장) -> 준영속
- 영속 상태의 엔티티가 영속성 컨텍스트에서 분리(detached)
- 영속성 컨텍스트가 제공하는 기능(업데이트, 더티체킹)을 못합

## 준영속 상태로 만들기

- em.detach(entity) : 특정 엔티티만 준영속 상태로 전환
- em.clear() : em에 있는 영속성 컨텍스트를 완전히 초기화.
- em.close() : 영속성 컨텍스트 종료


# 엔티티 매핑
객체와 테이블 매핑 : @Entity, @Table
필드와 컬럼 매핑 : @Column
기본 키 매핑 : @Id
연관관계 매핑 : @ManyToOne, @JoinColumn


#객체와 테이블 매핑
@Entity가 붙은 클래스는 JPA가 관리, 엔티티라 한다.
JPA를 사용해서 테이블과 매핑할 클래스는 @Entity 필수
- 주의
기본생성자 필수
final클래스, enum, interface, inner클래스 사용 x
저장할 필드에 final 사용 x


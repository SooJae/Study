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


# 연관관계

em.persist(team)으로 하면 항상 team에 id값이 들어간다 (PK값이 세팅(id)되고 영속상태 된다.)

객체지향스럽지 않은 방
```java
// 첫번째 경우
Team team = new Team();
team.setName("TeamA");
em.persist(team);

Member2 member2 = new Member2();
member2.setUsername("member1");
member2.setTeamId(team.getId()); // 팀 id를 바꾸려면  team객체를 만들고 Id값을 갖고와서 그것을 setTeamId에 세팅해야한다...
em.persist(member2);

// 두 번째 경우
Member2 findMember = em.find(Member2.class, member2.getId()); // 해당 멤버를 찾아서
Long findTeamId = findMember.getTeamId(); // TeamId를 굳이 가져와서 해야한다.
Team findTeam = em.find(Team.class, findTeamId);
```

객체를 테이블에 맞추어 데이터 중심으로 모델링하면, 협력관계를 만들 수 없다.
테이블은 외래키로 조인을 해서 연관된 테이블을 찾는다.
객체는 참조를 사용해서 연관된 객체를 찾는다.

TeamId를 이용해서 찾으면 안된다.!

```java
@ManyToOne // Many : Member, One : team
@JoinColumn(name = "team_id") // join해야하는 컬럼명은?
private Team team;
```

```java
//    @Column(name = "team_id")
//    private Long teamId;

@ManyToOne
@JoinColumn(name = "team_id")
private Team team;
```

```java
//            Team team = new Team();
            Team team = new Team();
//            team.setName("TeamA");
            team.setName("TeamA");
//            em.persist(team);
            em.persist(team);
//
//            Member2 member2 = new Member2();
            Member2 member2 = new Member2();
//            member2.setUsername("member1");
            member2.setUsername("member1");
//            member2.setTeamId(team.getId());
            member2.setTeam(team); // JPA가 알아서 team에서 PK값을 꺼내서 insert할때 foreign key로 사용한다.
//            em.persist(member2);
            em.persist(member2);
//            Member2 findMember = em.find(Member2.class, member2.getId());
            Member2 findMember = em.find(Member2.class, member2.getId());
//            Long findTeamId = findMember.getTeamId();
//            Team findTeam = em.find(Team.class, findTeamId);
            Team findTeam = findMember.getTeam(); // 위에서 teamId를 갖고와서 그 값으로 다시 찾는것이 아닌 바로 뽑아 쓴다.
            System.out.println("findTeam.getName() = " + findTeam.getName());
```
객체지향스럽게 된다.
또 위의 로직은 sql문을 날리지 않는다.
영속성 컨텍스트에 들어가 있기때문에 (em.persist(team)) db에 접근하지 않고 1차캐시에서 바로 갖고온다.

em.flush(); 싱크 맞추고
em.clear(): 영속성 컨텍스트를 초기화
위의 두개를 em.persist 밑에 적어주면 sql을 날린다.


## 양방향 매핑
테이블 연관 관계는 FK키는 갖고있으면 양방향으로 가능하다 (join을 이용해서 Member에서 Team을 조회할 수 있고, Team에서 Member를 조회할 수 있다.)
하지만 양방향 객체 연관관계는 Member에 Team객체를 갖고있다고 해도 Team에서 멤버를 조회할 수 없다.
그래서 Team에 List members를 만들어줘야 한다.

## 연관관계 주인
외래키가 있는 곳을 연관관계 주인으로 잡는다.
(연관관계 주인)N(Member) : 1(Team)
(연관관계 주인)자동차 바퀴 : 자동차


```java
Member2 findMember = em.find(Member2.class, member2.getId());
List<Member2> members = findMember.getTeam().getMembers(); // 찾은 멤버의 팀의 멤버들 (양방향이다.)
```


### 팀에 새로운 멤버 추가
```java
// 연관관계의 주인
Member2 member2 = new Member2();
member2.setUsername("member1");
em.persist(member2);

// 연관관계의 주인 X
Team team = new Team();
team.setName("TeamA");
team.getMembers().add(member2);
em.persist(team);
```
### 결과
```yaml
SELECT * FROM MEMBER2;
MEMBER_ID  	USERNAME  	TEAM_ID  
1	member1	null
(1 row, 0 ms)

SELECT * FROM TEAM;
TEAM_ID  	NAME  
2	TeamA
(1 row, 0 ms)
```
TEAM_ID가 null인것을 확인 할 수 있다.


```java
//연관관계의 주인 X
Team team = new Team();
team.setName("TeamA");
//            team.getMembers().add(member2);
em.persist(team);

//연관관계의 주인
Member2 member2 = new Member2();
member2.setUsername("member1");
member2.setTeam(team);
em.persist(member2);
```

### 결과
```java
SELECT * FROM MEMBER2;
MEMBER_ID  	USERNAME  	TEAM_ID  
2	member1	1
(1 row, 1 ms)

SELECT * FROM TEAM;
TEAM_ID  	NAME  
1	TeamA
(1 row, 0 ms)
```

이렇게만 하면 JPA에서 인식을 하지만 객체지향적으로 생각해보면, 양쪽에 걸어야 한다.

### em.flush(), em.clear() 를 사용하지 않을때
```java
Team team = new Team();
team.setName("TeamA");
em.persist(team);

Member2 member2 = new Member2();
member2.setUsername("member1");
member2.setTeam(team);
em.persist(member2);

//team.getMembers().add(member2);

Team findTeam = em.find(Team.class, team.getId()); //1차캐시에서 갖고온다.
List<Member2> members = findTeam.getMembers(); //(members가 null이다.)
```
영속성 컨텍스트에 들어갈때, em.find하면 DB에 굳이 쿼리를 안보내고 1차캐시에서 Team객체가 그대로 출력된다. ( add를 하지 않은 상태로 )
commit을 해야 제대로 동작한다.
그래서 team.getMembers().add(member2)를 해야 커밋을 하기 전에도 제대로 동작하는 것을 확인할 수 있다.
또한 테스트 케이스 작성할때도 null이 나올 수 있기때문에 양쪽에 값을 세팅해줘야 한다.


연관관계 편의 메서드를 만들자!
```java
member2.setTeam(team);
team.getMembers().add(members2);

//을 다음과 같이 바꾸자

public void setTeam(Team team){
    this.team = team;
    team.getMembers().add(this);
}
//혹은

public void addMember(Member member){
    member.setTeam(this);
    members.add(member);
}
```
setTeam => changeTeam으로 메서드명을 바꾸는 습관 (로직이 바뀌니)

JSON라이브러리의 무한루프 => 컨트롤에서는 엔티티를 반환하지 말자 (DTO로 변환)

설계할땐 단방향 매핑으로 다 끝내야 한다.

N:M 매핑은 1:N M:1로 매핑시켜야 한다.

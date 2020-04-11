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


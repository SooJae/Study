# POJO(Plain Old Java Object) 평범한 구식 자바 객체

**마틴 파울러**가 EJB(Enterprise JavaBean) 보다는 단순한 자바 오브젝트에 도메인 로직을 넣어 사용하는 것이 여러가지 장점이 있는데도 왜 사람들이 그 EJB가 아닌 '평범한 자바 오브젝트'를 사용하기 꺼려하는지에 의문을 가졌다. EJB와 같은 그럴듯한 이름이 없다고 판단. POJO라는 단어를 만들었다.
POJO에 대해 알려면 EJB에 대해 잘 알아야 합니다.
## EJB와 엔터프라이즈 서비스
서버기반의 자바기술인 J2EE 가 등장했지만, Servlet, JSP 레벨의 최소한의 서버 프로그래밍 인터페이스만 가지고는 복잡한 엔터프라이즈 애플리케이션을 제작하는데 부담이 적지 않았다.
엔터프라이즈 시스템의 복잡도는 두가지 다른 영역에서 증대되었다. 하나는 기업 업무처리의 IT 시스템에 대한 의존도가 높아지면서, 시스템이 다뤄야 하는 비즈니스 로직 자체가 점차로 복잡해졌다.
또 다른 하나는 많은 사용자의 처리요구를 빠르고 안정적이면서 확장 가능한 형태로 유지하기 위해 필요한 로우 레벨의 기술적인 처리 요구들이다. 단순히 DB와 연동하는 수준의 C/S 기반의 standalone 애플리케이션과는 달리 서버에서 동작하는, 그것도 **웹 기반으로 많은 처리 요구를 받는 시스템에는 감당해야 할 중요한 기술적인 요구들이 많다. 대표적으로 트랜잭션 처리, 상태 관리, 멀티 스레딩, 리소스 풀링, 보안 등이 있다.**
애플리케이션 로직의 복잡도와 상세 기술의 복잡함을 개발자들이 한 번에 다룬다는 것은 쉬운 일이 아니었다. 한 개발자가 보험업무와 관련된 계산 로직을 자바로 어떻게 구현해야 하는지에 집중하면서 동시에 **시스템 레벨에서 멀티 DB로 확장가능한 트랜잭션 처리와 보안기능을 멀티스레드 세이프하게 만드는것에 신경을 써야 합니다면 여간 부담되는게 아닐 것 입니다.**
EJB는 이런 문제를 다루기 위하 등장했다. EJB 1.0의 스펙이 제시한 EJB의 비전은 'EJB는 애플리케이션 개발을 쉽게 만들어 줍니다. 애플리케이션 개발자는 로우레벨의 기술들에 관심을 가질 필요도 없다.' 였다.

애플리케이션 개발자들은 다뤄야 하는 **해당 도메인**과 **비즈니스 로직**에만 집중하면 됩니다는 것이었다. 게다가 EJB는 독립적으로 개발한 컴포넌트들을 서버에 자유롭게 배포하고 서로 연동해 사용하게 하는 컴포넌트 기반의 개발 모델을 제시할 뿐더러, 여러 대의 서버에 분산되어 있는 모듈간의 리모팅 처리도 개발자들이 거의 신경쓰지 않고 개발할 수 있게 했다. 더 나아가 자바의 서버 기술을 일관성 있게 구현하게 지원하므로 특정 서버에 종속되지 않고 서버간의 이동성을 보장해줍니다고 약속했다.

하지만, EJB는 불필요할 만큼 과도한 엔지니어링으로 실패한 대표적인 케이스였다. 
## EJB단점 
1. 1%미만의 애플리케이션에서만 필요한 멀티DB를 위한 분산 트랜잭션을 위해 나머지 99%의 애플리케이션도 무거운 JTA기반의 글로벌 트랜잭션 관리기능을 사용해야 했다.
2. EJB의 혜택을 얻기위해 모든 기능이 필요하지 않은 고가의 WAS를 구입해야 했고, 고급 IDE의 도움 없이는 손쉽게 다룰 수 없는 복잡한 설정 파일 속에서 허우적 대야 했다. 
3. EJB컴포넌트는 컨테이너 밖에서는 정상적으로 동작할 수 없으므로, 개발자들을 끝도 없이 반복되는 수정-빌드-배포-테스트의 지루한 과정으로 많은 시간을 낭비해야 했고, 간단한 기능에 대해서조차 자동화된 테스트를 만드는것은 거의 불가능해졌다.
4. 테스트는 서버에 배치후에 대부분 수동으로 했고, 느린 배포작업탓에 그나마 자주 반복되기 힘들게 만들었다. 특별한 경우가 아니라면 그다지 장점이 없는 EJB의 원격분산 모델은 성능을 떨어뜨리고 서버의 복잡도만 증가시켰다. 가장 최악의 문제는 EJB스펙을 따르는 비즈니스 오브젝트들을 **객체지향적인 특징과 장점을 포기해야 했다는 것**이다.
EJB빈은 **상속과 다형성 등의 혜택을 제대로 누릴 수 없었다.** 간단한 기능 하나를 위해서도 **많은 인터페이스와 EJB 의존적인 상속등을 사용해야 했다.**

그럼에도 EJB가 사용되었던 이유는 엔터프라이즈 애플리케이션에서 반드시 필요로하는 주요한 엔터프라이즈 서비스들을 애플리케이션 코드와 분리해서 독립적인 서비스로 사용할 수 있게 만들어줬다는 점이다.
**선언적인 트랜잭션 관리(Declarative Transaction Management)나 역할 기반의 보안 기능(Role based Security)들을 제공**했다. 
1. 비즈니스 오브젝트를 배포하고 관리하는 컨테이너를 제공
2. 기본적인 스레드 관리
3. 인스턴스/리소스 풀링을 제공

한편으로는 '개발자들이 로우레벨의 기술적인 문제에 신경쓰지 않고, 비즈니스 로직에 충실히 개발하게 함으로써 애플리케이션 개발을 손쉽게 만들어줍니다.'는 약속을 지켰다고 볼 수 있다. 하지만 EJB의 문제는 앞서 지적한 것처럼 한편으로는 애플리케이션 개발의 복잡도를 제거하면서 다른 한편으로는 더 많은 문제와 복잡성을 가지고 왔다.

결국 EJB는 형편없는 생산성과 느린 성능, 불필요한 기술적인 복잡도, 벤더사이의 과도하게 높아진 스펙 등으로 인해 자바 엔터프라이즈 개발에 대한 불신을 가중시켰다. 
마침내 마틴 파울러를 비롯한 많은 오피니언 리더들은 EJB와 같은 잘못 설계된 과도한 기술을 피하고, 객체지향 원리에 따라 만들어진 **자바 언어의 기본에 충실하게 비즈니스 로직을 구현하는 일명 POJO 방식**으로 돌아서야 합니다고 지적하고 나섰다. POJO 방식의 개발은 EJB가 잃어버린 소중한 가치인 **객체지향적인 설계와 자동화된 테스트의 편의성 개발 생산성등을 회복시켜 줄 수 있는 길**이기 때문이다.

EJB를 사용하지 않고 POJO를 쓰자는 것이 EJB이전의 방식으로 돌아가는 것을 의미합니다면 또 다른 문제가 발생할 수밖에 없다.
여전히 복잡한 로우레벨의 API를 이용해 코드를 작성해야하고, 많은 기술적인 문제를 애플리케이션 코드에 그대로 노출시켜 개발해야 합니다면 기껏 POJO로의 복귀 덕분에 얻은 많은 장점들을 놓칠 수밖에 없다.

그래서 등장한 것이 바로 **POJO 기반의 프레임워크이다.** POJO 프레임워크는 POJO를 이용한 애플리케이션 개발이 가진 특징과 장점을 그대로 살리면서 EJB에서 제공하는 엔터프라이즈 서비스와 기술을 그대로 사용할 수 있도록 도와주는 프레임워크이다. 가장 대표적인 것을 꼽으라면 하이버네이트와 스프링이다.

## 하이버네이트
는 EJB의 엔티티빈이 제시했던 컨테이너가 관리하는 퍼시스턴스 기술과 오브젝트-관계형 DB매핑 기술을 순수한 POJO를 이용해 사용할 수 있게 하는 POJO 기반의 퍼시스턴스 프레임워크이다.
1. 컨테이너위에서 동작시킬 필요가 없다.
2. 이상적인 매핑을 위해 포기했던 많은 기능과 성능을 객체지향 DB에 적합하게 최적화한 기능을 통해 JDBC API를 직접 사용해 개발하는 것 못지않은 성능과 복잡한 퍼시스턴스 로직을 개발 가능하게 해줬다.
3. 하이버네이트가 사용하는 POJO 엔티티들은 EJB의 엔티티빈과 달리 **객체지향적인 다양한 설계와 구현이 가능**하다. 엔티티의 상속, 다형성, 밸류 오브젝트, 사용자정의 타입 등을 어떠한 기술적인 손해 없이도 그대로 퍼시스턴스 매핑용 오브젝트로 사용할 수 있게 합니다.

## 스프링
은 세션빈이 제공하던 중요한 엔터프라이즈 서비스들을 POJO 기반으로 만든 비즈니스 오브젝트에서 사용할 수 있게합니다.**대표적인 것이 선언적인 트랜잭션 서비스와 보안이다.** 또한 EJB와 마찬가지로 오브젝트 컨테이너를 제공해서 인스턴스의 라이프사이클을 관리하고 필요에 따라 스레딩, 풀링 및 서비스 인젝션 등의 기능을 제공합니다. 또한 OOP를 더 OOP답게 사용할 수 있게 하는 AOP기술을 적용해서 POJO 개발을 더 쉽게 만든다.

## POJO vs 짝퉁 POJO
### POJO 프로그래밍의 진정한 가치는 자바의 객체지향적인 특징을 살려 비즈니스 로직에 충실한 개발이 가능하도록 하는 것 입니다.
그러면서 복잡한 요구조건을 가진 엔터프라이즈 개발의 필요조건을 충족시킬 있도록 POJO기반의 프레임워크를 적절히 사용하는 것이 요구됩니다. 문제는 단지 POJO 프레임워크로 잘 알려진 제품을 사용하기만 하면 자동으로 POJO 개발을 하고있다고 생각하는 경우가 많다는 것 입니다.

### 잘못된 POJO 기반 코드의 예
```java
class MyService {
   private MyDAO myDAO;
   private XXDao xxDAO;
   … 
     public MyVo foo(UrVO urVo) throws MyException
    {
        Connection con = null; 
        try {
            con = DBUtil.getConnection();
       con.setAutoCommit(false);

       if (xxDAO.check(urVo))
            return myDAO.foo(con, urVo);
       
      else
        return myDAO.boo(con, urVo);
      }
 catch (MyException e) {
   con.rollback();
     throw e;
  }
   catch (Exception e) {
     throw new MyException(e, "XXX00001");
      con.rollback();
         }
          finally {
           con.commit();
             DBUtil.close(con);
         }
     }
…
}


class MyDAO { 
public void foo(Connection con, UrVO urVO) throws MyException {

           PreparedStatement pstmt = null;
           try {
              pstmt = new LoggablePreparedStatement(con, QueryFactory.getInstance().getQuery("FOO"));
          pstmt.setInt(1, urVO.getSeq());
          if (pstmt.executeUpdate() != 1) {
                throw new MyException("SVM00009");
}
} catch (MyException e) {
       throw kble;
} catch (Exception e) {
       throw new MyException(e);
} finally {
       DBUtil.close(pstmt);
}
}
…
}
```


## POJO로의 변환

<리스트 1>의 코드를 스프링의 POJO 프로그래밍 모델에 따라 수정해 보자. DAO 코드의 가장 큰 문제점은 JDBC의 오래된 코드 스타일을 그대로 사용하고 있다는 것 입니다. 따라서 try/catch/ finally의 전형적인 템플릿 코드가 실제 DAO 로직보다 더 많은 라인을 차지하고 있다. 또 Query를 불러오는 부분이 싱글톤을 사용하고 있다. 그나마 JDBC 코드를 간략하게 작성하도록 돕는 유틸리티 클래스를 사용했지만 정적 메소드를 이용했다. 싱글톤과 정적메소드는 테스트 코드를 만드는 데 가장 큰 장애물이다. 테스트를 쉽게 하기 위해 모의객체(mock object)로 변환하는 것이 불가능하기 때문이다. 객체지향적인 설계방식을 따른다면 Query를 가져오는 기능을 인터페이스로 만들어 사용하게 하고 이를 구현한 오브젝트를 DAO에서 참조할 수 있도록 하는 것이 바람직하다. 또한 템플릿 스타일의 과도한 코드를 제거하고 반복적인 JDBC 워크플로우를 제거하려면 콜백 방식으로 구현하는 게 좋다. 그러면 DAO의 데이터액세스 로직과 JDBC 처리 워크플로우를 구분할 수 있다. <리스트 2>는 이렇게 스프링을 이용한 POJO 스타일로 수정된 코드이다.#

수정된 DAO
```java
public class MyDAO {
              private DataSource dataSource;
              private SimpleJdbcTemplate jdbcTemplate;
              private QueryFactory queryFactory; 
              // setter methods
              public void foo(UrlVo urlVo) {

jdbcTemplate.update(queryFactory.getQuery("FOO"), urlVo.getSeq());
}
}
```

MyDAO는 DataSource, QuereyFactory라는 협력객체를 인터페이스를 통해 액세스하므로 해당 오브젝트의 구현에 상관없이 동작할 수 있다. **DataSource가 개발용에서 테스트용으로 또 실제 운영서버로 바뀐다고 하더라도 DAO는 그 부분에 신경 쓰지 않고 클래스의 목적인 데이터로직을 구현하는 데만 충실하게 만들어져 동작할 수 있게 되었다.** 테스트를 위해 실제 DB가 아닌 Fake DB나 Embedded DB를 적용합니다면 그 DB 설정을 돌려주는 적절한 DataSource를 MyDAO가 사용하도록 스프링을 통해 설정하면 그만이다.

 
또 **JdbcTemplate이라는 JDBC 워크플로우를 제공하는 템플릿 기반의 Helper 클래스를 사용해서 반복적으로 등장하는 JDBC의 try/catch/finally 작업을 DAO에서 제외하고 순수하게 데이터 처리와 관련된 핵심 로직만 사용하도록 정리했다.** 
결과적으로 코드는 깔끔해지고 여러 클래스에 거쳐 나타나는 지저분한 중복은 제거되었다. 또한 DAO 오브젝트의 역할을 넘어선 것들은 의존하는 오브젝트로 분리하고 그 구현에 종속되지 않도록 인터페이스를 사용하게 했으므로 객체지향적인 설계에 충실한 오브젝트의 설계와 구현에 가깝도록 만들어졌다. 


이번에는 MyService를 살펴보자. MyService의 가장 큰 문제는 무엇인가? 그것은 MyService는 비즈니스 로직을 구현한 클래스임에도 불구하고, 실제로 코드 안에는 그와 상관없는 데이터액세스와 관련된 코드들이 덕지덕지 붙어 있다. MyService에 나타난 커넥션과 트랜잭션 처리 코드들은 어찌 보면 어쩔 수 없는 선택으로 생각할 수도 있다. DAO를 분리해 놓은 상태로, MyService에서 여러 개의 DAO를 호출해 처리하는 결과를 하나의 커넥션과 트랜잭션으로 묶으려면 MyService 레벨에서 처리해야 하기 때문이다. 그렇지 않고 DAO 메소드 단위로 커넥션과 트랜잭션을 다루면 더 심각한 결과를 가져온다. 하지만 결과적으로 MyService는 DB 처리 코드와 로직 코드가 짬뽕되어 있는 지저분한 코드가 되었고, DB 관련 코드와 구현에 종속이 되었으므로 MyService는 객체지향적인 장점을 살려 재활용되거나 발전하는 데 극히 제한을 받게 됩니다. 만일 트랜잭션 처리가 JDBC 방식에서 JTA로 바뀌었다면?



MyService처럼 구현한 모든 서비스/비즈니스 로직 코드를 일일이 수정해야 하는 중노동에 시달려야 합니다. 하나의 클래스에 여러 가지 레이어의 기술이 짬뽕되고 책임이 중복되어 나타나며 한 가지 기능을 수정하기 위해 수많은 클래스를 수정해야 합니다면 이것이 과연 POJO를 지지하는 사람들이 기대했던 바로 그 POJO 프로그래밍의 장점이라고 할 수 있을까?

### 수정된 MyService
```java
class MyService {
     private MyDAO myDAO;
     private XxDAO xxDAO;
// setter methods
public void foo(UrVo urVo) {
    if (xxDAO.check(urVo))
       return myDAO.foo(con, urVo);
else
      return myDAO.boo(con, urVo);
 }
…
}
```

MyService를 순수한 비즈니스 로직에 충실한 POJO 기반으로 변경하려면 스프링과 같은 POJO 프레임워크의 도움이 절실히 필요하다. **겉으로 드러나는 DB 커넥션, 예외처리, 트랜잭션과 관련된 부분을 비즈니스 로직을 구현한 MyService에서 분리하기 위해서는 AOP 기술의 도움이 필요하기 때문이다.** '수정된 MyService'는 스프링의 AOP로 선언적 트랜잭션 관리 기능을 적용해 변경한 MyService 코드이다.
MyService의 모든 지저분한 DB와 트랜잭션 처리 블록이 모두 제거되었다. 남은 것은 MyService의 비즈니스 로직에 충실한 코드들뿐이다. 필요에 따라 적절한 DAO를 호출해서 퍼시스턴스 관련된 기능을 DAO를 통해 처리하는 것만 있다. 이는 객체지향적인 설계 모델에 충실하게 만들어져 있다.


한 가지 남은 문제는 **테스트 유용성**인데, MyService의 메소드를 테스트하기 위해서는 MyDAO, XxDAO가 필요하다. DAO는 DB를 역시 필요로 하므로 MyService를 테스트하기 위해 그 메소드를 호출하면 2개의 DAO 코드와 DB까지 동작이 필요하기 때문이다. DB까지 연동하는 테스트는 그 데이터 준비도 만만치 않거니와 시간도 많이 걸린다. 따라서 테스트를 만들고 자주 수행하는 데 어려움을 줍니다.

이를 위해 MyDAO를 다시 생각해 볼 필요가 있다. MyService 입장에서 MyDAO는 오브젝트를 장기간 보존하고 그것을 다시 조회하도록 돕는 퍼시스턴스 기능의 필요에 따라 사용하는 대상이다. 그 구현이 어떻게 되는지는 중요하지 않을 뿐더러 퍼시스턴스 구현이 필요하면 바뀔 수도 있다고 가정하면 지금과 같은 **MyDAO의 클래스를 직접 액세스하는 구조는 바람직하지 않다.** 전략패턴(Strategy Pattern)의 개념을 적용해서 **MyDAO를 인터페이스와 구현으로 분리하고 MyService는 MyDAO 인터페이스를 사용하도록 수정하면 이 문제를 모두 해결할 수 있다.** 먼저 MyDAO 인터페이스를 정의합니다.

```java
interface MyDAO {
void foo(UrVo);
}
그리고 이를 구현하는 클래스를 만든다.
class MyJdbcDAO implements MyDAO {
…
}
```

이제 MyService는 MyDAO라는 인터페이스에 대해 프로그래밍하는 구조로 바뀌었다. 이것의 장점은 MyDAO의 구현이 언제든지 교체 가능하다는 것 입니다. 구현한 알고리즘을 통째로 교환해 사용할 수 있게 하는 것이 전략패턴의 특징이다. DAO 구현이 필요에 따라 JDBC가 아닌 하이버네이트나 다른 종류의 퍼시스턴스여야 합니다면 언제든지 MyDAO 인터페이스를 구현해 만들면 됩니다. MyService는 구현이 바뀌는 것에 전혀 영향 받지 않는다.

MyService의 로직이 복잡해 구현하면서 **자주 테스트가 필요하다면 MyDAO 인터페이스를 구현한 간단한 테스트용 DAO 클래스를 만들어 MyService가 그것을 사용하도록 만든다.** 이는 MyService와 MyDAO의 관계를 느슨하게 만들어 주었기 때문에 모두 가능한 것 입니다. 여기서 나온 MyService와 MyDAO는 아직 개선의 여지가 남아 있다. 하지만 일단 여기까지만 살펴보자. 

여기서 사용한 기법들은 모두 객체지향의 기본 설계원리와 패턴에 등장하는 것들이지 어떤 최신 기법들이 아니다. 물론 AOP라는 새로운 기술을 사용하지만, 그것이 추구하는 것은 또 다른 프로그래밍 모델이 아닌 OOP에 더 충실한 자바 코드를 만드는 데 도움을 주는 것일 뿐이다. 

앞에서 살펴본 것처럼 POJO 기반의 프레임워크를 가져다 사용하기만 했다고 해서 POJO 프로그래밍이 되고 그 유익을 누리는 것은 결코 아니다. POJO가 지향하는 자바의 객체지향적인 설계의 기본에 충실하도록 POJO 프레임워크의 도움을 받아 구현하는 것이 진정한 POJO 프로그래밍이다. 결과적으로 이렇게 만들어진 POJO 기반의 코드는 EJB나 그 이전의 자바개발 방법을 따라 만든 어떤 코드보다 더 간결하고 깔끔해진다. 이것이 객체지향 언어인 자바를 사용하면서 누려야 하는 진정한 혜택이 아닐까.
 

풍성한 도메인 모델

이제는 POJO 개발의 조금 다른 영역을 생각해 보자. **POJO의 자바 오브젝트가 지닌 기본 특징은 하나의 오브젝트 안에 상태(State)와 행위(Behavior)를 모두 가지고 있는 것**이다. 쉽게 말해 인스턴스 변수와 로직을 가진 메소드를 가지고 있다는 의미이다. 문제는 자바의 그런 특성이 EJB에 와서 이상한 오브젝트 형태로 왜곡된 것 입니다. 빈약한 오브젝트(anemic object)라고 불리는 것이 바로 그것으로, **로직이 없고 상태만 가진 오브젝트들이 다수 사용되었다.** 그러면 그 로직에 해당하는 행위는 어디로 갔을까? 그것은 절차적인(procedural) 스타일로 작성된 서비스 레이어의 메소드로 들어갔다. 결과적으로 서비스 오브젝트는 과도한 로직이 트랜잭션 스크립트 형태로 반복되어 길게 등장하면서 갈수록 비대해졌고, 도메인 모델을 구현한 오브젝트는 빈약한 오브젝트로 오로지 상태 인스턴스 변수만 가진 전혀 객체지향 언어 답지 않은 결과만 남게 되었다.

 
이러한 스타일은 EJB뿐만 아니라 그 이후에 등장한 POJO 기반의 프로그래밍에서도 쉽게 찾아볼 수 있다. `계좌이체 서비스 클래스`와 `Account 도메인 클래스`는 각각 은행의 계좌를 이체하는 서비스의 메소드와 계좌를 구현한 도메인 모델이다.
계좌이체 서비스 클래스
```java
public class MoneyTransferServiceProceduralImpl implements MoneyTransferService {
     private AccountDAO accountDAO;
     private BankingTransactionDAO bankingTransactionDAO;

public BankingTransaction transfer(String fromAccountId, String toAccountId, double amount) {
      Account fromAccount = accountDAO.findAccount(fromAccountId);
      Account toAccount = accountDAO.findAccount(toAccountId);
              assert amount > 0;
             double newBalance = fromAccount.getBalance() - amount;
             switch (fromAccount.getOverdraftPolicy()) {
             case Account.NEVER:
               if (newBalance < 0)
                 throw new MoneyTransferException("In sufficient funds");
     break;
     case Account.ALLOWED:
       Calendar then = Calendar.getInstance();
       then.setTime(fromAccount.getDateOpened());
       Calendar now = Calendar.getInstance();
       double yearsOpened = now.get(Calendar.YEAR) - then.get(Calendar.YEAR);
         int monthsOpened = now.get(Calendar.MONTH) - then.get(Calendar.MONTH);
         if (monthsOpened < 0) {
         yearsOpened--;
         monthsOpened += 12;
      }
      yearsOpened = yearsOpened + (monthsOpened / 12.0);
      if (yearsOpened < fromAccount.getRequiredYearsOpen() ||        newBalance < fromAccount.getLimit())
throw new MoneyTransferException("Limit exceeded");
break;
default:
        throw new MoneyTransferException("Unknown overdraft type: " + fromAccount.getOverdraftPolicy());
}
     fromAccount.setBalance(newBalance);
     toAccount.setBalance(toAccount.getBalance() + amount);
     TransferTransaction txn = new TransferTransaction(fromAccount, toAccount, amount, new Date());
      bankingTransactionDAO.addTransaction(txn);
      return txn;
    }
}
```
Account 도메인 클래스
```java
 public class Account {
      public static final int NEVER = 1;
      public static final int ALLOWED = 2;

      private int id;
      private double balance;
      private int overdraftPoicy;
      private String accountId;
      private Date dateOpened;
      private double requiredYearsOpen;
      private double limit;
      // getters/setters
}
```

MoneyTransferServiceProceduralImpl의 transfer 메소드는 길고 복잡하다. 자세히 살펴보면 사실 Account라는 오브젝트에 속해야 하는 로직들이 이체서비스의 서비스 로직에 빠져나와 있습니다을 알 수 있다. 반면에 Account 오브젝트에는 행위(메소드)는 없고 상태(필드)만 남아 있다. 만일 여기서 사용된 Account에 마땅히 들어가야 할 내용이 다른 곳에서 또 필요하다면? 그때는 복잡한 로직 코드가 여기저기 중복될 수밖에 없다. 
그럼 객체지향 기술의 장점을 충분히 누릴 수 있도록 이 코드를 POJO답게 수정해 보자. 가장 간단한 방법은 **Account 오브젝트가 가지고 있어야 하는 행위를 Account로 옮기는 것**이다. `수정된 계좌이체 서비스 클래스`과 `수정된 Account 오브젝트`은 각각의 코드를 수정한 것 입니다.

수정된 계좌이체 서비스 클래스
```java
public class MoneyTransferServiceProceduralImpl implements MoneyTransferService {
    …
     public BankingTransaction transfer(String fromAccountId, String toAccountId, double amount) {
       Account fromAccount = accountDAO.findAccount(fromAccountId);
       Account toAccount = accountDAO.findAccount(toAccountId);
assert amount > 0;

        fromAccount.debit(amount);
        toAccount.credit(amount);

        TransferTransaction txn = new TransferTransaction(fromAccount, toAccount, amount, new Date());
         bankingTransactionDAO.addTransaction(txn);
         return txn;
}
}
```

수정된 Account 오브젝트
```java
class Account {
      // fields
     // getters/setters
     …
public void debit(Account fromAccount, double amount) {
     double newBalance = getBalance() ? amount;
     switch (getOverdraftPolicy()) {
         ... 
    }
     setBalance(newBalance);
}

public void credit(Account toAccount, double amount) { 
    setBalance(getBalance() + amount);
  }
}
```


이체서비스 오브젝트 안의 한 메소드에 지저분하게 들어 있던 이체 로직은 그 로직이 있어야 할 Account 안에 절절한 메소드 형태로 옮겨졌다. 서비스 메소드에서는 그 오브젝트의 메소드를 호출해 서비스 로직을 수행하는 간단하고 명확한 코드로 역시 변경되었다. 이제 Account 오브젝트는 여러 로직과 계층에서 자신의 로직을 분산해 복사할 것 없이, 오브젝트 그대로 재활용되어 사용되는 객체지향의 혜택을 누릴 것 입니다. 또한 POJO이므로 Account와 MoneyTransferServiceProceduralImpl 모두 쉽게 테스트할 수 있다. 이렇게 객체지향 원리에 충실하게 도메인 모델을 만드는 것을 풍성한 도메인 모델(Rich Domain Model)이라고 합니다.

 

진정한 POJO 프로그래밍 추구하기

POJO를 잘 사용하면 군더더기 없는 최소한의 코드로 이전과 동일한 결과를 낼 수 있지만, 더 중요한 의미는 더 건강한 코드를 만드는 데 있다.
단지 어느 순간에 상태가 좋다고 해서 건강하다고 할 수는 없다. 건강이란 외부의 스트레스와 변화에도 흔들리지 않고 견고하게 버틸 수 있는 힘인데, 이렇게 건강한 코드를 만들기 위해서는 반드시 자동화된 테스트 코드를 개발해야 합니다. 잘 만들어진 테스트 코드는 지속적인 변화에 유연하게 대응할 수 있도록 도와줍니다. 변화를 두려워하지 않게 만들고 코드의 구조를 개선하기 위한 리팩토링도 안심하고 진행할 수 있게 지원합니다. 또한 POJO로 잘 설계된 코드는 테스트 코드를 쉽게 만들 수 있도록 해줍니다. 이런 선순환이 지속되면 POJO 프로그래밍은 더 성숙된 결과로 나아가게 될 것 입니다. 그래서 필자는 POJO 프로그래밍의 꽃은 테스트 코드 작성이라고 생각합니다. 


【 2005년에 프랑스의 온라인 세무시스템은 큰 변화를 겪었다. 기존에 EJB와 J2EE 기반으로 구현된 기존 시스템을 스프링과 하이버네이트를 사용하는 POJO 방식으로 전환한 것 입니다. 단 3개월 만에 시스템의 구조를 변환하면서 동시에 50개의 새로운 유즈케이스와 100개의 새로운 화면, 150개의 기존 화면을 전환시켰다. 
그 결과는 매우 성공적이었다. 손쉽게 작성할 수 있는 테스트와 간단한 패키징, 배포작업이 용이해졌고 지저분한 템플릿 코드를 제거하면서 생산성이 극대화되었다. 또한 기술적인 리스크가 줄고 일관성 유지가 쉬워졌으며 풍성한 도메인 모델을 적용하고 모든 레이어에 걸처 테스트를 작성하게 되어 큰 폭의 품질 향상이 이뤄졌다. 】


 EJB나 무거운 기존 기술의 굴레에서 벗어나 객체지향 기술의 혜택을 가득 누릴 수 있는 즐거운 POJO 프로그래밍에 한번 도전해 보자. 혹시 지금 POJO 프레임워크를 사용해 개발하고 있다면 과연 자신이 만든 코드가 POJO의 원칙에 맞게 작성되었는지 살펴보자. 그리고 마지막에는 반드시 테스트를 작성하라. 그것이 POJO를 POJO답게 쓰게 하고 그 가치를 누리도록 도와줄 것 입니다.


 출처: https://itewbm.tistory.com/entry/POJOPlain-Old-Java-Object


### 스프링
# 프레임 워크 
특정한 목적에 맞게 프로그래밍을 쉽게하기 위한 약속.

# 스프링
자바언어를 기반으로 다양한 어플리케이션을 제작하기 위한 약속된 프로그래밍 툴.

예전 EJB의 경우 고가의 장비(WAS등)이 필요되어지고, 개발환경 및 설정 그리고 테스트환경에 많은 애로사항들이 존재.
하지만 스프링의 경우 톰캣을 이용할 수 있으며, EJB에 비해서 코드의 경량화 그리고 개발중에 테스트가 쉽다는 점이 특징이다.
위에서 언급한 내용은 스프링의 전체적인 특징이다.

설정
Use Tomcat installation 체크, publish module contexts to seperate XML files 체크

Spring Tool Suite 플러그인 설치
help -> Eclipse marketplace

xml - > 자바 설정에 관한 사이트 http://wonwoo.ml/index.php/post/640

# DI(Dependency Injection)와 IOC 컨테이너

## A객체는 B,C,D객체에 의존합니다.
방법 1: A객체가 B,C,D객체를 직접 생성 합니다. (new B, C, D)

방법 2: A객체에 setter() 또는 construct() 생성자에서 B라는 객체와 C라는 객체가 필요할때 b또는 c라는 객체를 만들고, setter또는 construct에서 this.b, this.c 로 생성자를 받는다. 
B,C 객체 외부에 생성하여 A객체에 넣어 줍니다.
스프링은 방법 2를 사용합니다.

**DI와 IOC 컨테이너 그림 보기**

IOC 컨테이너 : 부품이 담겨 있는 컨테이너

스프링이란?
부품을 생성하고 조립하는 라이브러리 집합체

```java
package com.javalec.ex;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class MainClass {

	public static void main(String[] args) {

		//스프링이 적용되지 않은 방식
		/*
		MyCalculator myCalculator = new MyCalculator();
		myCalculator.setCalculator(new Calculator());
		
		myCalculator.setFirstNum(10);
		myCalculator.setSecondNum(2);
		
		myCalculator.add();
		myCalculator.sub();
		myCalculator.mul();
		myCalculator.div();
		*/

        //스프링에 DI 방식이 적용된 개발 방법
		
		String configLocation = "classpath:applicationCTX.xml";
		AbstractApplicationContext ctx = new GenericXmlApplicationContext(configLocation); //xml을 파싱해주는 클래스. 
		MyCalculator myCalculator = ctx.getBean("myCalculator", MyCalculator.class);
		
		myCalculator.add();
		myCalculator.sub();
		myCalculator.mul();
		myCalculator.div();
		
	}
	
}
```



applicationCTX.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

	<bean id="calculator" class="com.javalec.ex.Calculator" />
	
	<bean id="myCalculator" class="com.javalec.ex.MyCalculator">
		<property name="calculator"> 변수 1
			<ref bean="calculator"/> id=calculator를 참조합니다.
		</property>
		<property name="firstNum" value="10" /> 변수 2
		<property name="secondNum" value="2"></property> 변수 3
	</bean>

</beans>


```

applicationCTX.xml(Context라는 뜻)
```xml
<bean id="myCalculator" class="com.javalec.ex.MyCalculator">
		<property name="calculator"> 변수 1
			<ref bean="calculator"/> id=calculator를 참조합니다.
		</property>
		<property name="firstNum" value="10" /> 변수 2 setter의 역할(자바에선 setFirstNum)
		<property name="secondNum" value="2"></property> 변수 3 setter의 역할(자바에선 setSecondNum)
</bean>
```
을 자바로 바꾸면

```java
private int firstNum;
private int secondNum;

public void setFirstNum(int firstNum){
    this.firstNum = firstNum;
}
public void setSecondNum(int secondNum){
    this.secondNum = secondNum;
}
```
```xml
<bean id="myInfo" class="com.javalec.ex.MyInfo">
    <property name="name">
        <value>홍길동</value>
    </property>

    <property name="height">
    <value>176</value>
    </property>

    <property name="weight" value="65">
   
    <property name="hobbys">
        <list>
        <value>수영</value>
        <value>요리</value>
        <value>독서</value>
        </list>
    </property>
    <property name="bmiCalculator">
    <ref bean="BMICalculator"/>
    </property>
</bean>
```


```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

	<bean id="bmiCalcaulator" class="com.javalec.ex.BMICalculator">
		<property name="lowWeight">
			<value>18.5</value>
		</property>
		<property name="normal">
			<value>23</value>
		</property>
		<property name="overWeight">
			<value>25</value>
		</property>
		<property name="obesity">
			<value>30</value>
		</property>
	</bean>
	
	<bean id="myInfo" class="com.javalec.ex.MyInfo">
		<property name="name">
			<value>홍길동</value>
		</property>
		<property name="height">
			<value>187</value>
		</property>
		<property name="weight">
			<value>84</value>
		</property>
		<property name="hobbys">
			<list>
				<value>수영</value>
				<value>요리</value>
				<value>독서</value>
			</list>
		</property>
		<property name="bmiCalculator">
			<ref bean="bmiCalcaulator"/>
		</property>
	</bean>

</beans>
```


```java
package com.javalec.ex;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class MainClass {
	
	public static void main(String[] args) {
		
		String configLocation = "classpath:applicationCTX.xml";
		AbstractApplicationContext ctx = new GenericXmlApplicationContext(configLocation); // 스프링 컨테이너 생성
		MyInfo myInfo = ctx.getBean("myInfo", MyInfo.class); //스프링 컨테이너에서 컴포넌트 가져옴
		myInfo.getInfo();
		ctx.close();
		
	}
	
}
```

# DI 활용

DI 사용에 따른 장점

```java
AbstractApplicationContext ctx = new GenericXMLApplication("classpath:applicationCTX.xml");
Pencil pencil = ctx.getBean("pencil", Pencil.class);
pencil.use();

ctx.close();
```
xml 파일들
```xml
1.
<bean id="pencil" class="com.javalec.Pencil4B"/>
...
2.
<bean id="pencil" class="com.javalec.Pencil6B"/>
...
3.
<bean id="pencil" class="com.javalec.PencilWithEraser"/>
...
```
이렇게 되어있을때 1번을 쓰다가 2번을 바꾸려고 하면, 자바파일의 수정 없이 바꿀수 있다. 다만 Pencil.class부분때문에 자바파일을 수정해야 하는 것 처럼 보이는데, 이것 또한 Pencil interface로 implements를 합니다면 해결이 됩니다. 즉, 자바 파일은 전혀 수정할 필요가 없다.

[DI의 이점 설명 유튜브](https://www.youtube.com/watch?v=wqHBAmIZcvg&list=PLieE0qnqO2kTyzAlsvxzoulHVISvO8zA9&index=68)



XML 파일을 이용한 DI 설정 방법

```xml
<bean id="myInfo" class="com.javalec.ex.MyInfo">
<!-- 생성자 설정(기초데이터) -->
		<constructor-arg value="홍길동"/>      
<!-- setter() 설정(property)  -->
		<property name="height">
			<value>187</value>
		</property>
		<property name="weight">
			<value>84</value>
		</property>
<!-- 생성자 설정(객체 데이터) -->
		<property name="hobbys">
			<list>
				<value>수영</value>
				<value>요리</value>
				<value>독서</value>
			</list>
		</property>
		<property name="bmiCalculator">
			<ref bean="bmiCalcaulator"/>
		</property>
	</bean>

</beans>
```


```xml
<constructor-arg value="홍길동" />
<property name="sisterName" value="홍길자"/>
<property name="brotherName" value="홍오빠"/>
```
을 아래와 같이 바꿀 수 있다.
```xml
<bean id="family" class="com.javalec.ex.Family" c:papaName="홍길동" p:sisterName="홍길자">
		<property name="brotherName" value="홍오빠" />
</bean>
```

쓰려면 위에 다음과 같이 써줘야 합니다.
```xml
xmlns:c="http://www.springframework.org/schema/c"
xmlns:p="http://www.springframework.org/schema/p"
```


자바를 이용한 DI 설정 방법.
```java
@Configuration  //'이 클래스는 스프링 설정에 사용되는 클래스' 라고 명시해주는 어노테이션.
public class ApplicationConfig{ 
    
@Bean //@Bean -객체 생성
public Student student1(){

    ArrayList<String> hobbys = new ArrayList<String>();
    hobbys.add("수영");
    hobbys.add("요리");

    Student student = new Student("홍길동",20,hobbys); // 생성자에 설정
    student.setHeight(180); //프로퍼티에 설정
    student.setHeight(80);

    return student;
}
}
```

MainClass.java
```java
package com.javalec.ex;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class MainClass {

	public static void main(String[] args) {
		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(ApplicationConfig.class);
		
		Student student1 = ctx.getBean("student1", Student.class);
		System.out.println("이름 : " + student1.getName());
		System.out.println("나이 : " + student1.getAge());
		System.out.println("취미 : " + student1.getHobbys());
		System.out.println("신장 : " + student1.getHeight());
		System.out.println("몸무게 : " + student1.getWeight());
		
		Student student2 = ctx.getBean("student2", Student.class);
		System.out.println("이름 : " + student2.getName());
		System.out.println("나이 : " + student2.getAge());
		System.out.println("취미 : " + student2.getHobbys());
		System.out.println("신장 : " + student2.getHeight());
		System.out.println("몸무게 : " + student2.getWeight());
		
		ctx.close();
	}
	
}
```
위의 코드를 보면 객체가 AnnotationConfigApplicationContext인 것을 확인 할 수 있다.
AnnotationConfigApplicationContext는 GenericApplicationContext를 상속 받고 있다.
즉, XML로 다시 변환해서 파싱됩니다.(그럼 굳이 java를 쓸 필요가?) 그래서 잘 안씁니다.



ApplicationConfig.java
```java
package com.javalec.ex;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

	@Bean
	public Student student1(){
		
		ArrayList<String> hobbys = new ArrayList<String>();
		hobbys.add("수영");
		hobbys.add("요리");
		
		Student student = new Student("홍길동", 20, hobbys);
		student.setHeight(180);
		student.setWeight(80);
		
		return student;
	}
	
	@Bean
	public Student student2(){
		
		ArrayList<String> hobbys = new ArrayList<String>();
		hobbys.add("독서");
		hobbys.add("음악감상");
		
		Student student = new Student("홍길순", 18, hobbys);
		student.setHeight(170);
		student.setWeight(55);
		
		return student;
	}
	
}
```


## 자바와 XML을 혼용해서 사용하기

### XML 파일에 자바파일을 포함시켜 사용하는 방법

applicationCTX.xml 파일 안에 다음과 같은 키워드를 넣어줍니다.
```xml
<!-- XML파일 안에 자바파일을 넣어 사용하겠다. -->
<context:annotation-config /> 
<!-- ApplicationConfig 이다. -->
<bean class="com.javalec.ex.ApplicationConfig" />
```

### 자바 파일에 XML 파일을 포함시켜 사용하는 방법

ApplicationConfig.java 파일 안에 다음과 같은 키워드를 넣어줍니다.
```java
@Configuration
@ImportResource("classpath:applicationCTX.xml")
public class ApplicationConfig{
    ...
}
```


# 생명주기와 범위
## 1. 스프링 컨테이너 생성
```java
GenericXmlApplicationContext ctx = new GenericApplicationContext();
```
## 2. 스프링 컨테이너 설정
```java
ctx.load("classpath:applicationCTX.xml");
ctx.refresh();
```

## 3. 스프링 컨테이너 사용
```java
Student student = ctx.getBean("student", Student.class);
System.out.println("이름 :"+ student.getName());
System.out.println("이름 :"+ student.getAge());
```

## 4. 스프링 컨테이너 종료
```java
ctx.close
```




1번째 방법.
```java
public class Student implements InitializingBean, DisposableBean{

	private String name;
	private int age;
	
	public Student(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public String getName() {
		return name;
	}
	
	public int getAge() {
		return age;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		// TODO Auto-generated method stub
		System.out.println("afterPropertiesSet()");
	}

	@Override
	public void destroy() throws Exception {
		// TODO Auto-generated method stub
		System.out.println("destroy()");
	}
	
}

```

2번째 방법
```java
package com.javalec.ex;

import javax.annotation.*;

public class OtherStudent  {

	private String name;
	private int age;
	
	public OtherStudent(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public String getName() {
		return name;
	}
	
	public int getAge() {
		return age;
	}
	
	@PostConstruct
	public void initMethod() {
		System.out.println("initMethod()");
	}
	
	@PreDestroy
	public void destroyMethod() {
		System.out.println("destroyMethod()");
	}

}

```


```
afterPropertiesSet()
initMethod()
11월 04, 2018 5:57:22 오후 org.springframework.context.support.AbstractApplicationContext doClose
정보: Closing org.springframework.context.support.GenericXmlApplicationContext@37f8bb67: startup date [Sun Nov 04 17:57:22 KST 2018]; root of context hierarchy
11월 04, 2018 5:57:22 오후 org.springframework.beans.factory.support.DefaultSingletonBeanRegistry destroySingletons
정보: Destroying singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@67b6d4ae: defining beans [org.springframework.context.annotation.internalConfigurationAnnotationProcessor,org.springframework.context.annotation.internalAutowiredAnnotationProcessor,org.springframework.context.annotation.internalRequiredAnnotationProcessor,org.springframework.context.annotation.internalCommonAnnotationProcessor,student,otherStudent,org.springframework.context.annotation.ConfigurationClassPostProcessor.importAwareProcessor]; root of factory hierarchy
destroyMethod()
destroy()
```

스프링 빈은 scope가 singleton으로 되어있다.

# Environment

설정값 (ex) DB의 아이피 주소 등등) 을 자바코드 내에 갖고있는 것이 아니라, 외부에 놓고 프로그램이 필요할 때, 그 정보값을 갖고 온다.

Context --ctx.getEnvironment()--> Environment --env.getPropertySources() --> PropertySources(프로퍼티 추가 및 추출)
Environment객체 안에 바로 정보가 있는 것이 아니라, 프로퍼티소스라고 하는 애들이 위치해있다.(객체) Property source안에 정보들이 있다.
그 정보들을 계속 스캔하다가 내가 필요한 정보가 있으면, 우리에게 반환을 해줍니다. 

추가 : propertySources.addLast()
추출 : env.getProperty()

##Environment 객체를 이용한 설정

MainClass.java
```java
package com.javalec.ex;

import java.io.IOException;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.io.support.ResourcePropertySource;

public class MainClass {

	public static void main(String[] args) {
		
		ConfigurableApplicationContext ctx = new GenericXmlApplicationContext();
		ConfigurableEnvironment env = ctx.getEnvironment();
		MutablePropertySources propertySources = env.getPropertySources();
		
		try {
			propertySources.addLast(new ResourcePropertySource("classpath:admin.properties"));
			
			System.out.println( env.getProperty("admin.id") );
			System.out.println( env.getProperty("admin.pw") );
		} catch (IOException e) {}
		
		GenericXmlApplicationContext gCtx = (GenericXmlApplicationContext)ctx;
		gCtx.load("applicationCTX.xml");
		gCtx.refresh();
		
		AdminConnection adminConnection = gCtx.getBean("adminConnection", AdminConnection.class);
		System.out.println("admin ID : " + adminConnection.getAdminId());
		System.out.println("amdin PW : " + adminConnection.getAdminPw());
		
		gCtx.close();
		ctx.close();
		
	}
	
}
```


## 프로퍼티 파일을 이용한 설정

[환경설정 동영상](https://www.youtube.com/watch?v=9cDHggH0ENA&index=71&list=PLieE0qnqO2kTyzAlsvxzoulHVISvO8zA9)

## 프로파일(profile) 속성을 이용한 설정


# AOP(Aspect Oriented Programing)
OOP(Object Oriented Programing) : 객체 지향 프로그램
AOP: 관점 지향 프로그램
프로그램밍을 하다보면, 공통적인 기능이 많이 발생 합니다. 이러한 공통 기능을 모든 모듈에 적용하기 위한 방법으로 상속을 통한 방법이 있다.
상속도 좋은 방법이긴 하지만 몇 가지 문제가 있다. 우선 **JAVA에서는 다중상속이 불가능** 하므로 **다양한 모듈에 상속기법을 통한 공통 기능 부여는 한계가 있다.**
그리고, **기능 구현 부분에 핵심 기능 코드와 공통 기능 코드가 섞여 있어 효율성이 떨어집니다.**

위의 상속을 통한 방법에 한계가 있어 AOP가 등장하게 되었습니다.
AOP방법은 **핵심 기능**과**공통 기능**을 **분리**시켜놓고, **공통 기능을 필요로 하는 핵심 기능들**에서 **사용**하는 방식이다.
**핵심 기능** 은 쌀을 씻고, 깨끗한 물을 적당히 넣고, 전자 밥솥에 내솥을 넣고, 취사버튼을 누르는 기능들이다.
**공통 기능**은 수도꼭지를 열어 물을 받고, 쌀이 깨끗이 씻겼는지 눈으로 판단하고, 물이 적당한지 판단하는 기능이다.

이러한 기능이 공통기능인 것은 밥을 짓는 행동이 **아닐 때도** 우리는 수도 꼭지를 열고, 눈으로 사물을 보고 **적절한 판단**을 하기 때문에 공통기능 이라고 하였습니다.
어쨌든, 이렇게 핵심 기능과 공통기능을 분리해 놓고, 추후에 밥을 짓는 행동 말고 팥을 쑬때도 핵심기능은 변하지만, 공통 기능은 다시 적용할 수 있을 것 입니다.
AOP 기법이 바로 이러한 것 입니다. 공통 기능을 핵심 기능과 분리해 놓고, 공통 기능 중에서 핵심 기능에 적용하고자 하는 부분에 적용하는 것 입니다.

공통기능은 계속 재활용을 하고 핵심기능은 바뀔 수 있다.

AOP 용어
Aspect : 공통 기능
**Advice** : Aspect의 기능 자체 (Aspect의 주요 내용)
Jointpoint : Advice를 적용해야 되는 부분 (ex, 필드, 메소드)(스프링에서는 메소드만 해당)
(핵심기능들 하나하나)
Pointcut : Jointpoint의 부분으로 실제로 Advice가 적용된 부분 (핵심기능중에 나는 공통기능을 넣겠다.)
Weaving : Advice를 핵심 기능에 적용하는 행위


스프링에서는 AOP 관련된 것에서 method에만 공통기능을 사용할 수 있다.

스프링에서 AOP 구현 방법 : proxy를 이용

호출부(client)-> proxy(대행)-> target(핵심기능)

프록시에게 요청을 하면, 공통기능을 수행하고 프록시가 핵심기능 쪽으로 가서 핵심기능 로직을 수행합니다. 그리고 다시 프록시로 돌아온다.

즉 우리는 프록시만 접촉하면 됩니다. 프록시에 공통기능만 넣어주면 프록시가 알아서 처리해줍니다.

XML 기반의 AOP 구현
1. 의존설정(pom.xml)
2. 공통 기능의 클래스 제작 - Advice 역할 클래스
3. XML설정 파일에 Aspect 설정

의존 설정 -> 공통 기능 클래스 설정 -> XML파일 설정




Lombok은 getter/setter, toString(), 생성자등을 자동으로 생성해줍니다.

maven은 src ( 우리가 실제 작성한 소스 ) target( maven에 의해 컴파일 된 것 ) 으로 이루어져 있다.
src는 main과 test에 있다. test는 main을 테스트해줌.
main의 java폴더(자바폴더) resource(자바가 아닌 파일, 설정파일 등등) webapp (jsp,css,js,image)



@RunWith(SpringJUnit4ClassRunner.class) //Jnuit을 사용하겠다는 뜻
@ContextConfiguration(
		locations = {"file:src/main/webapp/WEB-INF/spring/root-context.xml"} //설정파일 가져오기
		)


public class DataSourceTest {
	
	@Inject//autowired로 해도 됩니다.
	private DataSource ds;
	
	@Test
	public void test() {
		try {
			Connection conn = ds.getConnection();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}

}



```java	
	@RequestMapping("doA")
	public void doA() {
		logger.info("doA called.....");
	}
	@RequestMapping("doB")
	public void doB() {
		logger.info("doB called.....");
	}
	
	@RequestMapping("doC")
	public String doC(@ModelAttribute("msg") String msg) {
		logger.info("doC called.....");
		return "result";
	}
	
	@RequestMapping("doD")
	public String doD(Model model) {
		ProductVO product =new ProductVO("Sample Product",10000);
		logger.info("doD called.....");
		model.addAttribute(product);
		return "productDetail";
	}
	
	@RequestMapping("doZ")
	public String doZ(@RequestParam String msg, ModelMap model) {
		logger.info("doZ called.....");
		model.addAttribute("msg","z-"+msg);
		return "result";
	}
    ```

```xml
    <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate" destroy-method="clearCache"/>
    //destory-method 는 null값이 아닐때 close를 해줍니다.
```

@Repository @Repository 어노테이션은 어떤 클래스가 그 역할을 충족시켰거나 레파지토리의 stereotype (또는 데이터 접근계층이나 DAO로 알려진)이라는 표시이다.

@Controller : Presentation Layer에서 Controller를 명시하기 위해서 사용
@Service    : Business Layer에서 Service를 명시하기 위해서 사용
@Repository : Persistence Layer에서 DAO를 명시하기 위해서 사용
@Component  : 그 외에 자동으로 스캔해서 등록하고 싶은 것들을 위해 사용

autowired를 하기 위해서는 applicationContext.xml에 해당 클래스를 bean으로 등록하는데 이것이 꽤 번거롭다. 예를 들어 아래와 같이 autowired 처리할 클래스를 등록해주어야 합니다. 매번 클래스가 추가될 때마다 해야합니다.
```xml
<bean id="yboardDAO" class="com.yk.yboard.dao.YboardDAOImpl" />
<bean id="yboardService" class="com.yk.yboard.service.YboardServiceImpl" />        
<bean id="yboardController" class="com.yk.yboard.control.YboardController" />
```

이럴때 자동 스프링에서 제공하는 copoment-scan를 이용하자. copoment-scan를 사용하기 위해서는 두가지 작업만 해주면 됩니다.

1. xml에서 명시
<context:component-scan base-package="com.yk.yboard, com.yk.common" />
context:commponet-scan base-package에서 autowired할 패키지경로를 기재하면 됩니다. 여러개의 패키지로 구분할수도 있고(콤마로 구분), 상위 패키지를 한번에 등록할 수도 있다.

2. autowired할 클래스에 @component로 표시
```java
DAO Class
@Component
public class YboardDAOImpl implements YboardDAO {
    ....
}

Service Class
@Service
public class YboardServiceImpl implements YboardService {
    ....
}

Controller Class
@Controller
public class YboardController extends YboardLogger {
    @Autowired
    private YboardService yboardService;
 	....
}
```
DAO, SERVICE의 인터페이스를 구현하는 클래스에 @Component를 기재해주면 됩니다. 다만, Controller, Service 클래스에는 이미 @Controller 라는 Annotation이 있으므로 등록하지 않아도 됩니다. @Controller, @Service가 이미 @Component를 상속하기 있기 때문이다. 이렇게 간단한 작업으로 번거로운 클래스의 xml등록은 생략될 수 있다.

#JUnit
코드를 테스트 하려면 (DB에 접근등) 웹을 만들어서 테스트 해야합니다.
하지만 JUnit을 사용하면 그냥 할 수 있다. 





msg값을 넘기는 2가지 방법
```java
public String registerPOST(BoardVO board, Model model, RedirectAttributes ra) throws Exception{
...

ra.addFlashAttribute("msg","SUCCESS"); // url에 표시되지 않음
}
```

```java
public String registerPOST(BoardVO board, Model model, HTTPservletRequest re, HttpServletResponse rs){
...
model.addAttribute("msg","SUCCESS"); //url에 ?msg=succes 표시됨
}
```
```java
model.addAttribute("list",service.listAll()); // list라는 파라미터 값에 service.listAll값을 담아 넘겨줍니다.

model.addAttribute(service.read(bno)); 
//앞에 ,를 안적으면 boardMapper.xml에  ResultType이 BoardVO이므로 boardVO로 넘긴다.
```

IOC 컨테이너(ApplicationContext)
IOC 컨테이너에서 OwnerController의 객체를 만들어 줍니다. Repository도 만들어 줍니다.
IOC 컨테이너는 BEAN들(컨테이너 내부에 만든 객체)의 의존성을 관리해줍니다.
applicationContext.getBean()

#빈
스프링 IOC 객체가 관리하는 객체

등록하는 방법
1. Component Scanning을 통해  @Component가 붙어 있는 것들을 빈으로 등록합니다.(@Repository, @Service, @Controller)
2. 일일히 XML이나 자바 설정 파일에 등록 (@Bean, <bean>)
   

@Autowired로 ApplicationContext 안의 빈을 꺼내 쓸 수 있다.

Spring 5 기준으로
생성자가 오로지 하나만 있고, 매개변수 타입이 Bean으로 등록되어 있다면, Autowired가 없더라도 자동적으로 주입을 해줍니다.

생성자를 이용해서 주입하면 Autowired가 필요 없다.
1) 생성자를 통한 의존성 주입
2) setter가 있다면 setter에 어노테이션 사용
3) setter가 없다면 굳이 setter에 어노테이션을 사용하지 말고 필드에 Autowired를 하자.(setter가 필요없음에도 setter를 만드는건 setter 때문에 의존성이 바뀔 위험이 있다.)

AOP : 흩어진 코드를 한곳으로 모아라
class A{
	method a() {
		AAAA
		오늘은 1월 28일
		BBBB
	}
	method b(){
		AAAA
		저는 운동을 합니다.
		BBBB
	}
}
class B {
	method c(){
		AAAA
		저녁에는 라면먹어야지
		BBBB
	}
}

AOP를 하면 

class A{
	method a() {
		오늘은 1월 28일
	}
	method b(){
		저는 운동을 합니다.
	}
}
class B {
	method c(){
		저녁에는 라면먹어야지
	}
}

class AAAABBBB{
	method aaaabbb(JoinPoint point){
		AAAA
		point.execute()
		BBBB
	}
}

이 기법을 쓰는 방법
.class 파일을 조작하는 방법 : 이미 컴파일된 코드안에 끼워넣는다. 
프록시 패턴을 사용하는 방법: A클래스라는 객체를 상속받아 class AProxy 클래스를 내부적으로 만들고 호출합니다.(Spring이 쓰는 기법)

실행해보면 
```java
Class AProxy extends A{
	println("AAAA");
	println("오늘은 1월 28일");
	println("BBBB");
}

....
Class BProxy extends B{
	...
}

```

이를 통해 각 클래스는 자신이 정말로 해야할 기능들만 하도록(오늘은 1월 28일, 저는 운동을 합니다., 저녁에는 라면먹어야지)
해줍니다. 즉 응집도를 높힌다. single responsibility priciple (단일 책임 원칙)

AOP는 Transactional에서 사용됩니다.

PSA(Potable Service Abstraction)
잘 만든 인터페이스라는 뜻

JpaTransactionManager를 쓰다가 Datasource TransactionManager를 쓰더라도 Transactional을 처리하는 코드가 바뀌진 않는다. 이게 Abstraction이고 추상화의 장점이다.


Controller의 메서드가 사용할 수 있는 리턴 타입.

String : jsp를 이용하는 경우에는 jsp 파일의 경로와 파일 이름을 나타내기 위해서 사용
void : 호출하는 URL과 동일한 이름의 jsp를 의미합니다.
VO, DTO 타입: 주로 JSON 타입의 데이터를 만들어서 반환
ResponseEntity 타입 : response할 때 Http 헤더 정보와 내용을 가공하는 용도로 사용.
HttpHeaders : 응답에 내용없이 Http 헤더 메시지만 전달하는 용도로 사용.



DAO vs Service

DAO와 Service는 그 역할이 분명히 다릅니다.
DAO는 **단일 데이터 접근/갱신**만 처리합니다.
Service는 여러 DAO를 호출하여 **여러번의 데이터 접근/갱신**을 하며 그렇게 읽은 데이터에 대한 비즈니스 로직을 수행하고, 그것을 **하나의(혹은 여러개의) 트랜잭션**으로 묶습니다.

즉, **Service가 트랜잭션 단위**입니다. 

위와 같이 DAO와 Service가 완전히 동일해지는 경우도 분명히 발생합니다. 하지만 그것은 해당 비즈니스 로직이 "단일 DB 접근"으로 끝나기 때문에 발생하는 것 입니다.

만약 DAO의 메소드 하나에 다중 DB접근 로직이 들어갔고, 서비스는 단순히 그 DAO메소드를 호출하는 통로 역할만 합니다면 DAO측 모듈화가 제대로 안된 접근 방식일 가능성이 높습니다(항상 그렇다는 뜻은 아닙니다)

뭔가 데이터를 직접 읽고 쓰는 코드가 들어간 부분을 DAO로 보시면 될듯..
그게 DB가 됐든 파일이 됐든..
서비스단에서 데이터 입출력을 추상화 하려고 만든게 DAO니까요.
만약 서비스단에 데이터 입출력 코드가 들어가 있다면 잘못된 설계라고 봅니다.


setter를 이용해서 주입 or 생성자로 주입


@Autowired는 객체 타입을 기준으로 비교를 해서 있으면 주입시켜주고, 없으면 NullPointException을 발생시킨다.

AppCtx.java
@Bean
@Qualifier("chgPwdSvc")

Bean에 chgPwdSvc라는 이름을 정해줍니다.

ChangePasswordService.java
@Autowired
@Qualifier("chgPwdSvc")
@private MemberDao memberDao;

chgPwdSvc인 Bean을 memberDao에 주입시켜라


## NullPointException이 발생하지 않게 하는법

1.
@Autowired(required=false) 
null값을 허용해줍니다.
2.
private Optional<MemberDao> memberDao;
Optional을 이용해서 null을 허용해줍니다.
3.
@Nullable


어노테이션을 이용해서 Null을 허용해줍니다.
@Bean
	public MemberDao memberDao() {
		return new MemberDao();
	}

=> 해당 클래스로 가서 @Configuration을 써주면 생략가능


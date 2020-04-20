

log4j2는 기존의 log4j 에서 개선된 자바 로깅 라이브러리이다.
log4j2에 필요한 라이브러리는 log4j-api, log4j-core, log4j-slf4j-impl
slf4j에 필요한 라이브러리는 slf4j-api, jcl-over-slf4j

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>${log4j.version}</version>
</dependency>

<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>${log4j.version}</version>
</dependency>

<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-slf4j-impl</artifactId>
    <version>${log4j.version}</version>
</dependency>

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>${org.slf4j-version}</version>
</dependency>

<dependency>
<groupId>org.slf4j</groupId>
    <artifactId>jcl-over-slf4j</artifactId>
    <version>${org.slf4j-version}</version>
</dependency>
```


```
log4j2를 입맛에 맞게 사용하고 싶어서 정리해두기.



- jdbc.sqlonly : SQL문만을 로그로 남기며, PreparedStatement일 경우 관련된 argument 값으로 대체된 SQL문이 보여진다.



- jdbc.sqltiming : SQL문과 해당 SQL을 실행시키는데 수행된 시간 정보(milliseconds)를 포함한다.



- jdbc.audit : ResultSet을 제외한 모든 JDBC 호출 정보를 로그로 남긴다.



많은 양의 로그가 생성되므로 특별히 JDBC 문제를 추적해야 할 필요가 있는 경우를 제외하고는



사용을 권장하지 않는다.



- jdbc.resultset : ResultSet을 포함한 모든 JDBC 호출 정보를 로그로 남기므로 매우 방대한 양의 로그가 생성된다.



예) log4j.xml



위부분까지 출처: http://www.mimul.com/pebble/default/2008/10/24/1224847200000.html



- jdbc.resultsettable: 쿼리문의 결과값을 예쁘게 정리된 테이블 모양으로 로그를 찍어준다.

  (log4j-jdbc-remix 사용해야함. pom.xml에 라이브러리 추가)



- jdbc.connection: jdbc connection 정보 로그를 생성. (DB와의 연결 정보)





* 아파치(apache) 관련 로그 끄는 방법



log4j2.xml에서



<logger name="org.apache.commons" level="OFF" additivity="false">

<appender-ref ref="Console"/>

<AppenderRef ref="file" />

</logger>



요렇게 입력해주면 아파치로 인해 찍히는 로그들을 안 보이게 된다.



너무 많이 찍혀서...



Digester로 찍히는 것도 많았는데 이것만 끄려면



<logger name="org.apache.commons.digester.Digester" level ="OFF" additivity="false">

<appender-ref ref="Console"/>

</logger>
```

<?xml version="1.0" encoding="UTF-8"?>
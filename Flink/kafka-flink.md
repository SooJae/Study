Kafka-Flink 연동


1. 깃 허브 주소 : https://github.com/dursunkoc/flink-kafka-sample 에서 샘플을 다운받는다.

2. 파일 빌드 : $ mvn clean install -Pbuild-jar

3. 카프카와 주키퍼를 실행한다.
4. 카프카 producer 실행 : $ ./kafka-console-producer.sh --broker-list localhost:9092 --topic customer.create
5. 데이터 주입
> {"id":1, "first":"Dursun", "last":"KOC", "country":"JP"}
> {"id":2, "first":"Mustafa", "last":"KOC", "country":"GB"}
> {"id":3, "first":"Yasemin", "last":"KOC", "country":"TR"}
> {"id":4, "first":"Ihsan", "last":"KOC", "country":"TR"}
> {"id":5, "first":"Neziha", "last":"KOC", "country":"TR"}
> {"id":6, "first":"Elif Nisa", "last":"KOC", "country":"TR"}
> {"id":7, "first":"Beyza", "last":"KOC", "country":"TR"}
> {"id":8, "first":"Zeynep", "last":"KOC", "country":"TR"}
> {"id":9, "first":"Murat", "last":"KOC", "country":"USA"}
> {"id":10, "first":"Temur", "last":"KOC", "country":"USA"}
> {"id":11, "first":"Hakan", "last":"KOC", "country":"JP"}
> {"id":12, "first":"Cemil", "last":"KOC", "country":"GB"}
> {"id":13, "first":"Turan", "last":"KOC", "country":"TR"}
> {"id":14, "first":"Hamide", "last":"KOC", "country":"TR"}
> {"id":15, "first":"Hayrettin", "last":"KOC", "country":"TR"}
> {"id":16, "first":"Fuat", "last":"KOC", "country":"TR"}
> {"id":17, "first":"Rasim", "last":"KOC", "country":"TR"}
> {"id":18, "first":"Ali Ihsan", "last":"KOC", "country":"TR"}
> {"id":19, "first":"Ali Osman", "last":"KOC", "country":"TR"}
> {"id":20, "first":"Hamit", "last":"KOC", "country":"USA"}

flink 주소를 접속해보면 정상적으로 연동 된 것을 확인할 수 있다.

5. Savepoint 생성
curl -X POST http://localhost:8081/jobs/552714ff67ee1e1bf0ab96a303f5f697/savepoints -H 'Content-Type: application/json' -d '{ "target-directory": "file:///tmp/flink/savepoints/tmp", "cancel-job":true}'

명령어를 쓰면 file:///tmp/flink/savepoints/tmp에 savepoint파일이 생성된 것을 확인 할수 있다.(RequestBody에서 cancel-job:true이므로 Flink는 Cancel상태로 변한다.)

6. 플링크 재실행 (Savepoint) 
bin/flink run -s file:/tmp/flink/savepoints/tmp/savepoint-552714-3ff636e188cf  /Users/soojae/Project/flink-kafka-sample/target/flink-kafka-sample-0.0.1-SNAPSHOT.jar

정상적으로 Flink가 실행된 것을 확인할 수 있다.

Savepoint 사용 예시 : countWindow 1만으로 잡았을 때, 5천개까지 처리하던중 Rescale을 해야하거나, Migration 혹은 



REFERENCES: https://github.com/tgrall/kafka-flink-101
Flink-kafka 관련 주소 : https://dzone.com/articles/consuming-kafka-messages-from-apache-flink
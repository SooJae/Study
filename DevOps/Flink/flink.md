# Flink
## Programs and Dataflows 
Input Stream : Source 
Operation : Transformation
Output Stream : Sink



출처 : https://gyrfalcon.tistory.com/entry/Flink-1-%EC%86%8C%EA%B0%9C-Basic-Concept

## Distributed Execution
Flink는 두 종류의 Process가 있다.
master Process (Job Manager) : Task를 스케줄링하고, 체크포인트, 리커버리담당
Worker Process (Task Manager) : Task를 실행 

## Checkpoints for Fault Tolerance
거의 모든 스트림 처리 시스템은 Fault Tolerance 기능을 가지고 있다. Flink는 Checkpoint라는 이름의 방식을 사용하고 있다.
이방식은 처리되는 스트림 중간에 checkpoint barrier를 끼워넣어 ack를 처리하는 개념이다. 만약 fault가 발생하면 checkpoint 부터 다시 처리하는 방식이다. 모든 레코드마다 하지 않기 때문에 빠른 성능을 보여주고 exactly-once를 보장 할 수 있다. 

## Batch on Streaming
Flink의 batch processing 방식은 bounded stream 데이터를 streaming 으로 처리하는 방식을 사용하고 있다.
DataSet API를 사용하고 DataStream 방식에서 사용하고 있는 checkpoint방식을 사용하지 않고 fault시 모두 재실행하는 방식을 사용한다.

## DataSet and DataStream
Flink는 크게 Streaming과 Batch 를 처리하는 방식에 따라 사용하는 API가 나뉜다.
**DataStream은 Streaming**을 처리하기 위한 클래스이고 **Batch는 DataSet**을 사용한다.
두 클래스를 처리하는 elements가 **무한으로 들어오느냐** 아니면 **끝이 있는 bounded 데이터냐**가 가장 큰 차이이다.
두 클래스 모두 **immutable**한 속성을 가지고 있다. 즉, 변경되지 않는 콜렉션의 개념이다.

## Anatomy of a Flink Program
Flink 프로그램은 다음의 순서로서 동자
1. Obtain an execution environment: (ExecutionEnviroment를 생성해 DataStream, DataSet을 만들기 위한 준비)
2. Load/create the initial data, : (data Source를 생성해 input 데이터를 가져옴)
3. Specify transformations on this data, : (데이터를 변환 및 가공)
4. Specify where to put the results of your computations : (계산된 결과를 저장하거나 활용)
5. Trigger the program execution : (주기적으로 프로그램 실행)

## Lazy Evaluation
flink는 lazy evaluation방식을 사용한다. DataStream은 chain 방식으로 데이터를 단계별로 변환 시키는 구조를 가지고 있다.
변환하는 각 메소드를 실행할 때 마다 계산을 수행하지 않는다. **Sink 메소드가 실행되는 순간 지정된 transformation들이 실행**되는 구조이다.

## Specifying Keys
일부 transformations (join, keyBy, groupBy등) 들은 key 를 가지는 데이터 타입이 필요하다. 하지만 Flink는 **key/value가 필수 조건이 아니다.**
꼭 key/value로 구분되지 않는 데이터를 사용한다면 가상으로 key를 설정해서 해당 transformation operator를 사용할 수 있다.

key를 지정하는 여러 방식이 있다. 기본적으로 keyBy 메소드를 사용해서 key를 지정한다. 


## Supported Data types
flink는 DataStream, DataSet에서 사용하는 elements 타입에 제약이 있다. 
다음은 elements 타입으로 사용할 수 있는 7가지 타입이다.

Java Tuples and Scala Case Classes
Java POJOs
Primitive Types
Regular Classes
Values
Hadoop Writables
Special Types


## Accumulators & Counters
accumulator는 주로 counter를 위해 사용한다. flink는 분산처리 시스템이기 때문에 parallel로 여러 노드에서 실행될 경우 counter를 job단위로 제대로 code에서 구현하기는 어렵다 그래서 accumulator를 사용한다.
기본적으로  flink는 IntCounter, LongCounter, DoubleCounter를 제공하고 있다. 
이외에 custom accumulator를 Accumulator / SimpleAccumulator 인터페이스를 구현하여 작성할 수 있다.


# Savepoint vs Checkpoint

Savepoint는 스트리밍 job의 실행 상태의 영구적인 이미지이며, checkpointing 메커니즘을 이용하여 만들어집니다.
사용자는 Savepoint를 중지시키고, 재시작 할 수 있고, fork 또는 Flink Jobs을 업데이트 할 수 있습니다.
Savepoint는 두가지 파트로 구성되어 있다. 상대적으로 큰 binary파일이 있는 디렉토리(예: HDFS, S3) 저장되고 상대적으로 작은 메타데이터 파일로 저장됩다.
안전한 저장소의 파일들은 job실행상태 이미지의 net 데이터로 나타납니다.
Savepoint의 메타데이터 파일은 안정적인 스토리지의 파일에 대한 (주로) 포인터가 포함됩니다.

개념적으로, Flink의 Savepoint들은 백업이 기존 데이터베이스 시스템의 복구 로그와 다른점에서 Checkpoint와 다릅니다.
Checkpoint의 **주요목적은 예기치 못한 job failures가 발생할때 복구 메커니즘을 제공**하는 것입니다. 
사용자와의 상호작용 없이 체크포인트의 라이프 사이클은 Flink에 의해 관리되어 집니다. Flink에 의해 체크포인트가 만들어지고, 소유되고 릴리즈 됩니다. 

복구 및 주기적으로 트리거되는 방법으로서, Checkpoint 구현을위한 두 가지 주요 설계 목표는 i) 작성시 가볍고 ii) 가능한 빨리 복원하는 것입니다. 이러한 목표에 대한 최적화는 job 코드가 실행 시도간에 변경되지 않는 등의 특정 속성을 이용할 수 있습니다.
Checkpoint들은 job이 사용자에 의해 끝나고 나면 삭제됩니다. ( Checkpoint를 유지하도록 조작한 경우를 제외하고 )

이 모든 것과 달리, Savepoint는 사용자가 작성, 소유 및 삭제합니다. Use-Case는 **계획된 수동 백업 및 재개**에 사용됩니다. 예를 들어, 이것은 Flink 버전의 업데이트, 작업 그래프 변경, 병렬 처리 변경, 빨간색 / 파란색 배포와 같은 두 번째 작업 수행 등일 수 있습니다. 물론 Savepoint는 작업 종료 후에도 살아 남아야합니다. 
개념적으로, Savepoint은 이전에 언급 된 작업 변경 사항에 대한 지원 및 이식성에 더 집중하여 생성하고 복원하고 집중하는 데 약간 더 비쌀 수 있습니다.

이러한 개념상의 차이점은 제외하고 현재 Checkpoints 및 Savepoints 구현은 기본적으로 동일한 코드를 사용하며 동일한 형식을 생성합니다. 그러나 현재 여기에는 한 가지 예외가 있으며 앞으로 더 많은 차이점이있을 수 있습니다. RocksDB 상태 백엔드의 증분 체크 포인트는 예외입니다. Flink의 기본 저장 점 형식 대신 일부 RocksDB 내부 형식을 사용하고 있습니다. 이를 통해 저장 점과 비교하여 더 가벼운 검사 점 메커니즘의 첫 번째 인스턴스가됩니다.

# 실행 ID 할당
가장 추천하는 
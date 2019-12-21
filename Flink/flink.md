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


# 하둡이란?

아파치 하둡은 빅데이터를 저장, 처리, 분석할 수 있는 소프트웨어 프레임워크
하둡 특징:
- Distributed: 수십만대의 컴퓨터에 자료 분산 저장 및 처리
- Scalable: 용량이 증대되는 대로 컴퓨터 추가
- Fault-tolerant: 하나 이상의 컴퓨터가 고장나는 경우에도 시스템이 정상 동작
- Open source: 공개 소프트웨어


하둡 에코 시스템

하둡에는 다양한 에코 시스템이 존재합니다. 여기서 에코 시스템이란 중앙시스템 여기에서는 하둡을 가리킵니다. 중앙화된 시스템에 여러회사들이 가져다 쓸때 활용성을 더높이기 위해 여러가지 소프트웨어가 추가된 시스템을 가지고 에코시스템이라고 말합니다. 어떤 소프트웨어가 발전하려면은 이러한 에코시스템이 많이 존재하는 것도 중요합니다. 하둡이라는 분산처리 시스템을 중심으로 많은 에코시스템이 존재합니다. 대표적으로 Hbase, Solr, Zookeeper, Hive 등의 시스템이 그 예입니다.



# 분산 처리 시스템

하나의 작업에 여러대의 machine을 두고, MPI(Message Passing Interface)를 사용하는 시스템입니다. 하지만, 분산처리 시스템에도 문제가 있습니다.

## 분산 처리 시스템의 문제점
- 복잡한 프로그래밍(데이터 프로세스의 sync 유지) : MPI가 프로그래밍 하기 굉장히 복잡합니다.
- Partial failures : 수많은 컴퓨터를 사용하는 경우에 일부의 컴퓨터가 고장나는 경우 시스템이 동작하지 않습니다.

GFS(구글파일시스템)과 MapReduce가 나오기전, 분산처리 시스템은 Message Passing Inteface가 너무 복잡하여 프로그래밍하기가 어려웠습니다. 또한, **수만대의 분산 컴퓨터들이 하나만 고장이나도 동작을 안하게 되는 문제가 있었습니다.** 이 문제를 해결한 것이 바로 Hadoop 시스템입니다.

시스템은 반드시 partial failure에 대처가 요구됩니다. 컴포넌트의 failure(전체 시스템의 failure가 아닌)는 애플리케이션 성능 저하를 유발합니다. 이에 대한 해결책으로 구글이 생각한 것은 3개의 COPY를 두는 것이었습니다. 컴퓨터가 많이 필요하겠지만, 기본적으로 레거시한 컴퓨터를 쓰기때문에 몇대가 더 추가된다고 비용문제가 크게 발생하지는 않습니다.



하둡의 분산처리 시스템에서 제공하는 특징은 아래와 같습니다.

1) 데이터 Recoverablility
시스템의 컴포넌트가 fail하더라도 시스템을 통해 작업을 지속적으로 수행되어야 합니다. 즉, failure로 인해 어떠한 데이터의 손실도 발생해서는 안됩니다. 이러한 아이디어를 GFS에서 제공하였습니다.


2) 컴포넌트 Recovery
시스템의 컴포넌트가 fail되고 다시 recover된 경우, 시스템에 rejoin하는 것이 가능해야합니다. 이 작업은 전체 시스템의 재시작없이 수행되어야 합니다.

3) Consistency
job이 수행되는 동안 컴포넌트의 failure는 결과에 영향을 주지 않아야 합니다. (위 데이터 Recoverablility와 컴포넌트 Recovery로 해결이 됩니다.)

4) Scalability
데이터의 양이 증가하면, 각 작업의 성능이 감소합니다. (시스템은 fail되지 않음)
시스템의 resource를 증가시키면, 비례적으로 로드 capacity가 증가합니다.

# 맵 리듀스 
https://blog.naver.com/alice_k106/220462251435
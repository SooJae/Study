# NgRx란?
NgRx는 앵귤러에서 반응형 어플리케이션 빌딩을 위한 프레임 워크입니다.
Ngrx는 상태 관리를 제공하고, 부작용에 독립적, 
엔티티 수집관리, 라우터 비인딩, 코드 생성, 그리고 어플리케이션의 다양한 타입들을 빌딩할때, 개발자 경험을 향상시켜줄 개발 툴
이 있습니다. 

# 상태 관리에 왜 NgRx를 사용하나요?
NgRx는 단일 상태를 저장하여 유지 관리 가능한 응용 프로그램을 만들기위한 상태 관리를 제공합니다.
그리고 상태 변화를 표현하기위한 action을 제공합니다.

## 직렬화
NgRx는 상태 변경을 정규화하고 관찰 가능 항목을 통해 전달함으로써 직렬화 기능을 제공하고 상태를 예측 가능하게 저장합니다. 
이를 통해 상태를 외부 저장소 (예 : localStorage)에 저장할 수 있습니다.
게다가, Store Devtools에서 검사, 다운로드, 업로드 및 디스패치를 할 수 있습니다.

## 타입 안전
프로그램의 정확성을 위해 TypeScript 컴파일러를 사용하여 아키텍처 전체에서 유형 안전이 향상됩니다.

## 캡슐화
NgRx Effects and Store를 사용하면 네트워크 요청, 웹 소켓 및 비즈니스 로직과 같은 외부 리소스 부작용과의 모든 상호 작용을 UI에서 분리 할 수 ​​있습니다. 이러한 격리는보다 순수하고 간단한 구성 요소를 허용하며 단일 책임 원칙을 유지합니다.

## 테스트 가능한
때문에 스토어 순수한 상태를 변경하고 상태 데이터를 선택하는 기능, 상기 UI에서 분리 부작용 기능을 사용하여, 테스트는 매우 간단해진다. NgRx는 또한 격리 테스트 provideMockStore와 같은 테스트 설정과 provideMockActions더 나은 테스트 경험을 제공합니다.

## 성능
Store 는 변경 불가능한 단일 데이터 상태를 기반으로하며 변경 감지는 OnPush전략을 사용하여 매우 쉬운 작업으로 전환됩니다 . NgRx는 또한 상태 쿼리 계산을 최적화하는 메모리 셀렉터 기능에 의해 구동됩니다.

## 내가 상태값 관리를 위해 NgRx를 사용해야 할때는? 
특히, 서비스 상태를 관리하는 것이 충분하지 않은 경우, 사용자가 어플리케이션을 빌드할 때(많은 사용자 상호작용과, 여러 데이터 소스가있는 응용 프로그램을 구축 할 때 ) NgRx를 사용할 것입니다. 

"NGRx가 필요합니까?"라는 질문에 대답 할 수있는 좋은 물질은 SHARI 원칙입니다.

Shared : 많은 구성 요소 및 서비스에 의해 액세스되는 상태.

Hydrated : 유지 및 외부 저장 장치로부터 재수화(rehydrated)되는 상태.

Available : 경로를 다시 진입 할 때 사용할 수 있어야 상태입니다.

Retrived : 부작용으로부터 떨어져 있어야 한다.

Impacted : 다른 소스로 부터의 actions에 의해 영향을 받는 상태.

그러나 NgRx를 사용한다는 것은 일부 상충 관계가 있음을 인식하는 것이 중요합니다. 코드를 작성하는 가장 짧거나 빠른 방법이 아니며 사용자에게 많은 파일을 사용하도록 권장하는 것은 아닙니다. 또한 종종 좋은의 이해를 포함하여, 가파른 학습 곡선을 필요로한다 RxJs하고 Redux.

# 패키지
Store - RxJS powered state management for Angular apps, inspired by Redux.
Store Devtools - Instrumentation for @ngrx/store enabling time-travel debugging.
Effects - Side effect model for @ngrx/store.
Router Store - Bindings to connect the Angular Router to @ngrx/store.
Entity - Entity State adapter for managing record collections.
NgRx Data - Extension for simplified entity data management.
Schematics - Scaffolding library for Angular applications using NgRx libraries.
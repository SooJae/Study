# Prometheus란
metric 기반의 모니터링 시스템입니다.

flexible 쿼리뿐만 아니라 다각도의 데이터 모델 특징을 갖고 있습니다.

몇가지의 중요한 컨셉을 갖고 있습니다.

Metric : 프로메테우스는 시간에 따라 변하는 정보의 float으로서 metrics를 정의한다. 이 시간은 밀리초의 정밀도를 갖고있습니다.

Labe : 타임 seriesd와 관련된  key-value 페어입니다. Prometheus의 유연성과 파워풀한 데이터 모델을 지원하는, 전통적인 metrics시스템에서 경험할 수 있는 계층적 데이터 구조와 달리

Scrape : Prometheus는 풀 기반 시스템이며, 텍스트 기반 형식으로 **HTTP 끝점을 노출하는 지정된 소스**에서 메트릭 데이터를 fetch(scrapes) 합니다..

PromQL 은 프로메테우스의 쿼리 언어입니다. 이것은 building 대시보드와 특정 조건이 충족 될때, 유발시키는 alert 규칙을 설정할 때 , 두 경우 모두 사용될 수 있습니다.

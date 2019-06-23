
* 해결방안
1. 사용자가 직접 라이브러리에 넣어주는 방법
- drivers 폴더에 있는 ojdbcX.jar(X는 버전)를 Java\jdk1.7.0_67\jre\lib\ext에 복사하여 붙여 넣은 후 프로젝트를 새로고침합니다.
- 그러나 이 방법으로하면 DB를 사용하지 않는 다른 프로젝트에서도 해당 드라이버를 가지게 됩니다. 제일 안좋은 방법이다.

2. Eclipse에서 Build Path 잡아주는 방법
- 해당 Project에서 우클릭 - Build Path - Configure Build Path - Libraries tab - Add External JARs에서 drivers 폴더에 넣어둔 ojdbcX.jar(X는 버전)를 추가하여 줍니다. 그 후 Package Explorer에 Referenced Libraries가 추가되고 그 아래 ojdbcX.jar(X는 버전)가 추가된것을 확인 할 수 있다.
- 그러나 이 방법도 완전한 방법은 아니다. 위 설정은 이클립스에서 설정해 준 것이므로 개발툴이 달라질 경우 해당되지 못합니다.
시작 - 실행 - cmd - cd를 이용하여 workspace\해당 프로젝트\bin으로 이동한 후 해당 클래스를 컴파일 할 경우 맨 처음 에러와 같은 에러가 나는것을 확인 할 수 있다.
컴파일 : java 프로젝트명.클래스명(위의 예제의 경우 ex. prompt>java day1014.GetConnection)
(error msg : java.lang.ClassNotFoundException: oracle.jdbc.driver.OracleDriver) 

3. classpath 설정해주는 방법
- env.bat 파일에 아래 코드를 추가하여 줍니다.(rem은 주석을 나타낸다.)
-------------------------------------------------------------------------------------
rem classpath는 특정 클래스 파일을 경로에 상관없이 사용할 때 설정합니다.
rem .은 실행되는 폴더의 하위 폴더안에 모든 클래스를 인식해야할때 설정하는 path이다.
rem ;는 구분자이다.
set classpath=.;%dev_home%\drivers\ojdbc6.jar
-------------------------------------------------------------------------------------
[참고] 현재 위치는 해당 프로젝트의 bin이란 사실을 잊지마라. 'bin - 프로젝트명의 폴더 - 클래스'가 존재합니다.
.;으로 클래스들을 인식해주지 않으면 error가 발생합니다.(error msg : 오류: 기본 클래스 day1014.GetConnection을(를) 찾거나 로드할 수 없습니다.)

- 시작 - 실행 - cmd - cd를 이용하여 workspace\해당 프로젝트\bin으로 이동한 후 해당 클래스를 컴파일하여 결과를 확인합니다. 드라이버 로딩 성공이 출력되면 성공



출처: http://fourseasons0525.tistory.com/62 [좀 늦은 첫눈처럼 뒤늦은 여름비처럼]
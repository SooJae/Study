
# Core Module
사용자가 Service를 앱에 등록할때 @Injectable({providedIn:root})을 사용하는 것이 아닌 모듈에 직접 등록을 한다고 할때, 사용하는 방법이다.
앱 모듈에 직접 Service를 등록하면 복잡해 지므로 Service에 관한것들은 Core Module로 따로 빼놓는 방법이다. 
모듈에서 서비스를 등록할때 provider에 선언한 서비스들을 굳이 export 안해줘도 된다.
서비스가 자동적으로 루트에 inject 되기 때문이다.
사실 서비스에 @Injectable 데코레이터에 providedIn:root 를 하는 것을 추천한다.


RouterModule.forRoot(...) 메서드는 appRoutes의 라우터 설정 정보에 담긴 지시자나 컴포넌트의 정보를 합해서, 어플리케이션 단위의 모듈로 만드는 역할.
appRoutes에서 여러 라우터 설정 정보를 합치려면 ... 와 같은 절개 연산자를 이용하면 됌.

AppRoutingModule은 루트 모듈에 포함돼야 하기 때문에 export 처리를 함.

loadChildren 게으르게 임포트함.


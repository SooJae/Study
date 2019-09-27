타입스크립트는 컴파일 시간을 가진다.
type을 검사하는 시간이 있는 것.

타입스크립트의 장점 
1. 강력한 타입으로 대규모 애플리케이션 개발에 용이
2. 유명한 자바스크립트 라이브러리와의 편리한 사용
3. 개발 도구에서의 강력한 지원

# Typescirpt 환경 만들기
$ tsc --init
$ node init -Y
후에 tsconfig.jso에서 exclude에 node_modules를 제외 시켜준다.

이제 tsc만으로 컴파일이 된다!
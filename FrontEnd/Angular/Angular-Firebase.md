# 파이어베이스 설치
$ npm i --s firebase @angular/fire

environment에서 삭제해야되는부분
appId: 
measurementId:
    

부트스트랩 홈페이지 들어가서 링크 복사.(head태그 사이에 위치)
스크립트 3줄짜리 복사. (app-root 밑에 위치)
cdn fontawesome 검색후 cdn복사 후 부트스트랩 link형식에 맞게 작성 후 붙여넣기

# 토스트 설치
npm i --s ngx-toastr 

# valueChanges() vs snapshotChanges()
https://github.com/angular/angularfire/blob/master/docs/firestore/documents.md

valueChanges는 메타데이터만 갖고오고 document의 ID 정보를 갖고올 수 없다.
snapshotChanges: Document의 ID값들을 갖고 올 수 있어. IDs in order to implement oprations like update 

employee의 ID가 담겨있다. 우리는 ID가 헷갈리면 안되기 때문에
 나머지 부분을 제거해야한다.

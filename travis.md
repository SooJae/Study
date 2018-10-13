Travis란?

버전관리 도구를 이용해 작성한 코드를 Commit시에 CI에서 테스트, 인스팩션, 배포를 자동 진행해준다.  github에 push가 올라가면 자동으로 빌드를 수행. 빌드는 .travis.yml를 따른다.

먼저, 수정한 내용을 Github에 Push하면, 미리 설정한 연결에 의해 Github는 Travis CI에게 Trigger를 준다. Travis CI는 Trigger에 의해 빌드 Job을 자동으로 시작하게 되고, 최종적으로 (그리고 선택적으로) Heroku Deploy나 Slack 알림을 주게 된다. (그리고 Github에게도 그 정보가 전달된다.)

Pull Request에 대해서도 기본적으로 동일한 동작을 하게 되는데, Trigger에 의해 빌드가 끝나면 그 정보가 Github에게 전달되게 된다.
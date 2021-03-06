dependencies항목과 devDependencies항목이있다.
TypeScript의 경우에 dependencies항목에는 필요없다 (운영 환경에서는 TypeScript를 JavaScript로 변환해서 배포하기 때문에)
버전 뒤의 ^(캐럿)는 **지정된 버전이나 지정된 버전이상이 필요하다는 것을 의미한다.**

## ~ (틸드)
의존성을 추가할 때 틸드가 기본값으로 적용이 된다.

~0.0.1 : >=0.0.1 <0.1.0
~0.0.1 : >= 0.1.1 < 0.2.0
~0.1 : >=0.1.0 < 0.2.0
~0 : >=0.0 <1.0

## ^ (캐럿)
캐럿을 설명하기 전에 먼저 Semantic Versioning 설명해야 하는데 node.js도 그렇고 npm의 모듈은 모두 semVer을 따른다.

SemVer는 `MAJOR.MINOR.PATCH`의 버저닝을 따르는데 각 의미는 다음과 같다.

1. MAJOR version when you make incompatible API changes,
2. MINOR version when you add functionality in a backwards-compatible manner, and
3. PATCH version when you make backwards-compatible bug fixes.

즉, MAJOR 버전은 API의 호환성이 깨질만한 변경사항을 의미하고 MINOR 버전은 하위호환성을 지키면서 기능이 추가된 것을 의미하고 PATCH 버전은 하위호환성을 지키는 범위내에서 버그가 수정된 것을 의미한다.

캐럿(^)은 Node.js 모듈이 이 SemVer의 규약을 따른다는 것을 신뢰한다는 가정하에서 동작한다. 그래서 MINOR나 PATCH버전은 하위호환성이 보장되어야 하므로 업데이트를 한다.

^1.0.2 : >=1.0.2 <2.0
^1.0 : >=1.0.0 <2.0
^1 : >=1.0.0 <2.0


그래서 캐럿을 사용했을 때는 위와 같이 동작한다. 틸드와 비교해 보면 차이점은 명확한데 1.x.x내에서는 하위호환성이 보장되므로 그 내에서는 모두 업데이트하겠다는 의미이다.

하지만 여기에 예외사항이 있다. 다음 내용을 보자.

^0.1.2 : >=0.1.2 <0.2.0
^0.1 : >=0.1.0 <0.2.0
^0 : >=0.0.0 <1.0.0
^0.0.1 : == 0.0.1

버전이 1.0.0 미만인 경우(SemVer에서는 pre-release라고 부른다.)에는 상황이 다르다. 소프트웨어 대부분에서 1.0버전을 내놓기 전에는 API 변경이 수시로 일어난다. 그래서 0.1을 쓰다가 0.2를 사용하면 API가 모두 달라졌을 수 있다. 그래서 캐럿(^)을 사용할 때 0.x.x에서는 마치 틸드처럼 동작해서 지정한 버전 자릿수 내에서만 업데이트한다.(앞에 예시와 비교해보면 차이점을 알 수 있다.) 그리고 0.0.x인 경우에는 하위호환성 유지가 안 될 가능성이 더 높으므로 위의 마지막 예시처럼 지정한 버전만을 사용한다.


## 캐럿에 대한 오류
캐럿은 동작방식을 이해하면 수긍할만하다.(물론 배포용으로는 어렵지만 이건 틸드도 마찬가지다.) 하지만 약간 복잡한 부분이 있어서 그냥 틸드를 쓰고자 할 수도 있는데 그럼에도 캐럿의 존재 정도는 알고 있어야 한다. 캐럿은 근래에 추가된 기능이므로 과거 버전의 npm은 캐럿을 이해하지 못한다.(정확히 어느 버전부터 추가되었는지 찾지 못하겠다.) 그래서 캐럿이 없는 구 버전의 npm에서 캐럿을 사용하면 다음과 같이 오류가 발생한다.

구버전의 npm에서 캐럿을 인식못해서 발생한 오류

Jade에 1.3.0이 존재하지만 ^1.3.0의 구문을 이해하지 못하므로 버전을 찾지 못하고 "Error: No compatible version found"이라는 설치 오류가 발생했다. 이는 npm install -g npm을 통해서 npm을 최신 버전으로 올리면 해결할 수 있다.(캐럿을 모른 상태에서 저 오류를 보면 좀 당황스럽다.)

npm v1.4.3부터는 npm install MODULE --save나 npm install MODULE --save-dev를 사용했을 때 기본값이 틸드 대신 캐럿이 되었기 때문에 틸드를 사용하고자 한다면 매번 직접 수정해야 한다. 그리고 본인은 틸드방식을 사용하더라도 참조한 모듈이 다른 모듈을 참조할 때 캐럿을 사용할 수도 있으므로 npm을 최신 버전으로 업데이트하지 않으면 결국 오류가 나서 제대로 설치가 안 될 것이다.




npm install --save 명령을 통해 패키지를 설치하면 이 항목에 프로젝트 정보가 저장된다. devDependencies 에는 이 패키지를 테스트하거나 개발할 때 필요한 패키지들을 명시한다. npm install --save-dev 명령을 통해 패키지를 설치하면 이 항목에 프로젝트 정보가 저장된다.

REFERENCES : https://blog.outsider.ne.kr/1041
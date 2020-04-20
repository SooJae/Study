
일단 Jekyll을 한번 적절하게 설정해 놓으면, 사용자가 사용자의 Jekyll 웹사이트를 깃허브에 push할 때마다, `user.github.io/reponame`의 url에 배치됩니다.

깃허브는 오직 사용자의 웹사이트에 빌드됩니다.(`jekyll buid`) 그러나, 그것은 다른 커맨드들(`jekyll algolia` 같은)은 동작하지 않는다. 그래서 만약에 사용자가 사용자의 검색결과를 push를 할때마다 업데이트가 되게 하려면 다른방법을 찾아야 합니다.

Algolia는 [Netify](https://community.algolia.com/jekyll-algolia/netlify.html)를 사용하는 것을 추천합니다. 그러나, 사용자가 GitHub pages를 이용해서 호스트를 해야합니다면, Travis CI를 통해 동기화 시킬 수 있습니다.



Travis CI는 continuous integration[^CI] 서비스를 호스팅해줍니다. 이를 통해 사용자의 GitHub repository의 어떠한 변화가 생기더라도, 반응을 하고 응답을 해줍니다. 
사용자는 이것을 이용해서 사용자의 GitHub Pages에 새로운 push를 할때마다, 자동적으로 `jekyll algolia`이 가동되게 할 수 있습니다.

Travis를 사용자의 프로젝트에 설치하는 방법
1. travis-ci.org 에 접속합니다.
2. 사용자의 avatar를 클릭하고 Profile을 클릭합니다.
3. GitHub repository를 찾고 동작시킨다.

<i> 사용자는 "Build pull request updates"를 uncheck를 해줘야합니다.
이것은 사용자가 pull request할때마다 re-indexing이 되는 것을 방지해줍니다.</i>  

Travis를 가동시켰기 때문에, 사용자는 파일을 설정해야 합니다. Travis UI를 통해 설정할 수도 있지만, 사용자의 repo에 있는 .travis.yml을 수정하는 것이 제일 좋습니다!

```ruby
Code
# .travis.yml
# This file should be at the root of your project
language: ruby
cache: bundler
before_install:
  - gem install bundler
script:
  - bundle exec jekyll algolia
branches:
  only:
    # Change this to gh-pages if you're deploying using the gh-pages branch
    - master
rvm:
 - 2.4
 ```

 이 파일은 Travis를 통해 읽혀지고, Bundler를 통해 gemfile에 정의한 모든 dependencies를 Bundler를 통해 fetch하라고 지시합니다.    
그리고 `bundle exec jekyll algolia` 를 실행합니다.

사용자는 `branches.only` 값을 `master` 과 `gh-pages` 에 편집해야 합니다. 이 branch들은 설정됩니다. 사용자의 GitHub Pages 구성에 배포되도록 구성된 branch에 따라 달라진다.

이 plugin은 데이터를 push하기 위해서는 사용자의 Admin API key가 필요하다. 사용자가 사용자의 repo의 key를 노출시키지 않게하기 위해서, 사용자는 Travis의 환경변수로  ALGOLIA_API_KEY를 추가시켜야 합니다. 
이것은 your Travis Settings page에 있는 UI를 통해서 할 수 있습니다

사용자가 commit을 하고 push를 할때마다, Travis는 이벤트를 포착하여 index를 trigget합니다.(?) Travis dashboard에 있는 Travis job excution을 보면 로그가 나와있습니다.

[^1]: 지속적인통합서비스

[출처](https://community.algolia.com/jekyll-algolia/github-pages.html)
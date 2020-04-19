원격저장소의 원리

$ git remote add origin git@github.com:SooJae/repo.git
 원격 저장소와 연결하기.


[remote "origin"]
	url = git@github.com:SooJae/repo.git //origin이 가리키는 주소
	fetch = +refs/heads/*:refs/remotes/origin/* //어디에서 파일을 가져올것인가.

$ git push --set-upstream origin master
를 하면 master는 origin에 이어진다.

refs\remotes\origin\master
는 원격저장소의 master입니다.
를 보면 우리가 origin으로 push한 내용이 나온다.
push했던 기록이 메모처럼 저장된것.(인터넷에서 가져온게 아니다)

refs/heads/master
는 지역저장소의 master입니다


* commit 8a95e7ab19e81e8b0b045b6e3c4e00f4eda02502 (HEAD -> master, origin/master                      )
  Author: SooJae <mynameisleesujae@gmail.com>
  Date:   Sun Oct 7 21:02:05 2018 +0900


지역저장소와 원격저장소가 가리키는 commit이 같다.

원격저장소에서 지역저장소로 가져오는 2가지 방법
1. pull
2. fetch

보통은 git pull을 쓰면 됩니다.

fatal: refusing to merge unrelated histories
라고 뜰때
git pull origin master --allow-unrelated-histories
해주면 해결

git pull 해서 잘못해서 병합하면 ORIG_HEAD로 되돌릴 수 있습니다.

$ git fetch를 하면 원격저장소가 지역저장소보다 head값이 더높다.
원격저장소 7번을 가리키고 지역저장소는 6번을 가리킴
즉 다운로드를 받았고, 다운로드 받은 최신 commit은 원격저장소에 저장했지만 , 지역저장소에는 저장이 안됌
장점 : 지역저장소에 갖고온다음 병합을 하지 않기 때문에
원격저장소와 지역저장소의 차이점을 볼 수 있습니다.
$ git diff HEAD origin/master
하면 차이점을 확인 할 수 있습니다.
그 후에
$ git merge origin/master
을 하면 pull을 했던 것과 똑같이 됩니다.
git fetch는 원격저장소에서 다운로드를 받고, git merge origin/원격저장소의 병합하고 싶은 branch의 이름

pull을하게되면 다운로드 받고 병합까지.
왠만하면 pull을 사용하고 신중해야 할때 fetch를 씁니다.

releases는 사용자가 사용해도 되는 버젼(정식버젼)

tag는 언제나 똑같은 것을 가리킨다.
branch는 달라진다.

$ git tag 1.0.0 master

현재 태그값을 정합니다.

$ git checkout 1.0.0
적고 해당 commit으로 돌아갈수 있습니다. 어떤 버젼을 배포하고 그 배포한 버젼으로 돌아가고 싶을때.

tag의 세부사항을 포함시키고 싶을때 다른 형태의 tag를 써야햔다.

 annotated tag VS light weight tag(우리가 한것)

$ git tag -a 1.1.0 -m "bug fix"

$ git tag -v 1.1.0 //태그의 설명 보기.
object dc20287b9a4169c4bb9873b72e1295b168e4bb87
type commit
tag 1.1.0
tagger SooJae <mynameisleesujae@gmail.com> 1538920885 +0900

bug fix
error: no signature found

annotated tag는 주석을 달 수 있습니다.

$ git push 는 tag가 같이 안올라감
$ git push --tags 까지 해야 tag가 같이 올라감

github에서 releases에서 edit들어간뒤 배포하면 latest release가 옆에 뜬다.(별 기능 없고 그냥 보기 편하게 해줌)
또한 edit을 들어가면 오른쪽에 semantic versioning이 있습니다.
하면 소프트 버젼의 문화를 알 수 있습니다.(버젼을 어떻게 해야 하는가.)

$ git tag -d 1.1.1
라고하면 tag가 삭제됩니다.

tag의 원리
git tag 1.1.2를 하면

refs/tags/1.1.2가 생성되고 object ID가 생성됩니다.
클릭하면 우리가 만든 파일의 commit이란걸 알 수 있습니다.

refs/tags 에 vim 1.1.3을 만들고
태그 1.1.2 의object ID 값을 넣으면
1.1.3을 명령어 없이 만들 수 있습니다.

annotated tag를 만들고 gistory에 들어가보면
object 파일이 생기는데 object파일에는 방금 commit한 commit의 objet가 있고, 태그의 버젼과, 만든사람과 태그의 설명이 들어가 있습니다.

refs/tags/1.1.4에 들어가면 annotated tag의 정보를 담고있는 object파일을 가리키고 있는 것을 볼 수 있습니다. 
branch의 원리와 tag의 원리는 정확하게 똑같다.
branch는 branch가 가리키는 commit이 바뀌고
tag는 tag가 가리키는 commit이 바뀌지 않는다.


merge, rebase의 차이점

merge : commit을 하고 또 commit을 하면 master가 바뀐다.
이 상태에서 feature라는 branch를 만들고  commit을 하고 다시 commit을 합니다. 
이때 master를 두번 commit 합니다.

이때 merge는 master의 내용을 feature로 갖고오고 싶으면
$ git checkout feature 
$ git merge master
하면 feature과 master를 공통의 조상으로 하는 새로운 commit이 만들어진다.
이 commit은 3 way merge로 비교해서 병합해주고 conflict가 일어나면 사람이 수정을 해줍니다.

그럼 feature는 master를 병합하게 됩니다.


rebase는 feature입장에서 base는 갈라지기전 commit입니다.
즉 feature와 master의 공통으로 가지고 있는 commit이 base입니다.
feature가 파생된 master branch에 최신 commit을 feature base로 바꾸겠다.

$ git checkout feature
$ git rebase master

라고 하면 임시저장소(temp) 에 feature를 만들어준 commit 2개를 담는다. (patch)
그 후에 patch는 master의 최신 commit으로 checkout이 됩니다.
그다음 patch는 사라진다.
- base -0 -0 (f, m)
temp에 있는 patch는 master의 앞에 commit이 됩니다.그리고 2개 있던 commit중 하나가 temp에서 지워진다. 그리고 또 앞에 commit이 생기고 
temp안에 있던 commit이 하나 더 사라진다.

차이점은 
merge는 history가 병렬로 되어있습니다. 그리고 만들기 쉽고 안전하다.
rebase는 일렬로 되어있어 역사를 파악하기 쉽다
하지만 어렵고 위험하다.

git pull을 하고 git push를 하면 git push된 파일은 건들지 않는게 좋습니다.


git을 잘 사용하는 법.
git flow를 보면 됩니다.
master와 develop가 중요하다.
master에서부터 파생된 develop에서 계속 개발해 나가다가
기능을 만들때는 feature branch를 만든다.
기능의 작업이 끝나면 develop branch로 병합합니다.
애매한 변경사항들 ( 버그 처리 )은 develop을 해줍니다.
다 만들고 사용자에게 배포할 때는 (서버에다가 반영하는 순간.)
release branch를 만든다.
release이후에 버그나 업데이트는 release에 합니다.
해결이 되면 틈틈이 develop에 merge 합니다. (충돌방지)
실제로 서버에 release 하기전 master branch에 merge합니다.
그 후에 master에서 tag 1.0을 해줍니다. 그 후에 서버에 업로드!

결국 master branch는 release와 관련된, 사용자에게 제공되었던 버젼만 모아두는 branch가 되는 것 입니다.

그리고 release는 개발을 해야 하기때문에 develop을 합니다.
hotfix는 긴급하게 버그가 생긴경우 hotfix라는 branch를 생성후 hotfix에서 master branch로 보내고 tag를 달고 사용자에게 제공 그 후에 develop에 merge


git clone 은 git remote add + git pull 과 거의 같다.
git pull 은 git fetch + git merge 와 (거의) 같다.


$ git tag -a 1.0 -m "first release" master

현재 master branch가 가리키고 있는 commit을 태그로 생성

```html
<div class="page__footer-copyright">&copy; 2018 SooJae. Powered by <a href="https://jekyllrb.com" rel="nofollow">Jekyll</a> &amp; <a href="https://mademistakes.com/work/minimal-mistakes-jekyll-theme/" rel="nofollow">Minimal Mistakes</a>.</div>
```
git = 버전관리<br>
git hub 백업해주는 서비스

## git 캐쉬삭제
$ git rm -r --cached.

push 원격저장소로 문서를 업로드
pull 원격저장소의 문서를 다운로드

Version Control Sytems에는 많은 것이 있었다.
CVS -> SVN -> GIT

add : git에게 이 파일을 추적하라고 명령함(관리해야 할 파일들)
stage area로 올라감
stage :커밋이 될 파일들이 가는 곳

버전 : 작업이완결된 상태

git log -p : 작업 사이사이의 변화를 알려줌


diff --git a/f2.txt b/f2.txt
new file mode 100644
index 0000000..23f5f78
--- /dev/null
+++ b/f2.txt
@@ -0,0 +1 @@
+source : 2

commit 706f9c7165bb8cd36b97f85445e1129007de93eb   //이 커밋메세지가 가르키는 고유한 주소
Author: SooJae <mynameisleesujae@gmail.com>
Date:   Sat Oct 6 00:06:35 2018 +0900

    2

2에서는 null이었다가 3에서 f2.txt가 생겼다.
-는 사라진 내용
+는 추가된 내용


$ git diff 63aa5b67ded2b29e22c8588e15e922f1e9bfc116..20f319e79620987dcfa52f0667460cffd9ab899f
커밋 두개 사이에 소스상의 차이점을 보여줍니다

$git diff
방금 내가 한 작업의 변화를 보여줍니다 (내가 작업한 내용이 문제가 있는지 없는지를 마지막으로 리뷰해주는 기능.
git diff는 add 하기전에 수정된 파일을 전의 commit한 시점의 파일과의 차이를 보여줍니다.

$ git reset 63aa5b67ded2b29e22c8588e15e922f1e9bfc116 --hard

3번째의 주소값을 입력하면 3번째빼고 다 없어진다.
reset은 공유하는 데이터에는 절대 쓰면 안됩니다. (협업)

$ git revert 는 취소하고 새로운 버젼을 생성합니다.

윈도우7 입니다. 제 나름대로의 설치방법
-> 왠만하면 gistory설치와 실행까지 cmd창에서 진행하고 GitBash로 git을 동작시키면서
웹브라우저로 실시간 확인을 하니 괜찮더군요.. (cmd창은 계속 gistory 실행중, CTRL+C 종료)

1. 관리자 권한으로 설치파일 실행
2. Add Python 3.6 to PATH 옵션체크
3. Customize installation으로 들어감 (원하는 경로를 위해)
4. Install for All User 선택 (경로가 바뀜)
5. 설치버튼 클릭 (시스템변수 PATH확인 : C:\Program Files\Python36\Scripts\; C:\ProgramFiles\Python36\; )
6. 설치완료 후 cmd창에서 python -V로 확인
7. cmd창에서 pip -V로 확인 (pip3 -V도 됨)
8. 관리자 권한으로 Git Bash 실행 (cmd에서는 다됨)
9. pip3 install gistory 입력 (gistory 설치)
10. .git폴더가 있는 저장소 경로로 이동
11. gistory 입력 (cmd에서 .git폴더가 있는 저장소 에서)
12. 0.0.0.0:xxxx (뒤에나오는 xxxx를 기억)
13. 웹브라우저(크롬)에 localhost:xxxx를 입력 (예 : localhost:8805)

출처 https://opentutorials.org/course/2708/15213 제로스님

$gistory 를 치고 ctrl+c를 눌러서 포트번호 기억

파일을 생성하고 add를 사용하면 객체와 인덱스가 생성됩니다.
git의 파일을 저장할 때, 파일의 이름이 달라도 같은 내용이면 같은 오브젝트 파일을 가리킨다.
심지어 내용을 a로 작성한 파일은 내가 작성한 것이든 전세계 어떤사람이 작성한 것이든 78981922613b2afb6025042ff6bd878ac1994e85로 표시됩니다.


깃은 sha1이라는 해쉬 알고리즘을 이용해 **앞의 두글자를 떼서 object에 aa라는 디렉토리를 만들어서 그 뒤의 파일이 저장됩니다**.
**git add**를 하면 add를 한 파일을 **a라고 하는 정보와 부가적인 정보를 추가**해서 압축합니다.
그리고 그 압축한 결과를 sha-1이라는 방법으로 해쉬를 통과시켜서 나온값에 해당되는 디렉토리와 파일을 **objects라는 디렉토리 안에 만들고, 그 안에 a라는 정보를 저장.**
그리고 **index라는 파일**에 **f1.txt의 내용은 이것 입니다라는 것을 적어주면** 작업이 끝나다.

**commit을 하면 그 버젼도 파일의 내용처럼 objects 안에 들어갑니다. commit도 객체다.**
tree옆에 object가 링크되어있다.sha-1으로 만들어진 값이 있다.
현재 우리가 작성한 파일의 이름과 파일의 내용이 링크되어 있다.

첫번째 커밋후에 수정한 두번째 커밋을 열어보면 parent가 있는데 눌러보면 첫번째 커밋이 나타난다.
tree값도 서로 다르다.

commit은 중요한 것이 2개있다.
1. 부모 parent값
2. commit이 일어난 시점에 우리의 작업디렉토리 안에 있는 파일 이름과. 파일 이름이 담고있는 내용사이에 정보가 담겨있다.
버전에 담겨있는 트리를 통해서 버전이 만들어진 시점의 프로젝트 폴더에 대한 상태를 얻어 낼수 있다. = snapshot
각각의 버전은 만들어질 시점의 스냅샷을 가지고 있다.

objects안에 들어가는 파일은 object이고 object는 크게 3가지중 하나이다.
1. blob
2. blob에대한 정보를 담고있는 tree
3. commit

git status는 어떻게 commit할게 있는지 없는지 알수 있을까?
index와 최신 commit의 차이를 비교하면 commit할게 있는지 알수 있다. 

git은 index에 있는 f2.txt의 (해쉬id)값과, f2.txt파일의 내용이 만들어낸 (해쉬id)값(폴더안에 있는)이 다르다면, 
f2.txt가 수정되었다고 알려줄 수 있다.

git add f2.txt
**git add와 git commit의 차이**는 무엇인가.
index가 가리키고 있는 f2.txt와 우리가 수정한 f2.txt값이 같으니까 (폴더 안에 있는)
f2.txt라는 파일이 commit대기 상태라는 것을 알 수있다.
또한
git은 index의 내용과 (04ec로 시작하는) f2.txt의 내용이 다르다고 생각하면 
현재 f2.txt의 인덱스의 내용과 commit의 트리가 가리키고 있는 f2.txt의 내용이 다르다면
f2.txt는 add가 되어서 commit 대기상태라는 것을 알수 있다.

commit을 하면 인덱스도 04ec이고, 저장소와, 인덱스와, 프로젝트 폴더(working copy)가 정확하게 일치하기 때문에
git status를 할때 더이상 commit할게 없다고 합니다.

working directory => index, staging area, cache => repository

branch = 가지

기존의 파일을 고객에게 제공하며(branch라고 합니다.)파일이 2개이므로 branch가 2개다.
그 후에 각각 파일을 수정해 나갑니다.
고객에게 제공한 문서의 내용이 우리의 문서에 담겨야 할 경우
합쳐서 report2.xls라는 것을 만들어야합니다.(사실 거의 새로 만든다.)
그리고 업데이트할때 report3.xls로 바꾼다.

파일을 나누는 행위를 branch라고 합니다. 
branch를 하건 하지 않았건, 작업을 계속 해왔다면 하나의 branch를 갖고 있다고 생각할 수 있다.

원래 branch는 있었다. 그러나 느렸다. git은 branch의 성능을 최대한 끌어올렸다. 편리해지고 최적화됐다.

$ git commit -am 
-a : 자동으로 add를 해주지만, 한번도 add가 되지 않은(버전관리가 되지 않은) 파일은 적용이 안됩니다.

1.쓸모없는 기능을 달아달라고 할때(나중에 지워야 할 것 같은 기능) branch로 나눈다.
2.지금까지 작업한 것들을 서버에 저장할때, main의 되는 작업과 test를할 작업을 나눌 경우 branch를 쓸수있다.

$ git branch
master가 뜨는데 master가 되는 branch를 쓰고있다는 뜻(기본 branch)
$ git branch exp
exp
master

$git checkout exp
exp로 바뀜

branch를 하게되면 .현재 master branch의 상태를 그대로 복사합니다.
exp에서 파일을 수정하면 master는 영향을 받지 않는다.

$ git log --branches --decorate
현재 자신의 위치와 모든 branch를 가르쳐줍니다.

(master)의 최신 커밋이 2
(HEAD-> exp)현재 checkout된 branch는 exp이다. 최신커밋이 4

$ git log --branches --decorate --graph
서로 커밋상태가 각자의 길을 걷고있을때 효율적이다.

$ git log --branches --decorate --graph --oneline
간결하게 보여줍니다.


$ git log master..exp // master에는 없고 exp에는 있는 것을 보여줍니다.
commit 34c44e897ca07f7cfb0f4f604859903db0dce637 (exp)
Author: SooJae <mynameisleesujae@gmail.com>
Date:   Sat Oct 6 18:48:38 2018 +0900

    4

commit 0f75c795642a87183f19b89729f86eb175f9b206
Author: SooJae <mynameisleesujae@gmail.com>
Date:   Sat Oct 6 18:46:46 2018 +0900

    3
// exp에는 있는 것들
$ git log exp..master //exp에는 없고 master에는 있는 것을 보여줍니다. 

git log -p master..exp //소스코드까지 보여줍니다. 

$ git log -p master..exp
commit 34c44e897ca07f7cfb0f4f604859903db0dce637 (exp)
Author: SooJae <mynameisleesujae@gmail.com>
Date:   Sat Oct 6 18:48:38 2018 +0900

    4

diff --git a/f2.txt b/f2.txt
new file mode 100644
index 0000000..7898192
--- /dev/null
+++ b/f2.txt
@@ -0,0 +1 @@
+a

commit 0f75c795642a87183f19b89729f86eb175f9b206
Author: SooJae <mynameisleesujae@gmail.com>
Date:   Sat Oct 6 18:46:46 2018 +0900

    3

diff --git a/f1.txt b/f1.txt
index 422c2b7..de98044 100644
--- a/f1.txt
+++ b/f1.txt
@@ -1,2 +1,3 @@
 a
 b
+c

master에는 없지만 exp에는 있는 커밋이 4, 3이라는 것과
master에는 파일이 없는데 exp는 있는 파일이 f2.txt라는 것과, 그 안에 내용이 a가 추가되었다는 것을 알수 있다.

git diff master..exp
master와 exp의 차이를 보여줍니다.
(마스터에만 있는것은 -로 나타난다.)

병합(merge)
exp를 master에 옮기는 방법.
master로 checkout하고 merge를 합니다.

$ git merge exp

2개의 부모커밋을 갖는다.
원래의 master가 가지고있었던 5번 커밋, 동시에 exp가 작업한 3번과 4번을 부모로 갖는다.
exp도 merge로 master를 가지면 더이상 branch가 필요없기때문에 삭제해줍니다.

$ git branch -d exp




$ git checkout -b abc
 abc라는 branch를 생성하고 자동으로 checkout을 합니다.

master -> branch abc생성 -> branch hotfix생성 ->branch hotfix merge

master가 hotfix를 병합하면, master 가리키는 branch를 hotfix가 가리키는 branch로 fast-forward(빨리감기)합니다.
따라서 별도의 commit을 생성하지 않고, master가 가리키는 commit이 누구인지를 hotfix가 가리키는 commit으로 바꾸기만 하면됩니다.

abc가 master로부터 독립한 이후에 master의 변화가 생기면, fast forward를 할수 없다. master와 abc의 공통적인 조상을 찾는다.
그리고 3-way merge라는 방법을 이용해서 c4와 c5를 합치고 합쳤다는 것을 알려주는 별도의 commit을 만든다.
그리고 c4와 c5의 정보를 담고있는 c6를 만든다.
이것은 recursive(!=fast-forward)라고 합니다.

https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging


stash를 사용하면 작업했던 내용을 어딘가에 숨겨둘 수 있다.
그 후에 head의 버전으로 이동해서 작업할 수 있다.


$ git stash
The file will have its original line endings in your working directory
Saved working directory and index state WIP on exp: 606784f 1
working directory의 내용과 index의 상태가 exp에 save 되었다. Working In Process 작업중이라는 뜻.
하게되면 내가 수정되었던 부분이 감춰져있다.

$ git stash apply
하면 숨겨져있던 내가 수정한 부분이 살아난다.

$ git stash list

$ git reset --hard HEAD
하면 최신 commit 삭제.
$ git stash list
여기에 stash에 정보가 아직 살아있다.
그래서

$ git stash apply
하면 다시 살아난다.

f2.txt를 만들어서 add하고 stash를 하면. 사라진다.

$ git stash list
stash@{0}: WIP on exp: 606784f 1
stash@{1}: WIP on exp: 606784f 1

0이 최근꺼, 1이 예전꺼. (shift형식으로 넣는듯.)
apply를 하면 최근것을 적용합니다.

$ git stash apply
$ git stash drop 하면 0이 사라진다.

$ git stash apply; git stash drop;
0을 적용하고 stash list에서 사라지게 합니다.

이제 stash list에는 아무것도 없음

$ git stash apply; git stash drop; = $ git stash pop

git stash는 최소한 버전관리가 되고있는 파일(git add)에만 해당됩니다.


git rm --cached 추적 초기화
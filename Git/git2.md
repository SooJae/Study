branch의 원리

gistory의 HEAD을 보면 ref가 있습니다
f1.txt파일을 생성하고 add하면
refs\heads\master라는 파일이 생긴다.
방금 내가 commit한 아이디가 뜬다.
초기화하면 .git/HEAD가 생성되는데 텍스트 파일입니다.
refs/heads/master는 커밋을 처음 한 시점부터 생성됩니다.
f2.txt가 생성하면
refs/heads/master는 f2.txt를 가리킨다.

git log 를 했을때 2가 최신이라고 알려줄수 있었던 이유는 HEAD덕분입니다.
깃은 HEAD라는 파일을 가리키고 있고
HEAD는 refs/heads/master라는 파일을 가리키고 있고,
이 파일은 최근의 커밋한 오브젝트 id를 가지고 있기때문에
git log를 하면 헤드파일을 보고 헤드파일에 있는 마스터파일을 보고 
마스터 파일에 적혀있는 커밋 오브젝트 id값을 통해서 현재 commit된 가장 최신 commit이 무엇인가를 
알아낼 수 있습니다. 그리고 그 이전 commit은 parent라는 것을 통해서 탐색해 나갈 수 있습니다.
이것을 통해서 알수 있는 것은 git에서 branch라고 하는 것은 단지 refs라는 디렉토리 안에 있는 파일을 의미합니다.

$ rm .git/refs/heads/exp
로 exp를 삭제 했을때 git branch를 보면 exp는 사라져있습니다.

$ vim .git/refs/heads/exp를 한 후에
최신 커밋의 ID값 6fff3fda34fe3ccaa04d266b626fa3a6378f3b57 를 추가해주면
다시 exp라는 branch가 생성됩니다.
git에서 branch라는 것은 중요하고 강력하지만, g단지 파일 하나일 뿐입니다.
 심지어 binary도 아니고 일반 텍스트 파일입니다.

$ git checkout exp를 하면
HEAD는 exp를 가리킨다.

현재 사용하고있는 branch 무엇인가를 가리키는 약속된 기호가 head인데 head는 어떤 특정한 파일입니다.
HEAD가 하는 역할은 현재 checkout된 가장 최신 commit이 무엇인가를 나타내줍니다..

master branch와 exp branch의 같은 이름의 파일을 만들어보자
exp branch로 가서 common.txt파일을 만든 후, master branch로 와서
exp branch와 병합을 해줍니다. 그 이후에 master branch에서 common.txt파일을 수정합니다.
다시 exp로 가서 common.txt파일을 수정합니다.
즉, common.txt인 파일을 서로 다르게 수정했다.

$ git merge exp
를 하면 내용의 위치가 다를경우, master에서 작성된 내용과 exp에서 작성한 내용이 합쳐진다.
(common.txt 내용이 b이고 , master에서 a b이고, exp 에서 b c이면 a b c 가 출력됩니다.)
BUT!!! 같은 부분을 수정하면(master에서 a를 a(master)라고 하고 exp에서는 a(exp)라고 할때)

$ git merge exp
Auto-merging common.txt
CONFLICT (content): Merge conflict in common.txt
Automatic merge failed; fix conflicts and then commit the result.

$ git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

        both modified:   common.txt

no changes added to commit (use "git add" and/or "git commit -a")


충돌이 일어난다.
$ vim common.txt

function b(){
}
<<<<<<< HEAD   //HEAD부분이 checkout한 branch의 수정사항(즉 master)
function a(master){
=======
function a(exp){
>>>>>>> exp // exp branch의 수정사항
}
function c(){
}

git이 우리에게 merge를 실패했기 때문에 우리에게 해결하라고 표시해준것.

예를들어

function b(){
}
function a(master,exp){
}
function c(){
}

로 바꿔줍니다.

다 하고 commit을 해보면 충돌이 났었다고 써져있습니다.

$ git reset --hard c7081fa5659e1d4430c578493bb6ca2f45cc1bc1

refs/heads/master 
어떤 커밋을 최신커밋을 가지고 있나

reset을 합니다는 것을 head가 가리키고있는 커밋을 바꾸는 행위(간단)
git은 왠만하면 파일을 정리하지 않는다 
reset을 합니다고해서 실제로 지워진게 아니라 눈에만 안보일 뿐입니다.
ORIG_HEAD를 눌러보면 우리가 지운 4번이 있습니다.
logs/refs/heads/master 파일을 보면 제일 끝에 행에 f3ea~ 가 93c~가 되었다고 나온다.
최신 커밋인 3으로 교체했다는 뜻입니다.
현재 branch의 헤드가 가리키고 있는 COMMIt을 ORIG_HEAD에 기록한 후에 RESET을 실행합니다.

$ git reset --hard ORIG_HEAD
하면 RESET을 취소할수 있습니다.

$ git reflog
95a7277 (HEAD -> master) HEAD@{0}: reset: moving to ORIG_HEAD
c7081fa HEAD@{1}: reset: moving to c7081fa5659e1d4430c578493bb6ca2f45cc1bc1
95a7277 (HEAD -> master) HEAD@{2}: commit: 4
c7081fa HEAD@{3}: commit: 3
38e292c HEAD@{4}: commit: 2
15e18dd HEAD@{5}: commit (initial): 1

각각의 commit이 담겨있습니다.
git reset 95a7277이라고 쓰면 복구됩니다.
또한 취소할때 reset HEAD@{0}이라고 해도됩니다.

git 로그에 있는 c7081fa5659e1d4430c578493bb6ca2f45cc1bc1
을 git checkout c7081fa5659e1d4430c578493bb6ca2f45cc1bc1 라고 하면
HEAD는 직접 commit ID를 가리키고 있습니다.
detached 되어있는 상태. 크게 쓸모가 없다.

$ git checkout master 라고 하면 다시 master로 가고 detached 상태였던 것은 삭제됨


git reset 옵션

--hard(위험하지만 심플), --mixed, --soft

working directory = working tree = working copy
index = staging area = cache
repository = history = tree


git reset --hard :  working directory, index, repository 전부 삭제가 됩니다.
git reset --soft : repository 만 삭제합니다.
git reset --mixed : repository, index만 삭제합니다.

생활코딩 30강 보기.

index, refs/head/master 전부 확인해보니 같은 파일임

충돌 원인:
충돌이 일어나면 뒤에 숫자가 붙는다.

MERGE_HEAD MERGE가 될 대상의 최신 commit을 가리킨다

$ git config --global merge.tool kdiff3
병합을 전문적으로 하는 툴 kdiff3

$ git merge tool이라고 하면 tool을 이용해 conflict 일어난 파일을 병합합니다.

A B C 를 차례로 눌러 수정해보자.


3-way merge

ME     BASE    Other    2way merge//베이스 참고 X  3way merge//베이스 참고 O
A       A                     ?                             
B       B        B       B(ME,Other 같은부분)               B
1       C        2            ?                            ?
        D        D            ?                            



?부분은 conflict가 나는 부분, 나머지는 자동으로 merge 되는 부분

$ git init local
local 저장소가 생긴다.

부모 디렉토리에서 
$ git init --bare remote
bare는 작업을 할 수 없고, 저장소의 기능만 있는 저장소
bare라고 하는 것은 .git의 디렉토리의 내용만 존재하는 저장소
원격저장소는 원격저장소를 순수하게 유지하기 위해서 BARE옵션으로 작업을 할수없게합니다.

원격저장소에 로컬 저장소를 잇는다.
$ git remote add origin /c/git/remote
origin이라는것이 뒤의 경로의 별명같은 것이 됩니다.

$ git remote -v
origin(별명)  C:/git/remote (fetch)
origin(별명)  C:/git/remote (push)

$ git remote remove origin (저장소 삭제)



git config --global push.default matching : 알아서 push 해라
git config --global push.default simple : 명시해서 push 해라

$ git push
fatal: The current branch master has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin master


git config --global push.default matching : 알아서 push 해라
git config --global push.default simple : 명시해서 push 해라


git push --set-upstream origin master
--set-upstream origin master //push 명령어를 쓰면 origin의 master로 push 하겠다.
--set-upstream 로컬 branch와 원격 branch와의 세팅


github
이미 있는 소스를 다운받기
Fork 버튼을 누르면 내것으로 복제해서 수정도 할 수 있습니다(원본수정 X)

$ git clone(복제라는 뜻 <=>init) https://github.com/git/git.git gitsrc(디렉토리명)

$ git checkout e83c5163316f89bfbde7d9ab23ca2e25604af290
 e83c5163316f89bfbde7d9ab23ca2e25604af290 에 해당하는 커밋ID로 branch checkout한것

```
//에러 발생
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

  
git remote add origin https://github.com/SooJae/gitfth.git
현재 로컬저장소의 remote저장소를 https://github.com/SooJae/gitfth.git 에add시킨다.
그리고 origin이라고 하는 별명을 지어주겠다

$ git remote -v

git remote add friend https://github.com/SooJae/gitfth.git
friend 저장소로 보낼수도 있습니다.
origin이 저장소 디폴트값

$ git remote remove friend
로 삭제해줍니다.

$ git push -u origin master
현재 checkout된 로컬저장소의 branch를 origin에 해당되는 master branch로 동기화 시킨다.
-u는 로컬저장소의 branch와 원격저장소의 master branch를 연결시켜 한번만 세팅하면(연결해줍니다는 뜻)
그 이후에 git push만 하면 됩니다.

프로젝트 복사 : clone 

다른 컴퓨터라고 치고!
$ git clone https://github.com/SooJae/gitfth.git . //현재위치 라는 뜻

협업
$ git clone https://github.com/SooJae/gitfth.git git_home
$ git clone https://github.com/SooJae/gitfth.git git_office
두개를 만든다.

--집--
파일을 수정하고 push를 합니다.
$ git commit --amend // 마지막에 했던 commit 메세지를 바꿀수 있습니다.(원격 저장소에 올리기 전에 해야합니다.) push를 한 이후의 내용은 수정하면 안됩니다.

--회사--
$ git pull
작업을 하고
$git push

----반복----

SSH : Secure Shell

SSH는 로그인 할때마다 아이디 비밀번호가 필요없다.(자동 로그인을 제공)




$ ssh-keygen

Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/leesujae/.ssh/id_rsa):
Created directory '/c/Users/leesujae/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/leesujae/.ssh/id_rsa.
Your public key has been saved in /c/Users/leesujae/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:8jTymAe5jX5SLA3zgS4o0DlCapL2NuGnwJLI0okUuOg leesujae@sujae
The key's randomart image is:

+---[RSA 2048]----+
|.                |
|..               |
|o+..   .         |
|++.  +..         |
|o+..             |
|B..o.=.          |
|o.o +.o .        |
|   . .           |
|      .o         |
+----[SHA256]-----+



(/c/Users/leesujae/.ssh/id_rsa) 기억해두고 (여기에 비밀번호가 저장되어있습니다.)

완료하면 비밀번호가 나온다. 
-rw-r--r-- 1 leesujae 197121 1679 10월  7 18:25 id_rsa
-rw-r--r-- 1 leesujae 197121  396 10월  7 18:25 id_rsa.pub
두개가 생긴다

if_rsa : private key // 내 컴퓨터에 저장 , 절대 노출되면 안됩니다.
id_rsa.pub : public key // 내 컴퓨터에 저장+ 내가 접속하려는 컴퓨터에 저장

id_rsa.pub라는 파일이 저장된 컴퓨터에 접속할때, 비밀번호를 입력할 필요가 없다.

github가 제공하는 기능을 이용하여 손 쉽게 id_rsa.pub를 github에 저장할수 있습니다.

$ cat id_rsa.pub
후에 전부 카피
그리고 github setting에 들어가서 ssh에 붙여넣고 저장.
하면 우리의 public key가 저장됩니다.

다시 repository를 생성후 SSH로 만든다.
그리고 지역저장소가 없었던 상태에서 원격저장소를 하고싶을때??

$ git clone git@github.com:SooJae/gitfth_ssh.git gitfth_ssh
그 후에 질문에 yes를 하고 clone성공합니다.


$ git pull origin master
```에러발생
From https://github.com/SooJae/JSP-Learning
 * branch            master     -> FETCH_HEAD
fatal: refusing to merge unrelated histories
```

 이 명령 옵션은 이미 존재하는 두 프로젝트의 기록(history)을 저장하는 드문 상황에 사용된다고 한다. 즉, git에서는 서로 관련 기록이 없는 이질적인 두 프로젝트를 병합할 때 기본적으로 거부하는데, 이것을 허용해 주는 것이다.

$ git pull origin 브런치명 --allow-unrelated-histories


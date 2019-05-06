
# EC2
VPC란?
VPC는 AWS안에서 외부로부터 안전한 네트워크를 구성
외부에서는 VPC안의 RDS에 접근을 금지, JSP서버에서는 RDS에 접근할 수 있음.
VPC안의 특정 어플리케이션만 RDS에 접근 하게 할 수도 있음.

## 키페어(.pem) 파일 설정
윈도우:
우클릭 -> 속성 -> 보안 -> 고급 -> 상속사용안함
-> Administators와 SYSTEM만 사용가능하도록 한다.
리눅스: chmod 400

## 윈도우에서 EC2 접속하는 방법 

1. 명령 프롬프트 관리자 권한으로 실행
2. AWS 홈페이지에서 EC2탭 -> 연결버튼 클릭-> ssh ubuntu@ 'DNS주소' -i '경로+파일' 복사한다.
3. 프롬프트에서 해당 키페어(.pem) 위치로 이동(cd)한다.
4. 복사한 주소를 붙여넣고 접속한다.

## EC2 설정
1. sudo apt-get update; 로 업데이트 해주기
2. sudo apt install mysql-client 로 설치
3. EC2와 R데이터베이스를 하나의 보안그룹으로 지정해줘야한다.(접근할 수 있게)
4. mysql -h'end 포인트 주소' -u'계정' -p
5.  비밀번호 입력


## GUI환경을 위한 주피터 설치
1. $ sudo apt-get install python3-pip 
2. $ sudo pip3 install notebook
###  비밀번호 설정
3. $ python3 
4. >>> from notebook.auth import passwd
5. >>> passwd() 
6. 비밀번호 입력
7. sha1값 복사
8. >>> exit()

## Jupyter 환경 설정
ssh사용 없이 웹브라우저에서 서버로 접속하게 해주는 기능을 갖고있다.
1. $ jupyter notebook --generate-config
2. $ sudo vim /home/ubuntu/.jupyter/jupyter_notebook_config.py
3. 맨 아래에 입력
```
c = get_config()
c.NotebookApp.password = u'sha1: (복사한 sha1:의 값)'
c.NotebookApp.ip ='아이피주소'
c.NotebookApp.notebook_dir='/'
```
4. $ sudo jupyter-notebook --allow-root
5. 내주소 : 8888포트가 출력된다.
6. AWS 홈페이지 ->내 EC2-> 보안 -> 인바운드 태그-> 편집 -> 규칙추가 -> 8888포트 추가
7. 주소창에 아이피:8888 입력
## 항상 백그라운드로 실행되게 하기 (실행중인 프로세스를 유지한채 ssh 로그아웃 하기)
8. ctrl + z 입력
9. $ bg 숫자
10. disown(작업의 소유권을 shell session에서 해제 전체는 -a 옵션 사용)
11. ssh 로그아웃
    
하지만 현재 주피터 노트북이 ssl 인증서가 적용 안된 상태이므로 통신과정에서 위험하다. 그러므로 HTTPS 적용을 해준다.
SSL을 사용하면 해커가 해당 패킷을 가로채더라도 우리가 서버에 어떤 명령어를 사용했는지는 알 수 없다.
## 주피터에 HTTPS 적용 (보안적용)
### 해당 프로세스 종료
1. $ sudo netstat -nap | grep 포트번호
2. $ sudo kill -9 "PID값"
###  ssl 생성
3. $ cd /home/ubuntu
4. $ mkdir ssl
5. $ cd ssl
### 사설 인증서 생성(rsa 알고리즘 사용) (공개키 기반구조)
6. $ sudo openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout "cert.key" -out "cert.pem" -batch
7. $ sudo vim /home/ubuntu/.jupyter/jupyter_notebook_config.py
8. 맨 밑에 
c.NotebookApp.certfile = u'/home/ubuntu/ssl/cert.pem'
c.NotebookApp.keyfile = u'/home/ubuntu/ssl/cert.key'
추가

이제 http://아이피값:8888/ 에서 https://아이피값:8888/ 으로 바뀐것을 확인 할 수 있다.

## 시스템 서비스로 등록
시스템 서비스로 등록을 하게되면, 재부팅을 하더라도 프로그램을 따로 재 실행시키지 않아도 된다.
1. $ which jupyter-notebook (해당 프로그램 위치 확인)

2. $ sudo vim /etc/systemd/system/jupyter.service
3. 다음과 같이 작성
```
[Unit]
Description=Jupyter Notebook Server

[Service]
Type=simple
User=ubuntu
ExecStart=/usr/bin/sudo /usr/local/bin/jupyter-notebook --allow-root --config=/home/ubuntu/.jupyter/jupyter_notebook_config.py

[Install]
WantedBy=multi-user.target
```
ExecStart=/usr/local/bin/sudo(이 폴더 밑에 있는 sudo 명령어 사용해서) /usr/local/bin/jupyter-notebook --allow-root
(이 폴더 밑에 있는 jupyter-notebook --allow-root를 실행하고) --config=/home/ubuntu/.jupyter/jupyter_notebook_config.py 
(실행할 때 jupyter_notebook_config.py 를 환경파일로 적용한다.)
4. $ sudo systemctl daemon-reload
5. $ sudo systemctl enable jupyter (주피터 서비스를 사용하능한 상태로 만든다.)
6. $ sudo systemctl start jupyter
7. $ sudo systemctl status jupyter (주피터가 잘 돌아가는지 확인)
8. $ sudo systemctl restart jupyter

jdk1.8
maven3
Tomcat7

## jdk 설치
1. $ sudo apt-get install jdk-default
 Java 환경변수 설정을 자동으로 해주는 것을 설치한다.
 sudo apt-get install oracle-java8-set-default



##아파치 설치
sudo apt-get install apache2

Router 53 도메인 구매하기
dig web interface로 정상적으로 작동 했는지 확인 할 수있다.

웹서버로 설정시 HTTP 인바운드 포트를 열어줘야 접근할 수 있다.
SSH는 리눅스, RDS는 윈도우에서 접근

elastic IP :고정 아이피를 할당 받는 것, 아마존에서 하나는 공짜로 받을 수 있다.

AMIs는 SCALE UP 시 용이하게 사용할 수 있다 (백업 해놓은 것)

SCALE UP : 컴퓨터 업그레이드
SCALE OUT : SCALE UP으로 한계가 올때, SCALE OUT으로 여러대의 컴퓨터로 분산처리를 해줄 수 있다.

## 메이븐 설치
1. $ sudo apt-get list maven
2. $ sudo apt-get install maven

## MAVEN 환경변수 설정
1. $ sudo vim /etc/profile.d/maven.sh    //환경 변수 파일
   (//)
2. 파일의 끝에 아래 내용을 추가한다.
   export MAVEN_HOME=/tools/maven
   export PATH=${MAVEN_HOME}/bin:${PATH} 
    
    설정 적용
3. source /etc/profile.d/maven.sh 
  (//)





## $JAVA_HOME 환경 변수 설정 

1. $ which javac
/usr/bin/javac
2. $ sudo readlink -f /usr/bin/javac
/usr/lib/jvm/java-8-openjdk-amd64/bin/javac
3. $ sudo vim /etc/profile
맨밑에 아래의 내용 추가
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
4. $ sudo source /etc/profile 
로 변경된 내용 적용

## Jenkins 포트 변경
$ sudo vim /etc/sysconfig/jenkins



추가한다.

vim /etc/profile



# mysql Database 명 변경 방법

1) 테이블 이동
> create database newdb;
> rename table olddb.tablename to newdb.tablename;
...

> drop databases olddb;


2) 생성문 사용
 # mysqldump -uroot -p DDB > DDB.sql
 
 
 # mariadb -uroot -p     DDB < DDB.sql


 ## mysql 삭제
sudo apt-get --purge remove mysql-client mysql-server mysql-common
sudo apt-get autoremove
sudo rm -rf /etc/mysql/  --> mysql 설정 폴더 및 파일 삭제

## mariadb 삭제 
$ sudo apt-get purge mariadb-*
$ sudo apt autoremove
$ dpkg -l | grep mysql
$ sudo apt-get purge mysql-common
$ sudo rm -rf /var/log/mysql
$ sudo rm -rf /var/log/mysql.*
$ sudo rm -rf /var/lig/mysql
$ sudo rm -rf /var/etc/mysql




jdk 삭제
openjdk-java시리즈
sudo apt-get remove openjdk*

oracle-java시리즈

sudo apt-get remove oracle*
sudo apt-get autoremove --purge
sudo apt-get autoclean





젠킨스 스프링
https://blog.hanumoka.net/2018/05/23/jenkins-20180523-jenkins-use-job-with-svn/



$ date
Mon May  6 08:18:23 UTC 2019
 
$ sudo date
Mon May  6 08:18:23 UTC 2019
 
$ sudo cat /etc/localtime
TZif2UTCTZif2UTC
UTC0
 
$ sudo rm /etc/localtime
 
$ sudo ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
 
$ date
Mon May  6 17:19:11 KST 2019

$ sudo date
Mon May  6 17:19:11 KST 2019





## 서비스되는 있는 프로세스 보기
$ service --status-all|grep +

## 메모리 사용량 표시
$ ps -eo user,pid,ppid,rss,size,vsize,pmem,pcpu,time,cmd --sort -rss | head -n 11

## 메모리 사용률
$ sar -r
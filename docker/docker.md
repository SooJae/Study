키페어(.pem) 파일 설정
우클릭 -> 속성 -> 보안 -> 고급 -> 상속사용안함
-> Administators와 SYSTEM만 사용가능하도록 한다.


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

#docker 설치
1. $ df -h로 메모리 확인.(의외로 저장공간을 많이 먹음)
2. $ sudo apt update
3. $ sudo apt install apt-transport-https
4. $ sudo apt install ca-certificates
5. $ sudo apt install curl (특정한 웹사이트에서 데이터를 다운로드 받을 때 사용)
6. $ sudo apt install software-properties-common
7. $ sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add
8. $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
9. $ sudo apt update
10. $ apt-cache policy docker-ce
11. $ sudo apt install docker-ce
12. $ sudo systemctl status docker (시스템에 자동으로 등록되어 돌아가는 것을 알 수 있다.= 재부팅 해도 자동 실행된다.)

# docker 실행    
1. $ docker pull hello-world (pull은 특정한 서버파일을 이미지형태로 받을 수 있도록 해준다.)
2. $ docker images ( 다운받은 도커 이미지 확인  )
3. $ docker run hello-world (입력하자마자 바로 우리의 서버위에 하나의 서버가 생성된다.)
4. $ docker ps -a (어떤 컨테이너가 동작했는지 확인 가능)
5. $ docker rm bebf27d8afab(ps -a 로 확인한 컨테이너 삭제)
6. $ docker images ( 하지만 도커 이미지는 살아있다. )
    
# docker파일 생성
1. $ grep . /etc/*-release (서버버전 확인)
2. $ cd home/ubuntu/
3. $ mkdir docker
4. $ sudo vim Dockerfile (파일 이름 고정)
5. 다음과 같이 작성
```
FROM ubuntu:18.04
MAINTAINER Soojae Lee <mynameisleesujae@gmail.com>

RUN apt-get update
RUN apt-get install -y apache2 # Install Apache Web server (Only 'yes')

# Open HTTP Port
EXPOSE 80 

CMD ["apachectl","-D","FOREGROUND"]
```
6. $ docker build -t docker .
7. $ docker images 로 확인
8. $ docker run -p 80:80 docker(80번 포트와 EC2서버의 포트를 연결)(호스트 즉, 우리 서버의 포트 : 컨테이너의 포트)
실제로 호스트서버의 80번 포트에 접속하게 되면 이 컨테이너의 80번 포트에 접속한다.
9. AWS 웹페이지 -> 보안그룹 -> 인바운드 규칙-> HTTP 80번 포트를 연다.

다음과 같은 에러가 날 경우
docker: Error response from daemon: driver failed programming external connectivity on endpoint agitated_franklin (d0b3ce49bf0e551230279af66ffaff1bd589bae33cf3a6b55361742e41b5185d): Error starting userland proxy: listen tcp 0.0.0.0:80: bind: address already in use.

```
$ sudo systemctl stop apache2
$ echo manual | sudo tee /etc/init/apache2.override
```
10. http://52.79.141.8/ 에 들어가보면 아파치 서버가 올라가있는 것을 확인 할 수 있다.


## 배포 자동화
1. $ docker ps -a
2. $ docker rm -f `docker ps -a -q` (모든 명단을 가져와 제거)
3. $ cd /home/ubuntu/docker
4. sudo vim Dockerfile
다음과 같이 수정
```
FROM ubuntu:18.04
MAINTAINER Soojae Lee <mynameisleesujae@gmail.com>

# Avoiding user interaction with tzdata 선택문이 나오지 않게 하기 위한 환경설정
ENV DEBIAN_FRONTEND=noninteractive


RUN apt-get update
RUN apt-get install -y apache2 # Install Apache Web server (Only 'yes')

# php설치
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:ondrej/php # For Installing PHP 5.6
RUN apt-get update
RUN apt-get install -y php5.6

# Open HTTP Port
EXPOSE 80

CMD ["apachectl","-D","FOREGROUND"]
```

### 사용중이지 않은 이미지 제거
5. $ docker rm -f  "IMAGE ID" (실행 중일 경우 rm -f로 먼저 삭제)
6. $ docker rmi -f "IMAGE ID"

7. $ docker run -p 80:80 -v /home/ubuntu/docker/html:/var/www/html docker(html폴더에 파일을 넣으면 실제로 php의 기본적인 경로인 /var/www/html에 놓인 것과 같은 효과를 낸다.)

8. $ docker run -p 81:80 -v /home/ubuntu/docker/html:/var/www/html docker로 하면 81번포트에서도 접속할 수 있다. 80번 81번 포트 2개가 동시에 돌아간다. (다양한 웹서버를 하나의 서버내에서 다채롭게 여러개 만들어서 구성할 수 있다. 편리하다.)


$ docker rm -f `docker ps -a -q`  # 실행중인 docker 전체 삭제
$ docker rmi -f `docker images` # docker images 전체 삭제


## MariaDB 설치

https://downloads.mariadb.org/mariadb/repositories/#mirror=harukasan
위의 사이트가서 저장소 확인
### Dockerfile 작성
```yaml
FROM ubuntu:18.04
MAINTAINER Soojae Lee <mynameisleesujae@gmail.com>

# Avoiding user interaction with tzdata
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y apache2 # Install Apache Web server (Only 'yes')

RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:ondrej/php # For Installing PHP 5.6
RUN apt-get update
RUN apt-get install -y php5.6

#Mariadb
RUN apt-get install software-properties-common
RUN apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8
RUN add-apt-repository 'deb [arch=amd64,arm64,ppc64el] https://ftp.harukasan.org/mariadb/repo/10.3/ubuntu bionic main'
RUN apt update
RUN apt install -y mariadb-client
# PHP & MYSQL
RUN apt-get install -y php5.6-mysql # php5.6-mariadb가 없으므로 mysql로 대체
#Open Port
EXPOSE 80

CMD ["apachectl","-D","FOREGROUND"]
```

##
$ docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql:5.6
으로 컨테이너를 띄우고
$ docker exec -it "해당 컨테이너 아이디" /bin/bash 를 사용하면 실제로 컨테이너에 접속한 효과를 낸다.
$ docker inspect "컨테이너 아이디" 를 사용하면 해당 컨테이너의 세부정보를 확인 할 수 있다.

$ docker build -t docker .

$ docker run -it --rm mariadb mysql -h"호스트아이피" -u"유저아이디" -p


#docker-compose 설치


1. $ sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
2. $ sudo chmod +x /usr/local/bin/docker-compose
3. path 값이 /usr/bin/이라면 다음과 같이 심볼릭 링크를 달아준다.
$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose




## PHP와 MariaDB 연결
1. $sudo vim Dockerfile
 -p : 컨테이너 포트를 개방한 뒤, 호스트 포트와 연결한다.
-v : 볼륨 마운팅
-expose : 컨테이너 포트만 개방한다.
-d 옵션
docker run --name daemonized_container -d <docker_image>
Production 환경에서 실행될 docker container는 대부분 daemonized 된 상태로 실행될것이다.

## 사용자 할당
mariadb > CREATE USER 'test'@'%' IDENTIFIED BY 'password';

mariadb > GRANT ALL PRIVILEGES ON *.* TO 'TEST'@'%';

mariadb > FLUSH PRIVILEGES;



#docker-compose.yml을 사용하여 다중 컨테이너 애플리케이션 정의
https://docs.microsoft.com/ko-kr/dotnet/standard/microservices-architecture/multi-container-microservice-net-applications/multi-container-applications-docker-compose

docker-compose는 기본으로 .env 파일을 환경변수 파일로 인식한다. 필요한 변수를 .env에 설정해 주고, .gitignore에 추가한다. 새로 생성한 .env 파일과 변경한 docker-compose 파일은 다음과 같다.
```yml
environment:
      - "DOCUMENT_ROOT=${DOCUMENT_ROOT}"
      - "PHP_INI: ${PHP_INI}"
      - "VHOSTS_DIR: ${VHOSTS_DIR}"
```

도커를 연동한 상태에서 깃 허브에 파일을 올리면 서버에서 도커 이미지를 제거해도 된다.

의문점
원래는 mysql, mariaDB가 깔려있지 않아서 오류가 났다고 생각했는데 php를 volume처리 해주지 않아서 오류가 난것 같다. DB가 깔려 있지 않아도 외부 rds에 접속이 된다.
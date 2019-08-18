키페어(.pem) 파일 설정
우클릭 -> 속성 -> 보안 -> 고급 -> 상속사용안함
-> Administators와 SYSTEM만 사용가능하도록 한다.



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
12. $ sudo systemctl status docker (시스템에 자동으로 등록되어 돌아가는 것을 알 수 있습니다.= 재부팅 해도 자동 실행이 된다.)

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
3. path 값이 /usr/bin/이라면 다음과 같이 심볼릭 링크를 달아줍니다.
$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose




## PHP와 MariaDB 연결
1. $sudo vim Dockerfile
 -p : 컨테이너 포트를 개방한 뒤, 호스트 포트와 연결한다.
-v : 볼륨 마운팅
-expose : 컨테이너 포트만 개방합니다.
-d 옵션
docker run --name daemonized_container -d <docker_image>
Production 환경에서 실행될 docker container는 대부분 daemonized 된 상태로 실행될것 입니다.

## 사용자 할당
mariadb > CREATE USER 'test'@'%' IDENTIFIED BY 'password';

mariadb > GRANT ALL PRIVILEGES ON *.* TO 'TEST'@'%';

mariadb > FLUSH PRIVILEGES;



#docker-compose.yml을 사용하여 다중 컨테이너 애플리케이션 정의
https://docs.microsoft.com/ko-kr/dotnet/standard/microservices-architecture/multi-container-microservice-net-applications/multi-container-applications-docker-compose

docker-compose는 기본으로 .env 파일을 환경변수 파일로 인식합니다. 필요한 변수를 .env에 설정해 주고, .gitignore에 추가합니다. 새로 생성한 .env 파일과 변경한 docker-compose 파일은 다음과 같다.
```yml
environment:
      - "DOCUMENT_ROOT=${DOCUMENT_ROOT}"
      - "PHP_INI: ${PHP_INI}"
      - "VHOSTS_DIR: ${VHOSTS_DIR}"
```

도커를 연동한 상태에서 깃 허브에 파일을 올리면 서버에서 도커 이미지를 제거해도 된다.

의문점
원래는 mysql, mariaDB가 깔려있지 않아서 오류가 났다고 생각했는데 php를 volume처리 해주지 않아서 오류가 난것 같다. DB가 깔려 있지 않아도 외부 rds에 접속이 된다.


## docker-compose.yml 관리법

docker-compose.yml
이미지만 설정되어있는 베이스 파일
docker-compose.override.yml
개발시 사용되는 config
docker-compose.prod.yml
실제 배포시 사용되는 config
docker-compose.test.yml
CI에서 사용되는 config



# 젠킨스 설치 (Docker in Docker 방식)
1. $ docker pull jenkins

2. $ docker run -d -p 8080:8080 -v /home/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -u root jenkins
(젠킨스는 8080포트를 씁니다.)
3. AWS EC2 8080포트를 열어줍니다.
4. 주소:8080을 접속하면 젠킨스의 첫화면이 나온다.
5. $ docker logs "젠킨스 컨테이너 ID"
6. Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

**이 부분을 접속한 웹페이지 첫 화면 비밀번호에 붙여넣는다.**

7. 첫번째 것을 눌러 기본 설치를 한다.
8. 그다음 사용자를 생성한다.


# 젠킨스 설치 2
	
1. $ docker run -d -p 8080:8080 -p 50000:50000 jenkins/jenkins
2. AWS EC2 8080포트를 열어줍니다.
3. 주소:8080을 접속하면 젠킨스의 첫화면이 나온다.
4. $ docker logs "젠킨스 컨테이너 ID"
5. Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

**이 부분을 접속한 웹페이지 첫 화면 비밀번호에 붙여넣는다.**

깃 계정 정보를 특정한 서버내에 기록하게하면 깃 계정 정보가 유출될수도 있기때문에
(젠킨스에 존재하기 때문에) 다음과 같이 2시간만 존재하도록 타임아웃 설정을 한다..
git config --global credential.helper "cahce --timeout 7200"

깃허브
Personal access tokens 탭에 들어가서 
repository와 repo:hook을 체크해놓으면 
git pull을 할때 비밀번호 대신에 accessToken을 넣으면 된다



컨테이너가 중지되면 고정 장치 볼륨이 자동으로 제거되지 않는다. 컨테이너를 중지 할 때 연관된 볼륨을 제거하려면 다음과 같이해야한다.

docker rm -v <container id or name>
-v 플래그가 지정되지 않으면, 볼륨은 디스크에 'dangling volume'으로 남아 있다. 매달려있는 모든 볼륨을 삭제하려면 다음과 같이해야한다.

docker volume rm $(docker volume ls -qf dangling=true)
docker volume ls -qf dangling=true 필터는 컨테이너에 연결되지 않은 태그가없는 볼륨을 포함하여 도커 볼륨 이름의 목록을 반환한다.
젠킨스는 jdk8 까지만 지원합니다....
sudo apt install openjdk-8-jdk



젠킨스 설치
1. $ wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
2. $ sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
3. $ sudo apt-get update
4. $ sudo apt-get install jenkins
   
   젠킨스 포트번호 바꾸기
5. $ sudo /etc/default/jenkins
6. $ sudo systemctl enable jenkins
7. $ sudo systemctl start jenkins
8. 포트 열기



참고 사이트:
http://yallalabs.com/devops/how-to-install-jenkins-ubuntu-18-ubuntu-16/



## 젠킨스 설정
1. global Tool Configuraion 클릭
2. $ sudo readlink -f /usr/bin/javac 로 위치 확인
JDK Name : jdk1.8
JAVA_HOME : /usr/lib/jvm/java-8-openjdk-amd64
3. git
   Name : Default
   Path to Git executable : git
4. maven
   Name : maven3
   MAVEN_HOME : /tools/maven
deploy to container 플러그인 설치



https://kutar37.tistory.com/entry/Jenkins-Github-%EC%97%B0%EB%8F%99-%EC%9E%90%EB%8F%99%EB%B0%B0%ED%8F%AC-3
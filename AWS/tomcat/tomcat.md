wget 'http://apache.tt.co.kr/tomcat/tomcat-8/v8.5.40/bin/apache-tomcat-8.5.40.tar.gz'
tar xvfz

tar xvfz 다운받은 파일  mv apache-tomcat-8.5.40 /usr/local/tomcat8


$ vim /etc/profile
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export CATALINA_HOME=/usr/local/tomcat8 export CLASSPATH=.:$JAVA_HOME/jre/lib/ext:$JAVA_HOME/lib/tools.jar:$CATALINA_HOME/lib/jsp-api.jar:$CATALINA_HOME/lib/servlet-api.jar export M2_HOME=/usr/local/maven 
PATH=$PATH:$JAVA_HOME/bin:$M2_HOME/bin:$CATALINA_HOME/bin


$ vim /usr/local/tomcat8/conf/server.xml
<Connector port="8080" protocol="HTTP/1.1" URIEncoding ="UTF-8">

## tomcat 서비스 생성

$ sudo vim /etc/systemd/system//tomcat.service


 $ sudo systemctl daemon-reload


$ chown webservice:webservice /usr/local/tomcat7 -R
$ ls -alR /usr/local/tomcat7

## Tomcat User 생성

$ sudo groupadd tomcat
$ sudo useradd -M -s /bin/nologin -g tomcat -d /usr/local/tomcat tomcat


## 권한 조정

$ chgrp -R tomcat /usr/local/tomcat
$ cd /usr/local/tomcat
$ sudo chmod -R g+r conf
$ sudo chmod g+x conf
$ sudo chown -R tomcat webapps/ work/ temp/ logs/

## systemd 설정파일 등록
$ sudo vi /etc/systemd/system/tomcat.service
```
[UNIT]
Description=tomcat8
After=network.target syslog.target

[Service]
Type=forking
User=tomcat
Group=tomcat

ExecStart=/usr/local/tomcat8/bin/startup.sh
ExecStop=/usr/local/tomcat8/bin/shutdown.sh
[Install]
WantedBy=multi-user.target
```



# apt-get 이용시

## Tomcat 설치
$ sudo apt-get install tomcat8
$ sudo apt-get install tomcat8-admin   (하면 manager도 자동으로 설치됌)
$ sudo apt-get install tomcat8-docs
$ sudo apt-get install tomcat8-examples

###설치 확인
$ netstat -tnlp | grep java
$ ps -ef | grep tomcat | grep -v grep

## Tomcat 설치경로
/usr/share/tomcat8  →  executable &l ibraries
/var/lib/tomcat8  →  conf & webapps

## Tomcat 실행
sudo service tomcat8 start
sudo service tomcat8 stop

## Tomcat /etc/tomcat/tomcat-users.xml 수정
<role rolename="manager-gui"/>
<role rolename="manager-script"/>`
<role rolename="manager-jmx"/>
<role rolename="manager-status"/>
<role rolename="admin-gui"/>
<role rolename="admin-script"/>
<user username="admin" password="admin" roles="manager-gui,manager-script,manager-jmx,manager-status,admin-gui,admin-script"/>


# conf/Catalina/localhost/manager.xml 생성
```xml
<?xml version="1.0" encoding="UTF-8"?>
 
<Context privileged="true" antiResourceLocking="false" 
         docBase="${catalina.home}/webapps/manager">
    <Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="^.*$" />
</Context>
```


# 포트 포워딩
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080

# iptable 영구저장
1. sudo apt install iptables-persistent
2. sudo netfilter-persistent save
3. sudo netfilter-persistent reload

2. service iptables save
# 확인하기 
iptables -t nat -L


# EC2 swap 파일 생성(t2는 swap파일이 없다.)


$ sudo dd if=/dev/zero of=/swapfile bs=1M count=512     # 512MB 스왑용 파일 생성
   
$ sudo chown root:root /swapfile    # root 소유
   
$ sudo chmod 600 /swapfile          # 권한설정
   
$ sudo mkswap /swapfile
   
$ sudo swapon /swapfile
  
$ sudo swapon -a
  
   
 
$ sudo vi /etc/fstab        # 리부팅시 인식할 수 있도록 fstab에 등록 (실수할 경우 부팅이 안될 수 있으니 스냅샷 + 조심!)
   
가장 아래줄에 내용추가
   
/swapfile   swap   swap   defaults  0  0
   
 
$ sudo swapon -s    # sanity test  Swap 에 설정한 용량이 사용되었는지 확인
   
$ free -m           # sanity test  Swap 에 설정한 용량이 사용되었는지 확인

/usr/share/tomcat8/ = $CATALINA_HOME

@PropertySource( value = "file:${catalina.home}/config/application.properties", ignoreResourceNotFound = true)
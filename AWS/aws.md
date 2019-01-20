

VPC란?
VPC는 AWS안에서 외부로부터 안전한 네트워크를 구성
외부에서는 VPC안의 RDS에 접근을 금지, JSP서버에서는 RDS에 접근할 수 있음.
VPC안의 특정 어플리케이션만 RDS에 접근 하게 할 수도 있음.

1.AWS 우분투 접속 ssh ubuntu@ 'DNS주소' -i '경로+파일'
2. sudo apt-get update; 로 업데이트 해주기
3.sudo apt install mysql-client 로 설치
4. EC2와 R데이터베이스를 하나의 보안그룹으로 지정해줘야한다.(접근할 수 있게)
4. mysql -h'end 포인트 주소' -u'계정' -p
5. 비밀번호 입력


아파치 설치
sudo apt-get install apache2

Router 53 도메인 구매하기
dig web interface로 정상적으로 작동 했는지 확인 할 수있다.

웹서버로 설정시 HTTP 인바운드 포트를 열어줘야 접근할 수 있다.
SSH는 리눅스, RDS는 윈도우에서 접근

elastic IP :고정 아이피를 할당 받는 것, 아마존에서 하나는 공짜로 받을 수 있다.

AMIs는 SCALE UP 시 용이하게 사용할 수 있다 (백업 해놓은 것)

SCALE UP : 컴퓨터 업그레이드
SCALE OUT : SCALE UP으로 한계가 올때, SCALE OUT으로 여러대의 컴퓨터로 분산처리를 해줄 수 있다.



mysql Database 명 변경 방법

1) 테이블 이동
> create database newdb;
> rename table olddb.tablename to newdb.tablename;
...

> drop databases olddb;


2) 생성문 사용
 # mysqldump -uroot -p DDB > DDB.sql
 # mariadb -uroot -p     DDB < DDB.sql
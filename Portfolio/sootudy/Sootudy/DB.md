CREATE TABLE member_auth (
  id varchar(50) NOT NULL,
  auth varchar(50) NOT NULL DEFAULT 'MEMBER',
  PRIMARY KEY pk_member_auth (id,auth),
  CONSTRAINT fk_member_auth FOREIGN KEY (id) REFERENCES member (id)
) 

CREATE TABLE member (
  id varchar(50) NOT NULL,
  pw varchar(100) NOT NULL,
  nm varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  dt datetime DEFAULT current_timestamp(),
  udt_dt datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  flag char(1) DEFAULT '1',
  type varchar(50) NOT NULL,
  PRIMARY KEY (id)
)


CREATE TABLE board (
  bno int(11) NOT NULL AUTO_INCREMENT,
  title varchar(200) NOT NULL,
  content varchar(2000) NOT NULL,
  writer varchar(50) NOT NULL,
  dt datetime DEFAULT current_timestamp(),
  udt_dt datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  v_cnt int DEFAULT 0,
  reply_cnt int(11) DEFAULT 0,
  like_cnt int DEFAULT 0,
  delete_flag char(1) DEFAULT '0',
  
  bname varchar(20) DEFAULT NULL,
  PRIMARY KEY (bno)
)



CREATE TABLE board_attach(
  uuid VARCHAR(100) not null,
  uploadPath VARCHAR(200) not null,
  fileName VARCHAR(100) not null,
  filetype char(1) default 'I',
  bno int
)

alter table board_attach add constraint pk_attach primary key (uuid);
alter table board_attach add constraint fk_board_attach foreign key (bno) references board(bno);




create table board_reply(
  rno int(12) PRIMARY KEY AUTO_INCREMENT,
  bno int not null,
  reply VARCHAR(1000) not null,
  replyer VARCHAR(50) not null,
  reply_dt datetime DEFAULT current_timestamp(),
  reply_udt_dt datetime DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP()
);

alter table board_reply add constraint fk_board_reply
foreign key(bno) references board(bno);


create table persistent_logins(
  username varchar(64) not null,
  series varchar(64) primary key,
  token varchar(64) not null,
  last_used datetime not null
);

CREATE TABLE board_like(
lno BIGINT PRIMARY KEY AUTO_INCREMENT,
bno INT NOT NULL,
id VARCHAR(50) NOT NULL,
FOREIGN KEY (bno) REFERENCES board(bno),
FOREIGN KEY (id) REFERENCES member(id)
);


CREATE TABLE study (
  sno int NOT NULL AUTO_INCREMENT, 
  title varchar(80) NOT NULL,
  content varchar(700) NOT NULL,
  leader varchar(50) NOT NULL,
  dt datetime DEFAULT current_timestamp(),
  udt_dt datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  delete_flag char(1) DEFAULT '0',
  PRIMARY KEY (sno)
)

CREATE TABLE study_todo(
  tdno int NOT NULL AUTO_INCREMENT,
  todo varchar(100),
  leader varchat(50)
  dt datetime DEFAULT current_timestamp(),
  udt_dt datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  achive char(1) DEFAULT '0',
  sno int not null,

  PRIMARY KEY(todono)
)
alter table study_todo add constraint fk_study_todo foreign key(sno) references study(sno);

CREATE TABLE study_members(
  sno int NOT NULL,
  member varchar(50),
  cnt int,
  cntMax int 
  FOREIGN KEY (sno) REFERENCES study(sno)  
)

CREATE TABLE chat_rooms(
  roomId varchar(60) PRIMARY KEY,
  name varchar(50) UNIQUE KEY NOT NULL,
  cnt int
)

CREATE TABLE study_chat(
  s_cno BIGINT AUTO_INCREMENT,
  member varchar(100) not NULL,
  chat varchar(200) not NULL,
  dt datetime DEFAULT current_timestamp(),
  sno int 
)

SELECT NOW(); 로 현재시간 확인.
SHOW GLOBAL VARIABLES LIKE '%zone%'; 로 타임존 확인
RDS로 들어가서 변경

출처 : https://brtech.tistory.com/95


DTO는 테이블과 일대일 매칭이고 Vo는 그외에것들 포함해서 검색키워드 나 그런식으로도 씀요 

검색키워드나 페이징처리할때 반드시넘어가야할 파라미터들은 VO에담구요 DTO는테이블컬럼과매칭이요
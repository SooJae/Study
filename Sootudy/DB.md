CREATE TABLE member_auth (
  id varchar(50) NOT NULL,
  auth varchar(50) NOT NULL,
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
  reply_cnt int(11) DEFAULT 0,
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


SELECT NOW(); 로 현재시간 확인.
SHOW GLOBAL VARIABLES LIKE '%zone%'; 로 타임존 확인
RDS로 들어가서 변경

출처 : https://brtech.tistory.com/95
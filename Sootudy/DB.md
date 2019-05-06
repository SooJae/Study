CREATE TABLE MEMBER_AUTH_TB (
  USER_ID varchar(50) NOT NULL,
  AUTH varchar(50) NOT NULL,
  PRIMARY KEY MEMBER_AUTH_PK (USER_ID,AUTH),
  CONSTRAINT MEMBER_AUTH_FK FOREIGN KEY (USER_ID) REFERENCES MEMBER_TB (USER_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE member (
  id varchar(50) NOT NULL,
  pw varchar(100) NOT NULL,
  nm varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  dt datetime DEFAULT current_timestamp(),
  udt_dt datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  flag char(1) DEFAULT '1',
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





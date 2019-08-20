# Sootudy

Sootudy는 스터디 웹 사이트 입니다. 빼어날 수(秀)에 Study를 합쳐 '뛰어난 개발을 하는 모임'이라는 뜻 입니다.


테스트용 아이디 : test 비밀번호 : test0000

# 개발 환경

## BACK-END
- JAVA
- JSP

## FRAMEWORK
- SPRING

## FRONT-END
- HTML
- JAVASCRIPT
- CSS
- JQUERY
- AJAX
- BootStrap

## DBMS
- MariaDB

## WEB SERVER
- APACHE TOMCAT 8.5

## VERSION CONTROL
- GIT
- GITHUB

## BUILD & DEPLOY
- JENKINS

## NOTIFY
- SLACK

## AWS
- EC2
- RDS(MariaDB)
- ~~S3~~ (S3 연결시 접속이 끊기는 현상이 발견되어 임시 중단하고, 게시물의 첨부 파일은 EC2에 올리도록 수정했습니다.)
- Router53
- AWS CERTIFICATE MANAGER(SSL 생성용입니다.)
- ELASTIC LOAD BALANCER (http로 접속시 https로 redirect를 해주기 위해서 만들었습니다.)

# 프로젝트 구성
![structure](https://github.com/SooJae/Study/blob/master/portfolio/sootudy/img/structure.png)


# 서비스
## 전체 디자인
Bootstrap을 이용한 반응형 웹디자인으로 만들었습니다. 디자인을 커스텀하고 싶은 부분은 직접 css를 이용하여 디자인을 했습니다. 

## 로그인 및 회원가입

### 유효성 검사 
keyup이벤트와 Ajax 통신을 이용하여 실시간으로 중복여부를 확인했습니다. 또한 '정규식'과 'replace 함수'를 이용하여 특수문자 입력 시 바로 삭제가 가능하도록 했습니다.

## 게시판
게시판을 어떻게 하면 평범하지 않게 만들 수 있을지 많은 생각을 했습니다.    
우선 디자인에 더욱 신경을 썼습니다. 컴퓨터와 폰으로 접속할 시 각각 보이는 화면의 수정 작업을 반복했고, 결국 만족한 결과를 만들었습니다.    
### 추천 기능
하나의 게시물에 하나의 아이디만 추천(DB복합키 이용) 할 수 있고, 재 추천을 할 경우 취소되도록 만들었습니다.   
게시판 리스트의 왼쪽 하단 '인기 글' 버튼을 클릭하면 추천을 받은 게시물(현재 추천 1이상)만 나오도록 필터 기능을 넣었습니다.
### 댓글
RestFul 방식으로 만들었습니다. 
### 검색, 첨부파일 기능
검색과, 글 작성시 첨부파일이 업로드가 되도록 만들었습니다.(S3의 연결 오류로 인해 EC2 서버에 올리는 형식으로 바꾼 상태입니다.)


## 스터디
### 리스트
왼쪽 하단의 '내 모임' 버튼을 클릭하면 내가 참석한 모임을 확인 할 수 있습니다.   
진행률은 (Todo 성공 갯수/Todo 전체 갯수) * 100 을 하여 퍼센티지로 표시했습니다.

### 그래프(미 구현)
'Github Api를 이용하여 Commit갯수를 받아올 수 있지않을까' 라고 생각하여 그래프로 표현하고 싶었지만, 하지 못하고 일단 더미값을 넣어 둔 상태입니다.

### Todo리스트
게시판의 댓글과 마찬가지로 RestFul하게 만들었습니다.    
Todo리스트 체크시 디자인에 신경 썼습니다.   
Todo리스트 등록시 '1시간 이내', '하루 이내', '하루 이상', '시간 초과'시 각각 뱃지 색이 변하도록 만들고, 나타나는 형식도 달라지게 했습니다.

### 채팅방
스터디에 참여한 사람들끼리 채팅을 하는 기능입니다.  
Stomp와 SockJS 라이브러리를 이용하여 채팅서버를 만들었습니다.  
연결 성공시 데이터베이스에서 이전 채팅 기록을 불러오게 했습니다.   
스마트폰의 메신져과 비슷한 느낌을 주기위해 디자인에 신경을 썼습니다.   

## 익명 채팅방
스터디의 채팅방과 같이 Stomp를 이용한 것은 똑같지만, 아이디가 필요없는 익명 채팅방을 만들었습니다.   
SessionStorage를 이용하여 아이디를 저장하여 채팅을 참여하고, 채팅방을 나가거나 세션이동시 disconnect와 동시에 SessionStorage안의 아이디 값도 지우도록 만들었습니다.   
물론 이전 대화 목록은 불러오지 않도록 만들었습니다.


# 기타 개발 이야기

## keyup 이벤트의 잦은 Ajax 통신으로 인한 DB의 과부화와 비용 증가
 회원가입 폼에서 keyup 이벤트 때문에 한글자씩 입력마다 DB를 호출함에 따라 DB과부화와 비용이 걱정되었습니다.   
웹사이트를 찾아다니던 중, 한 블로그에서 '디바운싱 개념'을 이용하면 Ajax통신을 효과적으로 할 수 있다고 알려주었습니다.   
'디바운싱 개념'을 이용하여 이전 keyup이벤트 이후 70ms내에 keyup 이벤트 발생시 Ajax 통신이 되지 않도록 하여 비용적으로 좀 더 최적화를 했습니다.

## xss 방지 필터
'네이버'의 'lucy-xss-servlet-filter'를 사용해보려고 했으나, Ajax 통신을 할때는 필터의 적용이 안되는 문제가 발생했습니다.   
 스프링의 CharacterEscapes 클래스를 이용하여 직접 xss-filter를 만들고, Ajax 통신과 웹 소켓 통신에 각각 적용했습니다.   
하지만 이미지 파일을 Ajax통신할 시에 image/png가 text/html로 변환되어 정상적으로 가져오지 못하는 상황이 발생했습니다.   
StackOverflow에서 BufferedImageHttpMessageConverter클래스를 이용하라는 글도 있었지만, 이 또한 해결을 해주지 못했습니다.   
결국 스프링 공식 레퍼런스에서 HttpMessageConverter와 관련된 클래스를 찾아보았습니다.
찾는 도중 ByteArrayHttpMessageConverter라는 클래스가 있어서 이미지가 Byte로 변환돼서 전송이 되니, 이 클래스를 이용하면 가능하지 않을까 생각하여 필터에 추가해 주었더니 전송에 성공했습니다.

## S3 구현
S3를 구현하면서 힘들었던 것은 스프링이 properties 값을 제대로 갖고오지 못한 것이었습니다.   
직접 하드 코딩으로 private String accessKey ="...", private String secretKey ="..." 로 하면 정상적으로 작동이 되지만, 
보안에 문제가 되기 때문에 properties 파일을 이용할 수 밖에 없었습니다.
```java 
 ...
@Value("${spring.aws.credentials.accessKey}")
   private String accessKey;
      
@Value("${spring.aws.credentials.secretKey}")
   private String secretKey;
   
// error! : accessKey 값과 secertKey 값을 갖고 오지 못함
public AmazonS3() {
    AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
    this.s3Client = AmazonS3ClientBuilder.standard()
            .withRegion(Regions.AP_NORTHEAST_2)
            .withCredentials(new AWSStaticCredentialsProvider(credentials))
            .build();
      }
```

하지만 위와 같이 코드를 썼을 때, 생성자에서 accessKey와 secertKey를 갖고오지 못하는 상황이 발생 했었습니다.
이런 저런 방법을 시도한 끝에, 객체가 생성된 후에 키 값을 갖고 오게 하면 될 것 같다고 생각했습니다.
@PostConstruct를 사용하여 객체생성 후에 실행되는 메소드에 키값 들을 넣으니 정상적으로 작동 되었습니다. 

```java
    ...
@Value("${spring.aws.credentials.accessKey}")
   private String accessKey;
      
@Value("${spring.aws.credentials.secretKey}")
   private String secretKey;

//정상 작동!
@PostConstruct
private void initializeAmazon() {
    AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
    this.s3Client = AmazonS3ClientBuilder.standard()
            .withRegion(Regions.AP_NORTHEAST_2)
            .withCredentials(new AWSStaticCredentialsProvider(credentials))
            .build();
    }
```

위와 같이 해결하지 못할 것 같은 문제들이 닥쳤을 때 적지 않은 스트레스를 받지만, 노력 끝에 해결하면 그 보람과 성취감은 이루어 말할 수 없다고 느꼈습니다.   
개발하며 성취감을 자주 느끼는 개발자가 되고 싶습니다.

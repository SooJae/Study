# 스프링 프레임워크 실행과정
1. 스프링 프레임 워크 실행
2. 스프링이 사용하는 메모리 영역을 만듬 (Context)
3. 스프링이 자신이 객체를 생성하고 관리해야 하는 객체들에 대한 설정 (RootConfig.java)
4. @ComponentScan을 통해 패키지를 스캔.
5. @Component라는 어노테이션이 존재하는 클래스의 인스턴스를 생성
6. @Autowired라는 설정이 있으면 해당 객체의 레퍼런스를 @Autowired 어노테이션이 달려있는 객체에 주입

#JUnit 사용방법.
test패키지에서 해당 테스트 파일을 만듬.

테스트 할 자바파일 위에 
```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes= {RootConfig.class})
@Log4j
```
를 달아둠.

@ContextConfiguration은 자동으로 만들어줄 애플리케이션의 컨텍스트의 설정파일 위치를 지정해줍니다. classes 속성으로 @Configuration이 적용된 클래스를 지정 해줄 수도 있습니다.



```java
assertNotNull(restaurant); //restaurant의 변수가 null이 아니어야만 테스트가 성공합니다
		
	log.info(restaurant); 
	log.info("---------------");
	log.info(restaurant.getChef());
```


## 테스트 주목할 점
new Restaurant()와 같이 Restaurant 클래스에서 객체를 생성한 적이 없는데도 객체가 만들어 졌다 
=>  
스프링은 관리가 필요한 객체(Bean)를 어노테이션을 이용해서 객체를 생성하고 관리하는 일종의 컨테이너, 팩토리의 기능을 갖고있습니다.

## @Setter
### value
접근 제한 속성을 의미

### onMethod
setter메서드 생성시 메서드에 추가할 어노테이션을 지정.

### onParam
setter메서드의 파라미터에 어노테이션을 사용하는 경우.

## @Log4j
log.info()메서드를 이용해서 로그를 찍을 수 있습니다.

@Log와 같다.
클래스쪽에 붙여주면 내부적으로 static final로 Logger 객체가 생성.

# 묵시적 생성자 주입
4.3이후에는 @Autowired이 없어도 생성자 주입이 됩니다.

@AllArgsConstructor는 변수로 선언된 모든것을 파라미터로 받는 생성자를 작성합니다.
@RequiredArgsConstructor는 @NonNull입니다 final이 붙은 인스턴스 변수에 대한 생성자를 생성

# @Component와 @Bean의 차이
@Component는 클래스 상단에 적으며 그 default로 **클래스 이름이 bean**의 이름이 됩니다. 또한 spring에서 자동으로 찾고 관리해주는 bean입니다.

@Bean은 @Configuration으로 선언된 클래스 내에 있는 메소드를 정의할 때 사용합니다. **이 메소드가 반환하는 객체**가 bean이 되며 default로 **메소드 이름이 bean**의 이름이 됩니다.

# SQLSessionFactory

SQLSessionFactory는 내부적으로 SQLSession이라는 것을 만들어 낸다.
SQL을 통해서 Connection을 생성하거나 원하는 SQL을 전달하고, 결과를 리턴받는 구조


timeMapper.getClass().getName()은 실제 동작하는 클래스의 이름을 확인해줍니다.

# log4jdbc-log4j2 
MyBatis는 내부적으로 PreparedStatement를 이용해서 SQL을 처리합니다.   
복잡한 SQL의 경우 ?로 나오는 값이 제대로 되었는지 확인하기가 쉽지 않고, 실행된 SQL의 내용을 정확히 확인하기 어렵다.   
이를 해결하기 위해 **log4jdbc-log4j2** 라이브러리를 사용합니다. 

# 프로젝트의 로딩구조

프로젝트 구동시 관여하는 XML은 web.xml, root-context.xml, servlet-context.xml.
이 파일중 web.xml은 Tomcat과 관련된 설정이고, 나머지 두 파일은 스프링과 관련된 설정입니다.   
프로젝트의 구동은 web.xml에서 시작합니다. web.xml 상단에는 가장 먼저 구동되는 Context Listener가 등록되어 있습니다.
root-context.xml이 처리되면 파일에 있는 빈(Bean)설정들이 동작합니다. 그 후에 서블릿과 관련된 설정이 동작합니다.

# log4j 에러...
1.2.15를 1.2.17로 바꾸고 log4j에 <exclusions>로 추가된 부분을 모두 주석처리(혹은 제거)해주면 됨.

# @Controller
Controller를 작성할때 가장 편리한 기능은 파라미터가 자동으로 수집되는 기능.   
이 기능을 이용하면 매번 request.getParameter()를 이용하는 불편함을 없앨 수 있습니다.   
Controller가 파라미터를 수집하는 방식은 파라미터 타입에 따라 자동으로 변환하는 방식을 이용합니다.   
예를 들어, **int 타입으로 선언된 age가 자동으로 숫자로 변환되는 것**을 확인 할 수 있습니다.   

# @RequestParam

@RequestParam은 파라미터로 사용된 **변수의 이름과 전달되는 파라미터의 이름이 다른 경우**에 유용하게 사용됩니다.
동일한 이름의 파라미터가 전달되는 경우에 
```java
@RequestParam("e") ArrayList<String> d 
```
등으로 처리 가능하다

# @InitBinder
파라미터의 수집을 다른 용어로 binding이라고 합니다.
변환이 가능한 데이터는 자동으로 변환되지만, 파라미터를 변환해서 처리해야하는 경우도 존재합니다.
2019-01-01 과 같이 문자열로 전달된 데이터를 java.util.Date 타입으로 변환하는 작업이 그러하다.
스프링 Controller에서는 파라미터를 바인딩할 때 자동으로 호출되는 @InitBinder를 이용해서 이러한 변환을 처리할 수 있습니다.

ex)
DTO.java
```java
private Date dueDate;
```

Controller.java
```java
@InitBinder
public void initBinder(WebDataBinder binder){
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    binder.registerCustomEditor(java.util.Date.class, new customDateEditor(dateFormat, false));
}

...생략....
@GetMapping("/ex03")
public void ex03(Dto dto){
    log.info("dto" + dto)
}
```

또는 다음과 같은 방식으로 쉽게 할 수 있습니다.
DTO.java
```java
@DateTimeFormat(pattern = "yyyy/MM/dd")
private Date dueDate;
```

# Model
Model 객체는 JSP에 컨트롤러에 생성된 데이터를 담아서 전달하는 역할.
이를 이용해서 **JSP와 같은 뷰(View)로 전달해야 하는 데이터**를 담아서 보낸다.

**Model == request.setAttribute()**

## Servlet에서 모델 2 방식으로 데이터를 전달하는 방식
```java
    request.setAttribute("serverTime", new java.util.Date());

    RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/home.jsp");
    dispatcher.forward(request, response);
```
스프링 MVC에서 Model을 이용한 데이터 전달
```java
    public String home(Model model){
        model.addAttribute("serverTime", new java.util.Date());
        return "home";
    }

```
Model을 사용하는 경우는 주로 **Controller에 전달된 데이터를 이용해서 추가적인 데이터를 가져와야 할때** 입니다.   

ex)**(중요)**
- 리스트 페이지 번호를 파라미터로 전달받고, 실제 데이터를 View로 전달해야 하는 경우
- 파라미터들에 대한 처리 후 결과를 전달해야 하는 경우

웹페이지의 구조로 Request에 전달된 데이터를 가지고 필요하다면, 추가적인 데이터를 생성해서 화면으로 전달하는 방식으로 동작합니다.
Model의 경우는 파라미터로 전달된 데이터는 존재하지 않지만 화면에서 필요한 데이터를 전달하기 위해서 사용합니다.

스프링 MVC의 Controller는 기본적으로 **Java Beans 규칙에 맞는 객체는 다시 화면으로 객체를 전달합니다.**
좁은 의미에서 Java Beans의 규칙은

1. 단순히 생성자가 없거나 빈 생성자를 가져와야 합니다.
2. getter/setter를 가진 클래스의 객체들을 의미합니다.
   
전달될 때에는 클래스명의 앞글자는 **소문자**로 처리됩니다.

# @ModelAttribute
@ModelAttribute는 강제로 전달받은 파라미터를 Model에 담아서 전달하도록 할 때 필요한 어노테이션.
@ModelAttribute가 걸린 파라미터는 타입에 관계없이 무조건 Model에 담아서 전달되므로, 파라미터로 전달된 데이터를 다시 화면에서 사용해야할 경우에 사용됩니다.

```java
@GetMapping("/ex04")
public String ex04(SampleDTO dto, @ModelAttribute("page") int page){
    log.info("dto:" +dto);
    log.info("page:" +page);

    return "sample/ex04";
    
}
```


## @ModelAttribute VS @RequestParam
@ModelAttribute : 요청 파라미터를 컨트롤러에서 도메인 오브젝트(DTO, VO)에 바인딩해서 한번에 받습니다.
- 하나의 오브젝트에 클라이언트 요청 정보를 담아서 한번에 전달되는 것이기 때문에 이를 커맨드 패턴에서 말하는 커맨드 오브젝트라고도 합니다.   

@RequestParam : 요청 파라미터를 컨트롤러에서 1:1로 받습니다.

@ModelAttribute는 요청 파라미터를 컨트롤러에서 받고 그 데이터를 자동으로 해당 View에 전송합니다.

# RedirectAttribute

redirect는 일회성으로 데이터를 전달하는 용도로 사용됩니다.

Servlet에서 redirect 방식
```java
response.sendRedirect("/home?name=aaa&age=10");
```

스프링MVC를 이용하는 redirect 처리
```java
rttr.addFlashAttribute("name","AAA");
rttr.addFlashAttribute("age",10);

return "redirect:/";
```

Controller의 리턴 타입
스프링 MVC의 구조가 기존의 상속과 인터페이스에서 어노테이션을 사용하는 방식으로 변한 이후에
**리턴타입이 자유로워졌다.**

String : jsp를 이용하는 경우에는 jsp파일의 경로와 파일이름을 나타내기 위해서 사용합니다.   
void : 호출하는 **URL과 동일한 이름의 jsp를 의미합니다.**   
VO, DTO 타입: 주로 JSON타입의 데이터를 만들어서 반환하는 용도.   
ResponseEntity 타입 : response할 때 Http 헤더정보와 내용을 가공하는 용도로 사용합니다.   
Model, ModelAndView : Model로 데이터를 반환하거나 화면까지 같이 지정하는 경우에 사용합니다.(최근에는 사용 X)   
HttpHeaders : 응답에 내용 없이 Http 헤더 메시지만 전달하는 용도로 사용합니다.

String 타입에는 다음과 같은 키워드를 넣을수 있습니다.   
- redirect, forward

## 객체타입
리턴타입을 VO(Value Object)나 DTO(Data Transfer Object)타입 등 복합적인 데이터가 들어간 객체타입으로 지정할 수 있는데, 주로 JSON 데이터를 만들어내는 용도로 사용합니다.
이를 위해서는 **jackson-databind라이브러리를 pom.xml에 추가합니다.**

## ResponseEntity 타입
스프링 MVC의 사상은 HttpServletRequest나 HttpServletResponse를 직접 핸들링하지 않아도 이런 작업이 가능하도록 작성되었기 때문에, 이러한 처리를 위해 ResponseEntity를 통해서 **원하는 헤더정보나 데이터를 전달**할 수 있습니다.

```java
@GetMapping("/ex07")
public ResponseEntity<String> ex07(){
    log.info("/ex07.....");

    String msg = "{\"name\":\"홍길동\"}";

    HttpHeaders header = new HttpHeaders();
    header.add("Content-Type","application/json;charset=UTF-8");

    return new ResponseEntity<>(msg, header, HttpStatus.OK);
}
```
# Controller의 Exception 처리
- @ExceptionHandler와 @ControllerAdvice를 이용한 처리
- @ResponseEntity를 이용하는 예외 메시지 구성

# @ControllerAdvice
@ControllerAdvice는 AOP를 이용한 방식입니다. 

```java
@ControllerAdvice // 이 부분
@Log4j
public class CommonExceptionAdvice {

	@ExceptionHandler(Exception.class) //이 부분
	public String except(Exception ex, Model model) {

		log.error("Exception ......." + ex.getMessage());
		model.addAttribute("exception", ex);
		log.error(model);
		return "error_page";
	}

	
``` 

@ControllerAdvice는 해당 객체가 스프링의 **컨트롤러에서 발생하는 예외를 처리하는 존재임을 명시하는 용도**로 사용
@ExceptionHandler는 해당 메서드가 () 들어가는 예외타입을 처리합니다. 위와같은 경우 **Exception.class**를 지정했으므로
**모든 예외에 대한 처리가 except()**만을 이용해서 처리할 수 있습니다.

500 메세지는 'Internal Server Error' 이므로 @ExceptionHandler를 이용해서 처리되지만, 잘못된 URL을 호출할 때 보이는 404에러 메시지의 경우는 조금 다르게 처리하는 것이 좋습니다.

```java
@ExceptionHandler(NoHandlerFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String handle404(NoHandlerFoundException ex) {

		return "custom404";
	}
```

# 3-tier 방식
## Presentation Tier 
화면을 보여주는 기술을 사용하는 영역.   
Servlet/JSP나 스프링 MVC가 담당. MVC와 JSP를 이용한 화면 구성.

## Business Tier
순수한 로직을 담고 있는 계층. 고객의 요구 사항을 반영.   
주로 'xxxService'와 같은 이름을 구성하고, 메서드의 이름 역시 고객들이 사용하는 용어를 그대로 사용합니다.

## Persistence Tier 
데이터를 어떤 방식으로 보관하고, 사용하는가에 대한 설계가 들어가는 계층.   
경우에 따라서 네트워크 호출이나 원격 호출 들의 기술이 접목됩니다.   
이 영역은 MyBatis와 mybatis-spring을 이용해서 구성했던 파트 1을 이용합니다.

스프링 MVC 영역은 Presentation Tier를 구성하게 되는데, 각 영역은 사실 별도의 설정을 가지는 단위.   
RootConfig, ServletConfig 등의 설정 파일이 해당 영역의 설정을 담당.   
스프링 Core영역은 POJO의 영역입니다. 스프링의 의존성 주입을 이용해서 객체 간의 연관구조를 완성해서 사용.

프로젝트를 3-tier로 구성하는 가장 일반적인 설명은 **유지 보수**에 대한 필요성 때문입니다.

네이밍 규칙-
xxxController : 스프링 MVC에서 동작하는 Controller 클래스를 설계할 때 사용합니다.
xxxService, xxxServiceImpl : 비즈니스 영역을 담당하는 인터페이스는 'xxxService' 라는 방식을 사용하고, 인터페이스를 구현한 클래스는 Impl 이라는 이름을 사용합니다.
xxxDAO, xxxRepository : DAO(Data-Access-Object) 나 Repository라는 이름으로 영역을 따로 구성하는 것이 보편적.
MyBatis의 Mapper 인터페이스를 활용.

VO, DTO : VO와 DTO는 일반적으로 유사한 의미로 사용하는 용어로, 데이터를 담고있는 객체를 immutable하게 설계하는것이 정석.
**DTO는 주로 데이터 수집의 용도가 좀더 강하다.**
ex) 웹화면에서 로그인 하는 정보를 DTO로 처리, 테이블과 관련된 데이터는 VO로 처리


com.sujae.config : 설정 클래스들
com.sujae.controller : 스프링 MVC의 Controller들의 보관 패키지
com.sujae.service : 스프링의 service 인터페이스와 구현 클래스 패키지
com.sujae.domain: VO, DTO 클래스들의 패키지
com.sujae.persistence: MyBatis Mapper 인터페이스 패키지
com.sujae.exception : 웹관련 예외처리 패키지
com.sujae.aop : 스프링 AOP 관련 패키지
com.sujae.security : 스프링 Security 관련 패키지
com.sujae.util : 각종 유틸리티 클래스 관련 패키지


테이블을 생성할 때는 tbl_로 시작하거나 t_와 같이 구분 가능한 단어를 앞에 붙여야 합니다.


@Log4j는 end of life라 @Slf4j 또는 @Log 를 써야합니다. 
@Log (severe) @Slf4j(error)

## 기본형(primitive type) 변수도 때로는 객체로 다루어져야 하는 경우가 있습니다.

1. 매개변수로 객체가 요구 될때.
2. 기본형 값이 아닌 객체로 저장해야 할 때.
3. 객체간의 비교가 필요할 때. 등등

이 때 사용되는 것이 wrapper class 입니다.

int (Primitive 자료형 (long, float, double,. ....)

### 자료형
산술 연산이 가능.
null 로 초기화 불가능, 0으로 초기화
Integer (Wrapper 클래스(객체)

### 클래스
Unboxing 을 하지 않으면 산술 연산이 불가능하지만, null값은 처리할 수 있습니다.
null값 처리가 용이해서 SQL 과 연동할 경우 처리가 용이. 직접적인 산술연산은 불가능



Primitive Type -> Wrapper class : Boxing

ex) Integer a = new Integer(10);

Wrapper class -> Primitive Type : Unboxing

ex) int b = a.intValue();





# Model, ModelMap 및 ModelAndView의 차이점

Model : 인터페이스입니다. 모델 속성에 대한 홀더를 정의하며 주로 **모델에 속성을 추가**하기 위해 설계되었습니다.

예:
```java
@RequestMapping(method = RequestMethod.GET)
    public String printHello(Model model) {
          model.addAttribute("message", "Hello World!!");
          return "hello";
       }
```
ModelMap : UI 도구와 함께 사용할 모델 데이터를 작성할 때 사용할지도 구현 . 체인 된 호출 및 모델 특성 이름 생성을 지원합니다.

예:
```java
@RequestMapping("/helloworld")
public String hello(ModelMap map) {
    String helloWorldMessage = "Hello world!";
    String welcomeMessage = "Welcome!";
    map.addAttribute("helloMessage", helloWorldMessage);
    map.addAttribute("welcomeMessage", welcomeMessage);
    return "hello";
}
```
ModelAndView : 이 클래스는 컨트롤러가 단일 반환 값으로 **모델과 뷰를 모두 반환** 할 수 있도록 둘 다 보유합니다.

예:
```java
@RequestMapping("/welcome")
public ModelAndView helloWorld() {
        String message = "Hello World!";
        return new ModelAndView("welcome", "message", message);
    }
```

## @Autowired를 하면 Autowired에 있는 객체 이름과 같은 클래스를 찾는다.



텍스트 파일을 읽고 가장 많이 사용된 단어를 찾은 후 그 단어와 빈도를 정렬된 리스트로 출력하는 예제입니다

```java
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Words {
  private Set<String> NON_WORDS = new HashSet<String>() {{
    add("the"); add("and"); add("of"); add("to"); add("a");
    add("i"); add("it"); add("in"); add("or"); add("is");
    add("d"); add("s"); add("as"); add("so"); add("but");
    add("be");
  }};

  public Map wordFreq(String words) {
    TreeMap<String, Integer> wordMap = new TreeMap<>();
    Matcher m = Pattern.compile("\\w+").matcher(words);
    while (m.find()) {
      String word = m.group().toLowerCase();
      if (!NON_WORDS.contains(word)) {
        if (wordMap.get(word) == null) {
          wordMap.put(word, 1);
        } else {
          wordMap.put(word, wordMap.get(word) + 1);
        }
      }
    }
    return wordMap;
  }
}
```

```java

public class Words {
  private Set<String> NON_WORDS = new HashSet<String>() {{
    add("the"); add("and"); add("of"); add("to"); add("a");
    add("i"); add("it"); add("in"); add("or"); add("is");
    add("d"); add("s"); add("as"); add("so"); add("but");
    add("be");
  }};

public Map wordFreq(String words) {
  TreeMap<String, Integer> wordMap = new TreeMap<>();
  regexToList(words, "\\w+").stream()
    .map(String::toLowerCase)
    .filter(w -> !NON_WORDS.contains(w))
    .forEach(w -> wordMap.put(w, wordMap.getOrDefault(w, 0) + 1));
  return wordMap;
}

private List<String> regexToList(String words, String regex) {
  List wordList = new ArrayList();
  Matcher m = Pattern.compile(regex).matcher(words);
  while (m.find())
    wordList.add(m.group());
  return wordList;
}
```

이번 예제는 주어진 배열 내에서 해당 문자가 처음 발견되는 위치를 리턴하는 예제입니다. 소스는 Apache Commons 의 StringUtils의 indexOfAny 라는 메소드입니다.
```java
public static int indexOfAny(final CharSequence cs, final char... searchChars) {
  if (isEmpty(cs) || ArrayUtils.isEmpty(searchChars)) {
    return INDEX_NOT_FOUND;
  }
  final int csLen = cs.length();
  final int csLast = csLen - 1;
  final int searchLen = searchChars.length;
  final int searchLast = searchLen - 1;
  for (int i = 0; i < csLen; i++) {
    final char ch = cs.charAt(i);
    for (int j = 0; j < searchLen; j++) {
      if (searchChars[j] == ch) {
        if (i < csLast && j < searchLast && Character.isHighSurrogate(ch)) {
          // ch is a supplementary character
          if (searchChars[j + 1] == cs.charAt(i + 1)) {
            return i;
          }
        } else {
          return i;
        }
      }
    }
  }
  return INDEX_NOT_FOUND;
}
```
```Scala
def firstIndexOfAny(input: String, searchChars: Seq[Char]) : Option[Int] = {
  def indexedInput = (0 until input.length).zip(input)
  val result = for (pair <- indexedInput;
                    char <- searchChars;
                    if char == pair._2) yield pair._1

  if (result.isEmpty)
    None
  else
    Some(result.head)
}
```

## MapperXML 작성 사항
XML을 작성할때 반드시 
**\<mapper>의 namespace 속성 값을 Mapper 인터페이스와 동일**한 이름을 줘야합니다.   
**\<select\> 태그의 id 속성값은 메서드의 이름과 동일**하게 작성합니다.   
**resultType속성의 값은 select 쿼리의 결과를 특정 클래스의 객체**로 만들기 위해 설정합니다.

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.zerock.mapper.BoardMapper">

<select id ="getList" resultType = "org.zerock.domain.BoardVO">
SELECT * FROM tbl_board2 WHERE bno &gt; 0
</select>
```

웹 프로젝트에서 마지막 영역이 영속영역이지만, **실제로 구현을 가장 먼저 할 수 있는 영역도 영속 영역**입니다.
영속영역은 기본적으로 CRUD 작업을 하기 때문에 테이블과 VO(DTO)등 약간의 준비만으로도 비즈니스 로직과 무관하게 CRUD 작업을 작성 할 수 있습니다. MyBatis는 내부적으로 JDBC의 PreparedStatement를 활용하고,  **? 는 #{속성}** 과 같다.

# CREATE(INSERT) 처리.
자동으로 PK 값이 정해지는 경우에는 다음과 같은 방식으로 처리할 수 있습니다.
- insert만 처리되고 생성된 PK값을 알 필요가 없는 경우
- insert문이 실행되고 생성된 PK 값을 알아야 하는 경우

```xml
<insert id="insert">
	insert into tbl_board (title,content,writer)
	values (#{title}, #{content}, #{writer})
</insert>

<insert id="insertSelectKey">
		<selectKey keyProperty="bno" order="BEFORE"
			resultType="long">
			select seq_board.nextval from dual
		</selectKey>
		insert into tbl_board (bno,title,content, writer)
		values (#{bno},
		#{title}, #{content}, #{writer})
</insert>
```
**insert()는** 단순히 시퀀스의 다음 값을 구해서 insert할 때 사용.
insert문은 몇건의 데이터가 변경되었는지만을 알려주기 때문에 추가된 데이터의 PK값을 알 수는 없지만, 1번의 SQL 처리만으로 작업이 완료되는 장점.

**insertSelectKey()는** @SelectKey라는 Mybatis의 어노테이션을 이용.
@SelectKey는 주로 PK값을 미리(before) SQL을 통해서 처리해 두고 특정한 이름으로 결과를 보관.
@Insert 할 때 SQL문을 보면 #{bno}와 같이 이미 처리된 결과를 이용하는 것을 볼 수있습니다.

@SelectKey를 이용하는 방식은 SQL을 한 번 더 실행하는 부담이 있기는 하지만, **자동으로 추가되는 PK값을 확인해야 하는 상황**에서는 유용하게 사용될 수 있습니다. 

목록 받기 : List<BoardVO>
Create : void
Read : void
Update : int
Delete : int


비즈니스 계층은 고객의 요구사항을 반영하는 계층으로 **프레젠테이션 계층과 영속계층의 중간 다리 역할**을 합니다.

#@Service
@Service는 계층 구조상 **주로 비즈니스 영역을 담당하는 객체임을 표시**하기 위해 사용합니다.

스프링 MVC의 Controller는 하나의 클래스네에서 여러 메서드를 작성하고 , **@RequestMapping등을 이용해서 URL을 분기**하는 구조로 작성할 수 있기 때문에 나의 클래스에서 필요한 만큼 메서드의 분기를 이용하는 구조로 작성합니다.



| Task  |       URL       | Method | Parameter |  From   | URL이동 |
| :---: | :-------------: | :----: | :-------: | :-----: | :---: |
| 전체목록  |   /board/list   |  GET   |
| 등록 처리 | /board/register |  POST  |   모든항목    | 입력화면 필요 |  이동   |
|  조회   |   /board/read   |  GET   |  bno=123  |
| 삭제 처리 |  /board/modify  |  POST  |    bno    | 입력화면 필요 |  이동   |
| 수정 처리 |  /board/remove  |  POST  |   모든 항목   | 입력화면 필요 |  이동   |

```java
@GetMapping("/list")
	public void list(Model model) {
		log.info("list");
		model.addAttribute("list", service.getList());
	}
```

list는 **나중에 게시물의 목록을 전달해야 하므로 Model을 파라미터로 지정하고** 이를 통해서 BoardServiceImpl객체의 getList()결과를 담아 전달합니다.

## mockMVC
```java
@WebAppConfiguration
...

public class BoardControllerTests {
	@Autowired
	private WebApplicationContext ctx;

	private MockMvc mockMvc;
	
	@Before
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
	}
	
	@Test
	public void testList() throws Exception{
		log.info(mockMvc.perform(MockMvcRequestBuilders.get("/board/list"))
				.andReturn()
				.getModelAndView()
				.getModelMap());
	}
}
```
@WebApplication은 Servlet의 ServletContext를 이용하기 위해서인데, 스프링에서는 WebApplicationContext라는 존재를 이용하기 위해서입니다. **@before 어노테이션이 적용된 setUp()에서는 import할 때 JUnit을 이용**해야 합니다.
**@Before가 적용된 메서드는 모든 테스트 전에 매번 실행되는 메서드가 됩니다.**

MockMvc는 말 그대로 가짜MVC입니다. testList()는 MockMvcRequestBuilders라는 존재를 이용해 GET방식을 호출합니다. 이후에 Model에 어떤 데이터들이 담겨있는지 확인합니다.

```java
@Test
	public void testRegister() throws Exception{
		String resultPage = mockMvc.perform(MockMvcRequestBuilders.post("/board/register")
				.param("title", "테스트 새글 제목")
				.param("content", "테스트 새글 내용")
				.param("writer", "user00")
				).andReturn().getModelAndView().getViewName();
		
		log.info(resultPage);
	}
```
```
param = <input> 이라고 생각하면 됩니다.
```

수정을 시작하는 화면의 경우에는 GET방식으로 접근하지만, 실제 작업은 POST 방식으로 동작합니다.

#CSS 적용시
org.zerock.config.WebConfig 클래스에는 **CSS나 JS 파일과 같이 정적**인 (Static) 자원들의 경로를 'resources'라는 경로로 지정하고 있습니다.

```java
@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
	}
```


```js
<script>
	$(function(){
		var operForm = $("#operForm");
		
		$("button[data-oper='list']").on("click", function(e){
			operForm.find("#bno").remove();
			operForm.attr("action","/board/list");
			operForm.submit();
		});
	});
</script>
```


```js
	$(function(){
		var formObj = $("form");
		
		$("button").on("click", function(e){
			e.preventDefault();
			
			var operation = $(this).data("oper");
			console.log(operation);
			
			if(operation === "remove"){
				formObj.attr("action", "/board/remove");
			} else if(operation === "list"){
				/* 	self.location = "/board/list";
				return; */
				formObj.attr("action", "/board/list").attr("method","get");
				formObj.empty();
			}
			formObj.submit();
			
		});
    });
```

```java
//재귀 복사
INSERT INTO tbl_board(title,content,writer) (SELECT title,content,writer FROM tbl_board)
```

페이징 처리를 위해서 필요한 파라미터는 1) 페이지 번호(pageNum), 2) 한 페이지당 몇개의 데이터(amount) 를 보여줄 것인지가 결정되어야 합니다.

이 데이터들을 하나로 묶는 것이 좋습니다.

## 페이징 화면 처리

1. 브라우저 주소창에서 페이지 번호를 전달해서 결과를 확인
2. JSP에서 페이지 번호를 출력하는 단계
3. 각 페이지 번호에 클릭 이벤트 처리
4. 전체 데이터 개수를 반영해서 페이지 번호 조절

### 페이징 처리할 때 필요한 정보들
- 현재 페이지 번호(page)
- 이전과 다음으로 이동 가능한 링크의 표시여부 (prev, next)
- 화면에서 보여지는 페이지의 시작번호와 끝번호 (startPage, endPage)



1 . 끝번호를 먼저 계산합니다

``` java
this.endpage = (int)(Math.ceil(페이지번호/10.0))*10;
```

1페이지의 경우: Math.ceil(0.1) * 10 = 10  
10페이지의 경우: Math.ceil(1) * 10 = 10  
11페이지의 경우: Math.ceil(1.1) * 10 = 20

만약 전체 데이터 수가 적다면, 10페이지로 끝나면 안될 상황이 생길 수도 있습니다.
그럼에도 끝번호를 먼저 계산하는 이유는 시작번호를 계산하기 수월하기 때문입니다.
```java
this.startPage = this.endPage - 9;
```

끝 번호는 전체 데이터 수에 의해서 영향을 받습니다. 예를 들어, 10개씩 보여주는 경우
전체 데이터수가 80개라고 가정하면 끝번호는 10이 아닌 8이 되어야만 합니다.

만일 끝번호(endPage)와 한 페이지당 출력되는 데이터 수(amount)의 곱이 전체데이터 수(total)보다 크다면 끝번호는 다시 total을 이용해서 다시 계산되어야 합니다.
```java
realEnd = (int)(Math.ceil((total*10)/amount));

if(realEnd < this.endPage){
  this.endPage = realEnd;
}
```

이전(prev)는 시작번호(startPage)가 1보다 큰 경우
```java
this.prev = this.startPage>1;
```
다음으로 가는 링크의 경우 realEnd가 endPage보다 큰 경우
```java
this.next = this.endPage < realEnd;
```

클래스를 구성하면 Controller 계층에서 JSP 화면에 전달할때에도 **객체를 생성해서 Model에 담아 보내는 과정이 단순**해지는 장점이 있습니다.

```java
public void get(@RequestParam("bno") Integer bno, @ModelAttribute("cri") Criteria cri ,Model model) {
		log.info("/get or modify");
		model.addAttribute("board",service.get(bno));
	}
```
@ModelAttribute는 자동으로 Model에 데이터를 지정한 이름으로 담아줍니다.   
@ModelAttribute를 사용하지 않아도 Controller에서 화면으로 파라미터가 된 객체는 전달이 되지만 좀더 명시적인 이름을 지정하기 위해 사용합니다.
```
SELECT bno, title, content, writer, regdate, updatedate FROM tbl_board2 where ( title like 
CONCAT('%', '안', '%') OR content like CONCAT('%', '안', '%') ) LIMIT 0, 10 
```


getTypeArr은 검색 조건이 각 글자(T, W, C)로 구성되어 있으므로 검색조건을 배열로 만들어서 한번에 처리 MyBatis의 동적 태그를 활용할 수 있습니다.
   ```java
	public String[] getTypeArr() {
		return type == null? new String[] {}: type.split("");
	}
	```


UriComponentBuilder를 이용하면, 여러개의 파라미터를 번거롭지 않게 할 수 있습니다.



  ```java
	public String getListLink() {
		UriComponentsBuilder builder = UriComponentsBuilder.fromPath("")
				.queryParam("page", this.perPageNum)
				.queryParam("perPageNum", this.getPerPageNum())
				.queryParam("type", this.getType())
				.queryParam("keywortd", this.getKeyword());
		
		return builder.toUriString();
	}
  ```

  ```java
  @PostMapping("/modify")
	public String modify(BoardVO board, @ModelAttribute("cri") Criteria cri,RedirectAttributes rttr) {
		log.info("modify :"+ board);
		
		if(service.modify(board)) {
			rttr.addFlashAttribute("result", "수정이 완료되었습니다.");
		}
		
		rttr.addAttribute("page", cri.getPage());
		rttr.addAttribute("perPageNum", cri.getPerPageNum());
		rttr.addAttribute("type", cri.getType());
		rttr.addAttribute("keyword", cri.getKeyword());
		
		return "redirect:/board/list";
	}
	
	@PostMapping("remove")
	public String remove(@RequestParam("bno") Integer bno, @ModelAttribute("cri") Criteria cri ,RedirectAttributes rttr) {
		
		log.info("remove..."+bno);
		
		if(service.remove(bno)) {
			rttr.addFlashAttribute("result","삭제가 완료되었습니다.");
		}
		rttr.addAttribute("page", cri.getPage());
		rttr.addAttribute("perPageNum", cri.getPerPageNum());
		rttr.addAttribute("type", cri.getType());
		rttr.addAttribute("keyword", cri.getKeyword());
		return "redirect:/board/list";
	}
  ```

  ```java
  @PostMapping("/modify")
	public String modify(BoardVO board, @ModelAttribute("cri") Criteria cri,RedirectAttributes rttr) {
		log.info("modify :"+ board);
		
		if(service.modify(board)) {
			rttr.addFlashAttribute("result", "수정이 완료되었습니다.");
		}
		
		// rttr.addAttribute("page", cri.getPage());
		// rttr.addAttribute("perPageNum", cri.getPerPageNum());
		// rttr.addAttribute("type", cri.getType());
		// rttr.addAttribute("keyword", cri.getKeyword());
		
		return "redirect:/board/list" + cri.getListLink();
	}
	
	@PostMapping("remove")
	public String remove(@RequestParam("bno") Integer bno, @ModelAttribute("cri") Criteria cri ,RedirectAttributes rttr) {
		
		log.info("remove..."+bno);
		
		if(service.remove(bno)) {
			rttr.addFlashAttribute("result","삭제가 완료되었습니다.");
		}
		// rttr.addAttribute("page", cri.getPage());
		// rttr.addAttribute("perPageNum", cri.getPerPageNum());
		// rttr.addAttribute("type", cri.getType());
		// rttr.addAttribute("keyword", cri.getKeyword());
		return "redirect:/board/list" + cri.getListLink();
	}
  ```

스마트폰에서는 앱이라 불리는 고유한 애플리케이션ㅇ을 이용해서 데이터를 소비하게되고, 보이는 화면 역시 자신만의 방식으로 서비스 하게 됩니다. 
URL과 URI를 같은 의미로 사용하는 경우가 많았다. URL은 URI의 하위개념입니다.

## URL
**이곳에 가면 당신이 원하는 것을 찾을 수 있습니다.** 와 같은 상징적인 의미가 강합니다.  
## URI
**당신이 원하는 곳의 주소는 여기입니다.** 와 같이 조금 현실적이고 구체적인 의미입니다.

@RestController : 컨트롤러가 REST방식을 처리하기 위한 것임을 명시합니다.  
@ResponseBody : 일반적인 JSP와 같은 뷰로 전달되는게 아니라 **데이터 자체를 전달하기 위한 용도**입니다.  
@PathVariable : URL 경로에 있는 값을 파라미터로 추출하려고 할때 사용합니다.  
@RequestBody : JSON 데이터를 원하는 타입으로 바인딩 처리를 합니다.

## @RestController
REST 방식은 **서버에서 전송하는 것이 순수한 데이터**라는 뜻 입니다.
기존의 Controller에서 **Model에 데이터를 담아서 JSP등과 같은 뷰로 전달하는 방식이 아니므로** 기존의 Controller와 다르게 동작합니다.

@RestController이전에는 @Controller와 메서드 선언부에 @ResponseBody를 이용해서 동일한 결과를 얻을 수 있었다.
@RestController는 메서드의 리턴타입으로 사용자가 정의한 클래스 타입을 사용할 수 있고, 이를 **JSON이나 XML**로 자동으로 처리할 수 있습니다.


```java
@RestController
@RequestMapping("/sample")
@Slf4j
public class SampleController {

	@GetMapping(value = "/getText", produces ="text/plain; charset=UTF-8")
	public String getText() {
		log.info("MIME TYPE:"+MediaType.TEXT_PLAIN_VALUE);
		
		return "안녕하세요";
	}
}
```
기존의 @Controller는 **문자열을 반환하는 경우에는 JSP파일의 이름**으로 처리하지만, @RestController의 경우에는 **순수한 데이터**가 됩니다.  
@GetMapping에 사용된 **produces속성은 해당 메서드가 생산하는 MIME 타입**을 의미합니다.
예제와 같이 문자열로 직접 지정할수도 있고, 메서드내의 MediaType이라는 클래스를 이용할 수도 있습니다.

@PathVariable : REST방식에서 자주 사용합니다. URL경로의 일부를 파라미터로 사용할 때 이용  
@RequestBody : JSON데이터를 원하는 타입의 객체로 변환해야 하는 경우에 사용

## @PathVariable
Rest방식에서는 URL 내에 최대한 많은 정보를 담으려고 노력합니다. 예전에는 '?' 뒤에 추가되는 쿼리 스트링이라는 형태로 **파라미터를 이용**해서 전달되던 데이터들이 **REST 방식에서는 경로의 일부로 차용**됩니다.

스프링 MVC에서는 @PathVariable 어노테이션을 이용해서 URL 상에 경로의 일부를 파라미터로 사용할 수 있습니다.

```
http://localhost:8080/smaple/{sno}/page/{pno}
```

URL '{}'로 처리된 부분은 컨트롤러의 메서드에서 변수로 처리가 가능하다.
@PathVariable은 '{}'의 이름을 처리할때 사용

## @RequestBody
@RequestBody는 전달된 요청의 내용을 이용해서**해당 파라미터의 타입으로 변환**을 요구합니다.
대부분의 경우에는 JSON데이터를 서버에 보내서 원하는 타입의 객체로 변화하는 용도로 사용됩니다.

# REST 방식의 테스트

위와 같이 GET방식이 아니고, POST 등의 방식으로 지정되어 있으면서 JSON 형태의 데이터를 처리하는 것을 브라우저에서 개발하려면 많은 시간과 노력이 들어갑니다.

@RestController를 쉽게테스트 하기 위해서는 REST 방식의 데이터를 전송하는 툴을 이용하거나, JUnit과 spring-test를 이용해서 테스트합니다.



Mybatis는 두 개 이상이 데이터를 파라미터로 전달하기 위해서는 
- 별도의 객체로 구성하는 방식
- MAP을 이용하는 방식
- @Param을 이용해서 이름을 사용하는 방식
  
@Param의 속성값은 '#{}'의 이름으로 사용이 가능하다.


```java
public ResponseEntity<String> modify(
					@RequestBody ReplyVO vo,
					@PathVariable("rno") int rno
```

### 실제 수정되는 데이터는 JSON 포맷이므로 @RequestBody를 이용해서 처리합니다. @RequestBody로 처리되는 데이터는 일반 파라미터나 @PathVariable 파라미터를 처리할 수 없기 때문에 직접 처리해주어야 합니다.

# AOP
코드를 작성하면서 염두에 두는 일들은 주로 다음과 같다.
- 파라미터가 올바르게 들어왔을까?
- 이 작업을 하는 사용자가 적절한 권한을 가진 사용자인가?
- 이 작업에서 발생할 수 있는 모든 예외는 어떻게 처리해야 하는가?

AOP가 추구하는 것은 **관심사의 분리** 입니다. AOP는 개발자가 염두에 두어야 하는 일들은 별도의 '관심사'로 분리하고, 핵심 비즈니스 로직만을 작성할 것을 권장합니다.


AOP 기능은 주로 일반적인 Java API를 이용하는 클래스(POJO- Plain Old Java Object)들에 적용합니다.
Controller에 적용이 불가능한 것은 아니지만, Controller의 경우 뒤에서 학습하게 될 인터셉터나 필터 등을 이용합니다.
예제에서는 서비스 계층에 AOP를 적용합니다.
1. 서비스 계층의 메서드 호출 시 모든 파라미터들을 로그로 기록
2. 메서드들의 실행시간을 기록

@EnableTransactionManagement 설정은 'aspect-autoproxy'에 대한 설정이되고, txManager()는 bean태그 설정을 대신하게 됩니다.
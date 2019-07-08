수많은 블로거분들의 도움을 받고자 구글링을 해서 적용을 해봤지만 너무많은 삽질을 했다.(해봤던 방식은 jsonViewResolver 를 따로 설정해보거나, @RequestMapping 옵션을 바꿔보는 수준..) 특히나 Spring설정방식이 예전 방식이였던 xml이 아닌 javaconfig였기 때문에 더욱더 자료가 없었고.. 한참을 삽질하다 해결을 하여 포스팅하게 된다. 우선 환경은 spring 4.3.4.RELEASE, Maven, jdk8임을 밝힌다.

# pom.xml
jackson-mapper-asl을 이용해서 하라는 블로거들도 있었지만, 아무리해도(뭔가 Spring버전과 맞지 않는듯 했다.) 잘 안되어 아래와 같은 dependency를 주었다.

1
2
3
4
5
<dependency>
	<groupId>com.fasterxml.jackson.core</groupId>
	<artifactId>jackson-databind</artifactId>
	<version>2.5.1</version>
</dependency>
# Controller
아래와같이 @ResponseBody 어노테이션을 설정해주고 리턴은 해당 모델을 넘기면 된다.

1
2
3
4
5
6
7
8
@RequestMapping(value="/test")
@ResponseBody
public Map<String, Object> test(){
    	Map<String, Object> map = new HashMap<String, Object>();
    	map.put("1", "111");
    	map.put("2", 222);
    	return map;
    }
그리고 호출을 해보면 기대했던것처럼 이쁘게 json형태로 나온다.

1
2
3
4
5
{
"1": "111",
"2": 222
}
물론, list 나 array, 일반 객체도 가능하다.
# 정리
삽질을 끝에 알게된 사실(?)을 정리해보자.
다른측면에서 분석을 해보면. @ResponseBody을 이용하여 view 에 json 형태로 나타내고자 할 경우 가능한 상황은 toString으로 했을때 json형태로 나올수 있으면 가능하다. 예로들어 아래처럼 클래스에 Lombok 어노테이션인 @Data가 붙으면 자동으로 toString을 오버라이딩 해주기 때문에 해당 클래스를 리턴하게되면 자동으로 json 처리가 된다.
1
2
3
4
5
6
@Data
public Student{
  private String id;
  private String name;
  ...
}
@ResponseBody을 붙이고 List<Student>를 리턴하게 되면 에러가 나는데, 이럴경우 별도 라이브러리를 추가해줘야 자동으로 변환되어 json 형태로 나올수 있게 된다. (list.toString을 하면 json형태가 아닌 이상한 문자형태로 나오기 때문… Map같은것도 마찬가지 이유로 별도 라이브러리를 추가해줘야 정상적으로 나온다.)

# 마치며
단순히 @ResponseBody를 사용해서 json으로 리턴하려면 어떤 라이브러리를 추가해야한다 로 생각했던것에서, 이것저것 테스트 한 결과 toString을 할수 있어야 하고 그 값이 json형태이면 가능하다 로 결론이 지어졌다. 확실히 장님 코끼리 만지듯이 ‘그런가보다’하고 넘어가면 삽질이 진짜 불필요한 삽질이 되는것 같다. 구글링을 해보고, 테스트를 해봐서, 결론적으로 내것으로 만드는 습관을 가져야 겠다.




Spring MVC: @RequestBody + @ResponseBody + JSON + AJAX
 

얼마 전에 JSON을 사용해서 AJAX 통신 API를 만드는 과정에서 삽질을 한 적이 있다. 기본만 제대로 살폈으면 쉽게 넘어갈 수 있는 일이었는데 나의 얼렁뚱땅 대충대충 ‘필요하면 그때그때 찾아서 쓰면 되지 뭐.’ 라는 안일함이 하루의 시간을 날려먹는 상황을 낳고 말았다. 방법은 정말 간단했다.
헤맸던 소스: Before Source
● TestForm.java

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
@Data
@NoArgsConstructor
@ToString
public class TestForm {
  private String id;
  private String name;
  private List<TestTag> testTags;
 
  @Data
  @NoArgsConstructor
  @ToString
  public class TestTag {
      private String id;
      private String tag;
  }
}
● TestController.java

1
2
3
4
5
6
7
8
9
@Controller
public class TestController {
  private static final Logger logger = LoggerFactory.getLogger(TestController.class);
 
  @RequestMapping(value="/test", method=RequestMethod.GET)
  public void test(@RequestBody TestForm form, ModelMap map) {
      logger.debug("TestForm : {}", form);
  }
}
● Form JSON

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
var form = {
    id: "123",
    name: "123",
    testTags: [{id: "1111", tag: "2222"}]
};
 
$.ajax({
    url: "http://localhost:8080/test",
    method: "get",
    type: "json",
    data: form,
    success: function(data) {
        console.log(data);
    }
});
여러가지 시도를 해봤지만, form의 데이터를 TestController의 test에서 제대로 받아들이지 못하는 문제로 골머리를 썩었다(지금 생각해보면 나의 무식함에 부끄럽지만).
해결 코드: After Source

● TestForm.java

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
@Data
@NoArgsConstructor
@ToString
public class TestForm {
  private String id;
  private String name;
  private List<TestTag> testTags;
 
  @Data
  @NoArgsConstructor
  @ToString
  public static class TestTag {
      private String id;
      private String tag;
  }
}
● TestController.java

1
2
3
4
5
6
7
8
9
@Controller
public class TestController {
  private static final Logger logger = LoggerFactory.getLogger(TestController.class);
 
  @RequestMapping(value="/test", method=RequestMethod.POST)
  public void test(@RequestBody TestForm form, ModelMap map) {
      logger.debug("TestForm : {}", form);
  }
}
● Form JSON

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
var form = {
    id: "123",
    name: "123",
    testTags: [{id: "1111", tag: "2222"}]
};
 
$.ajax({
    url: "http://localhost:8080/test",
    method: "post",
    type: "json",
    contentType: "application/json",
    data: JSON.stringify(form),
    success: function(data) {
        console.log(data);
    }
});
Before Source와 After Source의 차이를 눈치챘는가? ㅡ_-)?
RequestMethod가 GET에서 POST로 변경되었다. 이에 대한 설명을 해본다. 토비의 스프링에 @RequestBody, @ResponseBody 를 살펴보기 바란다.

@RequestBody, @ResponseBody
최근 개발하고 있는 방식은 대부분이 프론트엔드와 백엔드를 분리하여 개발을 하고 있다. 프론트엔드의 AJAX요청은 대부분 JSON으로 되어 있고, 이에 맞춰 백엔드에서도 JSON 형태로 응답을 해주는 방식을 취하게 된다. 스프링에서는 이와 관련된 @MVC 관련 애노테이션과 설정을 통해 기능을 제공하고 있다.

● @RequestBody
이 애노테이션이 붙은 파라미터에는 HTTP 요청의 본문body 부분이 그대로 전달된다.
AnnotationMethodHandlerAdapter에는 HttpMessageConverter 타입의 메시지 변환기message converter가 여러 개 등록되어 있다. @RequestBody가 붙은 파라미터가 있으면 HTTP 요청의 미디어 타입과 파라미터의 타입을 먼저 확인한다(servlet-context.xml 에서 <annotation-drvien> 태그 내에 선언하는 <message-converter> 에서 확인). 메시지 변환기 중에서 해당 미디어 타입과 파라미터 타입을 처리할 수 있다면, HTTP 요청의 본문 부분을 통째로 변환해서 지정된 메소드 파라미터로 전달해준다.
내가 헤매던 부분이 바로 이부분이었다. ㅡ_-);;JSON 메시지 변환기에는 MappingJackson2HttpMessageConverter를 사용했다. @RequestBody 애노테이션은 요청에서 Body부분을 살펴 요청된 데이터를 추출하여 파라미터로 변환해주는데, ‘GET’ 메소드 요청의 경우에는 HTTP Body에 요청이 전달되는 것이 아니라, URL의 파라메터로 전달(ex: http://localhost:8080/test?id=123&name=123&testTag=…) 형식으로 전달되기 때문에 @RequestBody로 받으려고 해도 서로 다른 곳을 보며 데이터가 없다는 결과를 던질 수밖에 없다(이 부분도 로그에 대해서 상세하게 설정해서 살펴보면서 확인한 결과. 로그! 개발 중에 문제가 되는 요인들을 찾기 위해서 관심을 가지자)

● @ResponseBody
@ResponseBody는 @RequestBody와 비슷한 방식으로 동작한다. @ResponseBody가 메소드 레벨에서 부여되면 메소드가 리턴하는 오브젝트는 뷰를 통해 결과를 만들어내는 모델로 사용하는 대신, 메시지 컨버터를 통해 바로 HTTP 응답의 메시지 본문으로 변환된다.
간단히 이야기 하자면, 요청한 형태에 맞춰서 메시지 변환기를 통해 결과값을 반환한다. ‘콩심은 데 콩나고 팥 심은데 팥난다.’ 랄까? ContentNegotiatingViewResolver 와는 동작방식이 좀 다르다. ContentNegotiatingViewResolver는 등록되어 있는 ViewResolver중에서 controller 메소드의 리턴값을 통해 등록된 ViewResolver 중에서 적합한 형태로 처리해서 반환하는 반면, @ResponseBody는 @RequestBody가 선택한 형식으로 결과값을 변환하여 반환한다고 보면 된다.

● MessageConverter 메시지 변환기의 종류는 Spring API 문서를 참고하자.
정리
해당하는 애노테이션들이 어떻게 동작하는지 내가 했던 인터넷 설정들이 어떻게 반응하는지를 제대로 이해했다면, 별다른 삽질없이 조용히 넘어갈 수 있던 문제였는데, 쉬운 문제였다. 하아!!
요즘 들어서 부쩍 ‘기본을 탄탄히 갖춰야겠다.’라는 생각을 하게되는 일들이 많아지고 있다.
.
 
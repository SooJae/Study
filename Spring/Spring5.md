프레임 워크란, 특정한 목적에 맞게 프로그래밍을 쉽게하기 위한 약속.

스프링
자바언어를 기반으로 다양한 어플리케이션을 제작하기 위한 약속된 프로그래밍 툴.

예전 EJB의 경우 고가의 장비(WAS등)이 필요되어지고, 개발환경 및 설정 그리고 테스트환경에 많은 애로사항들이 존재.
하지만 스프링의 경우 톰캣을 이용할 수 있으며, EJB에 비해서 코드의 경량화 그리고 개발중에 테스트가 쉽다는 점이 특징입니다.
위에서 언급한 내용은 스프링의 전체적인 특징입니다.

설정
Use Tomcat installation 체크, publish module contexts to seperate XML files 체크

Spring Tool Suite 플러그인 설치
help -> Eclipse marketplace



DI(Dependency Injection)와 IOC 컨테이너

A객체는 B,C,D객체에 의존합니다.
방법 1: A객체가 B,C,D객체를 직접 생성 합니다. (new B, C, D)
방법 2: A객체에 setter() 또는 construct() 생성자에서 B라는 객체와 C라는 객체가 필요할때 b또는 c라는 객체를 만들고, setter또는 construct에서 this.b, this.c 로 생성자를 받습니다. 
B,C 객체 외부에 생성하여 A객체에 넣어 줍니다.
스프링은 방법 2를 사용합니다.

**DI와 IOC 컨테이너 그림 보기**

IOC 컨테이너 : 부품이 담겨 있는 컨테이너

스프링이란?
부품을 생성하고 조립하는 라이브러리 집합체

```java
package com.javalec.ex;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class MainClass {

	public static void main(String[] args) {

		//스프링이 적용되지 않은 방식
		/*
		MyCalculator myCalculator = new MyCalculator();
		myCalculator.setCalculator(new Calculator());
		
		myCalculator.setFirstNum(10);
		myCalculator.setSecondNum(2);
		
		myCalculator.add();
		myCalculator.sub();
		myCalculator.mul();
		myCalculator.div();
		*/

        //스프링에 DI 방식이 적용된 개발 방법
		
		String configLocation = "classpath:applicationCTX.xml";
		AbstractApplicationContext ctx = new GenericXmlApplicationContext(configLocation); //xml을 파싱해주는 클래스. 
		MyCalculator myCalculator = ctx.getBean("myCalculator", MyCalculator.class);
		
		myCalculator.add();
		myCalculator.sub();
		myCalculator.mul();
		myCalculator.div();
		
	}
	
}
```



applicationCTX.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

	<bean id="calculator" class="com.javalec.ex.Calculator" />
	
	<bean id="myCalculator" class="com.javalec.ex.MyCalculator">
		<property name="calculator"> 변수 1
			<ref bean="calculator"/> id=calculator를 참조합니다.
		</property>
		<property name="firstNum" value="10" /> 변수 2
		<property name="secondNum" value="2"></property> 변수 3
	</bean>

</beans>


```

applicationCTX.xml(Context라는 뜻)
```xml
<bean id="myCalculator" class="com.javalec.ex.MyCalculator">
		<property name="calculator"> 변수 1
			<ref bean="calculator"/> id=calculator를 참조합니다.
		</property>
		<property name="firstNum" value="10" /> 변수 2 setter의 역할(자바에선 setFirstNum)
		<property name="secondNum" value="2"></property> 변수 3 setter의 역할(자바에선 setSecondNum)
</bean>
```
을 자바로 바꾸면

```java
private int firstNum;
private int secondNum;

public void setFirstNum(int firstNum){
    this.firstNum = firstNum;
}
public void setSecondNum(int secondNum){
    this.secondNum = secondNum;
}
```
```xml
<bean id="myInfo" class="com.javalec.ex.MyInfo">
    <property name="name">
        <value>홍길동</value>
    </property>

    <property name="height">
    <value>176</value>
    </property>

    <property name="weight" value="65">
   
    <property name="hobbys">
        <list>
        <value>수영</value>
        <value>요리</value>
        <value>독서</value>
        </list>
    </property>
    <property name="bmiCalculator">
    <ref bean="BMICalculator"/>
    </property>
</bean>
```


```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

	<bean id="bmiCalcaulator" class="com.javalec.ex.BMICalculator">
		<property name="lowWeight">
			<value>18.5</value>
		</property>
		<property name="normal">
			<value>23</value>
		</property>
		<property name="overWeight">
			<value>25</value>
		</property>
		<property name="obesity">
			<value>30</value>
		</property>
	</bean>
	
	<bean id="myInfo" class="com.javalec.ex.MyInfo">
		<property name="name">
			<value>홍길동</value>
		</property>
		<property name="height">
			<value>187</value>
		</property>
		<property name="weight">
			<value>84</value>
		</property>
		<property name="hobbys">
			<list>
				<value>수영</value>
				<value>요리</value>
				<value>독서</value>
			</list>
		</property>
		<property name="bmiCalculator">
			<ref bean="bmiCalcaulator"/>
		</property>
	</bean>

</beans>
```


```java
package com.javalec.ex;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class MainClass {
	
	public static void main(String[] args) {
		
		String configLocation = "classpath:applicationCTX.xml";
		AbstractApplicationContext ctx = new GenericXmlApplicationContext(configLocation); // 스프링 컨테이너 생성
		MyInfo myInfo = ctx.getBean("myInfo", MyInfo.class); //스프링 컨테이너에서 컴포넌트 가져옴
		myInfo.getInfo();
		ctx.close();
		
	}
	
}
```

# DI 활용

DI 사용에 따른 장점

```java
AbstractApplicationContext ctx = new GenericXMLApplication("classpath:applicationCTX.xml");
Pencil pencil = ctx.getBean("pencil", Pencil.class);
pencil.use();

ctx.close();
```
xml 파일들
```xml
1.
<bean id="pencil" class="com.javalec.Pencil4B"/>
...
2.
<bean id="pencil" class="com.javalec.Pencil6B"/>
...
3.
<bean id="pencil" class="com.javalec.PencilWithEraser"/>
...
```
이렇게 되어있을때 1번을 쓰다가 2번을 바꾸려고 하면, 자바파일의 수정 없이 바꿀수 있습니다. 다만 Pencil.class부분때문에 자바파일을 수정해야 하는 것 처럼 보이는데, 이것 또한 Pencil interface로 implements를 합니다면 해결이 됩니다. 즉, 자바 파일은 전혀 수정할 필요가 없다.

[DI의 이점 설명 유튜브](https://www.youtube.com/watch?v=wqHBAmIZcvg&list=PLieE0qnqO2kTyzAlsvxzoulHVISvO8zA9&index=68)



XML 파일을 이용한 DI 설정 방법

```xml
<bean id="myInfo" class="com.javalec.ex.MyInfo">
<!-- 생성자 설정(기초데이터) -->
		<constructor-arg value="홍길동"/>      
<!-- setter() 설정(property)  -->
		<property name="height">
			<value>187</value>
		</property>
		<property name="weight">
			<value>84</value>
		</property>
<!-- 생성자 설정(객체 데이터) -->
		<property name="hobbys">
			<list>
				<value>수영</value>
				<value>요리</value>
				<value>독서</value>
			</list>
		</property>
		<property name="bmiCalculator">
			<ref bean="bmiCalcaulator"/>
		</property>
	</bean>

</beans>
```


```xml
<constructor-arg value="홍길동" />
<property name="sisterName" value="홍길자"/>
<property name="brotherName" value="홍오빠"/>
```
을 아래와 같이 바꿀 수 있습니다.
```xml
<bean id="family" class="com.javalec.ex.Family" c:papaName="홍길동" p:sisterName="홍길자">
		<property name="brotherName" value="홍오빠" />
</bean>
```

쓰려면 위에 다음과 같이 써줘야 합니다.
```xml
xmlns:c="http://www.springframework.org/schema/c"
xmlns:p="http://www.springframework.org/schema/p"
```


자바를 이용한 DI 설정 방법.
```java
@Configuration  //'이 클래스는 스프링 설정에 사용되는 클래스' 라고 명시해주는 어노테이션.
public class ApplicationConfig{ 
    
@Bean //@Bean -객체 생성
public Student student1(){

    ArrayList<String> hobbys = new ArrayList<String>();
    hobbys.add("수영");
    hobbys.add("요리");

    Student student = new Student("홍길동",20,hobbys); // 생성자에 설정
    student.setHeight(180); //프로퍼티에 설정
    student.setHeight(80);

    return student;
}
}
```

MainClass.java
```java
package com.javalec.ex;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class MainClass {

	public static void main(String[] args) {
		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(ApplicationConfig.class);
		
		Student student1 = ctx.getBean("student1", Student.class);
		System.out.println("이름 : " + student1.getName());
		System.out.println("나이 : " + student1.getAge());
		System.out.println("취미 : " + student1.getHobbys());
		System.out.println("신장 : " + student1.getHeight());
		System.out.println("몸무게 : " + student1.getWeight());
		
		Student student2 = ctx.getBean("student2", Student.class);
		System.out.println("이름 : " + student2.getName());
		System.out.println("나이 : " + student2.getAge());
		System.out.println("취미 : " + student2.getHobbys());
		System.out.println("신장 : " + student2.getHeight());
		System.out.println("몸무게 : " + student2.getWeight());
		
		ctx.close();
	}
	
}
```
위의 코드를 보면 객체가 AnnotationConfigApplicationContext인 것을 확인 할 수 있습니다.
AnnotationConfigApplicationContext는 GenericApplicationContext를 상속 받고 있습니다.
즉, XML로 다시 변환해서 파싱됩니다.(그럼 굳이 java를 쓸 필요가?) 그래서 잘 안씁니다.



ApplicationConfig.java
```java
package com.javalec.ex;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

	@Bean
	public Student student1(){
		
		ArrayList<String> hobbys = new ArrayList<String>();
		hobbys.add("수영");
		hobbys.add("요리");
		
		Student student = new Student("홍길동", 20, hobbys);
		student.setHeight(180);
		student.setWeight(80);
		
		return student;
	}
	
	@Bean
	public Student student2(){
		
		ArrayList<String> hobbys = new ArrayList<String>();
		hobbys.add("독서");
		hobbys.add("음악감상");
		
		Student student = new Student("홍길순", 18, hobbys);
		student.setHeight(170);
		student.setWeight(55);
		
		return student;
	}
	
}
```


## 자바와 XML을 혼용해서 사용하기

### XML 파일에 자바파일을 포함시켜 사용하는 방법

applicationCTX.xml 파일 안에 다음과 같은 키워드를 넣어줍니다.
```xml
<!-- XML파일 안에 자바파일을 넣어 사용하겠다. -->
<context:annotation-config /> 
<!-- ApplicationConfig 입니다. -->
<bean class="com.javalec.ex.ApplicationConfig" />
```

### 자바 파일에 XML 파일을 포함시켜 사용하는 방법

ApplicationConfig.java 파일 안에 다음과 같은 키워드를 넣어줍니다.
```java
@Configuration
@ImportResource("classpath:applicationCTX.xml")
public class ApplicationConfig{
    ...
}
```


# 생명주기와 범위
## 1. 스프링 컨테이너 생성
```java
GenericXmlApplicationContext ctx = new GenericApplicationContext();
```
## 2. 스프링 컨테이너 설정
```java
ctx.load("classpath:applicationCTX.xml");
ctx.refresh();
```

## 3. 스프링 컨테이너 사용
```java
Student student = ctx.getBean("student", Student.class);
System.out.println("이름 :"+ student.getName());
System.out.println("이름 :"+ student.getAge());
```

## 4. 스프링 컨테이너 종료
```java
ctx.close
```




1번째 방법.
```java
public class Student implements InitializingBean, DisposableBean{

	private String name;
	private int age;
	
	public Student(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public String getName() {
		return name;
	}
	
	public int getAge() {
		return age;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		// TODO Auto-generated method stub
		System.out.println("afterPropertiesSet()");
	}

	@Override
	public void destroy() throws Exception {
		// TODO Auto-generated method stub
		System.out.println("destroy()");
	}
	
}

```

2번째 방법
```java
package com.javalec.ex;

import javax.annotation.*;

public class OtherStudent  {

	private String name;
	private int age;
	
	public OtherStudent(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public String getName() {
		return name;
	}
	
	public int getAge() {
		return age;
	}
	
	@PostConstruct
	public void initMethod() {
		System.out.println("initMethod()");
	}
	
	@PreDestroy
	public void destroyMethod() {
		System.out.println("destroyMethod()");
	}

}

```


```
afterPropertiesSet()
initMethod()
11월 04, 2018 5:57:22 오후 org.springframework.context.support.AbstractApplicationContext doClose
정보: Closing org.springframework.context.support.GenericXmlApplicationContext@37f8bb67: startup date [Sun Nov 04 17:57:22 KST 2018]; root of context hierarchy
11월 04, 2018 5:57:22 오후 org.springframework.beans.factory.support.DefaultSingletonBeanRegistry destroySingletons
정보: Destroying singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@67b6d4ae: defining beans [org.springframework.context.annotation.internalConfigurationAnnotationProcessor,org.springframework.context.annotation.internalAutowiredAnnotationProcessor,org.springframework.context.annotation.internalRequiredAnnotationProcessor,org.springframework.context.annotation.internalCommonAnnotationProcessor,student,otherStudent,org.springframework.context.annotation.ConfigurationClassPostProcessor.importAwareProcessor]; root of factory hierarchy
destroyMethod()
destroy()
```

스프링 빈은 scope가 singleton으로 되어있습니다.

# Environment

설정값 (ex) DB의 아이피 주소 등등) 을 자바코드 내에 갖고있는 것이 아니라, 외부에 놓고 프로그램이 필요할 때, 그 정보값을 갖고 온다.

Context --ctx.getEnvironment()--> Environment --env.getPropertySources() --> PropertySources(프로퍼티 추가 및 추출)
Environment객체 안에 바로 정보가 있는 것이 아니라, 프로퍼티소스라고 하는 애들이 위치해있습니다.(객체) Property source안에 정보들이 있습니다.
그 정보들을 계속 스캔하다가 내가 필요한 정보가 있으면, 우리에게 반환을 해줍니다. 

추가 : propertySources.addLast()
추출 : env.getProperty()

##Environment 객체를 이용한 설정

MainClass.java
```java
package com.javalec.ex;

import java.io.IOException;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.io.support.ResourcePropertySource;

public class MainClass {

	public static void main(String[] args) {
		
		ConfigurableApplicationContext ctx = new GenericXmlApplicationContext();
		ConfigurableEnvironment env = ctx.getEnvironment();
		MutablePropertySources propertySources = env.getPropertySources();
		
		try {
			propertySources.addLast(new ResourcePropertySource("classpath:admin.properties"));
			
			System.out.println( env.getProperty("admin.id") );
			System.out.println( env.getProperty("admin.pw") );
		} catch (IOException e) {}
		
		GenericXmlApplicationContext gCtx = (GenericXmlApplicationContext)ctx;
		gCtx.load("applicationCTX.xml");
		gCtx.refresh();
		
		AdminConnection adminConnection = gCtx.getBean("adminConnection", AdminConnection.class);
		System.out.println("admin ID : " + adminConnection.getAdminId());
		System.out.println("amdin PW : " + adminConnection.getAdminPw());
		
		gCtx.close();
		ctx.close();
		
	}
	
}
```


## 프로퍼티 파일을 이용한 설정

[환경설정 동영상](https://www.youtube.com/watch?v=9cDHggH0ENA&index=71&list=PLieE0qnqO2kTyzAlsvxzoulHVISvO8zA9)

## 프로파일(profile) 속성을 이용한 설정


# AOP(Aspect Oriented Programing)
OOP(Object Oriented Programing) : 객체 지향 프로그램
AOP: 관점 지향 프로그램
프로그램밍을 하다보면, 공통적인 기능이 많이 발생 합니다. 이러한 공통 기능을 모든 모듈에 적용하기 위한 방법으로 상속을 통한 방법이 있습니다.
상속도 좋은 방법이긴 하지만 몇 가지 문제가 있습니다. 우선 **JAVA에서는 다중상속이 불가능** 하므로 **다양한 모듈에 상속기법을 통한 공통 기능 부여는 한계가 있습니다.**
그리고, **기능 구현 부분에 핵심 기능 코드와 공통 기능 코드가 섞여 있어 효율성이 떨어집니다.**

위의 상속을 통한 방법에 한계가 있어 AOP가 등장하게 되었습니다.
AOP방법은 **핵심 기능**과**공통 기능**을 **분리**시켜놓고, **공통 기능을 필요로 하는 핵심 기능들**에서 **사용**하는 방식입니다.
**핵심 기능** 은 쌀을 씻고, 깨끗한 물을 적당히 넣고, 전자 밥솥에 내솥을 넣고, 취사버튼을 누르는 기능들입니다.
**공통 기능**은 수도꼭지를 열어 물을 받고, 쌀이 깨끗이 씻겼는지 눈으로 판단하고, 물이 적당한지 판단하는 기능입니다.

이러한 기능이 공통기능인 것은 밥을 짓는 행동이 **아닐 때도** 우리는 수도 꼭지를 열고, 눈으로 사물을 보고 **적절한 판단**을 하기 때문에 공통기능 이라고 하였습니다.
어쨌든, 이렇게 핵심 기능과 공통기능을 분리해 놓고, 추후에 밥을 짓는 행동 말고 팥을 쑬때도 핵심기능은 변하지만, 공통 기능은 다시 적용할 수 있을 것 입니다.
AOP 기법이 바로 이러한 것 입니다. 공통 기능을 핵심 기능과 분리해 놓고, 공통 기능 중에서 핵심 기능에 적용하고자 하는 부분에 적용하는 것 입니다.

공통기능은 계속 재활용을 하고 핵심기능은 바뀔 수 있습니다.

## AOP 용어
- Aspect : 공통 기능
- Advice : Aspect의 기능 자체 (Aspect의 주요 내용)
- Jointpoint : Advice를 적용해야 되는 부분 (ex, 필드, 메소드)(스프링에서는 메소드만 해당)
(핵심기능들 하나하나)
- Pointcut : Jointpoint의 부분으로 실제로 Advice가 적용된 부분 (핵심기능중에 나는 공통기능을 넣겠다.)
- Weaving : Advice를 핵심 기능에 적용하는 행위


스프링에서는 AOP 관련된 것에서 method에만 공통기능을 사용할 수 있습니다.

스프링에서 AOP 구현 방법 : proxy를 이용

호출부(client)-> proxy(대행)-> target(핵심기능)

프록시에게 요청을 하면, 공통기능을 수행하고 프록시가 핵심기능 쪽으로 가서 핵심기능 로직을 수행합니다. 그리고 다시 프록시로 돌아온다.

즉 우리는 프록시만 접촉하면 됩니다. 프록시에 공통기능만 넣어주면 프록시가 알아서 처리해줍니다.

XML 기반의 AOP 구현
1. 의존설정(pom.xml)
2. 공통 기능의 클래스 제작 - Advice 역할 클래스
3. XML설정 파일에 Aspect 설정

의존 설정 -> 공통 기능 클래스 설정 -> XML파일 설정

www.naver.com => com.naver.업무명 or 서버명
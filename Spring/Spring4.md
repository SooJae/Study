```java
public class BeanClass1 {
  public String getName(){
    return "hi youngjin";
  }
}
```
```xml
<bean id="beanClass1" class="me.wonwoo.bean.BeanClass1"></bean>
```



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans

http://www.springframework.org/schema/beans/spring-beans-3.2.xsd">

    <bean id="button" class="javax.swing.JButton">
        <constructor-arg value="Hello World" />
    </bean>

    <bean id="anotherButton" class="javax.swing.JButton">
        <property name="icon" ref="icon" />
    </bean>

    <bean id="icon" class="javax.swing.ImageIcon">
        <constructor-arg>
            <bean class="java.net.URL">
              <constructor-arg value="http://morevaadin.com/assets/images/learning_vaadin_cover.png" />
            </bean>
        </constructor-arg>
    </bean>
</beans>
```
```java
import java.net.MalformedURLException;
import java.net.URL;

import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JButton;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MigratedConfiguration {

    @Bean
    public JButton button() {

        return new JButton("Hello World");
    }

    @Bean
    public JButton anotherButton() {

        return new JButton(icon());
    }

    @Bean
    public Icon icon() throws MalformedURLException {

        URL url = new URL("http://morevaadin.com/assets/images/learning_vaadin_cover.png");

        return new ImageIcon(url);
    }
}
```
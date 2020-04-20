WebSocket
Full duplex, 2-way communication
polling(요청을 보내놓고 리스폰스가 와도 안끝는 것), Long Polling (계속 연결 해놓는 것)
IE 10부터 가능

SockJS
IE 8 부터 가능

STOMP (Simple Text Oriented Messaging Protocol)
스프링만 가능 Publish(topic/queue) & subscribe
Sub Protocol Over SockJS -> Custom Format for Message

구독방식이라 하나의 토픽만 보고있으면 된다.
push방식
메시지 브로커 사용


소켓에 강하게 연결되어 있는 방식이 아니라
Controller에 요청하여 Controller가 처리를 해준다.
메시지를 컨트롤러에서 받는다.

소켓은 해당 토픽을 계속 보고있는다. 서버가 메시지를 뿌려주면 알려준다.
약간 느슨하게 연결되어있다.
## Socket config
```java
@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub"); // /topic
        config.setApplicationDestinationPrefixes("/pub"); //pub
    }
 
	
	@Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp").setAllowedOrigins("*")
                .withSockJS();
    }
```

구독 -> 감시한다는 개념
heart-beat : 서버가 살아있나 죽어있나를 10초에 한번씩만 체크 (그 덕분에 강하게 연결되어 있지 않다.)
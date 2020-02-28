# push vs concat
push는 element를 추가하고 새로운 length를 반환한다. (기존 배열이 변경o 배열이 새로 생성되지 않으므로 Immutable이 아니다.)
concat은 element를 기존배열에 병합하고, 기존 배열을 변경하지 않고, **새 배열**을 반환한다. (기존 배열이 변경x Immutable이다.)


# scss 에서 &
```
.status {
    &.table-ab {
    
    }
}

// 다음과 같다.

.status.table-ab{}
```

### 2개 이상의 클래스를 다루면 ngClass를 사용하자.

### Json파이프를 사용하면 HTTP통신으로 받아오는 데이터가 바뀌는 상황에서 디버깅이 쉬워진다.
 

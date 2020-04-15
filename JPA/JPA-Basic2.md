# 다양한 연관관계 매핑

연관관계 매핑시 고려사항 3가지
1. 다중성
2. 단방향, 양방향
3. 연관관계 주인

다대다는 실무에서는 사용하면 안된다...

일대다 [1:N] 파트 강의 다시보기

일대다 단방향 매핑의 단점
- 엔티티가 관리하는 외래 키가 다른 테이블에 있음
- 연관관계 관리를 위해 추가로 UPDATE SQL 실행
- 일대다 단방향 매핑보다는 *다대일 양방향 매핑* 을 사용하자


다대다
@ManyToMany => @OneToMany , @ManyToOne으로 나눠서 사용하자

@ManyToOne은 mappedBy 가 없다!
@OneToMany는 mappedBy가 있다! 
ManyToOne를 쓰면 연관관계의 주인이 되어야 한다는 것! (꼼수로 insertable = false, updatable = false를 사용하면 mappedBy처럼 동작하지만 굳이?)

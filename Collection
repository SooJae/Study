Set : 중복되는 값 X, 순서대로 저장 X
List : 중복되는 값 O, 순서대로 저장 O




Set

A.ContainsAll(B) : B가 A의 부분집합이냐
A.addAll(B) : A와 B의 합집합을 A에 담겠다
A.retainAll(B) : A와 B의 교집합을 A에 담겠다
A.removeAll(B) : A-B (차집합)




Iterator
인터페이스임

HashSet<Integer> A = new HashSet<Integer>();
A.add(1);
A.add(2);
A.add(3);


Iterator it = (Iterator) A.iterator();
while(it.hasNext()){
System.out.println(it.next());
}

iterator()라는 메소드의 리턴값은 Iterator에 객체를 리턴하기 때문에, hi는 Iterator라는 데이터타입을 갖고 객체가 된다.
A라고 하는 인스턴스안에 값은 그대로 존재하는데 iterator()라는 메서드를 통해서 hi라고하는 Iterator 인스턴스를 만들게 되면, 
hi라고하는 집합이 생긴다. 그리고 오리지널 값을 갖고있는 (A라는 해쉬셋 안에 들어가있는 1,2,3을 갖고있는) 가상의 컨테이너가 생김
hi.hasnext()를 호출하게 되면, hi라는 이터레이터 안에 들어가있는 값들이 존재하는지 확인.
hi.next()를 호출하면 1을 hi.next()에 리턴해준다. 이것은 Iterator값의 1이 사라지는 것이지 오리지널인 A안의 1이 사라지는 것이 아니다.
그 다음 hi.hasNext()로 hi안의 다음으로 가져올 값이 있는지 확인한다.
hi.next()를 다시 호출하면 2를 가져오고 hi라는 이터레이터 안에서 2를 삭제한다.
3까지 사라졌다면, hasNext() 호출될때 hi에 더 이상 값이 없어서 false가 된다.
반복작업 종료.

hi에 담겨있는 값은 실제값이 아니라 참조 값만 갖고 있기 때문에, hi.next()를 통해서 hi의 값이 사라진다고 해서 오리지널 값이 사라지는 것은 아니다.


ArrayList<Integer> A = new ArrayList<Integer>();
A.add(1);
A.add(2);
A.add(3);


Iterator it = (Iterator) A.iterator();
while(it.hasNext()){
System.out.println(it.next());
}

HashSet을 ArrayList로 바꿔도 오류가 안난다.
그 이유는 컬렉션 인터페이스를 구현하고 있기 때문이다.
그래서 ArrayList대신 Collection으로 바꿔도 된다.

Collection<Integer> A = new ArrayList<Integer>();
A.add(1);
A.add(2);
A.add(3);


Iterator it = (Iterator) A.iterator();
while(it.hasNext()){
System.out.println(it.next());
}



MAP

HashMap<String,Integer> A = new HashMap<String,Integer>();
A.add(1); --> A.put("one",1);
A.add(2); --> A.put("two",2);
A.add(3); --> A.put("three",3);
System.out.println(A.get("one")); //1 
System.out.println(A.get("two")); //2 
System.out.println(A.get("three")); //3

Iterator it = (Iterator) A.iterator();
while(it.hasNext()){
System.out.println(it.next());
}


key 와 value가 있다.
key는 중복 X
value는 중복 O

entrySet() : Set

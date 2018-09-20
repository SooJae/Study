class Fruit{
		public static final Fruit Apple = new Fruit(); // 구글의 Apple과 같기때문에 식별해주기 위해서 자기자신의 데이터타입으로(Fruit())으로 
								  인스턴스화. but 상수가 아니기 때문에 Switch문에서 에러남
		public static final Fruit PEACH = new Fruit();
		public static final Fruit BANANA = new Fruit();
		
	}

	enum Fruit{
		APPLE, PEACH, BANANA
	}
  
  둘이 같은 말이다.
  
  배열 : 서로 연관된 변수들의 집합
  Enum : 서로 연관된 상수들의 집합 (열거형)


for ( Fruit f : Fruit.values()){
	//values()가 호출되면 Enum에 있는걸 f에 하나씩 담는다.
	}

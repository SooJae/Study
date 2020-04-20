"pobi,crong,honux" 문자열 전달

```java
public class Car {
	private String carName;
	private int position;
	
	public Car(String carName) {
		super();
		this.carName = carName;
	}
	public String getCarName() {
		return carName;
	}
	public int getPosition() {
		return position;
	}
}
```
```java
private List<Car> parseCar(String fullString){
    List<String> carNames = Arrays.asList(fullString.split(",")); // {pobi crong honux}
    List<Car> carList = new ArrayList<>();
    for(int i=0; i<carNames.size(); i++) {
        carList.add(new Car(carNames.get(i))); 
    }
    return carList;
}
```
```java
private static List<Car> parseCar(String fullString){
    List<String> carNames = Arrays.asList(fullString.split(","));
    List<Car> newCarList = carNames.stream().map(name -> new Car(name)).collect(Collectors.toList());
    return newCarList;
    }
```
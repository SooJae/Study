package max;

public class Min3 {
	static int min(int a, int b, int c) {
		int min = a;
		if(min > b) min = b;
		if(min > c) min = c;
		
		return min;
	}
	
	public static void main(String[] args) {
		System.out.println(min(4,2,6));
	}
}

package recursive;

import java.util.Scanner;

public class GcdArray {
	
	static int gcd(int x, int y) {
		if(y==0)
			return x;
		else
			return gcd(y, x%y); 
	}

	static int gcdArray(int[] a, int start, int no) {
		if (no == 1)
			return a[start];
		else if (no == 2)
			return gcd(a[start], a[start + 1]);
		else
			return gcd(a[start], gcdArray(a, start + 1, no - 1));
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		System.out.println("정수의 최대공약수를 구합니다.");
		
		System.out.print("요솟 수 : "); int num = stdIn.nextInt();
		
		int[] x = new int [num];
		
		for(int i = 0 ; i < num ; i++) {
			System.out.print("정수를 입력하세요 : "); 
			x[i] = stdIn.nextInt();
		}
		
		System.out.println("최대 공약수는 " + gcdArray(x,0,num) + "입니다.");
	}
}

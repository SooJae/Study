package forE;

import java.util.Scanner;

public class Minus {


	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.println("두개의 정수 a,b를 입력해주세요(a<b)");
		System.out.print("a값");
		int a = stdIn.nextInt();
		int b =0;
		System.out.println("b값");
		while(true) {
			
			 b= stdIn.nextInt(); 
			if(b>a)
				break;
			System.out.println("a보다 큰 값을 입력하세요!");
				
		}
		
		System.out.println(minus(a,b));
		
	}
	
	public static int minus(int x, int y) {
		return y-x;
	}
	

}

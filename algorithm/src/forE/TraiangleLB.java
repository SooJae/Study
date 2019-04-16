package forE;

import java.util.Scanner;

public class TraiangleLB {

	public static void main(String[] args) {
		
		Scanner stdIn = new Scanner(System.in);
		
		int n =0;
		
		System.out.println("몇 등변 삼각형입니까?");
		do {
			n = stdIn.nextInt();
		}while(n<=0);
		

		triangleRU(n);
		System.out.println("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
		triangleLU(n);
		System.out.println("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
		triangleRB(n);
		System.out.println("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
		triangleLB(n);
	}
	
	static void triangleLB(int n) {
		for(int i =1; i<= n; i++) {
			for(int j =1; j<=i; j++) {
				System.out.print("*");
			}
			System.out.println("");
		}
	}
	
	static void triangleLU(int n) {
		for (int i =1 ; i<=n;n--) {
			for(int j=1; j <= n ; j++) {
				System.out.print("*");
			}
			System.out.println("");
		}
	}
	
	static void triangleRU(int n) {
		for (int i=1; i<=n; i++) {
			for(int k = 1; k<=i-1; k++) {
				System.out.print(" ");
			}
			for(int j=1; j<=n-i+1; j++) {
				System.out.print("*");
			}
			System.out.println("");
		}
	}
	
	
	static void triangleRB(int n) {
		for (int i = 1; i <=n; i++) {
			for(int j = 1; j<=n-i; j++) {
				System.out.print(" ");
			}
			for(int j = 1; j<=i; j++) {
				System.out.print("*");
			}
			System.out.println("");
		}
	}
}

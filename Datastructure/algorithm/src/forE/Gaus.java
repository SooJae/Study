package forE;

import java.util.Scanner;

public class Gaus {

	public static void main(String[] args) {
		
		Scanner stdIn = new Scanner(System.in);
		System.out.println("1부터 n까지의 값을 구합니다.");
		System.out.println("n의 값");
		int n = stdIn.nextInt();
		
		int sum = (1+n)*(n/2);
		
		
		
		 if(n%2 != 0) sum += (n+1)/2;
		 
		
		System.out.println(sum);
	}
}

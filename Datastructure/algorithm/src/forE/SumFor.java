package forE;

import java.util.Scanner;
import java.util.stream.IntStream;

public class SumFor {

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.println("1부터 n까지의 합을 구합니다.");
		System.out.print("n의 값: ");
		int n = stdIn.nextInt();
		

		Integer sumFor = 
				IntStream.rangeClosed(1,n)
				.reduce(0, (a,b)->a+b);
		
		System.out.println("1부터 "+n+"까지의 값은"+sumFor);
	}
}

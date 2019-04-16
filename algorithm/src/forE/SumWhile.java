package forE;

import java.util.Scanner;
import java.util.stream.IntStream;

public class SumWhile {

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.println("1부터 n까지의 값을 구합니다.");
		System.out.print("n의 값:");
		
		int n = stdIn.nextInt();
		
		
		/*
		 * OptionalInt reduced= IntStream.rangeClosed(1, n) .reduce((a,b)->{ return
		 * Integer.sum(a, b); });
		 * 
		 * System.out.println("메롱"+reduced);
		 */
		Integer reducedTwoParams =
				IntStream.rangeClosed(1,n)
				.reduce(0, Integer::sum);
		
		System.out.println(reducedTwoParams);
	}
}

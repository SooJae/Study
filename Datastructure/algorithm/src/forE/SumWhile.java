package forE;

import java.util.Scanner;
import java.util.stream.IntStream;

public class SumWhile {

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.println("1���� n������ ���� ���մϴ�.");
		System.out.print("n�� ��:");
		
		int n = stdIn.nextInt();
		
		
		/*
		 * OptionalInt reduced= IntStream.rangeClosed(1, n) .reduce((a,b)->{ return
		 * Integer.sum(a, b); });
		 * 
		 * System.out.println("�޷�"+reduced);
		 */
		Integer reducedTwoParams =
				IntStream.rangeClosed(1,n)
				.reduce(0, Integer::sum);
		
		System.out.println(reducedTwoParams);
	}
}

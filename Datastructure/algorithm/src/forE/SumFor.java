package forE;

import java.util.Scanner;
import java.util.stream.IntStream;

public class SumFor {

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.println("1���� n������ ���� ���մϴ�.");
		System.out.print("n�� ��: ");
		int n = stdIn.nextInt();
		

		Integer sumFor = 
				IntStream.rangeClosed(1,n)
				.reduce(0, (a,b)->a+b);
		
		System.out.println("1���� "+n+"������ ����"+sumFor);
	}
}

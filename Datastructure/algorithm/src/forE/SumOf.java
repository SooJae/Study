package forE;

import java.util.Scanner;
import java.util.stream.IntStream;

public class SumOf {

	static int sumof(int a, int b) {
		
		Integer sumof = IntStream.rangeClosed(a,b)
				.reduce(0,Integer::sum);
		return sumof;
		
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.println("���� �ΰ� �Է��ϼ���");
		int n1 = stdIn.nextInt();
		int n2 = stdIn.nextInt();
		
		
		System.out.println("����"+sumof(n1,n2));
	}
}

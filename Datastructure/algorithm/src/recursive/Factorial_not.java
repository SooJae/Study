package recursive;

import java.util.Scanner;

public class Factorial_not {

	static int factorial(int n) {
		int result = 1;
		for(int i = 1; i<=n; i++) {
			result *= i; 
		}
		return result;
			
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.print("������ �Է��ϼ��� : ");
		int x = stdIn.nextInt();
		
		System.out.println(x + "�� ���丮���� " + factorial(x)+"�Դϴ�.");
	}
}

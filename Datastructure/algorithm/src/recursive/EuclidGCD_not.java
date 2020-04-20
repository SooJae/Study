package recursive;

import java.util.Scanner;

public class EuclidGCD_not {

	static int gcd(int x, int y) {
		while (y != 0) {
			int temp = y;
			y = x % y;
			x = temp;
		}
		return (x);
	}
	
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.println("�� ������ �ִ������� ���մϴ�.");
		
		System.out.print("������ �Է��ϼ��� : "); int x = stdIn.nextInt();
		System.out.print("������ �Է��ϼ��� : "); int y = stdIn.nextInt();
		
		System.out.println("�ִ������� "+gcd(x,y)+"�Դϴ�.");
	}
}

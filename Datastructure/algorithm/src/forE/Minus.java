package forE;

import java.util.Scanner;

public class Minus {


	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.println("�ΰ��� ���� a,b�� �Է����ּ���(a<b)");
		System.out.print("a��");
		int a = stdIn.nextInt();
		int b =0;
		System.out.println("b��");
		while(true) {
			
			 b= stdIn.nextInt(); 
			if(b>a)
				break;
			System.out.println("a���� ū ���� �Է��ϼ���!");
				
		}
		
		System.out.println(minus(a,b));
		
	}
	
	public static int minus(int x, int y) {
		return y-x;
	}
	

}

package forE;

import java.util.Scanner;

public class Digit {

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		System.out.print("���� �Է��ϼ���");
		
		int n = stdIn.nextInt();
		int m =0;
		int i=0;
		while(true) {
			m= n/10;
			i++;
			n = m;
			if(m==0) break;
		}
		System.out.println("�� ���� "+i+"�ڸ��Դϴ�.");
		
		
	}
}

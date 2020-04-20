package numberConversion;

import java.util.Scanner;

public class CardConvRev3 {

	static int cardConvR(int x, int r, char[] cno) {
		int digit = 0;
		String dchar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		do {
			cno[digit++] = dchar.charAt(x%r);
			x /= r;
		}while(x != 0);

		return digit;
	}
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		int cd;
		int no;
		int dno;
		int rev;
		int retry;
		char[] cno = new char[32];
		
		do{
			do {
				System.out.print("���� �ƴ� ����");
				no = stdIn.nextInt();
			}while(no<0);
			
			do {
				System.out.print("� ������ ��ȯ�ұ��?(2~36)");
				cd = stdIn.nextInt();
			}while(cd<2||cd>36);
	
			dno = cardConvR(no,cd,cno);
			
			System.out.print(cd+"�����δ� ");
			for(int i = dno -1; i>=0; i--)
				System.out.print(cno[i]);
			System.out.println("�Դϴ�.");
			
			System.out.print("�� �� �� �ұ��? (1.��/ 2.�ƴϿ�) : ");
			retry = stdIn.nextInt();
		}while(retry==1);
		
		
	}
}

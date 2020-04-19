package numberConversion;

import java.util.Scanner;

public class CardConvRev_어려움 {

	static int cardConvEx(int x, int r, char[] d) {
		int n = ((Integer) x).toString().length(); // 변환 전의 자릿수
		System.out.println("메롱 : "+n);
		int digits = 0; // 변환 뒤의 자릿수
		String dchar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		System.out.printf(String.format("%%2d | %%%dd\n", n), r, x);
		do {
			System.out.printf("   +");
			for (int i = 0; i < n + 2; i++)
				System.out.print('-');
			System.out.println();

			if (x / r != 0)
				System.out.printf(String.format("%%2d | %%%dd    … %%d\n", n), r, x / r, x % r);
			else
				System.out.printf(String.format("     %%%dd    … %%d\n", n), x / r, x % r);
			d[digits++] = dchar.charAt(x % r); // r로 나눈 나머지를 저장
			x /= r;
		} while (x != 0);

		for (int i = 0; i < digits / 2; i++) { // d[0]~d[digits-1]
			char temp = d[i]; // 를 역순으로 정렬
			d[i] = d[digits - i - 1];
			d[digits - i - 1] = temp;
		}
		return digits;
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		int cd;
		int no;
		int dno;
		int retry;
		
		char[] cno = new char[32];
		do{
			do {
				System.out.print("음이 아닌 정수 : ");
				no = stdIn.nextInt();
			}while(no<0);
			do {
				System.out.print("어떤 진수로 변환할까요?(2~36) : ");
				cd=stdIn.nextInt();
			}while(cd<2||cd>36);
			
			dno = cardConvEx(no,cd,cno);
			
			System.out.println(cd+"진수로는 ");
			for(int i = dno -1; i>=0; i--)
				System.out.print(cno[i]);
			System.out.println("입니다.");
			
			System.out.print("한 번 더 할까요? (1.예/ 2.아니요) : ");
			retry = stdIn.nextInt();
		}while(retry==1);
		
		
		
	}
}

package forE;

import java.util.Scanner;

public class NumPiramid {

	static void npira(int n) {
		for(int i=1; i<=n; i++) {
			for(int j=1; j<= n-i; j++) {
				System.out.print(" ");
			}
			for(int j=1; j<=2*(i-1)+1; j++) {
				System.out.print(i);
			}
			System.out.println();
			
		}
	}
	public static void main(String[] args) {
		
		Scanner stdIn = new Scanner(System.in);
		System.out.print("숫자를 입력해주세요.");
		int n = stdIn.nextInt();
		
		npira(n);
	}
}

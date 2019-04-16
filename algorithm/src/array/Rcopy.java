package array;

import java.util.Arrays;
import java.util.Scanner;

public class Rcopy {

	static void rcopy(int[] a, int[] b) {
		for(int i = 0 ; i<b.length; i++) {
			a[i]=b[b.length-i-1];
		}
		System.out.println(Arrays.toString(a));
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		System.out.print("¿ä¼Ú¼ö : ");
		int num = stdIn.nextInt();
		
		int[] a = new int[num];
		int[] b = new int[num];
		for(int i = 0 ; i< num; i++) {
			System.out.print("b["+i+"] : ");
			b[i] = stdIn.nextInt();
		}
		
		rcopy(a, b);
		
	}
}

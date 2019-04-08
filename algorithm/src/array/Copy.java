package array;

import java.util.Arrays;
import java.util.Scanner;

public class Copy {

	static void print(int[] x) {
		System.out.print("¹è¿­ "+ Arrays.toString(x)+ ":");
		for(int i = 0 ; i < x.length ; i++) {
			System.out.print(x[i]+" ");
		}
		System.out.println();
	}
	static void copy(int[] a, int[] b) {
		
		print(b);
		for(int i = 0; i < a.length; i++) {
			a[i] = b[i];
		}
		print(a);
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		System.out.print("¿ä¼Ú¼ö : ");
		int num = stdIn.nextInt();
		
		int[] a = new int[num];
		int[] b = new int[num]; 
		for(int i = 0 ; i < num ; i++) {
			System.out.print("x["+i+"] : ");
			b[i] = stdIn.nextInt();
		}
		
		copy(a,b);
		
	}
}

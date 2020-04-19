package array;

import java.util.Scanner;

public class ReverseArray2 {

	static void swap(int[] a, int idx1, int idx2) {
		int t = a[idx1];
		a[idx1] = a[idx2];
		a[idx2] = t;
		
	}
	
	static void reverse(int []a) {
		for(int i= 0; i < a.length/2 ; i++) {
			for(int j =0; j<a.length; j++) {
				System.out.print(a[j] + " ");
			}
			System.out.println();
			swap(a,i,a.length-i-1);
			System.out.println("a["+a[i]+"]��(��) a["+a[a.length-i-1]+"]�� ��ȯ�մϴ�.");
		}
		for(int j =0; j<a.length; j++) {
			System.out.print(a[j] + " ");
		}
		System.out.println();
		System.out.println("���� ������ ���ƽ��ϴ�.");
	}
	
	public static void main(String[] Args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.print("��ڼ�: ");
		int num = stdIn.nextInt();
		int[] a = new int[num];
		
		for(int i=0; i<a.length; i++) {
			System.out.print("a["+i+"] : ");
			a[i]=stdIn.nextInt();
		}
		
		reverse(a);
		
	}
}

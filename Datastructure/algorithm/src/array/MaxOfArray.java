package array;

import java.util.Scanner;

public class MaxOfArray {

	static int maxOf(int[] a) {
		
		int max = a[0];
		
		for(int i = 1 ; i<a.length; i++) {
			if(a[i]>max) max = a[i];
		}
		
		return max;
	}
	public static void main(String[] args) {
		
		Scanner stdIn = new Scanner(System.in);
		System.out.println("Ű�� �ִ��� ���մϴ�.");
		System.out.print("��� ��: ");
		int n = stdIn.nextInt();
		
		int[] a = new int[n]; 
		
		for(int i =0; i<a.length; i++) {
			System.out.print("height["+i+"] : ");
			a[i] = stdIn.nextInt();
		}
		
		System.out.println("�ִ��� "+maxOf(a)+"�Դϴ�.");
		
	}
}

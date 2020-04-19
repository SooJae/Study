package search;

import java.util.Scanner;

public class SearchIndex {

	static int searchIdx(int[] a, int n, int key, int[] idx) {
		int count =0;
		
		for(int i = 0 ; i< n; i++)
		if(a[i]==key)
			idx[count++] = i;
		
		return count;
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.print("��� �� : ");
		int num = stdIn.nextInt();
		
		int[] x = new int[num];
		int[] y = new int[num];
		
		for(int i = 0; i< x.length; i++) {
			System.out.print("x["+i+"] : ");
			x[i] = stdIn.nextInt();
		}
		System.out.print("ã�� �� : ");
		int key = stdIn.nextInt();
		
		
		int idx = searchIdx(x, num, key, y);
		
		if(idx == 0)
			System.out.println("�ش� ���� �����ϴ�.");
		else
			System.out.println(idx);
		
	}
}

package sort;

import java.util.Scanner;

public class BubbleSortV2 {

	static void swap(int a[], int idx1, int idx2) {
		int tmp = a[idx1];
		a[idx1] = a[idx2];
		a[idx2] = tmp;
	}
	
	static void bubbleSort(int a[], int n) {
		for(int i = 0; i < n ; i++) {
			
			int exchg=0;
			
			for(int j = n-1 ; j>i ; j--)
				if(a[j-1]>a[j]) {
					swap(a, j-1, j);
					exchg++;
				}
			if(exchg == 0) break;
		}
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		System.out.print("¿ä¼Ú ¼ö : ");
		int num = stdIn.nextInt();
		
		int x[] = new int[num];
		
		for(int i =0 ; i<num; i++) {
			System.out.print("x["+i+"] : ");
		}
		
		bubbleSort(x, num);
		
		for(int i = 0; i<num; i++) {
			System.out.print(x[i]+" ");
		}
		
		
	}
}

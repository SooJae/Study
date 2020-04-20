package search;

import java.util.Scanner;

public class SeqSearch {

	static int seqSearch (int[] a, int n, int key) {
		//int i=0;
		
		for(int i = 0; i<a.length; i++) {
			if(a[i] == key)
				return i;
		}
		return -1;
		
		/*while(true) {
			if(i == n)
				return -1;
			if(a[i] == key)
				return i;
			i++;
		}*/
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.print("��ڼ� : ");
		int n = stdIn.nextInt();
		int[] x = new int[n];
		
		for(int i =0 ; i< x.length; i++) {
			System.out.print("x["+i+"] : ");
			x[i] = stdIn.nextInt();
		}
		
		System.out.print("�˻��� �� : ");
		int ky = stdIn.nextInt();
		int idx = seqSearch(x,n,ky);
		
		if(idx==-1)
			System.out.println("�� ���� ��Ұ� �����ϴ�.");
		else
			System.out.println(ky+"��(��) x["+idx+"]�� �ֽ��ϴ�.");
	}
}

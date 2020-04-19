package search;

import java.util.Scanner;

public class binSearchX {

	static int binSearch(int[] a, int n, int key) {
		int pl= 0;
		int pr= n-1;
		int tmp=0;
		do {
			int pc = (pl+pr)/2;
			if(a[pc] == key) {
				for(int i =pc; i>0; i--) {
					if(key == a[i])
						tmp = i;
				}
				return tmp;
			}
			else if(a[pc] < key)
				pl = pc+1;
			else
				pr = pc-1;
		}while(pl<=pr);
		return -1;
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		System.out.print("��ڼ� : ");
		int num = stdIn.nextInt();
		int x[] = new int[num];
		
		for(int i=0; i<num; i++) {
			System.out.print("x["+i+"] : ");
			x[i] = stdIn.nextInt();
		}
		System.out.print("ã�� ���� �Է��ϼ��� : ");
		int key = stdIn.nextInt();
		
		int idx = binSearch(x, num, key);

		if(idx == -1)
			System.out.println("�ش� ���� ã�� �� �����ϴ�.");
		else 
			System.out.println("x["+idx+"] �Դϴ�.");
		
	}
}

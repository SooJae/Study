package stack;

import java.util.Scanner;

public class IntStackTester {

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		IntStack s = new IntStack(64);
		
		while(true) {
			System.out.println("���� �����ͼ� : "+s.size()+"/"+s.capacity());
			System.out.print("(1)Ǫ�� (2)�� (3)��ũ (4)���� (5)�ε��� �� (6)�ʱ�ȭ (7)����ִ��� Ȯ�� (8)�� á���� Ȯ��(0)����");
			
			int menu = stdIn.nextInt();
			if(menu == 0 ) break;
			
			int x;
			switch(menu) {
			case 1:
				System.out.print("������ : ");
				x = stdIn.nextInt();
				try {
					s.push(x);
				}catch (IntStack.OverflowIntStackException e) {
					System.out.println("������ ���� á���ϴ�.");
				}
				break;
				
			case 2:
				try {
					x = s.pop();
					System.out.println("���� �����ʹ� "+x+"�Դϴ�.");
				} catch (IntStack.EmptyIntStackException e) {
					System.out.println("������ ��� �ֽ��ϴ�.");
				}
				break;
				
			case 3:
				try {
					x = s.peek();
					System.out.println("��ũ�� �����ʹ� "+x+"�Դϴ�.");
				} catch (IntStack.EmptyIntStackException e) {
					System.out.println("������ ��� �ֽ��ϴ�.");
				}
				break;
				
			case 4:
				s.dump();
				break;
				
			case 5:
					System.out.print("ã�� ���� ���ڸ� �Է��ϼ���: ");
					x = stdIn.nextInt();
					int n=s.indexOf(x);
					if(n >= 0) 
						System.out.println("����� ����"+(s.size()-n)+" ��°�� �ֽ��ϴ�.");
					else
						System.out.println("�����Ͱ� �����ϴ�.");
					break;
			case 6: 
				s.clear();
				break;
				
			case 7:
				System.out.println("�뷮"+s.capacity());
				System.out.println("������ ��"+s.size());
				System.out.println("���"+(s.isEmpty()? "�ֽ��ϴ�.":"���� �ʽ��ϴ�."));
				System.out.println("����"+(s.isFull()? "á���ϴ�.":"���� �ʽ��ϴ�."));
				break;
			}
		}
	}
}
package queue;

import java.util.Scanner;

import queue.IntQueue.EmptyIntQueueException;
import queue.IntQueue.OverflowIntQueueException;

public class IntQueueTester {

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		IntQueue s = new IntQueue(64);
		
		while(true) {
			System.out.println("���� ������ ��: "+ s.size() + "/" + s.capacity());
			System.out.print("(1)��ť (2)��ť (3)��ũ (4)���� (5) ��ġ (0) ���� : ");
			
			int menu = stdIn.nextInt();
			if(menu == 0) break;
			
			int x;
			switch(menu) {
			case 1:
				System.out.print("������ : ");
				x = stdIn.nextInt();
				try {
					s.enque(x);
				} catch(OverflowIntQueueException e) {
					System.out.println("ť�� ���� á���ϴ�.");
				}
				break;
			case 2:
				try {
					x = s.deque();
					System.out.println("��ť�� �����ʹ�"+x+"�Դϴ�.");
				} catch(EmptyIntQueueException e) {
					System.out.println("ť�� ��� �ֽ��ϴ�.");
				}
				break;
			case 3:
				try {
					x=s.peek();
					System.out.println("��ũ�� �����ʹ� "+x+"�Դϴ�.");
				} catch(EmptyIntQueueException e) {
					System.out.println("ť�� ��� �ֽ��ϴ�.");
				}
				break;
				
			case 4:
				s.dump();
				break;
			case 5:
				try {
					int res;
					System.out.println("ã�� ���� �Է��ϼ���");
					x=stdIn.nextInt();
					
					System.out.println("��ġ�� �����ʹ�"+s.search(x)+"��°�� �ֽ��ϴ�.");
				} catch(EmptyIntQueueException e) {
					System.out.println("ť�� ��� �ֽ��ϴ�.");
				}
			}
			
		}
	}
}

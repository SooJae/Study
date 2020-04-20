package queue;

import java.util.Scanner;

import queue.IntQueue.EmptyIntQueueException;
import queue.IntQueue.OverflowIntQueueException;

public class IntQueueTester {

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		IntQueue s = new IntQueue(64);
		
		while(true) {
			System.out.println("현재 데이터 수: "+ s.size() + "/" + s.capacity());
			System.out.print("(1)인큐 (2)디큐 (3)피크 (4)덤프 (5) 서치 (0) 종료 : ");
			
			int menu = stdIn.nextInt();
			if(menu == 0) break;
			
			int x;
			switch(menu) {
			case 1:
				System.out.print("데이터 : ");
				x = stdIn.nextInt();
				try {
					s.enque(x);
				} catch(OverflowIntQueueException e) {
					System.out.println("큐가 가득 찼습니다.");
				}
				break;
			case 2:
				try {
					x = s.deque();
					System.out.println("디큐한 데이터는"+x+"입니다.");
				} catch(EmptyIntQueueException e) {
					System.out.println("큐가 비어 있습니다.");
				}
				break;
			case 3:
				try {
					x=s.peek();
					System.out.println("피크한 데이터는 "+x+"입니다.");
				} catch(EmptyIntQueueException e) {
					System.out.println("큐가 비어 있습니다.");
				}
				break;
				
			case 4:
				s.dump();
				break;
			case 5:
				try {
					int res;
					System.out.println("찾을 값을 입력하세요");
					x=stdIn.nextInt();
					
					System.out.println("서치한 데이터는"+s.search(x)+"번째에 있습니다.");
				} catch(EmptyIntQueueException e) {
					System.out.println("큐가 비어 있습니다.");
				}
			}
			
		}
	}
}

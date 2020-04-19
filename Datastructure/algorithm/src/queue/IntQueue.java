package queue;

public class IntQueue {

	private int max; //큐의 용량
	private int front; //첫 번째 요소 커서
	private int rear; // 마지막 요소 커서
	private int num; // 현재 데이터 수
	private int[] que; // 큐 본체 
	
	public class EmptyIntQueueException extends RuntimeException{
		public EmptyIntQueueException() {}
	}
	
	public class OverflowIntQueueException extends RuntimeException{
		public OverflowIntQueueException() {}
	}
	
	public IntQueue(int capacity) {
		num = front = rear = 0;
		max = capacity;
		try {
			que = new int[max];	//큐 본체용 배열을 생성
		} catch (OutOfMemoryError e) { //생성할 수 없음
			max = 0;
		}
	}
	
	public int enque(int x) throws OverflowIntQueueException{
		if(num >= max)
			throw new OverflowIntQueueException();
		
		que[rear++] = x;
		num++;
		
		if(rear == max)
			rear=0;
		
		return x;
	}
	
	public int deque() throws EmptyIntQueueException{
		if(num<=0)
			throw new EmptyIntQueueException();
		
		int x = que[front++];
		num--;
		
		if(front == max)
			front=0;
		
		return x;
	}
	
	public int peek() throws EmptyIntQueueException{
		if(num<=0)
			throw new EmptyIntQueueException();
		return que[front];
	}
	
	public int indexOf(int x) {
		for(int i=0; i<num; i++) {
			int idx = (i + front) % max;
			if(que[idx] == x)
				return idx;
		}
		return -1;
	}
	
	public void clear() {
		num = front = rear =0;
	}
	
	public int capacity() {
		return max;
	}
	
	public int size() {
		return num;
	}
	
	public boolean isEmpty() {
		return num <= 0;
	}
	
	public boolean isFull() {
		return num >= max;
	}
	
	public void dump() {
		if(num <= 0)
			System.out.println("큐가 비어 있습니다.");
		else {
			for(int i=0; i< num; i++)
				System.out.println(que[(i+front)% max]+ " ");
			System.out.println();
		}
	}
	
	int search(int x) {
		int seq = 0;
		if(num<=0)
			throw new EmptyIntQueueException();
		
		for(int i =0; i< num ; i++) {
			if(x==que[(i+front)%max])
				return i+1;
		}
		return 0;
	}
	
	
}

package list.linkedlist.implementation;

import java.util.ListIterator;

public class LinkedList {
	private Node head;
	private Node tail;
	private int size = 0;
	
	//�ϳ��� element�� �ϳ��� ��ü�̱� ������ ���� ��ü�� ������ش�.
	private class Node{
		private Object data;
		private Node next; // ���� ��带 ����Ű�� �־�� �ϹǷ�
		
		public Node(Object input) {
			this.data = input; // ��ü�� ����������, �ش� ��ü�� ���� �����־�� �ϹǷ�
			this.next = null;
		}
		
		public String toString() {
			return String.valueOf(this.data);
		}
	}
	
	public void addFirst(Object input) {
		Node newNode = new Node(input);
		newNode.next = head;
		head = newNode;
		size++;
		if(head.next == null) {
			tail = head;
		}
	}
	
	public void addLast(Object input) {
		Node newNode = new Node(input);
		if(size == 0) {
			addFirst(input);
		} else {
			tail.next = newNode;
			tail = newNode;
			size++;
		}
	}
	
	Node node(int index) { //���ϰ� ��ü�� Node�̱� ������ �� ��ü�� public���� �����Ű�� �ȵȴ�. 10�� ������ 10�� �����ؾ��Ѵ�.(��帻�� �� ��ü�� �����϶�)
		Node x = head;		
		for(int i = 0; i<index;i++) // for�� ������ ��ȿ�����̴�.
			x = x.next;
		
		return x;
	}
	
	public void add(int k, Object input) {
		if( k == 0 ) {
			addFirst(input);
		} else {
			Node temp1 = node(k-1);
			Node temp2 = temp1.next;
			Node newNode = new Node(input);
			
			temp1.next = newNode;
			newNode.next = temp2;
			size++;
			
			if(newNode.next == null) {
				tail = newNode;
			}
		}
	}
	public String toString() {
		if(head == null) {
			return "[]";
		} 
		Node temp = head;
		String str = "[";
		
		while(temp.next !=null) {
			str += temp.data +", ";
			temp = temp.next;
		}
		str += temp.data;
		return str +"]";
	}
	
	public Object removeFirst() {
		Node temp = head;
		head = head.next;
		
		Object returnData = temp.data;
		temp.data = null;
		size--;
		
		return returnData;
		
	}

	public Object remove(int k) {
		if(k == 0) {
			return removeFirst();
		}
		Node temp = node(k-1);
		Node todoDeleted = temp.next;
		temp.next = temp.next.next;
		Object returnData = todoDeleted.data;
		if(todoDeleted == tail) {
			tail = temp;
		}
		todoDeleted =null;
		size--;
		
		return returnData;
	}
	
	public Object removeLast() {
		return remove(size-1);
	}
	
	public int size() {
		return size;
	}
	
	public Object get(int k) {
		Node temp = node(k);
		return temp.data;
	}
	
	public int indexOf(Object data) {
		Node temp = head;
		int index = 0;
		
		while(temp.data != data) {
			temp = temp.next;
			index++;
			if(temp == null) {
				return -1;
			}
		}
		return index;
		
//		for(int i = 0; i<size; i++) {
//			if((node(i).data).equals(e)) {
//				return i;
//			}
//		}
//		return -1;
		
	}
	
	public ListIterator listIterator() {
		return new ListIterator(); 
	}
	
	public class ListIterator{
		private Node next;
		private Node lastReturned;
		private int nextIndex; //���� ���° ��ġ�� �ִ°��� �˷��ش�.(next�� ��� ȣ��ƴ°�)
		
		ListIterator(){
			next = head;
			
		}
		
		public Object next() {
			 lastReturned = next;
			 next = next.next;
			 nextIndex++;
			 return lastReturned.data;
		}
		
		public boolean hasNext() {
			return nextIndex < size();
		}
		
		public void add(Object input) {
			Node newNode = new Node(input);
			
			if(lastReturned == null) {
				head = newNode;
				newNode.next = next;
			} else {
				lastReturned.next = newNode;
				newNode.next = next;
			}
			lastReturned = newNode;
			nextIndex++;
			size++;
		}
		
		public void remove() {
			if(nextIndex == 0) {
				throw new IllegalStateException();
			}
			LinkedList.this.remove(nextIndex-1);
			nextIndex--;
		}
	}
}

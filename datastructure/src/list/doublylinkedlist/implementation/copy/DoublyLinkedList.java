package list.doublylinkedlist.implementation.copy;

import java.util.ListIterator;

public class DoublyLinkedList {
	private Node head;
	private Node tail;
	private int size = 0;
	
	//하나의 element가 하나의 객체이기 때문에 내부 객체를 만들어준다.
	private class Node{
		private Object data;
		private Node next; // 다음 노드를 가리키고 있어야 하므로
		private Node prev;
		
		public Node(Object input) {
			this.data = input; // 객체를 생성했을때, 해당 객체가 값을 갖고있어야 하므로
			this.next = null;
			this.prev = null;
		}
		
		public String toString() {
			return String.valueOf(this.data);
		}
	}
	
	public void addFirst(Object input) {
		Node newNode = new Node(input);
		newNode.next = head;
		
		if(head != null)
			head.prev = newNode;
		
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
			newNode.prev = tail;
			tail = newNode;
			size++;
		}
	}
	
	Node node(int index) { //리턴값 자체가 Node이기 때문에 이 자체를 public으로 노출시키면 안된다. 10을 줬으면 10을 리턴해야한다.(노드말고 값 자체를 리턴하라)
		
		Node x;
		if(index < size/2) {
			x = head;	
			for(int i = 0; i<index;i++) { // for문 때문에 비효율적이다.
				x = x.next;
			}
		} else {
			x = tail;
			for(int i = size-1; i>index;i--) {
				x=x.prev;
			}
		}
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
			if(temp2 !=null) {
				temp2.prev = newNode;
			}
			newNode.prev = temp1;
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
		temp = null;
		
		if(head != null)
			head.prev= null;
		
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
		
		if(temp.next != null) {
			temp.next.prev = temp;
		}
		
		Object returnData = todoDeleted.data;
		if(todoDeleted == tail) {
			tail = temp;
		}
		todoDeleted = null;
		
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
		
		
	}
	
	public ListIterator listIterator() {
		return new ListIterator(); 
	}
	
	public class ListIterator{
		private Node next;
		private Node prev;
		private Node lastReturned;
		private int nextIndex; //현재 몇번째 위치에 있는가를 알려준다.(next가 몇번 호출됐는가)
		
		ListIterator(){
			next = head;
			
		}
		
		public Object previous() {
			if(next == null) {
				lastReturned = next = tail; 
			} else {
				lastReturned = next = next.prev;
			}
			nextIndex--;
			return lastReturned.data;
		}
		public boolean hasPrevious() {
			return nextIndex > 0;
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
				newNode.prev = lastReturned;
				if(next != null) {
					newNode.next =next;
					next.prev = newNode;
				} else {
					tail = newNode;
				}
			}
			lastReturned = newNode;
			nextIndex++;
			size++;
		}
		
		public void remove() {
			if(nextIndex == 0) { //next()를 한번도 호출하지 않을 시 
				throw new IllegalStateException();
			}
			Node n = lastReturned.next;
			Node p = lastReturned.prev;
			
			if(p == null ) {
				head = n;
				head.prev = null;
				lastReturned =null;
			} else {
				p.next= next;
				lastReturned.prev =null; 
			}
			if(n == null) {
				tail = p;
				tail.next =null;
			} else {
				n.prev = p;
			}
			
			if(next ==null) {
				lastReturned =tail;
			} else {
				lastReturned = next.prev;
			}
			size --;
			nextIndex--;
			
			
		} 
	}
}

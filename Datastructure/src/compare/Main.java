package compare;

import list.arrayList.implementation.ArrayList;
import list.doublylinkedlist.implementation.copy.DoublyLinkedList;

public class Main {

	public static void main(String[] args) {
		ArrayList a = new ArrayList();
		a.addLast(10);
		a.addLast(20);
		a.addLast(30);
		a.addFirst(5);
		a.get(2);
		ArrayList.ListIterator ai = a.listIterator();
		while((int)ai.next() == 20) {
			ai.add(25);
		}
		
		
		DoublyLinkedList l = new DoublyLinkedList();
		l.addLast(10);
		l.addLast(20);
		l.addLast(30);
		l.addFirst(5);
		a.get(2);
		DoublyLinkedList.ListIterator li = l.listIterator();
		while(li.hasNext()) {
			if((int)li.next() == 20) {
				li.add(25);
			}
		}
	}
}

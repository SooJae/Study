package list.linkedlist.implementation;

import list.doublylinkedlist.implementation.copy.DoublyLinkedList;

public class Main {

	public static void main(String[] args) {
		DoublyLinkedList numbers = new DoublyLinkedList();
		
		numbers.addLast(10);
		numbers.addLast(20);
		numbers.addLast(30);
		
		DoublyLinkedList.ListIterator i = numbers.listIterator();
		/*
		 * while(i.hasNext()) { if((int)i.next() == 20) { i.remove(); } }
		 */
		
		/*
		 * while(i.hasNext()) { System.out.println(i.next()); }
		 */
		
		System.out.println(numbers);
	}
}

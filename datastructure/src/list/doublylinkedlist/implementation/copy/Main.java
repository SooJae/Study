package list.doublylinkedlist.implementation.copy;

import list.linkedlist.implementation.LinkedList;

public class Main {

	public static void main(String[] args) {
		LinkedList numbers = new LinkedList();
		
		numbers.addLast(10);
		numbers.addLast(20);
		numbers.addLast(30);
		
		LinkedList.ListIterator i = numbers.listIterator();
		/*
		 * while(i.hasNext()) { if((int)i.next() == 20) { i.remove(); } }
		 */
		
		/*
		 * while(i.hasNext()) { System.out.println(i.next()); }
		 */
		
		System.out.println(numbers);
	}
}

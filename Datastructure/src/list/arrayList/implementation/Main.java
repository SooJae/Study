package list.arrayList.implementation;

public class Main {

	public static void main(String[] args) {
		ArrayList numbers = new ArrayList();
		numbers.addLast(10);
		numbers.addLast(20);
		numbers.addLast(30);
		numbers.addLast(40);
		
		
		//ArrayList�ȿ� ���ԵǾ��ִ� ListIterator
		ArrayList.ListIterator li = numbers.listIterator();

		while(li.hasNext()) {
			int number = (int)li.next();
			if(number == 30) {
				System.out.println("�����մϴ�: "+li.remove());
			}
			System.out.println(number);
		}
		System.out.println(numbers);
		
		/*
		 * while(li.hasNext()) { System.out.println(li.next()); }
		 * 
		 * while(li.hasPrevious()) { System.out.println(li.previous()); }
		 */
	}
}

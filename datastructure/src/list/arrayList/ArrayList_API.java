package list.arrayList;

import java.util.ArrayList;
import java.util.Iterator;

public class ArrayList_API {

	 public static void main(String[] args) {
         

		 ArrayList<Integer> numbers = new ArrayList<>();
		 
		 numbers.add(10);
		 numbers.add(20);
		 numbers.add(30);
		 numbers.add(40);
		 System.out.println(numbers);
		 numbers.add(1, 50); //1인덱스에 50을 넣음
		 
		 System.out.println(numbers);
		 numbers.remove(2);
		 
		 System.out.println(numbers);
		 
		 System.out.println(numbers.get(2));
		 
		 System.out.println(numbers.size());

		 System.out.println("이터레이터 : ");
		 Iterator<Integer> it = numbers.iterator();
		 while(it.hasNext()) {
			//System.out.print( it.next() + " "); 
			int value = it.next();
			System.out.print(value + " ");
			 if(value == 30)
				 it.remove();
		 }
		 System.out.println();
		 System.out.println(numbers);
		 System.out.println("forEach문 : ");
		 for(int value : numbers) {
			 System.out.print(value + " ");
		 }
		 
		 
		 for(int i = 0 ; i < numbers.size(); i++) {
			 System.out.print(numbers.get(i) + " ");
		 }
		 
	    }
}

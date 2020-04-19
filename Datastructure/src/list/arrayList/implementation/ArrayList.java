package list.arrayList.implementation;

public class ArrayList {
	private int size =0; // 현재 몇개의 데이터가 있나?
	private Object[] elementData= new Object[100]; // 최대 수용 가능한 데이터 100
	
	public boolean addLast(Object element) {
		elementData[size] = element;
		size++;
		return true;
	}
	
	
	public boolean add(int idx, Object element) {
		
		for(int i = size-1 ; i>= idx; i--) {
			elementData[i+1] = elementData[i];  
		}
		
		elementData[idx] = element;
		
		size++;
		return true;
	}
	
	public boolean addFirst(Object element) {
		/*
		 * for(int i = size-1 ; i>=0; i--) { elementData[i+1] = elementData[i]; }
		 * elementData[0] = element;
		 */
		return add(0,element); 
	}
	
	
	public String toString() {
		String str = "[";
		for(int i =0 ; i <size; i++) {
			str += elementData[i];
			//str += (i < size-1) ? "," : "";
			if(i<size-1)
				str+=",";
		}
		return str +="]";
	}
	
	public Object remove(int idx) {
		Object removed = elementData[idx];
		for (int i = idx+1; i<=size-1; i++) {
			elementData[i-1]=elementData[i];
		}
		size--;
		elementData[size] =null;
		
		return removed;
	}
	
	public Object removeFirst()	{
		return remove(0);
	}
	
	public Object removeLast() {
		return remove(size-1);
	}
	
	public Object get(int idx) {
		return elementData[idx];
	}
	
	public int size() {
		return size;
	}
	
	public int indexOf(Object o) {
		for(int i = 0;i < size; i++) {
			if(elementData[i].equals(o))
				return i;
		}
		return -1;
	}
	
	public ListIterator listIterator() {
		return new ListIterator();
	}
	
	public class ListIterator{
		private int nextIdx=0;
		
		public boolean hasNext() {
			return nextIdx < size();
		}
		
		public Object next() {
			return elementData[nextIdx++];
		}
		
		public boolean hasPrevious() {
			return nextIdx > 0;
		}
		public Object previous(){
			return elementData[--nextIdx];
		}

		public boolean add(Object element) {
			return ArrayList.this.add(nextIdx++, element); // 이 메소드 add를 말하는 것이 아니라, ArrayList의 add를 말하고 있는것.
		}
		
		public Object remove() {
			return ArrayList.this.remove(--nextIdx);
		}

	}
		
}

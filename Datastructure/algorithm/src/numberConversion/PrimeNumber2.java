package numberConversion;

public class PrimeNumber2 {

	public static void main(String[] args) {
		int counter = 0;
		int ptr =0;
		int[] prime = new int[500];
		
		prime[ptr++] = 2;
		
		for(int n = 3; n<=1000; n+=2) { // Ȧ����
			int i;
			for(i = 1 ; i< ptr; i++) { // �̹� ã�� �Ҽ��� ������ ��. n=4�̰�,  ptr = 4�϶� 
				counter++;
				if(n%prime[i] == 0) //n = 9�϶� prime[2]=3���� break �ɸ�
					break;
			}
			if(ptr ==i) {	// ptr = 4�϶� prime[2]���� break�� �ɸ��Ƿ� 4!=2�̱� ������ prime���� ���� ����
				prime[ptr++] = n;
			}
				
		}
		
		for(int i = 0; i< ptr; i++)
			System.out.println(prime[i]);
		
		System.out.println("�������� ������ Ƚ�� : "+ counter);
	}
}

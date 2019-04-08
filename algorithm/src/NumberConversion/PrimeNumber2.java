package NumberConversion;

public class PrimeNumber2 {

	public static void main(String[] args) {
		int counter = 0;
		int ptr =0;
		int[] prime = new int[500];
		
		prime[ptr++] = 2;
		
		for(int n = 3; n<=1000; n+=2) { // 홀수만
			int i;
			for(i = 1 ; i< ptr; i++) { // 이미 찾은 소수로 나누어 봄. n=4이고,  ptr = 4일때 
				counter++;
				if(n%prime[i] == 0) //n = 9일때 prime[2]=3에서 break 걸림
					break;
			}
			if(ptr ==i) {	// ptr = 4일때 prime[2]에서 break가 걸리므로 4!=2이기 때문에 prime값에 들어가지 않음
				prime[ptr++] = n;
			}
				
		}
		
		for(int i = 0; i< ptr; i++)
			System.out.println(prime[i]);
		
		System.out.println("나눗셈을 수행한 횟수 : "+ counter);
	}
}

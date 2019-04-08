package year;

import java.util.Arrays;

public class ArraySumForIn {

	public static void main(String[] args) {
		
		Double [] a = { 1.0, 2.0, 3.0, 4.0, 5.0};
		
		/*
		 * for(double i : a) System.out.println(i);
		 */
		
		//Optional<Double> sum = a.reduce(0)
		
		double sum = Arrays.stream(a).mapToDouble(Double::doubleValue).sum();
		
		System.out.println(sum);
	}
}

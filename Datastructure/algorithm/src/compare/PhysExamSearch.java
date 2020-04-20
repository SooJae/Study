package compare;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class PhysExamSearch {

	static class PhyscData{
		private String name;
		private int height;
		private double vision;
		
		
		public PhyscData(String name, int height, double vision) {
			this.name = name;
			this.height = height;
			this.vision = vision;
		}
		
		public String toString() {
			return name + " " + height + " " + vision;
		}
		
		public static final Comparator<PhyscData> HEIGHT_ORDER = new HeightOrderComparator();
		public static final Comparator<PhyscData> VISION_ORDER = new VisionOrderComparator();
		
		private static class HeightOrderComparator implements Comparator<PhyscData>{
			public int compare(PhyscData d1, PhyscData d2) {
				return (d1.height > d2.height) ? 1 :  (d1.height < d2.height) ? -1 : 0;
			}
		}
		
		private static class VisionOrderComparator implements Comparator<PhyscData>{
			public int compare(PhyscData d1, PhyscData d2) {
				return (d1.vision < d2.vision) ? 1 : (d1.vision > d2.vision) ? -1 : 0;
			}
		}
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		PhyscData[] x = {
				new PhyscData("한병수", 152, 0.9),
				new PhyscData("관상용", 154, 2.0),
				new PhyscData("이나령", 162, 0.3),
				new PhyscData("유지훈", 171, 0.8),
				new PhyscData("이수재", 173, 1.3),
				new PhyscData("이사재", 174, 1.6),
				new PhyscData("김재", 182, 0.7),
		};
		
		PhyscData[] y = {
				new PhyscData("관상용", 154, 2.0),
				new PhyscData("이사재", 174, 1.6),
				new PhyscData("이수재", 173, 1.3),
				new PhyscData("한병수", 152, 0.9),
				new PhyscData("유지훈", 171, 0.8),
				new PhyscData("김재", 182, 0.7),
				new PhyscData("이나령", 162, 0.3),
			
		};
		
		System.out.print("시력이 몇인 사람을 찾고있나요? : ");
		//int height = stdIn.nextInt();
		//int idx = Arrays.binarySearch(x, new PhyscData("",height,0.0), PhyscData.HEIGHT_ORDER);
		
		double vision = stdIn.nextDouble();
		int idx = Arrays.binarySearch(
				y,
				new PhyscData("",0,vision), 
				PhyscData.VISION_ORDER
				);
		
		
		if( idx < 0 )
			System.out.println("요소가 없습니다.");
		else {
			System.out.println("y["+idx+"]에 있습니다.");
			System.out.println("찾은 데이터:"+y[idx]);
		}
	}
	
}

package aClass;

import java.util.Scanner;

public class forClass {

	static final int VMAX = 21;
	
	static class PhyscData{
		String name;
		int height;
		double vision;
		
		PhyscData(String name, int height, double vision){
			this.name = name;
			this.height = height;
			this.vision = vision;
		}
	}
	
	static double averHeight(PhyscData[] dat) {
		double sum = 0;

		for(int i = 0; i<dat.length; i++)
			sum+=dat[i].height;
		
		return sum/dat.length;
	}
	
	static void distVision(PhyscData[] dat, int[] dist) {
		int i =0 ;
		dist[i] =0;
		
		for(i = 0; i< dat.length; i++)
			if(dat[i].vision >= 0.0 && dat[i].vision <= VMAX / 10.0)
				dist[(int)(dat[i].vision * 10)]++;
	}
	
	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		
		PhyscData[] x = {
				new PhyscData("������5",162, 0.3),
				new PhyscData("������2",172, 0.8),
				new PhyscData("������3",182, 0.5),
				new PhyscData("������4",192, 0.6),
				new PhyscData("������5",142, 0.7),
				new PhyscData("������6",157, 1.2),
				new PhyscData("������7",122, 1.9),
				new PhyscData("������7",122, 1.9),
				new PhyscData("������7",122, 1.9),
		};
		
		int[] vdist = new int[VMAX];
		
		System.out.println("��ü �˻� ����Ʈ");
		System.out.println("�̸�         Ű      �÷�");
		System.out.println("---------------");
		for(int i=0; i< x.length; i++)
			System.out.printf("%-7s%3d%5.1f\n",
								x[i].name, x[i].height, x[i].vision);
		
		System.out.printf("\n��� Ű : %5.1fcm\n", averHeight(x));
		
		distVision(x,vdist);
		
		System.out.println("\n �÷º���");
		for(int i =0; i< VMAX; i++) {
			//System.out.printf("%3.1f~ : %2d��\n", i/10.0 , vdist[i]);
			System.out.print(i/10.0+"~ : ");
			for(int j =0; j<vdist[i]; j++) {
				System.out.print("*");
			}
			System.out.println();
		}
	}
}

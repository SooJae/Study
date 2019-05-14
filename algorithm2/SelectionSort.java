

public class SelectionSort{

    
	public static void main(String[] args){
		int a[] = {4,1,3,10,5,8,6,2,7,9};
        
        selectSort(a);
	}
    
    void selectSort(a){
        int min = a[0];
        for(int i = 1; i<a.length; i++){
            for(int j = i; j<a.length; j++){
                if(min > a[j]){
                 min = a[j];   //a[1]
                }
                swap(a[i-1],a[j]);
            }
            
        }
    }
            

    void swap(int[] x,int[] y){
        int tmp = x;
        x = y;
        y =tmp;
    }
}

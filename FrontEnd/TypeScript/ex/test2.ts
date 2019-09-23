function Component(constructorFn?: Function){

    /*
     *  클래스를 꾸며주는 로직
     *  Componbent Html, CSS
     * 
     * 
     */
    return constructorFn
}

@Component()
class AppComponent {
    
    @Input() height: number;

    
    constructor(){

    }
}
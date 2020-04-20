import { Component, Input, OnInit } from "@angular/core"; // ngOnInit()함수가 정의되어 있는 OnInit 인터페이스를 불러온다.

@Component({
    templateUrl : 'app/components/stars/stars.component.html',
    styles : ['.starrating {color: #d17581;}'],
    selector : 'auction-stars'
})

export default class StarsComponent implements OnInit {
    @Input() count : number = 5; //데이터 바인딩 표현식을 사용해서 부모 컴포넌트에서 count와 rating 변수를 설정할 수 있도록 한다.
    @Input() rating : number = 0;
    stars : boolean[] = []; 

    ngOnInit() { // 부모 컨포넌트에서 전달되는 값으로 stars 변수를 초기화한다.
        for(let i = 1; i<=this.count; i++){
            this.stars.push(i > this.rating); // true와 false로 저장된다.
            //false면 별을 색칠한다. 4.5점일때 0,1,2,3,4는 false가 들어간다.
        }
    }
}
import { Component, ViewEncapsulation } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';

@Component({
	selector : 'auction-application',
	templateUrl : 'app/components/application/application.component.html',
	styleUrls : ['app/components/application/application.component.css'],
	encapsulation : ViewEncapsulation.None
})
export default class ApplicationComponent {
	products : Array<Product> = [];

	constructor (private productService : ProductService) { // 클래스 생성자의 인자로 ProductService를 전달하면 Angular가 적당한 프로바이더를 찾아서 의존성을 주입한다.
		this.products = this.productService.getProducts(); // 상품의 목록을 받아서 products 프로퍼티에 할당한다. 컴포넌트 프로퍼티는 데이터 바인딩을 사용해서 화면에 표시할 수 있다.
	}
}
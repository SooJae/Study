import { Routes, RouterModule } from '@angular/router'; //Routes RouterModule을 불러온다.
import { HomeComponent } from './components/home.component'; // 기본 URL이면 HomeComponent를 렌더링한다.
import { ProductDetailComponent } from './components/product.component'; 

const routes : Routes = [
	{ path : '', component : HomeComponent },			// 기본 URL 뒤에 product 주소가 붙으면 ProductDetailComponent를 렌더링한다.
	{ path : 'product', component : ProductDetailComponent } // 라우터 설정을 모듈 외부로 공개해서 루트 모듈에서 사용할 수 있도록 한다.
];
export const routing = RouterModule.forRoot(routes);


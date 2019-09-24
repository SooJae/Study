import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent},
  { path: 'heroes', component: HeroesComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],

  // 이 배열에 RouterModule을 등록하면 AppModule 범위에 있는 모든 컴포넌트에 라우터와 관련된 디렉티브를 사용할 수 있다.
  exports: [RouterModule]
})
export class AppRoutingModule { }

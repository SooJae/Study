import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from "../mock-heroes";
import { HeroService } from "../hero.service";


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // heroes = HEROES;
  // 관심사의 분리
  heroes : Hero[];

  selectedHero: Hero;
// 이렇게 작성하면 heroService 인자를 클래스 프로퍼티로 선언하면서 HeroService 타입의 의존성 객체가 주입되기를 요청한다는 것을 의미합니다.
// 그러면 Angular가 HeroesComponent를 생성할 때 의존성 주입 시스템이 HeroService의 인스턴스를 찾아서 heroService 라는 인자로 전달할 것입니다.
  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }

  onSelect(hero: Hero)  {
    this.selectedHero = hero;
  }

  // getHeroes(): Observable<Hero[]> {
  //   // this.heroes = this.heroService.getHeroes();
  //   return of(HEROES);
  // }


  // 기존코드
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
}

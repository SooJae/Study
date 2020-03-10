import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {combineLatest, from, fromEvent, interval, Observable, Subject} from "rxjs";
import {map, mapTo, startWith, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, AfterViewInit {
  hero: Hero;

  @ViewChild('go', {static: false})
  public go: ElementRef;

  @ViewChild('back', {static: false})
  public back: ElementRef;
  private go$: Subject<any>;
  private back$: Observable<any>;

  public n: number = 1;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,

  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  ngAfterViewInit() {
    this.go$ = interval(1000)
      .pipe(
        map(v => v)
      );
    this.back$ = fromEvent(this.back.nativeElement, 'click').pipe(
      mapTo('수재'),
    );

    this.back$.pipe(
      switchMap(
        (v) => this.go$,
        (c,v) => {console.log(c,v)},
        ),
    ).subscribe(

    );

    // switchMap 쓰고 tap에다 검색어 저장

    // combineLatest(this.go$, this.back$).pipe(
    //   map(data => console.log(data))
    // ).subscribe();
  }

  clearValue() {
    console.log('안녕');
    this.n = 0;
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }


}

import { Component, OnInit} from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export class counter {
  start : number;
  range : number;
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.less']
})
export class CounterComponent implements OnInit {

  constructor() { }

  counter : counter = {
    start : 0,
    range: 100
  };
  $faster: BehaviorSubject<boolean> = new BehaviorSubject(false);
  $party: BehaviorSubject<boolean> = new BehaviorSubject(false);
  $result: BehaviorSubject<number> = new BehaviorSubject(0);
  $points: BehaviorSubject<number> = new BehaviorSubject(100);
  $start: BehaviorSubject<number> = new BehaviorSubject(0);
  $range: BehaviorSubject<number> = new BehaviorSubject(100);

  percentage: number;
  ranger: number;
  result : number = 0;
  points : number = 100;
  days: number = 5;

  dotsX: Array<number> = [0, 100, 1500, 2500, 3500, 4000, 4400 ,4500, 4800, 4900, 5000, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 5800, 5900, 6000];
  dotsY: Array<number> = [0, 150, 2250, 3900, 6100, 7650, 9210 ,9600, 10980, 11460, 12030, 12710, 13470, 14355, 15355, 16575, 18225, 19975, 21925, 24075, 26425];

  count(start: number, range: number) {
    if (start > 6000) start = 5975;
    if (start < 0 ) start = Math.abs(start);
    this.points = range - start;
    console.log(range, start)
    console.log(Math.ceil(this.approx(this.dotsX, this.dotsY, range)), Math.ceil(this.approx(this.dotsX, this.dotsY, start)))
    this.$result.next(Math.abs(Math.ceil(this.approx(this.dotsX, this.dotsY, range)) - Math.ceil(this.approx(this.dotsX, this.dotsY, start))));
  }

  approx(X:Array<number>, Y:Array<number>, x:number) {
                let max : number = X[0];
                let indexMax : number= 0;
                 for (let i = 0; i<X.length + 1; i++)
                    {
                        if (X[i] <= max && x <= X[i]) {max = X[i]; indexMax = i;}
                    }
                let min: number = X.length + 1;
                let indexMin: number = 0;
                 for (let i = 0; i<X.length + 1; i++)
                    {
                        if (X[i] >= min && x >= X[i]) {min = X[i]; indexMin = i;};
                    }
    let result:number = ((max-x) / (max-min))*Y[indexMin] +((x-min)/(max-min))*Y[indexMax];
    return result;
  }

  ngOnInit() {
    combineLatest(this.$start, this.$range).pipe(
      map(([start, range]) => {
        if  (start > 5900) {
          start = 5900;
          range = 6000;
          this.counter.start = 5900;
        }
        if (start >= this.counter.range) {
          range = start + 100;
        }
        return [start, range];
      })
    ).subscribe(([start, range]) => {
      this.ranger = 100;
      if (start == 5900) {
        this.percentage = 0;
      } else {
        this.percentage = ((range - start - this.ranger)/(6000 - start - this.ranger))*100;
      }
      this.counter.range = range;
      this.count(start, range);
    });
  }
}

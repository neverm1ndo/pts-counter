import { Component, OnInit} from '@angular/core';

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
  result : number = 0;
  points : number = 100;
  dotsX: Array<number> = [0, 100, 1500, 2500, 3500, 4000, 4500, 4800, 4900, 5000, 5100, 5200, 5300, 5400, 5500];
  dotsY: Array<number> = [0, 188, 2820, 4980, 7700, 9440, 11540, 13040, 13654, 14177, 14921, 15752, 16716, 17808, 19120];

  count(start: number, range: number) {
    if (start > 5500) start = 5475;
    if (start < 0 ) start = Math.abs(start);
    this.points = Math.abs(range - start);
    this.result = Math.abs(Math.ceil(this.approx(this.dotsX, this.dotsY, range)) - Math.ceil(this.approx(this.dotsX, this.dotsY, start)));
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
    this.count(this.counter.range, this.counter.start);
  }
}

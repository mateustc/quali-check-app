import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-card-counter',
  templateUrl: './card-counter.component.html',
  styleUrls: ['./card-counter.component.css']
})
export class CardCounterComponent implements OnInit, OnChanges {

  @Input()
  counterName: string;

  @Input()
  counterIcon: string;

  @Input()
  counterValue: string;

  @Input()
  counterIconColor: string;
  _counterIconColor: string;

  @Input()
  counterDetail: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const counterValue: SimpleChange = changes.counterValue;
    this.setStatus(counterValue.currentValue);
  }

  setStatus(counterValue: any){
    if(!counterValue || counterValue === null || counterValue === ''){
      this._counterIconColor = "#bbbece";
      this.counterValue = "-";
    }else{
      this._counterIconColor = this.counterIconColor;
    }
  }

}

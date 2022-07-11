import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-card-meta',
  templateUrl: './card-meta.component.html',
  styleUrls: ['./card-meta.component.css']
})
export class CardMetaComponent implements OnInit, OnChanges {

  @Input()
  metaName: string;

  @Input()
  metaValue: string;

  @Input()
  metaParamValue: string;

  @Input()
  metaIconColor: string;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.setStatus();
  }

  setStatus() {
    if (!this.metaValue || this.metaValue === null || this.metaValue === '' || this.metaValue === '-') {
      this.metaIconColor = "warning";
      this.metaValue = "-";
    } else if (!this.metaParamValue || this.metaParamValue === null || this.metaParamValue === '') {
      this.metaIconColor = "warning";
    } else if (this.metaParamValue >= this.metaValue) {
      this.metaIconColor = "success";
    } else {
      this.metaIconColor = "danger";
    }
  }
}
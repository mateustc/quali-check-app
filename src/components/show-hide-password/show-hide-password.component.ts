import { Component, ContentChild } from '@angular/core';

import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-show-hide-password',
  templateUrl: './show-hide-password.component.html',
  styleUrls: [
    './show-hide-password.component.scss'
  ]
})
export class ShowHidePasswordComponent {
  hide = true;

  @ContentChild(IonInput, {static: true}) input: IonInput;

  constructor() {}

  toggleShow() {
    this.hide = !this.hide;
    if (this.hide) {
      this.input.type = 'password';
    } else {
      this.input.type = 'text';
    }
  }
}

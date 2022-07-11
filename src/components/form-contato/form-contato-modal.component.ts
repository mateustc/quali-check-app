import { Component, Input, OnInit } from '@angular/core';
import { Contato } from '@quali-check/models';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-contato-modal',
  templateUrl: './form-contato-modal.component.html',
})
export class FormContatoModalComponent implements OnInit {

  @Input()
  contatos: Contato[];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss(this.contatos);
  }

  
}

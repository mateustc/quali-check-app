import { Component, Input, OnInit } from '@angular/core';
import { Endereco } from '@quali-check/models';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-endereco-modal',
  templateUrl: './form-endereco-modal.component.html',
})
export class FormEnderecoModalComponent implements OnInit {

  @Input()
  enderecos: Endereco[];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss(this.enderecos);
  }

  
}

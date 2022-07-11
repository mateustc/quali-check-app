import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contato } from '@quali-check/models';
import { NotificationService } from 'shared/notifications/notification.service';
import { CepService } from 'core/cep/cep.service';
import { UsuariosService } from 'core/usuarios/usuarios.service';
import { validateAllFormFields } from 'shared/form/validators';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-contato',
  templateUrl: './form-contato.component.html',
})
export class FormContatoComponent implements OnInit {

  contatosForm: FormGroup;

  @Input()
  contatos: Contato[];

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.buildContatosForm();
  }

  buildContatosForm() {
    this.contatosForm = this.formBuilder.group({
      tipoContato: ['', Validators.compose([Validators.required])],
      valor: ['', Validators.compose([Validators.required])]
    });

  }

  addContato() {
    if (this.contatosForm.valid) {
      const contatoEncontrado = _.find(this.contatos, (contato: Contato) => {
        return this.usuariosService.compareContatos(this.contatosForm.value, contato);
      });
      if (contatoEncontrado) {
        this.notificationService.error("Contato já existe");
      } else {
        this.contatos.push(this.contatosForm.value);
        this.contatosForm.reset();
        this.notificationService.info("Contato adicionado com sucesso");
      }
    } else {
      validateAllFormFields(this.contatosForm);
      this.notificationService.error("Campos inválidos ao adicionar contato");
    }
  }

}

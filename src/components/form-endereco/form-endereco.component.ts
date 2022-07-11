import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Endereco } from '@quali-check/models';
import { NotificationService } from 'shared/notifications/notification.service';
import { CepService } from 'core/cep/cep.service';
import { UsuariosService } from 'core/usuarios/usuarios.service';
import { validateAllFormFields } from 'shared/form/validators';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-endereco',
  templateUrl: './form-endereco.component.html',
})
export class FormEnderecoComponent implements OnInit {

  enderecosForm: FormGroup;

  @Input()
  enderecos: Endereco[];

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private cepService: CepService,
    private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.buildEnderecosForm();
  }

  buildEnderecosForm() {
    this.enderecosForm = this.formBuilder.group({
      tipoEndereco: ['', Validators.compose([Validators.required])],
      logradouro: ['', Validators.compose([Validators.required])],
      complemento: [''],
      bairro: ['', Validators.compose([Validators.required])],
      cidade: ['', Validators.compose([Validators.required])],
      numero: ['', Validators.compose([Validators.required])],
      cep: ['', Validators.compose([Validators.required])],
      uf: ['', Validators.compose([Validators.required])],
    });
  }

  pesquisarCep() {
    const cep = this.enderecosForm.get('cep').value;
    if (cep && cep !== '' && parseInt(cep)) {
      this.cepService.buscaEndereco(cep).subscribe(
        (enderecoViaCep: any) => {
          if (enderecoViaCep && !enderecoViaCep.erro) {
            const endereco = this.buildEnderecoByViaCep(enderecoViaCep);
            this.populateEnderecoForm(endereco);
          } else {
            this.notificationService.error(`Nenhum endereço encontrado para o CEP ${cep}`);
            this.enderecosForm.reset();
          }
        },
        error => {
          this.notificationService.error(`Erro ao pesquisar CEP ${cep}`);
        }
      )
    } else {
      this.notificationService.error(`CEP ${cep} inválido`);
    }
  }

  populateEnderecoForm(endereco: Endereco) {
    this.enderecosForm.patchValue(endereco);
  }

  buildEnderecoByViaCep(enderecoViaCep: any): Endereco {
    let endereco = { ...{} as Endereco, ...enderecoViaCep };
    endereco.cidade = enderecoViaCep.localidade;
    endereco.cep = enderecoViaCep.cep.replace('-', '');
    return endereco;
  }

  addEndereco() {
    if (this.enderecosForm.valid) {
      const enderecoEncontrado = _.find(this.enderecos, (endereco: Endereco) => {
        return this.usuariosService.compareEnderecos(this.enderecosForm.value, endereco);
      })
      if (enderecoEncontrado) {
        this.notificationService.error("Endereço já adicionado");
      } else {
        this.enderecos.push(this.enderecosForm.value);
        this.enderecosForm.reset();
        this.notificationService.info("Endereço adicionado com sucesso");  
      }
    } else {
      validateAllFormFields(this.enderecosForm);
      this.notificationService.error("Campos inválidos ao adicionar endereço");
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'core/cep/cep.service';
import { Contato, Endereco, Usuario } from '@quali-check/models';
import { NotificationService } from 'shared/notifications/notification.service';
import { UsuariosService } from 'core/usuarios/usuarios.service';
import { ValidatorsRules, validateAllFormFields } from 'shared/form/validators';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import * as _ from 'lodash';
import { FormEnderecoModalComponent } from 'components/form-endereco/form-endereco-modal.component';
import { FormContatoModalComponent } from 'components/form-contato/form-contato-modal.component';

@Component({
  template: ''
})
export class AbstractUsuarioPage implements OnInit {

  dadosGeraisForm: FormGroup;
  usuario: Usuario;
  fotoUsuario = 'assets/images/user.png';

  enderecos = [];
  contatos = [];

  constructor(
    protected navCtrl: NavController,
    protected activatedRoute: ActivatedRoute,
    protected notificationService: NotificationService,
    protected formBuilder: FormBuilder,
    protected usuariosService: UsuariosService,
    protected modalController: ModalController) { }


  ngOnInit() {
    this.buildFormDadosGerais();
    
    this.carregarDados();
  }

  carregarDados() {
    this.usuario = this.activatedRoute.snapshot.data['usuario'];
    if (this.usuario) {
      this.dadosGeraisForm.patchValue(this.usuario);
      this.fotoUsuario = this.usuario.foto;
      this.enderecos = this.usuario.enderecos;
      this.contatos = this.usuario.contatos;
      this.configureCampoSenha();
    }
  }

  configureCampoSenha() {
    this.dadosGeraisForm.controls['senha'].reset();
    this.dadosGeraisForm.controls['senha'].disable();
  }

  buildFormDadosGerais() {
    this.dadosGeraisForm = this.formBuilder.group({
      _id: [null],
      perfil: ['', Validators.compose([Validators.required])],
      nome: ['', Validators.compose([Validators.required])],
      ativo: [false, Validators.compose([Validators.required])],
      email: ['', ValidatorsRules.EMAIL],
      senha: ['', ValidatorsRules.SENHA],
      dataNascimento: ['', Validators.compose([Validators.required])],
      sexo: ['', Validators.compose([Validators.required])],
      foto: [this.fotoUsuario],
      profissao: [''],
      bio: ['']
    });

  }

  async abrirFormEndereco() {
    const modal = await this.modalController.create({
      component: FormEnderecoModalComponent,
      componentProps: {
        'enderecos': this.enderecos
      }
    });
    return await modal.present();
  }

  async abrirFormContato() {
    const modal = await this.modalController.create({
      component: FormContatoModalComponent,
      componentProps: {
        'contatos': this.contatos
      }
    });
    return await modal.present();
  }

  deleteEndereco(index) {
    this.enderecos.splice(index, 1);
  }

  deleteContato(index) {
    this.contatos.splice(index, 1);
  }

  salvarUsuario() {

    if (!this.dadosGeraisForm.valid) {
      validateAllFormFields(this.dadosGeraisForm);
      this.notificationService.error('Dados gerais do usuário estão inválidos');
    } else {
      const usuarioDto = this.dadosGeraisForm.value;
      usuarioDto.enderecos = this.enderecos;
      usuarioDto.contatos = this.contatos;

      if (!usuarioDto._id) {
        this.usuariosService.criarUsuario(usuarioDto).subscribe(
          data => {
            this.posSalvarUsuario();
          }
        );
      } else {
        this.usuariosService.atualizarUsuario(usuarioDto._id, usuarioDto).subscribe(
          data => {
            this.posSalvarUsuario();
          }
        );
      }
    }
  }

  posSalvarUsuario() {
    this.navCtrl.navigateRoot(['/usuarios']);
  }

}
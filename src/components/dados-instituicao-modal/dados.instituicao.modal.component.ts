import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { NivelModalComponent } from 'components/nivel-modal/nivel.modal.component';
import { AgendamentosService } from 'core/agendamentos/agendamentos.service';
import { InstituicoesService } from 'core/instituicoes/instituicoes.service';
import { NotificationService } from 'shared/notifications/notification.service';

@Component({
  selector: 'app-dados-instituicao-modal',
  templateUrl: './dados.instituicao.modal.component.html',
})
export class DadosInstituicaoModalComponent implements OnInit {

  form: FormGroup;
  agendamento: any;
  niveis: any[];

  constructor(private modalController: ModalController,
              private instituicoesService: InstituicoesService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private agendamentosService: AgendamentosService,
              params: NavParams) {
    this.agendamento = params.get('agendamento');
  }

  ngOnInit() {
    setTimeout(() => {
      this.atualizarAgendamento();
    }, 0);
    this.carregarInstituicao();
    this.configForm();
  }

  configForm() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      nomeDiretorGeral: [''],
      servico: [''],
      endereco: [''],
      municipio: [''],
      telefone: ['']
    });
  }

  async atualizarAgendamento() {
    this.agendamento.status = 'EM VISITA';
    this.agendamentosService.atualizarAgendamento(this.agendamento._id, this.agendamento).subscribe(
      data => {
        
      });
  }

  async carregarInstituicao() {
    let resource = "";
    let id = null;
    if (this.agendamento) {
      if (this.agendamento.redeCredenciada) {
        resource = "redes-credenciadas";
        id = this.agendamento.redeCredenciada._id;
      } else if (this.agendamento.redePropria) {
        resource = "redes-proprias";
        id = this.agendamento.redePropria._id;
      }
    }
    
    this.instituicoesService.obterInstituicaoPorId(resource, id).subscribe(
      data => {
        this.form.patchValue(data);
      }
    )
  }

  async salvar() {
    if (!this.form.valid) {
      this.notificationService.error("Não é possível atualizar. Por favor, verifique se os campos estão válidos.");  
      return;
    }

    let resource = "";
    let id = null;
    if (this.agendamento) {
      if (this.agendamento.redeCredenciada) {
        resource = "redes-credenciadas";
        id = this.agendamento.redeCredenciada._id;
      } else if (this.agendamento.redePropria) {
        resource = "redes-proprias";
        id = this.agendamento.redePropria._id;
      }
    }
    this.instituicoesService.atualizarInstituicao(resource, id, this.form.value).subscribe(
      data => {
        this.form.patchValue(data);
        this.notificationService.info("Dados da instituição atualizados com sucesso");  
      }
    )
  }

  async abrirNiveis() {
    const modal = await this.modalController.create({
      component: NivelModalComponent,
      componentProps: {
        agendamento: this.agendamento
      }
    });
    return await modal.present();
  }

  close(){
    this.modalController.dismiss();
  }
}

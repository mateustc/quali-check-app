import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { AgendamentoPage } from './agendamento.page';
import { AuthResolve } from 'core/auth/auth.resolve';
import { AgendamentoInfoModalPageModule } from 'components/agendamento-info-modal/agendamento.info.modal.module';
import { NivelModalPageModule } from 'components/nivel-modal/nivel.modal.module';
import { DadosInstituicaoModalPageModule } from 'components/dados-instituicao-modal/dados.instituicao.modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AgendamentoPage,
        resolve: {
          auth: AuthResolve
        }
      }
    ]),
    ComponentsModule,
    AgendamentoInfoModalPageModule,
    DadosInstituicaoModalPageModule
  ],
  declarations: [AgendamentoPage]
})
export class AgendamentoPageModule {}

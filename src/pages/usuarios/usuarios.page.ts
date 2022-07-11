import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { Usuario } from '../../_lib/models';
import { UsuariosService } from '../../core/usuarios/usuarios.service';
import { PesquisaDto } from '@quali-check/dtos/pesquisa.dto';

@Component({
  selector: 'app-usuarios',
  templateUrl: 'usuarios.page.html',
  styleUrls: ['usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  usuarios: Usuario[];

  totalRegistros: number;

  pesquisaDto: PesquisaDto;

  constructor(
    private navCtrl: NavController,
    private usuariosService: UsuariosService
  ) { }

  ionViewWillEnter() {
  }

  ngOnInit() {
    this.iniciarLista();
    this.criarPesquisaDto();
    this.infiniteScroll.position = "bottom";
    this.pesquisarUsuariosScrollPagination();
  }

  cadUsuario() {
    this.navCtrl.navigateRoot('/usuario');
  }

  private iniciarLista() {
    this.totalRegistros = 0;
    this.usuarios = [];
  }

  private criarPesquisaDto(): void {
    this.pesquisaDto = {} as PesquisaDto;
    this.pesquisaDto.length = 20;
    this.pesquisaDto.start = 0;
    this.pesquisaDto.search = {
      value: ''
    }
  }

  pesquisarUsuariosScrollPagination(event?: any): void {
    this.usuariosService.pesquisarUsuarios(this.pesquisaDto).subscribe(
      resultadoPesquisa => {
        this.handlerScrollPagination(
          resultadoPesquisa.recordsTotal,
          resultadoPesquisa.data,
          event);
      }
    )
  }

  handlerScrollPagination(totalRegistros: number, usuarios: Usuario[], event?: any): void {
    this.usuarios = this.usuarios.concat(usuarios);
    this.totalRegistros = totalRegistros;
    if (event) {
      event.target.complete();
      if (this.usuarios.length === totalRegistros) {
        event.target.disabled = true;
      }
    }
  }

  loadData(event) {
    this.pesquisaDto.start = (this.pesquisaDto.start + 1) * this.pesquisaDto.length;
    this.pesquisarUsuariosScrollPagination(event);
  }

}
import { Component, ViewChild, OnInit } from '@angular/core';
import { UsuariosService } from 'core/usuarios/usuarios.service';
import { Observable } from 'rxjs';
import { Kpi, Usuario } from '@quali-check/models';
import { Meta } from '@quali-check/models/meta';
import { TemporalChart } from './charts/temporal-chart';
import { KpiTipos } from '@quali-check/domains';
import { FiltrosDashboard } from './form/filtros-dashboard';
import { KpisService } from 'core/kpis/kpis.service';
import { KpiAgregacaoDto, UsuarioMedidas } from '@quali-check/dtos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('freqPassosCanvas', { static: true }) freqPassosCanvas;
  @ViewChild('freqFreqCardCanvas', { static: true }) freqFreqCardCanvas;
  @ViewChild('freqDistanciaCanvas', { static: true }) freqDistanciaCanvas;
  @ViewChild('freqCaloriasCanvas', { static: true }) freqCaloriasCanvas;

  chartFreqCard: TemporalChart;
  chartFreqPassos: TemporalChart;
  chartFreqDistancia: TemporalChart;
  chartFreqCalorias: TemporalChart;

  filtros = new FiltrosDashboard();

  maxFreqCardiaca: KpiAgregacaoDto;
  minFreqCardiaca: KpiAgregacaoDto;

  totalPassos: KpiAgregacaoDto;
  passosPorHora: KpiAgregacaoDto;

  totalDistancia: KpiAgregacaoDto;
  distanciaPorHora: KpiAgregacaoDto;

  totalCalorias: KpiAgregacaoDto;
  caloriasPorHora: KpiAgregacaoDto;

  usuario: Usuario;
  usuarioMedidas: UsuarioMedidas;
  id: string;
  
  metaFreqCardiaca: Meta;
  metaTotalDistancia: Meta;
  metaTotalCalorias: Meta;
  metaTotalPassos: Meta;

  constructor(
    private activatedRoute: ActivatedRoute,
    private kpisService: KpisService,
    private usuariosService: UsuariosService) {
  }

  ionViewWillEnter() {
    this.usuario = this.activatedRoute.snapshot.data['usuario'];
    this.createDashboardWidgets();
    this.obterUsuario(this.usuario._id);
    this.obterMetasAtivas(this.usuario._id);
    this.carregarDadosDashboard(this.filtros);
  }

  ngOnInit() {
    
  }

  private createDashboardWidgets() {
    this.createChartFreqCard();
    this.createChartFreqPassos();
    this.createChartFreqDistancia();
    this.createChartFreqCalorias();
  }

  carregarDadosDashboard(filtros: FiltrosDashboard) {
    this.obterDadosFreqCardiaca(filtros);
    this.obterDadosFreqPassos(filtros);
    this.obterDadosFreqDistancia(filtros);
    this.obterDadosFreqCalorias(filtros);
  }

  createChartFreqCard() {
    this.chartFreqCard = new TemporalChart(this.freqFreqCardCanvas, KpiTipos.FREQ_CARDIACA.label, 'line', false, "#d4252582", true);
  }

  createChartFreqPassos() {
    this.chartFreqPassos = new TemporalChart(this.freqPassosCanvas, KpiTipos.TOTAL_PASSOS.label, 'line', false, "#9393fc96", true);
  }

  createChartFreqDistancia() {
    this.chartFreqDistancia = new TemporalChart(this.freqDistanciaCanvas, KpiTipos.TOTAL_DISTANCIA.label, 'line', false, "#0080005e", true);
  }

  createChartFreqCalorias() {
    this.chartFreqCalorias = new TemporalChart(this.freqCaloriasCanvas, KpiTipos.TOTAL_CALORIAS.label, 'line', false, "#f9d696ba", true);
  }

  obterDadosFreqCardiaca(filtros: FiltrosDashboard) {
    this.obterDadosKpi(this.usuario._id, KpiTipos.FREQ_CARDIACA.id, filtros).subscribe(
      data => {
        this.chartFreqCard.setDataKpi(data).update();
        this.obterKpisAgregacaoFreqCardiaca(data);
      }
    )
  }

  obterKpisAgregacaoFreqCardiaca(kpis: Kpi[]) {
    this.maxFreqCardiaca = this.kpisService.getMaxValue(kpis);
    this.minFreqCardiaca = this.kpisService.getMinValue(kpis);
  }

  obterDadosFreqPassos(filtros: FiltrosDashboard) {
    this.obterDadosKpi(this.usuario._id, KpiTipos.TOTAL_PASSOS.id, filtros).subscribe(
      data => {
        this.chartFreqPassos.setDataKpi(data).update();
        this.obterKpisAgregacaoFreqPassos(data);
      }
    )
  }

  obterKpisAgregacaoFreqPassos(kpis: Kpi[]) {
    this.totalPassos = this.kpisService.getMaxValue(kpis);
    this.passosPorHora = this.kpisService.getRelacaoTotalHora(kpis);
  }

  obterDadosFreqDistancia(filtros: FiltrosDashboard) {
    this.obterDadosKpi(this.usuario._id, KpiTipos.TOTAL_DISTANCIA.id, filtros).subscribe(
      data => {
        this.chartFreqDistancia.setDataKpi(data).update();
        this.obterKpisAgregacaoDistancia(data);
      }
    )
  }

  obterKpisAgregacaoDistancia(kpis: Kpi[]) {
    this.totalDistancia = this.kpisService.getMaxValue(kpis);
    this.distanciaPorHora = this.kpisService.getRelacaoTotalHora(kpis);
  }

  obterDadosFreqCalorias(filtros: FiltrosDashboard) {
    this.obterDadosKpi(this.usuario._id, KpiTipos.TOTAL_CALORIAS.id, filtros).subscribe(
      data => {
        this.chartFreqCalorias.setDataKpi(data).update();
        this.obterKpisAgregacaoCalorias(data);
      }
    )
  }

  obterKpisAgregacaoCalorias(kpis: Kpi[]) {
    this.totalCalorias = this.kpisService.getMaxValue(kpis);
    this.caloriasPorHora = this.kpisService.getRelacaoTotalHora(kpis);
  }

  obterDadosKpi(id: string, tipoKpi: string, filtros: FiltrosDashboard): Observable<Kpi[]> {
    return this.usuariosService.obterKpisPorData(id, tipoKpi, filtros.dataInicialStr);
  }

  obterUsuario(id: string) {
    this.usuariosService.obterPorId(id).subscribe(
      usuario => {
        if (usuario) {
          this.usuario = usuario
          this.carregarDadosDashboard(this.filtros);
          this.carregarUsuarioMedidas(usuario);
        }
      }
    )
  }

  carregarUsuarioMedidas(usuario: Usuario) {
    this.usuarioMedidas = this.usuariosService.obterMedidasUsuario(usuario);
  }

  selecionaData(value) {
    this.filtros.dataInicialStr = value;
    this.carregarDadosDashboard(this.filtros);
  }

  obterMetasAtivas(idUsuario: string) {
    this.obterMetaAtivaFreqCardiaca(idUsuario);
    this.obterMetaAtivaTotalDistancia(idUsuario);
    this.obterMetaAtivaTotalPassos(idUsuario);
    this.obterMetaAtivaTotalCalorias(idUsuario);
  }

  obterMetaAtivaFreqCardiaca(idUsuario: string) {
    this.usuariosService.obterMetaAtivaPorTipoKpi(idUsuario, KpiTipos.FREQ_CARDIACA.id).subscribe(
      data => {
        this.metaFreqCardiaca = data;
    });
  }

  obterMetaAtivaTotalPassos(idUsuario: string) {
    this.usuariosService.obterMetaAtivaPorTipoKpi(idUsuario, KpiTipos.TOTAL_PASSOS.id).subscribe(
      data => {
        this.metaTotalPassos = data;
    });
  }

  obterMetaAtivaTotalDistancia(idUsuario: string) {
    this.usuariosService.obterMetaAtivaPorTipoKpi(idUsuario, KpiTipos.TOTAL_DISTANCIA.id).subscribe(
      data => {
        this.metaTotalDistancia = data;
    });
  }

  obterMetaAtivaTotalCalorias(idUsuario: string) {
    this.usuariosService.obterMetaAtivaPorTipoKpi(idUsuario, KpiTipos.TOTAL_CALORIAS.id).subscribe(
      data => {
        this.metaTotalCalorias = data;
    });
  }
}
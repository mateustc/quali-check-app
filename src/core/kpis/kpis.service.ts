import { Injectable } from '@angular/core';
import { KpiAgregacaoDto } from '@quali-check/dtos/kpi-agregacao.dto';
import { Kpi } from '@quali-check/models';
import * as _ from "lodash";
import { formatDate, dateDiff } from '@quali-check/utils/date-utils';

@Injectable({
  providedIn: 'root'
})
export class KpisService {

  constructor() { }

  private createKpiAgregacaoDto(): KpiAgregacaoDto {
    let kpiAgregacaoDto = {} as KpiAgregacaoDto;
    kpiAgregacaoDto.valor = null;
    kpiAgregacaoDto.dataColeta = null;
    return kpiAgregacaoDto;
  }

  private populateKpiAgregacaoDto(kpiAgregacaoDto: KpiAgregacaoDto, kpi: Kpi): KpiAgregacaoDto {
    kpiAgregacaoDto.valor = kpi.valor;
    kpiAgregacaoDto.dataColeta = formatDate(kpi.dataColeta, 'YYYY-MM-DD HH:mm:ss', true);
    return kpiAgregacaoDto;
  }

  getMaxValue(kpis: Kpi[]): KpiAgregacaoDto {
    let kpiAgregacaoDto: KpiAgregacaoDto = this.createKpiAgregacaoDto();
    if (kpis) {
      const maxValue: Kpi = _.maxBy(kpis, 'valor');
      if(maxValue){
        this.populateKpiAgregacaoDto(kpiAgregacaoDto,maxValue);
      }
    }
    return kpiAgregacaoDto;
  }

  getMinValue(kpis: Kpi[]): KpiAgregacaoDto {
    let kpiAgregacaoDto: KpiAgregacaoDto = this.createKpiAgregacaoDto();
    if (kpis) {
      const minValue: Kpi = _.minBy(kpis, 'valor');
      if(minValue){
        this.populateKpiAgregacaoDto(kpiAgregacaoDto, minValue);
      }
    }
    return kpiAgregacaoDto;
  }

  getAvgValue(kpis: Kpi[]): KpiAgregacaoDto {
    let kpiAgregacaoDto: KpiAgregacaoDto = this.createKpiAgregacaoDto();
    if (kpis) {
      const avgValue: Kpi = _.meanBy(kpis, 'valor');
      if(avgValue){
        this.populateKpiAgregacaoDto(kpiAgregacaoDto, avgValue);
      }
    }
    return kpiAgregacaoDto;
  }
  
  getRelacaoTotalHora(kpis: Kpi[]): KpiAgregacaoDto {
    let kpiAgregacaoDto: KpiAgregacaoDto = this.createKpiAgregacaoDto();
    if (kpis) {
      const maxKpi: Kpi = _.maxBy(kpis, 'valor');
      if(maxKpi){
        const tempoTotalHoras:number = dateDiff(kpis[0].dataColeta, kpis[kpis.length-1].dataColeta, "hours");
        if(tempoTotalHoras === 0){
          kpiAgregacaoDto.valor = maxKpi.valor;   
        }else{
          kpiAgregacaoDto.valor = maxKpi.valor/tempoTotalHoras;
        }
      }
    }
    return kpiAgregacaoDto;
  }
}

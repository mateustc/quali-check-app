import { Chart } from 'chart.js';
import { Kpi } from '@quali-check/models';
import { DateUtcStr, formatDate, momentUTC } from '@quali-check/utils/date-utils';
import * as moment from 'moment';

export class TemporalChart {

    private chartInstance: any;
    private htmlChartRef: any;
    private options: {};
    private calculaFreq: boolean;
    private lineColor;

    title: string;
    type: string;
    fill: boolean;

    constructor(htmlChartRef: any, title: string, type: string, calculaFreq: boolean, lineColor: string, fill: boolean) {
        this.htmlChartRef = htmlChartRef;
        this.calculaFreq = calculaFreq;
        this.lineColor = lineColor;
        this.type = type;
        this.title = title;
        this.fill = fill;
        this.options = this.createDefaultOptions(title, type);
        this.buidChart();
        // this.configurePoint();
    }

    private createDefaultOptions(title: string, type: string) {
        return {
            type: type,
            data: {
                labels:[],
                datasets: [{
                    label: title,
                    data: [],
                    backgroundColor: this.lineColor,
                    borderColor: this.lineColor,
                    borderWidth: 1,
                    fill: this.fill
                }]
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        title: (tooltipItem) => {
                            const data: DateUtcStr = new DateUtcStr(tooltipItem[0].xLabel);
                            return `DATA: ${data.day}/${data.month}/${data.year} ${data.hour}:${data.minute}`;
                        },
                        label: (tooltipItem) => {
                            return `${tooltipItem.value}`;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'hour',
                            parser: 'YYYY-MM-DDTHH:mm:ss[Z]',
                            displayFormats: {
                                hour: 'HH'
                            }
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        }
    }

    configurePoint() {
        Chart.defaults.global.elements.point.pointStyle = 'line';
    }

    buidChart() {
        this.chartInstance = new Chart(this.htmlChartRef.nativeElement, this.options);
    }

    setDataKpi(dadosKpi: Kpi[]) {
        const labels = [];
        const values = [];
        dadosKpi.forEach((element: Kpi, index) => {
            const valorEixoX = element.dataColeta;
            labels.push(valorEixoX);
            if (this.calculaFreq && index > 0) {
                let valor = element.valor - values[index - 1];
                values.push(valor);
            }
            values.push(element.valor);
        });

        this.applyDataByType(labels, values);
        return this;
    }

    applyDataByType(labels: Date[], values: any[]) {
        if (this.isLineChart() || this.isPieChart()) {
            this.setDataLineChart(labels, values);
        } else if (this.isBarChart()) {
            this.setDataBarChart(labels, values);
        }
    }


    isLineChart(): boolean {
        return this.type.toLowerCase() === 'line';
    }

    isPieChart(): boolean {
        return this.type.toLowerCase() === 'pie';
    }

    isBarChart(): boolean {
        return this.type.toLowerCase() === 'bar';
    }

    setDataLineChart(labels: Date[], values: any[]): TemporalChart {
        this.chartInstance.data.labels = labels;
        this.chartInstance.data.datasets[0].data = values;
        return this;
    }

    setDataBarChart(labels: Date[], values: any[]): TemporalChart {
        if (labels && labels.length > 0) {
            const _labels = [];
            const _values = [];
            labels.forEach((label, index) => {
                _labels.push(moment(label).format('HH:mm'))
                _values.push(values[index])
            });
            this.setDataLineChart(_labels, _values);

        }
        return this;
    }

    update(): TemporalChart {
        this.chartInstance.update();
        return this;
    }
}
export class FiltrosDashboard {

    dataInicialStr: string;
    dataFinalStr: string;

    constructor() {
        this.dataInicialStr = new Date().toISOString();
        this.dataFinalStr = new Date().toISOString();
    }
}
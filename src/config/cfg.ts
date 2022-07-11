import { environment } from '../environments/environment';

export const CFG = {

    production: environment.production,

    base_uri: environment.base_uri,

    build_uri: function (resource_uri: string) {
        return `${this.base_uri}${resource_uri}`
    },

    url_login: '/login',
    url_init: '/home',

    menu_itens: [
        {
            title: 'Início',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Agendamentos',
            url: '/agendamento',
            icon: 'md-calendar'
        }
    ]
}
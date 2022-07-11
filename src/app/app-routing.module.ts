import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'core/auth/auth.guard';
import { MainLayoutComponent } from 'components/main-layout/main-layout.component';
import { AuthLayoutComponent } from 'components/auth-layout/auth-layout.component';
import { UsuarioResolve } from 'core/usuarios/usuario.resolve';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../pages/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () =>
          import('../pages/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'recuperar-senha',
        loadChildren: () =>
          import('../pages/recuperar-senha/recuperar.senha.module').then(m => m.RecuperarSenhaPageModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [
      AuthGuard
    ],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
        canActivate: [
          AuthGuard
        ],
      },
      {
        path: 'home',
        canActivate: [
          AuthGuard
        ],
        loadChildren: () =>
          import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'agendamento',
        canActivate: [
          AuthGuard
        ],
        loadChildren: () =>
          import('../pages/agendamento/agendamento.module').then(m => m.AgendamentoPageModule)
      },
      {
        path: 'dashboard/:id',
        resolve: {
          usuario: UsuarioResolve
        },
        canActivate: [
          AuthGuard
        ],
        loadChildren: () =>
          import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      }
    ]
  },
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

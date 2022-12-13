import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMenuPage } from './auth-menu/auth-menu.page.component';
import { AuthPage } from './auth.page.component';
import { ForgotPage } from './forgot/forgot.page.component';
import { LoginPage } from './login/login.page.component';
import { RegisterPage } from './register/register.page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'login',
        component: AuthMenuPage,
      },
      {
        path: 'login-manager',
        component: LoginPage,
      },
      {
        path: 'login-agent',
        component: LoginPage,
      },
      {
        path: 'login-resident',
        component: LoginPage,
      },
      {
        path: 'register-manager',
        component: RegisterPage,
      },
      {
        path: 'register-agent',
        component: RegisterPage,
      },
      {
        path: 'register-resident',
        component: RegisterPage,
      },
      {
        path: 'forgot',
        component: ForgotPage,
      },
      {
        path: '**',
        redirectTo: 'login',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPageRoutingModule {}
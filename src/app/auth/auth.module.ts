import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AuthPage } from './auth.page.component';
import { AuthPageRoutingModule } from './auth.routing.module';
import { LoginPage } from './login/login.page.component';
import { MaterialModule } from '../material.module';
import { RegisterPage } from './register/register.page.component';
import { ForgotPage } from './forgot/forgot.page.component';
import { TermsModal } from '../shared/modals/terms/terms.component';
import { PrivacyModal } from '../shared/modals/privacy/privacy.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
    MaterialModule,
    NgxCaptchaModule,
    NgxMaskModule.forChild()
  ],
  declarations: [
    AuthPage,
    LoginPage,
    RegisterPage,
    ForgotPage,
    TermsModal,
    PrivacyModal
  ]
})
export class AuthPageModule {}

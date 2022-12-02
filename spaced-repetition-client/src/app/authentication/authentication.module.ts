import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordRequestComponent } from './components/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MessageViewComponent } from './components/message-view/message-view.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordRequestComponent,
    ResetPasswordComponent,
    MessageViewComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      extend: true
    })
  ]
})
export class AuthenticationModule { }

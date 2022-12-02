import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MessageViewComponent } from './components/message-view/message-view.component';
import { ResetPasswordRequestComponent } from './components/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forgot-password',
    children: [
      {
        path: '',
        component: ResetPasswordRequestComponent
      },
      {
        path: ':token',
        component: ResetPasswordComponent
      }
    ]
  },
  {
    path: 'message',
        component: MessageViewComponent
  },
  {
    path: '**',
    redirectTo:'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }

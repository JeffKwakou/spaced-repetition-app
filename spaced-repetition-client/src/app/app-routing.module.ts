import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { FlashcardListComponent } from './flashcards/flashcard-list/flashcard-list.component';
import { FolderListComponent } from './folders/folder-list/folder-list.component';
import { AuthRoutesGuard } from './guards/auth-routes.guard';
import { AuthGuard } from './guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecoverPasswordComponent } from './reset/recover-password/recover-password.component';
import { ResetPasswordComponent } from './reset/reset-password/reset-password.component';
import { SessionComponent } from './revision/session/session.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthRoutesGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthRoutesGuard]
  },
  {
    path: 'reset',
    component: RecoverPasswordComponent,
    canActivate: [AuthRoutesGuard]
  },
  {
    path: 'reset/:token',
    component: ResetPasswordComponent,
    canActivate: [AuthRoutesGuard]
  },
  {
    path: 'folders',
    component: FolderListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'flashcards/:folderid',
    component: FlashcardListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'revision/:folderid',
    component: SessionComponent,
    canActivate: [AuthGuard]
  },
  // Default routes
  {
    path: '**',
    redirectTo:'home', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

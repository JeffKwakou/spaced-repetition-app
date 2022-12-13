import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutesGuard } from './shared/guards/auth-routes.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
    canActivate: [AuthRoutesGuard],
    title: "Authentication | RepeatAgain"
  },
  {
    path: 'folders',
    loadChildren: () => import('./folders/folders.module').then((m) => m.FoldersModule),
    canActivate: [AuthGuard],
    title: "My folders | RepeatAgain"
  },
  {
    path: 'flashcards/:folderid',
    loadChildren: () => import('./flashcards/flashcards.module').then((m) => m.FlashcardsModule),
    canActivate: [AuthGuard],
    title: "My cards | RepeatAgain"
  },
  {
    path: 'revision',
    loadChildren: () => import('./revision/revision.module').then((m) => m.RevisionModule),
    canActivate: [AuthGuard],
    title: "Session of revision | RepeatAgain"
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
    title: 'Settings | RepeatAgain'
  },
  {
    path: '**',
    redirectTo:'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

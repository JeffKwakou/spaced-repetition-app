import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardListComponent } from './flashcards/components/flashcard-list/flashcard-list.component';
import { AuthRoutesGuard } from './shared/guards/auth-routes.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
    canActivate: [AuthRoutesGuard]
  },
  {
    path: 'folders',
    loadChildren: () => import('./folders/folders.module').then((m) => m.FoldersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'flashcards/:folderid',
    loadChildren: () => import('./flashcards/flashcards.module').then((m) => m.FlashcardsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'revision',
    loadChildren: () => import('./revision/revision.module').then((m) => m.RevisionModule),
    canActivate: [AuthGuard]
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilCustomComponent } from './components/profil-custom/profil-custom.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile-info',
        pathMatch: 'full'
      },
      {
        path: 'profile-info',
        component: ProfileInfoComponent,
      },
      {
        path: 'profile-custom',
        component: ProfilCustomComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'profile-info'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsComponent } from './settings.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfilCustomComponent } from './components/profil-custom/profil-custom.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ProfileInfoComponent,
    ProfilCustomComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      extend: true
    })
  ]
})
export class SettingsModule { }

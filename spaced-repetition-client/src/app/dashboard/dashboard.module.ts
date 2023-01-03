import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { ChartCardByFoldersComponent } from './components/chart-card-by-folders/chart-card-by-folders.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartRevisionTypePercentageComponent } from './components/chart-revision-type-percentage/chart-revision-type-percentage.component';
import { ChartAnswerPercentageComponent } from './components/chart-answer-percentage/chart-answer-percentage.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ChartCardByFoldersComponent,
    ChartRevisionTypePercentageComponent,
    ChartAnswerPercentageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgChartsModule,
    TranslateModule.forChild({
      extend: true
    })
  ]
})
export class DashboardModule { }

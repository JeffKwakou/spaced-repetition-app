import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-chart-answer-percentage',
  templateUrl: './chart-answer-percentage.component.html',
  styleUrls: ['./chart-answer-percentage.component.scss']
})
export class ChartAnswerPercentageComponent implements OnInit {
  public chartLabels: string[] = [];

  public chartDatasets: ChartConfiguration<'pie'>['data']['datasets'] = [];

  public chartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    aspectRatio: 1|1,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    // TODO: Create response model
    this.apiService.getAnswerPercentage().subscribe((response: any) => {
      this.setChartLabels(response);
      this.setChartsets(response);
    });
  }

  private setChartLabels(response: any): void {
    this.chartLabels = response.body.map((item:any) => item.answerType);
  }

  private setChartsets(response: any): void {
    this.chartDatasets = [{
      data: response.body.map((item:any) => item.percentage),
      label: 'Percentage'
    }];
  }

}

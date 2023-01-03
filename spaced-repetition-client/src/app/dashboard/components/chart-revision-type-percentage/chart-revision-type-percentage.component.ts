import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-chart-revision-type-percentage',
  templateUrl: './chart-revision-type-percentage.component.html',
  styleUrls: ['./chart-revision-type-percentage.component.scss']
})
export class ChartRevisionTypePercentageComponent implements OnInit {
  public chartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];

  public chartDatasets: ChartConfiguration<'pie'>['data']['datasets'] = [
      {
        data: [ 25, 60, 15 ],
        label: 'Series A'
      }
    ];

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
    this.apiService.getRevisionTypePercentage().subscribe((response: any) => {
      this.setChartLabels(response);
      this.setChartsets(response);
    });
  }

  private setChartLabels(response: any): void {
    this.chartLabels = response.body.map((item:any) => item.revisionType);
  }

  private setChartsets(response: any): void {
    this.chartDatasets = [{
      data: response.body.map((item:any) => item.percentage),
      label: 'Percentage'
    }];
  }
}

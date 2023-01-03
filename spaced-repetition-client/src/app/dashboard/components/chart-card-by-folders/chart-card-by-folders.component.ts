import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-chart-card-by-folders',
  templateUrl: './chart-card-by-folders.component.html',
  styleUrls: ['./chart-card-by-folders.component.scss']
})
export class ChartCardByFoldersComponent implements OnInit {
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
    this.apiService.getDistributionCardByFolder().subscribe((response: any) => {
      this.setChartLabels(response);
      this.setChartsets(response);
    });
  }

  private setChartLabels(response: any): void {
    this.chartLabels = response.body.map((item:any) => item.folderName);
  }

  private setChartsets(response: any): void {
    this.chartDatasets = [{
      data: response.body.map((item:any) => item.percentage),
      label: 'Percentage'
    }];
  }

}

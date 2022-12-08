import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterFolderValue } from 'src/app/shared/enum/filters';
import { Folder } from 'src/app/shared/models/Folder';
import { ApiService } from 'src/app/shared/services/api.service';
import { AddFolderComponent } from '../add-folder/add-folder.component';
import { UpdateFolderComponent } from '../update-folder/update-folder.component';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {

  public folders: Folder[];
  private allFolders: Folder[];

  public filterFolderValue = FilterFolderValue
  public filterFolderBy = FilterFolderValue.default

  public searchingFolder: string;

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getFolders();
  }

  public searchFolderByKeyword(): void {
    this.folders = this.allFolders.filter((folder) => { return folder.title.toLowerCase().indexOf(this.searchingFolder.toLowerCase()) != -1 });
  }

  public onFilterFolders(filterValue: string): void {
    switch (filterValue) {
      case 'default':
        this.filterFolderBy = FilterFolderValue.default;
        this.getFolders();
        break
      case 'lastadd':
        this.filterFolderBy = FilterFolderValue.lastadd;
        this.folders = this.allFolders.reverse();
        break
      case 'category':
        this.filterFolderBy = FilterFolderValue.category;
        this.folders.sort(function(a, b){
          if(a.category!.toLowerCase() < b.category!.toLowerCase()) { return -1; }
          if(a.category!.toLowerCase() > b.category!.toLowerCase()) { return 1; }
          return 0;
        });
        break
      case 'alphabetically':
        this.filterFolderBy = FilterFolderValue.alphabetically;
        this.folders.sort(function(a, b){
          if(a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
          if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
          return 0;
        });
        break
      default :
        this.filterFolderBy = FilterFolderValue.default;
        this.getFolders();
    }
  }

  public openDialogAddFolder(): void {
    const dialogRef = this.dialog.open(AddFolderComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => this.getFolders());
  }

  public openDialogUpdateFolder(folderId: string): void {
    const dialogRef = this.dialog.open(UpdateFolderComponent, {
      width: '400px',
      data: { folderId: folderId },
    });

    dialogRef.afterClosed().subscribe(() => this.getFolders());
  }

  public deleteFolder(folderId: string): void {
    this.apiService.deleteFolder(folderId).subscribe(() => {
      this.getFolders();
    })
  }

  private getFolders(): void {
    this.apiService.getFolders().subscribe((res: any) => {
      this.folders = res.body;
      this.allFolders = this.folders;
    })
  }

}

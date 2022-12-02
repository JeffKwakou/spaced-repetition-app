import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Folder } from 'src/app/shared/models/Folder';
import { ApiService } from 'src/app/shared/services/api.service';
import { AddFolderComponent } from '../add-folder/add-folder.component';
import { UpdateFolderComponent } from '../update-folder/update-folder.component';

export enum FilterFolderValue {
  default,
  lastadd,
  category,
  alphabetically
}

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {

  folders: Folder[];
  allFolders: Folder[];

  filterFolderValue = FilterFolderValue
  filterFolderBy = FilterFolderValue.default

  searchingFolder: string;

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getFolders()
  }

  searchFolderByKeyword() {
    this.folders = this.allFolders.filter((folder) => { return folder.title.toLowerCase().indexOf(this.searchingFolder.toLowerCase()) != -1 });
  }

  onFilterFolders(filterValue: string) {
    switch (filterValue) {
      case 'default':
        this.filterFolderBy = FilterFolderValue.default
        this.getFolders()
        break
      case 'lastadd':
        this.filterFolderBy = FilterFolderValue.lastadd
        this.folders = this.allFolders.reverse();
        break
      case 'category':
        this.filterFolderBy = FilterFolderValue.category
        this.folders.sort(function(a, b){
          if(a.category!.toLowerCase() < b.category!.toLowerCase()) { return -1; }
          if(a.category!.toLowerCase() > b.category!.toLowerCase()) { return 1; }
          return 0;
        });
        break
      case 'alphabetically':
        this.filterFolderBy = FilterFolderValue.alphabetically
        this.folders.sort(function(a, b){
          if(a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
          if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
          return 0;
        });
        break
      default :
        this.filterFolderBy = FilterFolderValue.default
        this.getFolders()
    }
  }

  openDialogAddFolder() {
    const dialogRef = this.dialog.open(AddFolderComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => this.getFolders());
  }

  openDialogUpdateFolder(folderId: string) {
    const dialogRef = this.dialog.open(UpdateFolderComponent, {
      width: '400px',
      data: { folderId: folderId },
    });

    dialogRef.afterClosed().subscribe(() => this.getFolders());
  }

  getFolders() {
    this.apiService.getFolders().subscribe((res: any) => {
      this.folders = res.body
      this.allFolders = this.folders
    })
  }

  deleteFolder(folderId: string) {
    this.apiService.deleteFolder(folderId).subscribe((res: any) => {
      console.log(res)
      this.getFolders()
    })
  }

}

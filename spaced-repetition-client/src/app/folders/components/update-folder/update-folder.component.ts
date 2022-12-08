import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Folder } from 'src/app/shared/models/Folder';
import { ApiService } from 'src/app/shared/services/api.service';
import { FolderListComponent } from '../folder-list/folder-list.component';

@Component({
  selector: 'app-update-folder',
  templateUrl: './update-folder.component.html',
  styleUrls: ['./update-folder.component.scss']
})
export class UpdateFolderComponent implements OnInit {
  public currentFolder: Folder;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {folderId: string},
    private apiService: ApiService,
    public dialogRef: MatDialogRef<FolderListComponent>
  ) { }

  ngOnInit(): void {
    this.getFolder();
  }

  public updateFolderForm: FormGroup = this.fb.group({
    title: [ '', [Validators.required]],
    category: [ '', [Validators.required]]
  })

  get title() {
    return this.updateFolderForm.get('title');
  }

  get category() {
    return this.updateFolderForm.get('category');
  }

  public onSubmitUpdateFolder(): void {
    if (!this.updateFolderForm.invalid) {
      this.currentFolder.title = this.updateFolderForm.value.title!
      this.currentFolder.category = this.updateFolderForm.value.category!

      this.apiService.updateFolder(this.currentFolder).subscribe((res: any) => {
        console.log(res)
        this.dialogRef.close();
      })
    }
  }

  private getFolder(): void {
    this.apiService.getOneFolder(this.data.folderId).subscribe((res: any) => {
      this.currentFolder = res.body;
      this.updateFolderForm.get(['title'])?.setValue(this.currentFolder.title);
      this.updateFolderForm.get(['category'])?.setValue(this.currentFolder.category);
    })
  }

}

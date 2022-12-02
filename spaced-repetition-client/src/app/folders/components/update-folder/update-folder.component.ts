import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  currentFolder: Folder;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: {folderId: string}, private apiService: ApiService, public dialogRef: MatDialogRef<FolderListComponent>) { }

  ngOnInit(): void {
    this.getFolder()
  }

  getFolder() {
    this.apiService.getOneFolder(this.data.folderId).subscribe((res: any) => {
      this.currentFolder = res.body
      this.updateFolderForm.get(['title'])?.setValue(this.currentFolder.title)
      this.updateFolderForm.get(['category'])?.setValue(this.currentFolder.category)
      this.updateFolderForm.get(['revision'])?.setValue(this.currentFolder.type_repetition)
    })
  }

  updateFolderForm = this.fb.group({
    title: [ '', [Validators.required]],
    category: [ '', [Validators.required]],
    revision: ['', [Validators.required]],
  })

  onSubmitUpdateFolder() {
    if (!this.updateFolderForm.invalid) {
      console.log(this.currentFolder.title)
      this.currentFolder.title = this.updateFolderForm.value.title!
      this.currentFolder.category = this.updateFolderForm.value.category!
      this.currentFolder.type_repetition = this.updateFolderForm.value.revision!

      this.apiService.updateFolder(this.currentFolder).subscribe((res: any) => {
        console.log(res)
        this.dialogRef.close();
      })
    }
  }
}

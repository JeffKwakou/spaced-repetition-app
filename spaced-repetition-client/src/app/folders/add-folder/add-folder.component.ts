import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FolderListComponent } from '../folder-list/folder-list.component';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss']
})
export class AddFolderComponent implements OnInit {

  constructor(private fb: FormBuilder, private apiService: ApiService, public dialogRef: MatDialogRef<FolderListComponent>) { }

  ngOnInit(): void {
  }

  addFolderForm = this.fb.group({
    title: ['', [Validators.required]],
    category: ['', [Validators.required]],
    revision: ['standard', [Validators.required]],
  })

  onSubmitAddFolder() {
    if (!this.addFolderForm.invalid) {
      let newFolder = {
        'title': this.addFolderForm.value.title,
        'category': this.addFolderForm.value.category,
        'revision': this.addFolderForm.value.revision
      }

      this.apiService.addFolder(newFolder).subscribe((res: any) => {
        this.addFolderForm.reset()
        this.dialogRef.close();
      })
    }
  }
}

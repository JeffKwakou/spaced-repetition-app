import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { FolderListComponent } from '../folder-list/folder-list.component';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss']
})
export class AddFolderComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<FolderListComponent>
  ) { }

  ngOnInit(): void {
  }

  public addFolderForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    category: ['', [Validators.required]]
  })

  get title() {
    return this.addFolderForm.get('title');
  }

  get category() {
    return this.addFolderForm.get('category');
  }

  public onSubmitAddFolder(): void {
    if (!this.addFolderForm.invalid) {
      this.apiService.addFolder(this.addFolderForm.value).subscribe(() => {
        this.addFolderForm.reset();
        this.dialogRef.close();
      })
    }
  }
}

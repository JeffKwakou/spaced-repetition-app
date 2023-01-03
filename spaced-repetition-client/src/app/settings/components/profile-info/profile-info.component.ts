import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  public profileInfoForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    firstname: ['', []],
    lastname: ['', []],
    bio: ['', []],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  get username() {
    return this.profileInfoForm.get('username');
  }

  public onSubmitProfileInfoForm(): void {
    console.log("Submited");
  }


}

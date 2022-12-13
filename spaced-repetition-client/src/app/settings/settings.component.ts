import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  // options = this._formBuilder.group({
  //   bottom: 0,
  //   fixed: false,
  //   top: 0,
  // });

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}

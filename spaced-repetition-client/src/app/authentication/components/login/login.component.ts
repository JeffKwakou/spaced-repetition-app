import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Translate } from 'src/app/shared/tools/translate.tool';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;

  loginFormErrorMessage: string = "";

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm.statusChanges.subscribe(res => {
      this.loginFormErrorMessage = "";
    })
  }

  // INIT LOGIN FORM
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  // SUBMIT LOGIN
  onSubmitLoginForm() {
    if (!this.loginForm.invalid) {
      let formFields = {
        'email': this.loginForm.value.email,
        'password': this.loginForm.value.password
      }

      this.apiService.login(formFields).subscribe((res: any) => {
        this.authenticationService.login(res.body)
        this.router.navigate(['folders'])
      },
      (error: any) => {
        this.loginFormErrorMessage = Translate.get('form.error.errorEmailPassword');
      });
    } else {
      this.loginFormErrorMessage = Translate.get('form.error.error');
    }
  }

}

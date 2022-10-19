import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
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

      const loginResponse = this.authenticationService.login(formFields)
    }
  }

}

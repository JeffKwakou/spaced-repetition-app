import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

      // this.authenticationService.login(formFields);

      this.apiService.login(formFields).subscribe((res: any) => {
        this.authenticationService.login(res.body)
        this.router.navigate(['folders'])
      },
      (error: any) => {
        this.loginFormErrorMessage = "L'email ou le mot de passe sont incorrects";
      });
    } else {
      this.loginFormErrorMessage = "Veuillez corriger les erreurs du formulaire";
    }
  }

}

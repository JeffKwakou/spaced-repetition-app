import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm.statusChanges.subscribe(() => {
      this.loginFormErrorMessage = "";
    })
  }

  // Getters form
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public onSubmitLoginForm(): void {
    if (!this.loginForm.invalid) {
      this.apiService.login(this.loginForm.value).subscribe({
        // TODO: Set type of the response
        next: (res) => {
          this.authenticationService.login(res.body)
          this.router.navigate(['folders']);
        },
        error: () => {
          this.loginFormErrorMessage = Translate.get('form.error.errorEmailPassword');
        }
      });
    } else {
      this.loginFormErrorMessage = Translate.get('form.error.error');
    }
  }

}

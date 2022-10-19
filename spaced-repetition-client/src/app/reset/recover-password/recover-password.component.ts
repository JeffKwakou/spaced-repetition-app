import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  recoverForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  onSubmitRecover() {
    if (!this.recoverForm.invalid) {
      let passwordRecover = {
        "email": this.recoverForm.value.email
      }

      this.authenticationService.passwordRecover(passwordRecover).subscribe((res: any) => {
        console.log(res)
        this.router.navigate(['/forgot/password'], {queryParams: {view: 'emailSended'}})
      })
    }
  }

}

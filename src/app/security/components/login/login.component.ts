import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginFormType } from '../../types/AuthResponseType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm!: FormGroup<LoginFormType>;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  OnSubmit(): void {
    if (!this.authForm.value.email) {
      this.error = 'Invalid Email';
      return;
    }

    if (!this.authForm.value.password) {
      this.error = 'Invalid Password';
      return;
    }

    this.authService
      .login(this.authForm.value.email, this.authForm.value.password)
      .subscribe(res => {
        if ('error' in res) {
          this.error = res.error;
        }
      })
      .unsubscribe();
  }
}

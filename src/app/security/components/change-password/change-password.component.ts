import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.changePasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      if (this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmPassword) {
        // Aquí puedes enviar los datos del formulario al servidor o realizar otras acciones necesarias.
        console.log('Password changed successfully: ' + this.changePasswordForm.value.newPassword);
      } else {
        console.log('Passwords do not match.');
      }
    } else {
      // El formulario no es válido, puedes mostrar mensajes de error o tomar otras acciones.
    }
  }
}

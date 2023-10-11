import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {
  email = ''; // Propiedad para almacenar el correo electrónico
  verificationCode = ''; // Propiedad para almacenar el código de verificación
  newPassword = ''; // Propiedad para almacenar la nueva contraseña
  confirmPassword = ''; // Propiedad para almacenar la confirmación de la contraseña

  changePassword() {
    if (this.newPassword === this.confirmPassword) {
      // Aquí puedes agregar la lógica para enviar la contraseña al servidor o realizar cualquier otra acción necesaria.
      console.log('Contraseña cambiada con éxito: ' + this.newPassword);
    } else {
      console.log('Las contraseñas no coinciden.');
    }
  }
}

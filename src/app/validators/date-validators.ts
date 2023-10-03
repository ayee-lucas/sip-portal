import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateNotInFutureValidator(
  control: AbstractControl
): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  if (selectedDate > currentDate) {
    return { futureDate: true }; // Add an error called 'futureDate' if the date is future
  }

  return null;
}

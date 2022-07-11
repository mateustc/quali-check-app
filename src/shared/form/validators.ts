import { Validators, FormControl, FormGroup } from "@angular/forms";

export const ValidatorsRules = {

    EMAIL: Validators.compose([
        Validators.required,
        Validators.email]),
    SENHA: Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])
}

export function validateAllFormFields(formGroup: FormGroup) {
    
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    });
} 
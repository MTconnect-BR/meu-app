import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { HlmCard, HlmCardContent, HlmCardHeader, HlmCardTitle, HlmCardDescription, HlmCardFooter } from '@spartan-ng/helm/card';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmField, HlmFieldLabel, HlmFieldError, HlmFieldGroup } from '@spartan-ng/helm/field';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HlmCard, HlmCardContent, HlmCardHeader, HlmCardTitle, HlmCardDescription, HlmCardFooter,
    HlmButton, HlmInput, HlmField, HlmFieldLabel, HlmFieldError, HlmFieldGroup,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup {
  private readonly _fb = inject(FormBuilder);
  private readonly _auth = inject(AuthService);
  private readonly _router = inject(Router);

  errorMessage: string | null = null;

  public form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, { validators: this.passwordMatchValidator });

  private passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.value;
    const result = this._auth.signup(email!, password!);
    if (result.success) {
      this._router.navigate(['/']);
    } else {
      this.errorMessage = result.error ?? null;
    }
  }
}

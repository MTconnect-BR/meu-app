import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { HlmCard, HlmCardContent, HlmCardHeader, HlmCardTitle, HlmCardDescription, HlmCardFooter } from '@spartan-ng/helm/card';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmField, HlmFieldLabel, HlmFieldError, HlmFieldGroup } from '@spartan-ng/helm/field';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HlmCard, HlmCardContent, HlmCardHeader, HlmCardTitle, HlmCardDescription, HlmCardFooter,
    HlmButton, HlmInput, HlmField, HlmFieldLabel, HlmFieldError, HlmFieldGroup,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly _fb = inject(FormBuilder);
  private readonly _auth = inject(AuthService);
  private readonly _router = inject(Router);

  errorMessage: string | null = null;

  public form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.value;
    const result = this._auth.login(email!, password!);
    if (result.success) {
      this._router.navigate(['/crm']);
    } else {
      this.errorMessage = result.error ?? null;
    }
  }
}

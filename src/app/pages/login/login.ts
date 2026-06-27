import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmCard, HlmCardContent, HlmCardHeader, HlmCardTitle, HlmCardDescription, HlmCardFooter } from '@spartan-ng/helm/card';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmField } from '@spartan-ng/helm/field';

@Component({
  selector: 'app-login',
  imports: [RouterLink, HlmCard, HlmCardContent, HlmCardHeader, HlmCardTitle, HlmCardDescription, HlmCardFooter, HlmButton, HlmInput, HlmLabel, HlmField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}

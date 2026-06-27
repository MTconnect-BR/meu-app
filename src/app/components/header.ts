import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, HlmButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}

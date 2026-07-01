import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './terms.html',
  styles: `
    :host section + section {
      margin-top: 3rem;
    }
    :host section > * + * {
      margin-top: 1rem;
    }
    :host section > ul {
      margin-top: 0.5rem;
    }
  `,
})
export class Terms {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-whatsapp-button',
  imports: [RouterLink],
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsAppButton {}

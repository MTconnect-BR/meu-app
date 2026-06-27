import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsAppButton {
  protected readonly whatsappUrl =
    'https://wa.me/5511999999999?text=Ol%C3%A1!%20Tenho%20interesse%20nos%20im%C3%B3veis%20anunciados.';
}

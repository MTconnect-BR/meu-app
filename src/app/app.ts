import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WhatsAppButton } from './components/whatsapp-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WhatsAppButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

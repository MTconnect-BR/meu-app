import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { WhatsAppButton } from './components/whatsapp-button';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({
        width: '100%',
        transformOrigin: '50% 50svh',
        transform: 'translateY(110svh)',
        opacity: 0,
      }),
    ], { optional: true }),
    query(':leave', [
      style({
        width: '100%',
        transformOrigin: '50% 50%',
      }),
    ], { optional: true }),
    group([
      query(':leave', [
        animate('0.75s cubic-bezier(.5,0,0,1)', style({
          transform: 'scale(0.9) translateY(10svh)',
          opacity: 0.5,
        })),
      ], { optional: true }),
      query(':enter', [
        animate('0.75s cubic-bezier(.5,0,0,1)', style({
          transform: 'translateY(0)',
          opacity: 1,
        })),
      ], { optional: true }),
    ]),
  ]),
]);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WhatsAppButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [routeAnimation],
})
export class App {
  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}

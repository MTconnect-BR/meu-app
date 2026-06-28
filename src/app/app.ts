import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { WhatsAppButton } from './components/whatsapp-button';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        transformOrigin: '50% 0%',
        transform: 'translateY(40px)',
        opacity: 0,
      }),
    ], { optional: true }),
    query(':leave', [
      style({
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
      }),
    ], { optional: true }),
    group([
      query(':leave', [
        animate('0.3s cubic-bezier(0.4, 0, 0.2, 1)', style({
          transform: 'translateY(-20px)',
          opacity: 0,
        })),
      ], { optional: true }),
      query(':enter', [
        animate('0.3s cubic-bezier(0.4, 0, 0.2, 1)', style({
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
  private readonly router = inject(Router);

  protected readonly isCrmRoute = toSignal(
    this.router.events.pipe(
      filter(() => true),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}

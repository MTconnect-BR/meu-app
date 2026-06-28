import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { WhatsAppButton } from './components/whatsapp-button';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({
        position: 'absolute',
        width: '100%',
        transform: 'translateY(100vh)',
        opacity: 0,
      }),
    ], { optional: true }),
    query(':leave', [
      style({
        position: 'absolute',
        width: '100%',
        transform: 'scale(1)',
        opacity: 1,
      }),
    ], { optional: true }),
    group([
      query(':leave', [
        animate('0.35s cubic-bezier(0.5, 0, 0, 1)', style({
          transform: 'scale(0.95) translateY(30px)',
          opacity: 0,
        })),
      ], { optional: true }),
      query(':enter', [
        animate('0.5s 0.15s cubic-bezier(0.5, 0, 0, 1)', style({
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
  protected readonly showWhatsApp = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => !e.urlAfterRedirects.startsWith('/crm')),
      startWith(!this.router.url.startsWith('/crm'))
    ),
    { initialValue: !this.router.url.startsWith('/crm') }
  );

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}

import { ChangeDetectionStrategy, Component, inject, signal, afterNextRender } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { Header } from './shared/components/header/header';
import { WhatsAppButton } from './shared/components/whatsapp-button/whatsapp-button';

const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({
          opacity: 0,
          transform: 'translateY(100svh)',
        }),
      ],
      { optional: true },
    ),
    query(
      ':leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
          zIndex: 1,
        }),
      ],
      { optional: true },
    ),
    group([
      query(
        ':leave',
        [
          animate(
            '0.75s cubic-bezier(.5,0,0,1)',
            style({
              opacity: 0,
            }),
          ),
        ],
        { optional: true },
      ),
      query(
        ':enter',
        [
          animate(
            '0.75s cubic-bezier(.5,0,0,1)',
            style({
              opacity: 1,
              transform: 'translateY(0)',
            }),
          ),
        ],
        { optional: true },
      ),
    ]),
  ]),
]);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, WhatsAppButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [routeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);

  protected readonly isInitialLoad = signal(true);

  protected readonly isCrmRoute = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url.includes('/crm')),
    ),
    { initialValue: this.router.url.includes('/crm') },
  );

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isInitialLoad()) {
          this.isInitialLoad.set(false);
        }
      });

    afterNextRender(() => {
      this.router.events
        .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe(() => {
          window.scrollTo(0, 0);
        });
    });
  }

  getRouteAnimationData(outlet: RouterOutlet) {
    if (this.isInitialLoad()) return undefined;
    return outlet?.activatedRouteData?.['animation'];
  }
}

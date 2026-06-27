import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideChevronDown } from '@ng-icons/lucide';

@Component({
  selector: 'app-landing',
  imports: [Header, Footer, NgIcon],
  providers: [
    provideIcons({ lucideSearch, lucideChevronDown }),
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private originalBg = '';

  protected readonly searchType = signal<'buy' | 'rent'>('buy');
  protected readonly searchQuery = signal('');
  protected readonly propertyType = signal('all');

  ngOnInit() {
    this.originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'hsl(97, 57%, 61%)';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = this.originalBg;
  }

  onSearch() {
    const params: Record<string, string> = {
      type: this.searchType(),
    };
    const q = this.searchQuery().trim();
    if (q) {
      params['q'] = q;
    }
    const pt = this.propertyType();
    if (pt !== 'all') {
      params['propertyType'] = pt;
    }
    this.router.navigate(['/properties'], { queryParams: params });
  }
}

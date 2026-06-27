import { Component } from '@angular/core';
import { HlmCard, HlmCardContent } from '@spartan-ng/helm/card';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { HlmTooltip } from '@spartan-ng/helm/tooltip';
import { HlmButton } from '@spartan-ng/helm/button';
import { lucideInfo } from '@ng-icons/lucide';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-root',
  imports: [HlmCard, HlmCardContent, HlmSeparator, NgIcon, HlmTooltip, HlmButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly stats = [
    { value: '0.19%', label: 'Management Fee', date: 'As of 06/26/2026', showInfo: false },
    { value: '6.23%', label: 'Gross Staking Rewards', date: 'As of 06/26/2026', showInfo: true, tooltip: 'Retorno bruto de staking acumulado' },
    { value: '100%', label: 'Staked %', date: 'As of 06/26/2026', showInfo: true, tooltip: 'Percentual total em staking' },
  ];

  protected readonly infoIcon = lucideInfo;
}

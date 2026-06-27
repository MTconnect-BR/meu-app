import { Component } from '@angular/core';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { HlmCard, HlmCardContent } from '@spartan-ng/helm/card';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { HlmH1, HlmH2, HlmLead, HlmP } from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-landing',
  imports: [Header, Footer, HlmCard, HlmCardContent, HlmSeparator, HlmH1, HlmH2, HlmLead, HlmP],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {}

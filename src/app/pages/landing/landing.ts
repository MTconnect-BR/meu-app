import { Component } from '@angular/core';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { HlmCard, HlmCardContent } from '@spartan-ng/helm/card';
import { HlmSeparator } from '@spartan-ng/helm/separator';

@Component({
  selector: 'app-landing',
  imports: [Header, Footer, HlmCard, HlmCardContent, HlmSeparator],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {}

import { Component } from '@angular/core';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

@Component({
  selector: 'app-landing',
  imports: [Header, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {}

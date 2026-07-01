import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PropertiesService } from '../../core/services/properties';
import { Property } from '../../core/models/property.model';
import { HlmCard, HlmCardContent } from '@spartan-ng/helm/card';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import {
  HlmCarousel,
  HlmCarouselContent,
  HlmCarouselItem,
  HlmCarouselNext,
  HlmCarouselPrevious,
} from '@spartan-ng/helm/carousel';
import { HlmAspectRatio } from '@spartan-ng/helm/aspect-ratio';
import {
  HlmEmpty,
  HlmEmptyHeader,
  HlmEmptyMedia,
  HlmEmptyTitle,
  HlmEmptyDescription,
} from '@spartan-ng/helm/empty';
import { NgIcon } from '@ng-icons/core';
import { HlmH1, HlmH2, HlmP } from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-property-detail',
  imports: [
    RouterLink,
    HlmCard,
    HlmCardContent,
    HlmButton,
    HlmBadge,
    HlmSeparator,
    HlmCarousel,
    HlmCarouselContent,
    HlmCarouselItem,
    HlmCarouselNext,
    HlmCarouselPrevious,
    HlmAspectRatio,
    HlmEmpty,
    HlmEmptyHeader,
    HlmEmptyMedia,
    HlmEmptyTitle,
    HlmEmptyDescription,
    NgIcon,
    HlmH1,
    HlmH2,
    HlmP,
  ],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyDetail implements OnInit, AfterViewInit, OnDestroy {
  private readonly _route = inject(ActivatedRoute);
  private readonly _propertiesService = inject(PropertiesService);
  protected readonly propertiesService = this._propertiesService;

  protected readonly property = signal<Property | undefined>(undefined);
  protected readonly selectedImage = signal(0);
  protected readonly similarProperties = computed(() => {
    const p = this.property();
    return p ? this._propertiesService.getSimilar(p, 5) : [];
  });
  protected readonly similarOptions = {
    align: 'start',
    slidesToScroll: 2,
    containScroll: 'trimSnaps',
  } as const;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _map: any;
  private _mapInitialized = false;
  protected readonly mapContainer = viewChild<ElementRef>('mapContainer');

  ngOnInit(): void {
    const slug = this._route.snapshot.paramMap.get('slug');
    if (slug) {
      this.property.set(this._propertiesService.getBySlug(slug));
    }
  }

  ngAfterViewInit(): void {
    this._initMap();
  }

  ngOnDestroy(): void {
    this._map?.remove();
  }

  private async _initMap(): Promise<void> {
    if (this._mapInitialized) return;
    const prop = this.property();
    const el = this.mapContainer();
    if (!prop || !el) return;

    this._mapInitialized = true;
    const leafletModule = await import('leaflet');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L: any = (leafletModule as any).default ?? leafletModule;
    const container = el.nativeElement;

    this._map = L.map(container, { zoomControl: true }).setView([prop.lat, prop.lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(this._map);

    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker([prop.lat, prop.lng], { icon: defaultIcon })
      .addTo(this._map)
      .bindPopup(`<b>${prop.title}</b><br>${prop.address}`)
      .openPopup();

    setTimeout(() => this._map?.invalidateSize(), 0);
  }

  protected selectImage(index: number): void {
    this.selectedImage.set(index);
  }

  protected get currentImage(): string {
    const p = this.property();
    if (!p) return '';
    return p.images[this.selectedImage()] || p.imageUrl;
  }
}

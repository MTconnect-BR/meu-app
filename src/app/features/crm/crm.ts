import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { PropertiesService } from '../../core/services/properties';
import { Property, PropertyCategory } from '../../core/models/property.model';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmTextarea } from '@spartan-ng/helm/textarea';
import { HlmSwitch } from '@spartan-ng/helm/switch';
import {
  HlmTable,
  HlmTableContainer,
  HlmTHead,
  HlmTBody,
  HlmTr,
  HlmTh,
  HlmTd,
} from '@spartan-ng/helm/table';
import { HlmField, HlmFieldLabel, HlmFieldError } from '@spartan-ng/helm/field';
import {
  HlmDropdownMenu,
  HlmDropdownMenuTrigger,
  HlmDropdownMenuItem,
  HlmDropdownMenuSeparator,
} from '@spartan-ng/helm/dropdown-menu';
import { HlmRadioGroup, HlmRadio, HlmRadioIndicator } from '@spartan-ng/helm/radio-group';
import { HlmAlert, HlmAlertTitle, HlmAlertDescription } from '@spartan-ng/helm/alert';
import {
  HlmEmpty,
  HlmEmptyHeader,
  HlmEmptyMedia,
  HlmEmptyTitle,
  HlmEmptyDescription,
} from '@spartan-ng/helm/empty';
import {
  HlmInputGroup,
  HlmInputGroupAddon,
  HlmInputGroupInput,
} from '@spartan-ng/helm/input-group';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-crm',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HlmButton,
    HlmBadge,
    HlmInput,
    HlmTextarea,
    HlmSwitch,
    HlmTable,
    HlmTableContainer,
    HlmTHead,
    HlmTBody,
    HlmTr,
    HlmTh,
    HlmTd,
    HlmField,
    HlmFieldLabel,
    HlmFieldError,
    HlmDropdownMenu,
    HlmDropdownMenuTrigger,
    HlmDropdownMenuItem,
    HlmDropdownMenuSeparator,
    HlmRadioGroup,
    HlmRadio,
    HlmRadioIndicator,
    HlmAlert,
    HlmAlertTitle,
    HlmAlertDescription,
    HlmEmpty,
    HlmEmptyHeader,
    HlmEmptyMedia,
    HlmEmptyTitle,
    HlmEmptyDescription,
    HlmInputGroup,
    HlmInputGroupAddon,
    HlmInputGroupInput,
    NgIcon,
  ],
  templateUrl: './crm.html',
  styleUrl: './crm.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Crm {
  private readonly _fb = inject(FormBuilder);
  private readonly _propertiesService = inject(PropertiesService);

  protected readonly showForm = signal(false);
  protected readonly editingId = signal<number | null>(null);
  protected readonly showDeleteDialog = signal(false);
  protected readonly deletingId = signal<number | null>(null);
  protected readonly alertMessage = signal('');
  protected readonly searchQuery = signal('');
  protected readonly sortKey = signal<
    'title' | 'city' | 'price' | 'area' | 'bedrooms' | 'bathrooms'
  >('title');
  protected readonly sortDirection = signal<'asc' | 'desc'>('asc');

  protected readonly filteredProperties = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const key = this.sortKey();
    const dir = this.sortDirection();
    let list = this._propertiesService.properties;
    if (query) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query) ||
          p.state.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query),
      );
    }
    return [...list].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      const cmp =
        typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return dir === 'asc' ? cmp : -cmp;
    });
  });

  protected toggleSort(key: 'title' | 'city' | 'price' | 'area' | 'bedrooms' | 'bathrooms'): void {
    if (this.sortKey() === key) {
      this.sortDirection.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortKey.set(key);
      this.sortDirection.set('asc');
    }
  }

  protected sortIcon(key: string): string {
    if (this.sortKey() !== key) return '';
    return this.sortDirection() === 'asc' ? ' ↑' : ' ↓';
  }

  protected readonly form = this._fb.nonNullable.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    address: ['', Validators.required],
    neighborhood: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', [Validators.required, Validators.maxLength(2)]],
    price: [0, [Validators.required, Validators.min(1)]],
    type: ['sale' as 'sale' | 'rent', Validators.required],
    category: ['apartment' as PropertyCategory, Validators.required],
    bedrooms: [1, [Validators.required, Validators.min(0)]],
    bathrooms: [1, [Validators.required, Validators.min(0)]],
    parkingSpots: [0, [Validators.required, Validators.min(0)]],
    area: [1, [Validators.required, Validators.min(1)]],
    imageUrl: ['', Validators.required],
    images: [''],
    description: ['', Validators.required],
    furnished: [false],
    petFriendly: [false],
    lat: [0, Validators.required],
    lng: [0, Validators.required],
  });

  protected showAlert(message: string): void {
    this.alertMessage.set(message);
    setTimeout(() => this.alertMessage.set(''), 3000);
  }

  protected openCreateForm(): void {
    this.editingId.set(null);
    this.form.reset({
      title: '',
      slug: '',
      address: '',
      neighborhood: '',
      city: '',
      state: '',
      price: 0,
      type: 'sale',
      category: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 0,
      area: 1,
      imageUrl: '',
      images: '',
      description: '',
      furnished: false,
      petFriendly: false,
      lat: 0,
      lng: 0,
    });
    this.showForm.set(true);
  }

  protected openEditForm(property: Property): void {
    this.editingId.set(property.id);
    this.form.reset({
      title: property.title,
      slug: property.slug,
      address: property.address,
      neighborhood: property.neighborhood,
      city: property.city,
      state: property.state,
      price: property.price,
      type: property.type,
      category: property.category,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      parkingSpots: property.parkingSpots,
      area: property.area,
      imageUrl: property.imageUrl,
      images: property.images?.join('\n') ?? '',
      description: property.description,
      furnished: property.furnished,
      petFriendly: property.petFriendly,
      lat: property.lat,
      lng: property.lng,
    });
    this.showForm.set(true);
  }

  protected closeForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  protected save(): void {
    if (this.form.invalid) return;
    const val = this.form.getRawValue();
    const images = val.images
      ? val.images
          .split('\n')
          .map((s: string) => s.trim())
          .filter((s: string) => s)
      : [];
    const data = { ...val, images };

    if (this.editingId() !== null) {
      this._propertiesService.update(this.editingId()!, data);
      this.showAlert('Imóvel atualizado com sucesso!');
    } else {
      this._propertiesService.create(data);
      this.showAlert('Imóvel criado com sucesso!');
    }
    this.closeForm();
  }

  protected confirmDelete(id: number): void {
    this.deletingId.set(id);
    this.showDeleteDialog.set(true);
  }

  protected doDelete(): void {
    const id = this.deletingId();
    if (id !== null) {
      this._propertiesService.delete(id);
    }
    this.showDeleteDialog.set(false);
    this.deletingId.set(null);
    this.showAlert('Imóvel excluído com sucesso!');
  }

  protected cancelDelete(): void {
    this.showDeleteDialog.set(false);
    this.deletingId.set(null);
  }

  protected formatPrice(price: number, type: 'sale' | 'rent'): string {
    return this._propertiesService.formatPrice(price, type);
  }
}

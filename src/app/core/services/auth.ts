import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface StoredUser {
  email: string;
  passwordHash: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _storageKey = 'meu-app-auth-users';
  private readonly _sessionKey = 'meu-app-auth-session';

  readonly currentUserEmail = signal<string | null>(null);
  readonly isLoggedIn = computed(() => this.currentUserEmail() !== null);

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      const session = localStorage.getItem(this._sessionKey);
      if (session) {
        this.currentUserEmail.set(session);
      }
    }
  }

  private getUsers(): StoredUser[] {
    if (!isPlatformBrowser(this._platformId)) return [];
    const data = localStorage.getItem(this._storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveUsers(users: StoredUser[]): void {
    localStorage.setItem(this._storageKey, JSON.stringify(users));
  }

  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async signup(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    const users = this.getUsers();
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Este email já está cadastrado.' };
    }
    const passwordHash = await this.hashPassword(password);
    users.push({ email, passwordHash });
    this.saveUsers(users);
    this.loginSession(email);
    return { success: true };
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    const users = this.getUsers();
    const passwordHash = await this.hashPassword(password);
    const user = users.find(u => u.email === email && u.passwordHash === passwordHash);
    if (!user) {
      return { success: false, error: 'Email ou senha inválidos.' };
    }
    this.loginSession(email);
    return { success: true };
  }

  logout(): void {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.removeItem(this._sessionKey);
    }
    this.currentUserEmail.set(null);
  }

  private loginSession(email: string): void {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem(this._sessionKey, email);
    }
    this.currentUserEmail.set(email);
  }
}

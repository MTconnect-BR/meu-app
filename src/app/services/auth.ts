import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface StoredUser {
  email: string;
  password: string;
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

  signup(email: string, password: string): { success: boolean; error?: string } {
    const users = this.getUsers();
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Este email já está cadastrado.' };
    }
    users.push({ email, password });
    this.saveUsers(users);
    this.loginSession(email);
    return { success: true };
  }

  login(email: string, password: string): { success: boolean; error?: string } {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
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

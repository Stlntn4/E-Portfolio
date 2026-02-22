import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private isDark = false;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.loadTheme();
  }

  private loadTheme(): void {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved) {
      this.isDark = saved === 'dark';
    } else {
      // Respect OS preference on first visit
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.applyTheme();
    localStorage.setItem(this.THEME_KEY, this.isDark ? 'dark' : 'light');
  }

  private applyTheme(): void {
    this.document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }

  get isDarkMode(): boolean {
    return this.isDark;
  }
}
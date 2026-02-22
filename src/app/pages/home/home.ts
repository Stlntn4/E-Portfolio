import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  encapsulation: ViewEncapsulation.None
})
export class Home implements OnInit {
  isScrolled = false;
  currentYear = new Date().getFullYear();

  lightboxOpen = false;
  lightboxImage = '';
  lightboxAlt = '';

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:keydown.escape', [])
  onEscapeKey() {
    if (this.lightboxOpen) {
      this.closeLightbox();
    }
  }

  openLightbox(src: string, alt: string) {
    this.lightboxImage = src;
    this.lightboxAlt = alt;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxOpen = false;
    this.lightboxImage = '';
    this.lightboxAlt = '';
    document.body.style.overflow = '';
  }
}
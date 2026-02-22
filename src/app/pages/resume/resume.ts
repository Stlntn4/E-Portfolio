import { Component, OnInit, OnDestroy, HostListener, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

/* ─────────────────────────────────────────────
   SafeUrl pipe — keeps iframe src trusted.
   You can move this to:
   src/app/shared/pipes/safe-url.pipe.ts
   and import it there instead.
   ───────────────────────────────────────────── */
@Pipe({ name: 'safe', standalone: true })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [RouterModule, CommonModule, SafeUrlPipe],
  templateUrl: './resume.html',
  styleUrls: ['./resume.css'],
  encapsulation: ViewEncapsulation.None
})
export class Resume implements OnInit, OnDestroy {
  isScrolled  = false;
  currentYear = new Date().getFullYear();

  /* ── Certificate Modal State ── */
  isCertModalOpen = false;
  activeCertTitle = '';
  activeCertSrc   = '';  // empty = file not uploaded yet → shows placeholder

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  /* ── Navbar scroll detection ── */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  /* ── Close modal on Escape key ── */
  @HostListener('document:keydown.escape')
  onEscKey() {
    if (this.isCertModalOpen) this.closeCert();
  }

  /* ── Open certificate modal ── */
  openCert(title: string, src: string): void {
    this.activeCertTitle = title;
    this.activeCertSrc   = src;
    this.isCertModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  /* ── Close certificate modal ── */
  closeCert(): void {
    this.isCertModalOpen = false;
    this.activeCertTitle = '';
    this.activeCertSrc   = '';
    document.body.style.overflow = '';
  }

  /* ── Close when clicking the dark backdrop ── */
  onOverlayClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('cert-modal-overlay')) {
      this.closeCert();
    }
  }
}
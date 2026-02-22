import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  encapsulation: ViewEncapsulation.None
})
export class About implements OnInit {
  isScrolled = false;
  currentYear = new Date().getFullYear();

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
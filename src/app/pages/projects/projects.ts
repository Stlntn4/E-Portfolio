import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
  encapsulation: ViewEncapsulation.None
})
export class Projects {
  isScrolled = false;
  currentYear = new Date().getFullYear();

  constructor(public router: Router, public themeService: ThemeService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
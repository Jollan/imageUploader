import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  @Output()
  theme = new EventEmitter<string>();
  light = true;

  toggleTheme() {
    this.light = !this.light;
    this.theme.emit(this.light ? 'light' : 'dark');
  }

}

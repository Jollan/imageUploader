import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ImageDropComponent } from './image-drop/image-drop.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { ImageService } from './services/image.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './utils/loader/loader.component';
import { SnackbarComponent } from './utils/snackbar/snackbar.component';
import { AlertService } from './services/alert.service';
import { LetDirective } from './utils/directives/custom.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    ImageDropComponent,
    ImageViewerComponent,
    LoaderComponent,
    SnackbarComponent,
    LetDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  theme = 'light';

  constructor(
    public imageService: ImageService,
    public alertService: AlertService
  ) {}

  getTheme(theme: string) {
    this.theme = theme;
  }

  hideSnackbar() {
    return setTimeout(() => this.alertService.message.set(null), 3000);
  }
}

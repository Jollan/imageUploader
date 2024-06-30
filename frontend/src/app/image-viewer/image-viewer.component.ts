import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { IImage } from '../models/image.model';
import { CommonModule } from '@angular/common';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss',
})
export class ImageViewerComponent implements OnInit, OnDestroy {
  @Input() theme = 'light';
  image: IImage;
  downloadUrl: string;

  constructor(
    private imageService: ImageService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.image = this.imageService.image()!;
    this.imageService.get(this.image._id).subscribe({
      next: (data) => {
        this.downloadUrl = URL.createObjectURL(data);
      },
      error: (error) => {
        this.alertService.message.set({
          content: error.error.message ?? 'Something went wrong !',
          type: 'error',
        });
      },
    });
  }

  async onCopyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.image.url);
      this.alertService.message.set({
        content: 'Link copied to clipboard.',
        type: 'success',
      });
    } catch (error) {
      this.alertService.message.set({
        content: 'Failed to copy link.',
        type: 'error',
      });
    }
  }

  ngOnDestroy() {
    URL.revokeObjectURL(this.downloadUrl);
  }
}

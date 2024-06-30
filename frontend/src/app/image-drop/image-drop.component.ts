import { Component, Input } from '@angular/core';
import { ImageService } from '../services/image.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-image-drop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-drop.component.html',
  styleUrl: './image-drop.component.scss',
})
export class ImageDropComponent {
  private readonly class = 'drag-over';
  private target: HTMLElement;
  private image: File;

  @Input() theme = 'light';

  constructor(
    private imageService: ImageService,
    private alertService: AlertService
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.target = event.currentTarget as HTMLElement;
    this.target.classList.add(this.class);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.target.classList.remove(this.class);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.target.classList.remove(this.class);
    const files = event.dataTransfer?.files;
    if (files?.length) {
      if (files.length > 1) {
        this.alertService.message.set({
          content: 'At most one image !',
          type: 'error',
        });
        return;
      }
      this.image = files[0];
      try {
        this.checkFile();
        this.upload();
      } catch (error: any) {
        this.alertService.message.set({
          content: error.message,
          type: 'error',
        });
      }
    }
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
    if (this.image) {
      try {
        this.checkFile();
        this.upload();
      } catch (error: any) {
        this.alertService.message.set({
          content: error.message,
          type: 'error',
        });
      }
    }
  }

  private checkFile() {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(this.image.type)) {
      throw new Error('The image type must be .jpg or .gif or .png !');
    }
    if (this.image.size > 2_097_152) {
      throw new Error('The image is too large !');
    }
  }

  private upload() {
    const formData = new FormData();
    formData.append('image', this.image);
    this.imageService.upload(formData).subscribe({
      next: (response) => {
        this.imageService.image.set(response.data.image);
      },
      error: (error) => {
        this.alertService.message.set({
          content: error.error.message ?? 'Something went wrong !',
          type: 'error',
        });
      },
      complete: () => {
        this.alertService.message.set({
          content: 'Image upload successfully !',
          type: 'success',
        });
      },
    });
  }
}

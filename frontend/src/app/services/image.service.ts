import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { IImage } from '../models/image.model';
import { take, finalize } from 'rxjs';
import { environment } from '../../environments/environment';

type JsonResponse<T> = { status: 'success' | 'fail'; data: T };

@Injectable({ providedIn: 'root' })
export class ImageService {
  loaded = signal(true);
  image: WritableSignal<IImage | undefined> = signal(undefined);

  constructor(private http: HttpClient) {}

  upload(body: FormData) {
    this.loaded.set(false);
    return this.http
      .post<JsonResponse<{ image: IImage }>>(environment.api, body)
      .pipe(
        take(1),
        finalize(() => {
          this.loaded.set(true);
        })
      );
  }
  get(id: string) {
    return this.http
      .get(`${environment.api}/${id}`, {
        responseType: 'blob',
      })
      .pipe(take(1));
  }
}

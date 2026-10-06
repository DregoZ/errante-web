import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError, shareReplay } from 'rxjs';
import { SiteContent } from '../models/site-content.model';

@Injectable({
  providedIn: 'root'
})
export class SiteContentService {
  private readonly http = inject(HttpClient);
  private readonly contentUrl = 'assets/content/site.json';

  readonly siteContent = signal<SiteContent | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  private cache$: Observable<SiteContent | null> | null = null;

  constructor() {
    this.loadContent().subscribe();
  }

  loadContent(): Observable<SiteContent | null> {
    if (this.siteContent()) {
      return of(this.siteContent());
    }

    if (!this.cache$) {
      this.isLoading.set(true);
      this.cache$ = this.http.get<SiteContent>(this.contentUrl).pipe(
        tap(data => {
          this.siteContent.set(data);
          this.isLoading.set(false);
          this.error.set(null);
        }),
        catchError(err => {
          console.error('Error loading site content:', err);
          this.isLoading.set(false);
          this.error.set('No se pudo cargar el contenido general.');
          return of(null);
        }),
        shareReplay(1)
      );
    }

    return this.cache$;
  }
}

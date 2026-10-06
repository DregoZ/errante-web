import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, map, catchError, shareReplay } from 'rxjs';
import { EventServiceItem, EventType } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly http = inject(HttpClient);
  private readonly contentUrl = 'assets/content/events.json';

  readonly events = signal<EventServiceItem[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  private cache$: Observable<EventServiceItem[]> | null = null;

  constructor() {
    this.loadEvents().subscribe();
  }

  loadEvents(): Observable<EventServiceItem[]> {
    if (this.events().length > 0) {
      return of(this.events());
    }

    if (!this.cache$) {
      this.isLoading.set(true);
      this.cache$ = this.http.get<EventServiceItem[]>(this.contentUrl).pipe(
        tap(data => {
          this.events.set(data);
          this.isLoading.set(false);
          this.error.set(null);
        }),
        catchError(err => {
          console.error('Error loading events:', err);
          this.isLoading.set(false);
          this.error.set('No se pudieron cargar los servicios de eventos.');
          return of([]);
        }),
        shareReplay(1)
      );
    }

    return this.cache$;
  }

  getEventBySlug(slug: string): Observable<EventServiceItem | undefined> {
    return this.loadEvents().pipe(
      map(list => list.find(e => e.slug === slug || e.id === slug))
    );
  }

  getEventByType(type: EventType): Observable<EventServiceItem | undefined> {
    return this.loadEvents().pipe(
      map(list => list.find(e => e.type === type))
    );
  }
}

import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import { QuoteRequest, ContactSubmissionState } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  readonly state = signal<ContactSubmissionState>({
    status: 'idle'
  });

  submitQuote(quote: QuoteRequest): Observable<ContactSubmissionState> {
    this.state.set({ status: 'submitting' });

    // Generar un número de referencia realista
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ref = `ERR-${new Date().getFullYear()}-${randomCode}`;

    const mockResponse: ContactSubmissionState = {
      status: 'success',
      referenceNumber: ref,
      message: `¡Gracias por contactar con Errante, ${quote.name}! Hemos recibido tu solicitud para el ${quote.date}. Nuestro equipo de mixología revisará los detalles y te enviará una propuesta personalizada en menos de 24 horas.`
    };

    return of(mockResponse).pipe(
      delay(900),
      tap(result => {
        this.state.set(result);
      })
    );
  }

  resetState(): void {
    this.state.set({ status: 'idle' });
  }
}

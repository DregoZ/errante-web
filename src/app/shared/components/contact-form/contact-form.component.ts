import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="contact-form-wrapper card-glass">
      <!-- Success State -->
      <div *ngIf="contactService.state().status === 'success'" class="success-card animate-fade-in" role="alert">
        <div class="success-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <span class="ref-badge">{{ contactService.state().referenceNumber }}</span>
        <h3 class="success-title">¡Solicitud recibida con éxito!</h3>
        <p class="success-msg">{{ contactService.state().message }}</p>
        <button type="button" class="btn btn-outline-gold btn-sm mt-4" (click)="resetForm()">
          Enviar otra solicitud
        </button>
      </div>

      <!-- Form State -->
      <form 
        *ngIf="contactService.state().status !== 'success'" 
        [formGroup]="form" 
        (ngSubmit)="onSubmit()" 
        class="quote-form"
        novalidate
      >
        <div class="form-header">
          <h3 class="form-title">Pide tu presupuesto personalizado</h3>
          <p class="form-subtitle">Rellena este breve formulario y te enviaremos una propuesta detallada en menos de 24h.</p>
        </div>

        <div class="form-grid">
          <!-- Nombre -->
          <div class="form-group">
            <label for="name" class="form-label">
              Nombre completo <span class="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              formControlName="name"
              class="form-input"
              [class.is-invalid]="isFieldInvalid('name')"
              placeholder="Ej. Sofía Martín"
              autocomplete="name"
            />
            <div *ngIf="isFieldInvalid('name')" class="error-msg">
              Por favor, introduce tu nombre.
            </div>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email" class="form-label">
              Correo electrónico <span class="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="form-input"
              [class.is-invalid]="isFieldInvalid('email')"
              placeholder="sofia@ejemplo.com"
              autocomplete="email"
            />
            <div *ngIf="isFieldInvalid('email')" class="error-msg">
              Introduce un correo electrónico válido.
            </div>
          </div>

          <!-- Teléfono -->
          <div class="form-group">
            <label for="phone" class="form-label">
              Teléfono de contacto <span class="optional">(opcional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              formControlName="phone"
              class="form-input"
              placeholder="+34 600 000 000"
              autocomplete="tel"
            />
          </div>

          <!-- Tipo de evento -->
          <div class="form-group">
            <label for="eventType" class="form-label">
              Tipo de evento <span class="required">*</span>
            </label>
            <select
              id="eventType"
              formControlName="eventType"
              class="form-input form-select"
              [class.is-invalid]="isFieldInvalid('eventType')"
            >
              <option value="" disabled selected>Selecciona una opción</option>
              <option value="bodas">Boda / Enlace</option>
              <option value="corporativos">Evento Corporativo / Gala</option>
              <option value="privados">Fiesta Privada / Cumpleaños</option>
              <option value="festivales">Festival / Feria / Pop-up</option>
              <option value="otro">Otro tipo de celebración</option>
            </select>
            <div *ngIf="isFieldInvalid('eventType')" class="error-msg">
              Selecciona el tipo de evento.
            </div>
          </div>

          <!-- Fecha -->
          <div class="form-group">
            <label for="date" class="form-label">
              Fecha estimada <span class="required">*</span>
            </label>
            <input
              id="date"
              type="date"
              formControlName="date"
              class="form-input"
              [class.is-invalid]="isFieldInvalid('date')"
            />
            <div *ngIf="isFieldInvalid('date')" class="error-msg">
              Indica la fecha aproximada.
            </div>
          </div>

          <!-- Invitados -->
          <div class="form-group">
            <label for="guests" class="form-label">
              Nº de invitados aprox. <span class="required">*</span>
            </label>
            <input
              id="guests"
              type="number"
              min="10"
              max="5000"
              formControlName="guests"
              class="form-input"
              [class.is-invalid]="isFieldInvalid('guests')"
              placeholder="Ej. 120"
            />
            <div *ngIf="isFieldInvalid('guests')" class="error-msg">
              Indica el número estimado de invitados.
            </div>
          </div>

          <!-- Localización -->
          <div class="form-group full-width">
            <label for="location" class="form-label">
              Lugar / Ciudad del evento <span class="required">*</span>
            </label>
            <input
              id="location"
              type="text"
              formControlName="location"
              class="form-input"
              [class.is-invalid]="isFieldInvalid('location')"
              placeholder="Ej. Finca El Bosque, Madrid"
            />
            <div *ngIf="isFieldInvalid('location')" class="error-msg">
              Indica la localización o ciudad del evento.
            </div>
          </div>

          <!-- Mensaje / Notas adicionales -->
          <div class="form-group full-width">
            <label for="message" class="form-label">
              Mensaje o preferencias particulares <span class="optional">(opcional)</span>
            </label>
            <textarea
              id="message"
              formControlName="message"
              rows="4"
              class="form-input form-textarea"
              placeholder="Cuéntanos si tienes preferencia por cócteles específicos, temática especial, horarios o requisitos del recinto..."
            ></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button 
            type="submit" 
            class="btn btn-gold btn-lg w-full"
            [disabled]="contactService.state().status === 'submitting'"
          >
            <span *ngIf="contactService.state().status !== 'submitting'">
              Enviar solicitud de presupuesto
            </span>
            <span *ngIf="contactService.state().status === 'submitting'" class="loading-state">
              <span class="spinner"></span> Enviando propuesta...
            </span>
          </button>
          <p class="privacy-note">
            Tus datos se utilizarán exclusivamente para elaborar tu presupuesto. No enviamos spam.
          </p>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .contact-form-wrapper {
      padding: 2.5rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-gold);
      background: var(--bg-card);
      box-shadow: var(--shadow-card);

      @media (max-width: 600px) {
        padding: 1.5rem;
      }
    }

    .form-header {
      margin-bottom: 2rem;
      text-align: center;
    }

    .form-title {
      font-size: 1.85rem;
      font-family: var(--font-serif);
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .form-subtitle {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 520px;
      margin: 0 auto;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;

      @media (max-width: 650px) {
        grid-template-columns: 1fr;
      }
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .form-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);

      .required {
        color: var(--accent-gold);
      }

      .optional {
        color: var(--text-dimmed);
        font-weight: 400;
        font-size: 0.78rem;
      }
    }

    .form-input {
      width: 100%;
      padding: 0.85rem 1rem;
      background: rgba(11, 12, 14, 0.7);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
      font-size: 0.95rem;
      transition: all var(--transition-fast);

      &:focus {
        border-color: var(--accent-gold);
        background: rgba(11, 12, 14, 0.95);
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
      }

      &.is-invalid {
        border-color: #e63946;
        background: rgba(230, 57, 70, 0.05);
      }

      &::placeholder {
        color: var(--text-dimmed);
      }
    }

    .form-select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23d4af37' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      padding-right: 2.5rem;

      option {
        background: #15181f;
        color: var(--text-primary);
      }
    }

    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }

    .error-msg {
      font-size: 0.78rem;
      color: #e63946;
      font-weight: 500;
    }

    .form-actions {
      margin-top: 1.75rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.85rem;

      .w-full {
        width: 100%;
      }
    }

    .privacy-note {
      font-size: 0.78rem;
      color: var(--text-dimmed);
      text-align: center;
    }

    .loading-state {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(11, 12, 14, 0.3);
      border-top-color: #0b0c0e;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    // Success State
    .success-card {
      text-align: center;
      padding: 3rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .success-icon {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.12);
      border: 1px solid var(--border-gold);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ref-badge {
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--accent-gold);
      background: rgba(212, 175, 55, 0.1);
      padding: 0.35rem 0.85rem;
      border-radius: var(--radius-pill);
      border: 1px solid var(--border-gold);
    }

    .success-title {
      font-size: 1.9rem;
      font-family: var(--font-serif);
      color: var(--text-primary);
    }

    .success-msg {
      font-size: 1rem;
      color: var(--text-secondary);
      max-width: 540px;
      line-height: 1.6;
    }
  `]
})
export class ContactFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly contactService = inject(ContactService);
  private readonly route = inject(ActivatedRoute);

  @Input() defaultEventType?: string;
  @Input() defaultCocktail?: string;

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      eventType: ['', [Validators.required]],
      date: ['', [Validators.required]],
      guests: ['', [Validators.required, Validators.min(1)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      message: ['']
    });

    // Check query params
    this.route.queryParams.subscribe(params => {
      if (params['event']) {
        this.form.patchValue({ eventType: params['event'] });
      }
      if (params['cocktail']) {
        const currentMsg = this.form.get('message')?.value || '';
        this.form.patchValue({
          message: currentMsg ? `${currentMsg}\nInterés especial en el cóctel: ${params['cocktail']}` : `Interés especial en el cóctel: ${params['cocktail']}`
        });
      }
    });

    if (this.defaultEventType) {
      this.form.patchValue({ eventType: this.defaultEventType });
    }
  }

  isFieldInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.contactService.submitQuote(this.form.value).subscribe();
  }

  resetForm(): void {
    this.form.reset();
    this.contactService.resetState();
  }
}

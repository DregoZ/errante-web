import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'La Errante | Coctelería de Autor y Barras Móviles para Eventos'
  },
  {
    path: 'carta',
    loadComponent: () => import('./features/cocktails/cocktails-page.component').then(m => m.CocktailsPageComponent),
    title: 'Carta de Cócteles | La Errante'
  },
  {
    path: 'carta/:slug',
    loadComponent: () => import('./features/cocktails/cocktail-detail/cocktail-detail.component').then(m => m.CocktailDetailComponent)
  },
  {
    path: 'eventos',
    loadComponent: () => import('./features/events/events-page.component').then(m => m.EventsPageComponent),
    title: 'Eventos & Servicios | La Errante'
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./features/about/about-page.component').then(m => m.AboutPageComponent),
    title: 'Sobre Nosotros | La Errante'
  },
  {
    path: 'contacto',
    loadComponent: () => import('./features/contact/contact-page.component').then(m => m.ContactPageComponent),
    title: 'Contacto & Presupuesto | La Errante'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

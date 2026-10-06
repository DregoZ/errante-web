import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);

  private readonly siteName = 'Errante | Coctelería de Autor para Eventos';
  private readonly defaultDescription = 'Servicio premium de coctelería para bodas, eventos corporativos y celebraciones privadas. Barras móviles de diseño, mixología de autor y hospitalidad exclusiva.';
  private readonly defaultImage = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80';

  setSeoData(config: Partial<SeoConfig>): void {
    const fullTitle = config.title 
      ? `${config.title} | ${this.siteName}` 
      : this.siteName;
    const desc = config.description || this.defaultDescription;
    const img = config.image || this.defaultImage;
    const url = config.url || this.document.location?.href || 'https://errante-cocktails.com';

    this.titleService.setTitle(fullTitle);

    // Standard Meta
    this.metaService.updateTag({ name: 'description', content: desc });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.metaService.updateTag({ property: 'og:site_name', content: 'Errante Coctelería' });
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: desc });
    this.metaService.updateTag({ property: 'og:image', content: img });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:type', content: config.type || 'website' });

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: desc });
    this.metaService.updateTag({ name: 'twitter:image', content: img });
  }

  setSchemaJsonLd(schemaData: object): void {
    let scriptTag = this.document.getElementById('schema-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = this.document.createElement('script');
      scriptTag.id = 'schema-jsonld';
      scriptTag.type = 'application/ld+json';
      this.document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);
  }
}

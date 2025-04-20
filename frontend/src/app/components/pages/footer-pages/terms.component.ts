// src/app/pages/terms/terms.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  template: `
    <section class="bg-green-50 py-12">
      <div class="container mx-auto max-w-3xl space-y-6">
        <h1 class="text-4xl font-extrabold text-green-800 text-center">Conditions Générales d’Utilisation</h1>

        <article class="space-y-4">
          <h2 class="text-2xl font-semibold text-gray-800">1. Objet</h2>
          <p class="text-gray-600">
            Les présentes Conditions Générales d’Utilisation (CGU) définissent les modalités de mise
            à disposition et d’utilisation du site Thé Tip Top.
          </p>

          <h2 class="text-2xl font-semibold text-gray-800">2. Acceptation</h2>
          <p class="text-gray-600">
            L’utilisation du site implique l’acceptation pleine et entière des présentes CGU.
          </p>

          <h2 class="text-2xl font-semibold text-gray-800">3. Services</h2>
          <p class="text-gray-600">
            Thé Tip Top propose des concours, des contenus éditoriaux et un espace membre sécurisé.
          </p>

          <h2 class="text-2xl font-semibold text-gray-800">4. Responsabilité</h2>
          <p class="text-gray-600">
            Nous ne pouvons être tenus responsables des dommages directs ou indirects liés à l’utilisation
            du site, manquement dû à une mauvaise connexion internet ou usage inapproprié.
          </p>

          <h2 class="text-2xl font-semibold text-gray-800">5. Droits de Propriété</h2>
          <p class="text-gray-600">
            Tous les contenus (textes, images, logos) sont la propriété exclusive de Thé Tip Top.
          </p>
        </article>
      </div>
    </section>
  `
})
export class TermsComponent {}

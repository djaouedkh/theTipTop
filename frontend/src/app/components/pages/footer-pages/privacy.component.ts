// src/app/pages/privacy/privacy.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  template: `
    <section class="py-12">
      <div class="container mx-auto max-w-3xl space-y-6">
        <h1 class="text-4xl font-extrabold text-green-800">Politique de Confidentialité</h1>

        <p class="text-gray-600">
          Chez <span class="font-semibold">Thé Tip Top</span>, nous accordons une grande importance à la
          protection de vos données personnelles. Cette politique détaille comment nous les collectons,
          utilisons et protégeons.
        </p>

        <h2 class="text-2xl font-semibold text-gray-800">Données collectées</h2>
        <ul class="list-disc list-inside text-gray-600 space-y-1">
          <li>Informations d’inscription (nom, email)</li>
          <li>Données de participation aux concours</li>
          <li>Cookies de navigation (analytics, préférences)</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-800">Utilisation des données</h2>
        <p class="text-gray-600">
          Vos données servent à gérer votre compte, organiser les tirages au sort et améliorer nos services.
        </p>

        <h2 class="text-2xl font-semibold text-gray-800">Cookies</h2>
        <p class="text-gray-600">
          Nous utilisons des cookies techniques (nécessaires au fonctionnement) et analytiques.
          Vous pouvez gérer votre consentement via la bannière dédiée.
        </p>

        <h2 class="text-2xl font-semibold text-gray-800">Partage à des tiers</h2>
        <p class="text-gray-600">
          Vos informations ne sont jamais vendues. Nous pouvons partager des données anonymisées avec nos
          partenaires de confiance.
        </p>

        <h2 class="text-2xl font-semibold text-gray-800">Vos droits</h2>
        <p class="text-gray-600">
          Conformément au RGPD, vous pouvez accéder, corriger ou supprimer vos données en nous contactant à
          <a routerLink="/contact" class="text-green-600 hover:underline">Contact</a>.
        </p>
      </div>
    </section>
  `
})
export class PrivacyComponent {}

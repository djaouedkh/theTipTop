// src/app/pages/about/about.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section class="bg-green-50 py-12 min-h-[100vh]">
      <div class="container mx-auto grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 class="text-4xl font-extrabold text-green-800 mb-4">À propos de Thé Tip Top</h1>
          <p class="text-lg text-gray-700 mb-6">
            Chez <span class="font-semibold">Thé Tip Top</span>, nous croyons que chaque tasse de thé est
            une invitation au voyage et à la découverte. Depuis notre fondation, nous allions tradition
            et modernité pour vous offrir les meilleures expériences autour du thé.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start">
              <span class="material-icons text-green-500 mr-2">history</span>
              <div>
                <h2 class="font-semibold text-green-700">Notre Histoire</h2>
                <p class="text-gray-600">
                  Née d’une passion familiale, notre maison de thé a parcouru continents et cultures
                  pour sélectionner des feuilles rares et authentiques.
                </p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="material-icons text-green-500 mr-2">flag</span>
              <div>
                <h2 class="font-semibold text-green-700">Notre Mission</h2>
                <p class="text-gray-600">
                  Partager la magie du thé à travers des concours exclusifs, des événements et des
                  contenus inspirants..
                </p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="material-icons text-green-500 mr-2">favorite</span>
              <div>
                <h2 class="font-semibold text-green-700">Nos Valeurs</h2>
                <p class="text-gray-600">
                  Authenticité, innovation et convivialité guident toutes nos actions.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {}

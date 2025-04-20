// src/app/pages/faq/faq.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  template: `
    <section class="py-12 bg-white">
      <div class="container mx-auto max-w-2xl space-y-6">
        <h1 class="text-4xl font-extrabold text-green-800 text-center">Foire Aux Questions</h1>

        <div *ngFor="let item of faqs">
          <details class="border border-gray-200 rounded-lg p-4">
            <summary class="cursor-pointer font-medium text-gray-800 hover:text-green-600">
              {{ item.q }}
            </summary>
            <p class="mt-2 text-gray-600">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>
  `
})
export class FaqComponent {
  faqs = [
    {
      q: 'Comment puis-je participer au jeu‑concours ?',
      a: 'Inscrivez‑vous sur notre plateforme, puis rendez‑vous sur la page « Participez au Jeu‑Concours » pour entrer votre code de ticket.'
    },
    {
      q: 'Puis‑je participer plusieurs fois avec le même ticket ?',
      a: 'Non, chaque code de ticket est utilisable une seule fois pour garantir l’équité du tirage au sort.'
    },
    {
      q: 'Quel est le délai pour réclamer un lot gagnant ?',
      a: 'Vous avez 30 jours à compter de l’annonce des résultats pour réclamer votre lot.'
    },
    {
      q: 'Comment puis‑je contacter le service client ?',
      a: 'Rendez‑vous sur notre page « Contact » ou envoyez‑nous un email à support@thetiptop.fr.'
    }
  ];
}

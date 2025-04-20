import { Component } from '@angular/core';

@Component({
    selector: 'app-contact',
    template:`
<div class="container mx-auto p-6 max-w-lg">
    <h1 class="text-3xl font-bold mb-4">Nous contacter</h1>
    <form class="space-y-4">
        <div>
            <label class="block mb-1">Nom</label>
            <input type="text" class="w-full border rounded p-2" placeholder="Votre nom">
        </div>
        <div>
            <label class="block mb-1">Email</label>
            <input type="email" class="w-full border rounded p-2" placeholder="Votre email">
        </div>
        <div>
            <label class="block mb-1">Message</label>
            <textarea class="w-full border rounded p-2" rows="5" placeholder="Votre message"></textarea>
        </div>
        <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Envoyer
        </button>
    </form>
</div>  
    `
})
export class ContactComponent {}

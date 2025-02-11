// Importation des modules nécessaires pour les tests
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GainGetDto } from '../../../core/dtos/gains/gain-get.dto';
import { GainService } from '../../../core/services/gain.service';

// Déclaration de la suite de tests pour le HomeComponent
describe('HomeComponent', () => {
    // Déclaration des variables nécessaires pour les tests
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>; // Fixture pour le composant : contient le composant et sa vue
    let gainService: jasmine.SpyObj<GainService>; // Spy pour le service des gains, spy : sert à espionner les appels de méthodes
    let router: jasmine.SpyObj<Router>; // Spy pour le router

    // Initialisation du module de test
    beforeEach(async () => {
        // Création des spies pour GainService et Router
        const gainServiceSpy = jasmine.createSpyObj('GainService', ['getAll']); // Création d'un spy pour la méthode getAll(), espionne signifie qu'on peut vérifier si la méthode a été appelée
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']); // Création d'un spy pour la méthode navigate(), cela 

        // Configuration du module de test avec les dépendances nécessaires
        await TestBed.configureTestingModule({ // TestBed : permet de configurer un module de test Angular
            declarations: [HomeComponent], // Déclaration du composant testé
            providers: [
                { provide: GainService, useValue: gainServiceSpy }, // Injection du spy pour GainService
                { provide: Router, useValue: routerSpy }, // Injection du spy pour Router
            ],
            imports: [RouterTestingModule, HttpClientTestingModule], // Importation des modules nécessaires pour les tests
        }).compileComponents();

        // Injection des services simulés
        gainService = TestBed.inject(GainService) as jasmine.SpyObj<GainService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    // Création du composant avant chaque test
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent); // Création de l'instance du composant
        component = fixture.componentInstance; // Récupération de l'instance du composant
    });

    // Test pour vérifier la création du composant
    it('should create the component', () => {
        expect(component).toBeTruthy(); // Vérifie que le composant est créé correctement
    });

    // Test pour vérifier que la méthode getAllGains est appelée au chargement du composant
    it('should call getAllGains on ngOnInit', () => {
        // Arrange : Mock des données de gains
        const mockGains: GainGetDto[] = [
            { id: 1, name: 'Gain 1', desc: 'Description 1', price: 100, tickets: [] },
            { id: 2, name: 'Gain 2', desc: 'Description 2', price: 200, tickets: [] }
        ];
        gainService.getAll.and.returnValue(of(mockGains)); // Simulation du retour de la méthode getAll()

        // Act : Appel de la méthode ngOnInit
        component.ngOnInit();
        fixture.detectChanges(); // Détecte les changements dans le composant

        // Assert : Vérifie que la méthode getAll() a bien été appelée et que les gains ont été définis
        expect(gainService.getAll).toHaveBeenCalled();
        expect(component.gains).toEqual(mockGains);
    });

    // Test pour vérifier la gestion des erreurs lors de la récupération des gains
    it('should handle error when getAllGains fails', () => {
        // Arrange : Simulation d'une erreur lors de l'appel au service
        const error = new Error('Erreur lors de la récupération des prix');
        gainService.getAll.and.returnValue(throwError(() => error));
        spyOn(console, 'error'); // Spy sur console.error pour vérifier les erreurs loggées

        // Act : Appel de la méthode getAllGains
        component.getAllGains();

        // Assert : Vérifie que l'erreur est bien loggée
        expect(gainService.getAll).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith('Erreur lors de la récupération des prix : ', error);
    });
});

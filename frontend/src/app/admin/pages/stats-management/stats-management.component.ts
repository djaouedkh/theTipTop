import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { StatsService } from '../../../core/services/use-cases/stats.service';
import { AdvancedStatsDto } from '../../../core/dtos/use-cases/stats/advanced-stats.dto';
import { AgeGroup } from '../../../core/dtos/use-cases/stats/enums/age-group.enum';
import { Gender } from '../../../core/dtos/use-cases/stats/enums/gender.enum';

@Component({
  selector: 'app-stats-management',
  templateUrl: './stats-management.component.html'
})
export class StatsManagementComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  stats: AdvancedStatsDto | null = null;
  selectedGender: Gender | null = null;
  selectedAgeGroup: AgeGroup | null = null;

  genderChartOptions: Highcharts.Options = {};
  ageGroupChartOptions: Highcharts.Options = {};
  gainDistributionChartOptions: Highcharts.Options = {};

  // Pour accéder à l'enum dans le template
  Gender = Gender;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    this.statsService.getAllAdvancedStats().subscribe({
      next: (data: AdvancedStatsDto) => {
        this.stats = data;
        this.setupCharts();
      },
      error: (err: any) => {
        console.error("Erreur de récupération des statistiques : ", err);
      }
    });
  }

  setupCharts(): void {
    if (!this.stats) return;

    this.genderChartOptions = {
      chart: { type: 'pie' },
      title: { text: 'Répartition des Participants par Genre' },
      series: [{
        name: 'Participants',
        type: 'pie',
        data: [
          { name: 'Hommes', y: this.stats.participantsByGender.male },
          { name: 'Femmes', y: this.stats.participantsByGender.female }
        ]
      }]
    };

    this.ageGroupChartOptions = {
      chart: { type: 'column' },
      title: { text: 'Répartition des Participants par Groupe d\'Âge' },
      xAxis: { categories: Object.keys(this.stats.participantsByAgeGroup) },
      yAxis: { title: { text: 'Nombre de Participants' } },
      series: [{
        name: 'Participants',
        type: 'column',
        data: Object.values(this.stats.participantsByAgeGroup).map(value => typeof value === 'number' ? value : 0)
      }]
    };

    this.gainDistributionChartOptions = {
      chart: { type: 'bar' },
      title: { text: 'Distribution des Gains' },
      xAxis: { categories: Object.keys(this.stats.gainsDistribution) },
      yAxis: { title: { text: 'Nombre de Gains' } },
      series: [{
        name: 'Gains',
        type: 'bar',
        data: Object.values(this.stats.gainsDistribution).map(value => typeof value === 'number' ? value : 0)
      }]
    };
  }

  filterByGender(gender: Gender): void {
    this.selectedGender = gender;
    const genderLabel = gender === Gender.Male ? 'Hommes' : 'Femmes';
    
    this.statsService.getAllCountParticipantsByGender(gender).subscribe(count => {
        this.genderChartOptions = {
            chart: { type: 'pie' },
            title: { text: 'Répartition des Participants par Genre' },
            series: [{
                name: 'Participants',
                type: 'pie',
                data: [
                    { name: genderLabel, y: typeof count === 'number' ? count : 0 }
                ]
            }]
        };
    });
}

  resetFilters(): void {
    this.selectedGender = null;
    this.selectedAgeGroup = null;
    this.fetchStats();
  }

  // gerer les graphiques par filtres
  ageGroups = Object.keys(AgeGroup); // Assure-toi d'avoir importé `AgeGroup` au complet.
gainTypes: string[] = []; // Remplis-le dynamiquement avec les clés des types de gains

filterByAgeGroup(ageGroup: AgeGroup): void {
    this.selectedAgeGroup = ageGroup;
    // Ici, on peut mettre à jour le graphique de répartition par âge
    this.ageGroupChartOptions.series = [{
        name: 'Participants',
        type: 'column',
        data: [this.stats?.participantsByAgeGroup[ageGroup] || 0]
    }];
}

resetAgeGroupFilter(): void {
    this.selectedAgeGroup = null;
    this.setupCharts(); // Réinitialise les graphiques
}

filterByGainType(gainType: string): void {
    this.gainDistributionChartOptions.series = [{
        name: 'Gains',
        type: 'bar',
        data: [this.stats?.gainsDistribution[gainType] || 0]
    }];
}

resetGainTypeFilter(): void {
    this.setupCharts(); // Réinitialise les graphiques
}

}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MissionService } from '../../services/mission.service';

@Component({
  selector: 'app-mission-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div style="text-align:center; padding: 20px; font-family: sans-serif;">
      <h2 style="color: #005682;">🚀 Ajouter une Mission</h2>

      <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; display: inline-block; border-radius: 10px; background: #fff;">
        <input [(ngModel)]="nouvelleMission.titre" placeholder="Titre" style="margin: 5px; padding: 8px;">
        <input [(ngModel)]="nouvelleMission.client" placeholder="Client" style="margin: 5px; padding: 8px;">
        <button (click)="ajouterMission()" style="background: #005682; color: white; padding: 8px 15px; border: none; cursor: pointer; border-radius: 5px;">
          Ajouter
        </button>
      </div>
    <div style="text-align:center; padding: 20px;">
      <h2 style="color: #005682;">📋 Missions SogeTask</h2>

      @if (missions().length > 0) {
        <table style="margin: auto; width: 90%; border-collapse: collapse; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background-color: #005682; color: white;">
              <th style="padding: 12px;">Titre</th>
              <th style="padding: 12px;">Client</th>
              <th style="padding: 12px;">Statut</th>
            </tr>
          </thead>
          <tbody>
            @for (m of missions(); track m.id) {
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{{ m.titre }}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{{ m.client }}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">
                   <strong style="color: #28a745;">{{ m.statut }}</strong>
                </td>
              </tr>
            }
          </tbody>
        </table>
      } @else {
        <<p>Aucune mission trouvée.</p>
      }
    </div>
  `
})
export class MissionListComponent implements OnInit {
  // On utilise un "Signal", c'est la nouvelle techno Angular
  // qui force l'écran à se mettre à jour instantanément
  missions = signal<any[]>([]);

  // Objet temporaire pour le formulaire
  nouvelleMission = { titre: '', client: '', statut: 'EN_ATTENTE', description: 'Ajouté via Angular' };

  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.chargerDonnees();
  }

  chargerDonnees(){
    this.missionService.getMissions().subscribe(data => this.missions.set(data));
  }

  ajouterMission() {
    // 1. On appelle le service pour faire le POST vers le Java
    this.missionService.createMission(this.nouvelleMission).subscribe({
      next: (resultat) => {
        console.log('Mission ajoutée !', resultat);
        this.chargerDonnees(); // 2. On rafraîchit la liste pour voir la nouvelle mission
        this.nouvelleMission = { titre: '', client: '', statut: 'EN_ATTENTE', description: 'Ajouté via Angular' }; // 3. On vide le formulaire
      },
      error: (err) => console.error('Erreur lors de l\'ajout', err)
    });
  }
}

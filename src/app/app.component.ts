import { Component } from '@angular/core';
import { MissionListComponent } from './components/mission-list/mission-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MissionListComponent],
  template: `
    <h1>SogeTask - Gestion des Missions</h1>
    <app-mission-list></app-mission-list>
  `
})
export class AppComponent { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private apiUrl = 'http://localhost:8081/api/missions'; // L'adresse de ton Java !

  constructor(private http: HttpClient) { }

  getMissions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

createMission(mission: any): Observable<any> {
  return this.http.post(this.apiUrl, mission);
}
}

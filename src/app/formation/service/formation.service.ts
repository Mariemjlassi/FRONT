import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormationDto } from '../model/FormationDto.model';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:9090/formations';
  headers : any;
  constructor(private http: HttpClient, private authservice: AuthService) {
    this.headers = this.authservice.createAuthorizationHeader();
  }

  creerFormation(rhId: number, formation: FormationDto): Observable<FormationDto> {
    return this.http.post<FormationDto>(`${this.apiUrl}/${rhId}/creer`, formation, { headers: this.headers });
  }
  getFormationsParRH(rhId: number): Observable<FormationDto[]> {
    return this.http.get<FormationDto[]>(`${this.apiUrl}/${rhId}`, { headers: this.headers });
  }



}

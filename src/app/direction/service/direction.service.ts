import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direction } from '../model/Direction';
import { DirectionDTO } from '../model/DirectionDTO';
import { Site } from '../../site/model/site';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  private apiUrl = 'http://localhost:9090/api/directions'; 
  headers : any;
    constructor(private http: HttpClient, private authservice: AuthService) {
      this.headers = this.authservice.createAuthorizationHeader();
    }


  addDirection(directionDTO: DirectionDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, directionDTO, { headers: this.headers });
  }

   getAllDirections(): Observable<Direction[]> {
      return this.http.get<Direction[]>(this.apiUrl, { headers: this.headers });
    }


    getAllDirectionsArchivés(): Observable<Direction[]> {
      return this.http.get<Direction[]>(`${this.apiUrl}/liste-directions-archivés`, { headers: this.headers });
    }


    desarchiverDirection(id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}/desarchiver`, {}, { headers: this.headers });
    }

    archiverDirection(id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}/archiver`, {}, { headers: this.headers });
    }

    updateDirection(id: number, directionDTO: DirectionDTO): Observable<Direction> {
      const url = `${this.apiUrl}/${id}`;  // Construction de l'URL avec l'ID
      return this.http.put<Direction>(url, directionDTO, { headers: this.headers });  // Requête PUT pour mettre à jour la direction
    }



      getSitesByDirection(directionId: number): Observable<Site[]> {
        return this.http.get<Site[]>(`${this.apiUrl}/${directionId}/sites`, { headers: this.headers });
      }

}

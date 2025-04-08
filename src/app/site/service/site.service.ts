import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from '../model/site';

import { Poste } from '../../poste/model/poste';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private apiUrl = 'http://localhost:9090/api/sites';

  private apiUrll = 'http://localhost:9090/recrutement/postes';

  headers : any;
  constructor(private http: HttpClient, private authservice: AuthService) {
    this.headers = this.authservice.createAuthorizationHeader();
  }

  getAllSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.apiUrl}/non-archives`, { headers: this.headers });
  }

/*  ajouterSite(site: Site): Observable<Site> {
    return this.http.post<Site>(`${this.apiUrl}/ajouter`, site);
  }
*/


ajouterSite(site: Site): Observable<Site> {
  return this.http.post<Site>(`${this.apiUrl}/ajouter`, site, { headers: this.headers });
}
  
  deleteSite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
  archiverSite(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/archiver`, {}, { headers: this.headers });
  }

  getAllDirectionsArchivés(): Observable<Site[]> {
        return this.http.get<Site[]>(`${this.apiUrl}/liste-sites-archivés`, { headers: this.headers });
      }


    






      desarchiverSite(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}/desarchiver`, {});
      }


   


}

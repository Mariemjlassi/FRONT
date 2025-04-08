import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poste } from '../model/poste';
import { PosteDTO } from '../model/PosteDTO';
import { AuthService } from '../../auth/service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class PosteService {
  private apiUrl = `http://localhost:9090/recrutement/postes`; // Remplace `apiUrl` par l'URL de ton backend

  headers : any;
  constructor(private http: HttpClient, private authservice: AuthService) {
    this.headers = this.authservice.createAuthorizationHeader();
  }

  ajouterPoste(posteDTO: PosteDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/ajouter`, posteDTO, { headers: this.headers });  // Passe l'objet posteDTO en tant que body
  }

  getAllPostes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
  }

  getPosteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  updatePoste(id: number, updatedPoste: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedPoste, { headers: this.headers });
  }


  
  getAllPostesnonArchives(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.apiUrl}/getAllPostesnonArchivés`, { headers: this.headers });
  }

 
  getAllPostesArchives(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.apiUrl}/liste-Postes-archivés`, { headers: this.headers });
  }

 
  archiverPoste(id: number): Observable<Poste> {
    return this.http.put<Poste>(`${this.apiUrl}/${id}/archiver`, {}, { headers: this.headers });
  }

  desarchiverPoste(id: number): Observable<Poste> {
    return this.http.put<Poste>(`${this.apiUrl}/${id}/desarchiver`, {}, { headers: this.headers });
  }
  updatePostee(id: number, posteDto: PosteDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, posteDto, { headers: this.headers });
  }


  getDirectionsByPosteId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/directions`, { headers: this.headers });
  }

}

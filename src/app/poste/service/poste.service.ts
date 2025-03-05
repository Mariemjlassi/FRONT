import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poste } from '../model/poste';
import { PosteDTO } from '../model/PosteDTO';


@Injectable({
  providedIn: 'root'
})
export class PosteService {
  private apiUrl = `http://localhost:9090/recrutement/postes`; // Remplace `apiUrl` par l'URL de ton backend

  constructor(private http: HttpClient) {}

  ajouterPoste(posteDTO: PosteDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/ajouter`, posteDTO);  // Passe l'objet posteDTO en tant que body
  }
  // Récupérer tous les postes
  getAllPostes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un poste par ID
  getPosteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un poste
  updatePoste(id: number, updatedPoste: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedPoste);
  }

  // Supprimer un poste
  
  getAllPostesnonArchives(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.apiUrl}/getAllPostesnonArchivés`);
  }

 
  getAllPostesArchives(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.apiUrl}/liste-Postes-archivés`);
  }

  // 🔹 Archiver un poste
  archiverPoste(id: number): Observable<Poste> {
    return this.http.put<Poste>(`${this.apiUrl}/${id}/archiver`, {});
  }

  // 🔹 Désarchiver un poste
  desarchiverPoste(id: number): Observable<Poste> {
    return this.http.put<Poste>(`${this.apiUrl}/${id}/desarchiver`, {});
  }
  updatePostee(id: number, posteDto: PosteDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, posteDto);
  }


  getDirectionsByPosteId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/directions`);
  }

}

import { Component, OnInit } from '@angular/core';
import { Message } from '../model/message';
import { MessageService } from '../service/message.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/service/auth.service';
import { UtilisateurService } from '../../utilisateur/service/utilisateur.service';
import { Utilisateur } from '../../utilisateur/model/utilisateur';

@Component({
  selector: 'app-message-compose',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './message-compose.component.html',
  styleUrl: './message-compose.component.css'
})
export class MessageComposeComponent implements OnInit{
  utilisateurs: Utilisateur[] = [];
  message: Message = {
    sujet: '',
    contenu: '',
    expediteurId: 0,
    destinataireId: 0,
  };


  constructor(private messageService: MessageService, private authService: AuthService, private utilisateurService: UtilisateurService) {}
  ngOnInit(): void {
    const id = this.authService.getUserId();
    if (id) {
      this.message.expediteurId = id;
    }

    // Récupère tous les utilisateurs
    this.utilisateurService.getAllUsers().subscribe(data => {
      this.utilisateurs = data.filter(u => u.id !== id); // facultatif : exclure soi-même
    });
  }
  envoyer() {
    this.messageService.envoyer(this.message).subscribe({
      next: res => alert('Message envoyé avec succès !'),
      error: err => console.error(err)
    });
  }
}

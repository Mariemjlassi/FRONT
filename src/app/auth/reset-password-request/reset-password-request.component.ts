import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reset-password-request',
  imports: [ReactiveFormsModule,FormsModule, ButtonModule],
  templateUrl: './reset-password-request.component.html',
  styleUrl: './reset-password-request.component.css',
  providers: [MessageService]
})
export class ResetPasswordRequestComponent {
  email: string = '';

  constructor(private http: HttpClient, private messageService: MessageService) {}

  requestPasswordReset() {
    const body = { email: this.email };
  
    this.http.post('http://localhost:9090/utilisateurs/request-password-reset', body)
      .subscribe(
        () => this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Email envoyé !' }),
        (error) => {
          console.error(error);  // Affichez l'erreur pour avoir plus de détails sur la raison de l'échec
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de l\'envoi' });
        }
      );
  }
  
  
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, FormsModule, DialogModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  providers:[MessageService]
})
export class ResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private messageService: MessageService) {}

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Les mots de passe ne correspondent pas' });
      return;
    }

    const resetPasswordRequest = {
      token: this.token,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    };

    this.http.post('http://localhost:9090/utilisateurs/reset-password', resetPasswordRequest)
      .subscribe(
        (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: response });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la réinitialisation du mot de passe' });
        }
      );
  }
}
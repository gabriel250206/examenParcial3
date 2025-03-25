import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ToastController, IonItem, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonItem, IonLabel, IonButton, IonInput, ReactiveFormsModule]
})
export class PasswordResetPage {
  resetForm = new FormGroup({
    email: new FormControl('')
  });

  constructor(private authService: AuthService, private toastController: ToastController, private router: Router) {}

  async resetPassword() {
    const email = this.resetForm.value.email;
    if (!email) {
      this.showToast('Escribe tu correo');
      return;
    }
  
    try {
      await this.authService.resetPassword(email);
      this.showToast('Se te envió un correo, revísalo');
    } catch (error: any) {
      this.showToast('Error: ' + error.message);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'primary'
    });
    await toast.present();
  }

  onLogin() {
    this.router.navigateByUrl("home");
  }
}

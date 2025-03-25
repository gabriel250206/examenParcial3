import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule,],
})
export class HomePage {
  email = '';
  password = '';

  constructor(private alertController: AlertController, private router: Router, private auth: AuthService) { }

  async onSubmit() {
    
    if (!this.email || !this.password) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please enter both email and password.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (await this.auth.login(this.email, this.password)) {
      const alert = await this.alertController.create({
        header: 'Login Success',
        message: 'You have logged in successfully!',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigateByUrl("lista");
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please check your credentials.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }


  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email); 
  }

 
  onSignUp() {
    this.router.navigateByUrl("sign-up");
  }

 
  onReset() {
    this.router.navigateByUrl("password-reset");
  }


}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';  
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]  
})
export class SignUpPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authS: AuthService ) { }



  ngOnInit() {}

  async onSubmit(){
    try {
      await this.authS.register(this.email,this.password);
      console.log('funciona');
      this.router.navigate(['/home']);
    } catch (error) {
      console.log('NO funciona',error);
    }
   }

  onSignUp() {
    console.log('Llendo a Inicio');
    this.router.navigate(['/home']);
  }
}
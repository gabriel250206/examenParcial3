import { Component, OnInit } from '@angular/core';
import { IonContent, IonCard } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { TaskService, Task } from '../task.service'; 
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, NgFor,FormsModule]
})
export class ListaPage implements OnInit {

  tasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(public taskService: TaskService, private auth:AuthService, private router:Router) {}

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks();
    console.log(this.tasks$);
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email); 
  }
  

  addItem(name: string, lname: string, matricula:string, correo:string, DAMM:string, OCA:string, MATE:string, PMP: string, M3D:string): void {
    if (name.trim() && lname.trim() && matricula.trim() && correo.trim() && DAMM.trim() && OCA.trim() && MATE.trim() && PMP.trim() && M3D.trim() && this.validateEmail(correo)) {
      const newTask: Task = { 
        name: name.trim(),
        lname: lname.trim(),
        matricula: matricula.trim(),
        correo: correo.trim(),
        DAMM: DAMM.trim(),
        OCA: OCA.trim(),
        MATE: MATE.trim(),
        PMP: PMP.trim(),
        M3D: M3D.trim(),
        
      };

      this.taskService.addTask(newTask)
        .then(() => console.log('calificacion agregada correctamente'))
        .catch(error => console.error('Error al agregar calificacion:', error));
    } else {
      console.error('No pueden estar vacíos');
    }
  }
  deleteItem(id: string): void {
    this.taskService.deleteTask(id).then(() => {
      console.log('calificacion eliminado correctamente');
    }).catch(error => {
      console.error('Error al eliminar calificacion:', error);
    });
  }
  editTask(id: string, name: string, lname: string, matricula:string, correo:string, DAMM:string, OCA:string, MATE:string, PMP: string, M3D:string): void {
    this.taskService.updateTask(id, { name, lname,matricula,correo, DAMM, OCA, MATE, PMP, M3D}).then(() => {
      console.log('número actualizado correctamente');
    }).catch(error => {
      console.error('Error al actualizar número:', error);
    });
  }
  // toggleCompleted(id: string, event: Event): void {
  //   const inputElement = event.target as HTMLInputElement; 
  //   const completed = inputElement.checked;
  
  //   this.taskService.updateTask(id, { completed }).then(() => {
  //     console.log('Estado de número actualizado');
  //   }).catch(error => {
  //     console.error('Error al actualizar estado:', error);
  //   });
  // }
  async logout(){
    await this.auth.logout();
    this.router.navigateByUrl('home');
  }
}

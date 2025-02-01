import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MockDataService } from './services/mock-data.service';
import { BehaviorSubject } from 'rxjs';


export interface Todo{
  id:number;
  task:string;
  completed:boolean;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, NgFor, MatDialogModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit {
  constructor(private mockDataService: MockDataService) {}

  todoList : Todo [] = [];
  newTask:string = ''
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  

  addTask():void{
    if(this.newTask.trim() !== ''){

      const newTodoItem : Todo = {
          id : Date.now(),
          task : this.newTask,
          completed:false
      }
      this.todoList.push(newTodoItem);
      this.todosSubject.next(this.todoList);
      sessionStorage.setItem('todoList', JSON.stringify(this.todoList));
      this.newTask = '';

    }
  }
  toggleCompleted(index:number):void{
    this.todoList[index].completed = !this.todoList[index].completed;
    this.todosSubject.next(this.todoList);
    sessionStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
  deleteTask(id:number):void{
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.todosSubject.next(this.todoList);
    sessionStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
  deleteAll():void{
    this.todoList = []
    this.todosSubject.next(this.todoList);
    sessionStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
  
  ngOnInit() {
    const savedTodos = sessionStorage.getItem('todoList');
    if (savedTodos) {
      this.todoList = JSON.parse(savedTodos);
      console.log(savedTodos);
    } else{
   this.mockDataService.getMockData().subscribe(response => {
      this.todoList = response.todoList;
      sessionStorage.setItem('todoList', JSON.stringify(this.todoList));
    });
  }
}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

interface TodoResponse {
  todoList: Todo[];
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private jsonUrl = 'assets/data.json'; 
  private todoList: Todo[] = []; 
  private todosSubject = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {}
  getMockData(): Observable<TodoResponse> {
    return this.http.get<TodoResponse>(this.jsonUrl);
  }

  
}
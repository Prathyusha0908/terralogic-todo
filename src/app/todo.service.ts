import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private storageKey = 'todos';

  constructor() {}

  // Save appointments in localStorage
  saveTodos(todos: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  // Get all appointments from localStorage
  getTodos(): any[] {
    const todos = localStorage.getItem(this.storageKey);
    return todos ? JSON.parse(todos) : [];
  }

  // Add a new appointment
  addTodo(todo: any): void {
    const todos = this.getTodos();
    todos.push(todo);
    this.saveTodos(todos);
  }

  // Update an existing appointment
  updateTodo(updatedTodo: any): void {
    const todos = this.getTodos();
    const index = todos.findIndex((a) => a.id === updatedTodo.id);
    if (index !== -1) {
      todos[index] = updatedTodo;
      this.saveTodos(todos);
    }
  }

  // Delete an appointment by ID
  deleteTodo(id: number): void {
    const todos = this.getTodos();
    const filteredTodos = todos.filter((a) => a.id !== id);
    this.saveTodos(filteredTodos);
  }

}

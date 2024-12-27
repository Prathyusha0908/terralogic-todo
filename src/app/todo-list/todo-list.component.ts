import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todoForm!: FormGroup;
  todos: any[] = [];
  selectedtodo: any = null;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
    });

    this.loadTodos();
  }

  loadTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;

      if (this.selectedtodo) {
        // Update appointment
        const updatedAppointment = { ...this.selectedtodo, ...formValue };
        this.todoService.updateTodo(updatedAppointment);
      } else {
        // Create new appointment
        const newAppointment = { ...formValue, id: Date.now() };
        this.todoService.addTodo(newAppointment);
      }

      this.todoForm.reset();
      this.selectedtodo = null;
      this.loadTodos();
    }
  }

  onEdit(appointment: any): void {
    this.selectedtodo = appointment;
    this.todoForm.setValue({
      title: appointment.title,
      date: appointment.date,
    });
  }

  onDelete(appointment: any): void {
    this.todoService.deleteTodo(appointment.id);
    this.loadTodos();
  }

}

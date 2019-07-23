import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from 'src/app/shared/todoService.service';
import { Todo } from 'src/app/shared/todo.model';
import { ToastrService } from 'ngx-toastr';
import { ServiceProvider } from 'src/providers/service/service';

@Component({
  selector: 'app-todo-detail-list',
  templateUrl: './todo-detail-list.component.html',
  styles: []
})
export class TodoDetailListComponent implements OnInit {
  list: any;
  constructor(private api : ServiceProvider, public service: TodoServiceService,
    private toastr: ToastrService) {}
     ngOnInit() {
       this.service.refreshList(this.service.filtre)
  }

  // getTodos(s){
  //    if(s=='All'){
  //      this.api.get("/todo").subscribe(
  //        res => {
  //          this.list = res;
  //        }
  //      )
  //    }
  //}

  DeleteALLTodo(){
      this.service.deleteAllTodos()
      this.toastr.success('Todos Was Deleted successfully', 'Todo Deleting');
    }

    getInfos(item : Todo){
     this.service.formData = item;
     this.service.Disable=false;
    }

    DeleteTodo(item : Todo){
      this.service.deleteTodo(item.todoId);
      this.toastr.success('Todo Was Deleted successfully', 'Todo Deleting');

    }
  
    
   
  }

    
    


import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient} from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
formData : Todo;
list : Todo[];

filtre :string = "All"
Disable : boolean = true;
readonly rootURL = '/api';
  constructor(private http : HttpClient,
    private toastr: ToastrService) { }

  //Get All TODOS
  refreshList(f){
    return this.http.get(this.rootURL + '/todo')
    .toPromise().then(res=>{
      this.list=res as Todo[]
      this.filterTodos(this.filtre)
    });
  
  }
  //Get A TODO
  filterTodos(f){
    if (f=='Active'){
      this.list=this.list.filter(x=>x.completed==false)
    }if (f=='Completed'){
      this.list=this.list.filter(x=>x.completed)
    }
  }

  getTodo(id){
    return this.http.get(this.rootURL + `/todo/${id}`).toPromise()
    .then(
      res=>{
        this.formData = res as Todo
      },
      err=>{
        console.log(err)
      }
    )
  }

  //Put A Todo
  putTodo(){
   return this.http.put(this.rootURL + '/todo/'+this.formData.todoId,this.formData);
  }

  //Post A TODO
  postTodo(){
    const body = {
      title : this.formData.title,
      completed: this.formData.completed,
      optimalLine: this.formData.optimalLine
    }
    this.http.post(this.rootURL+'/todo', body)
     .subscribe(
       result => {
         this.refreshList(this.filtre)
         this.ResetForm()
         this.toastr.success('Todo Was Added Successfully', 'Todo Adding');
       },
       () => {
    }
     )
  }

  //Delete All TODOS
  deleteAllTodos() {
    this.http.delete(this.rootURL+'/todo').subscribe(
      res=>{
        this.refreshList(this.filtre)
      },
      err=>{
        console.log(err)
      }
    )
  }
  //Delete A Todo
  deleteTodo(id){
    this.http.delete(this.rootURL+`/todo/${id}`).subscribe(
      res=>{
        this.refreshList(this.filtre)
      },
      err=>{
        console.log(err)
      }
    )
  }


  filterlist(fil : string){
      this.filtre=fil;
      this.refreshList(this.filtre)
    }

    ResetForm(form? : any){
      if(form != null)
      form.form.reset();
        this.formData={
        todoId : 0,
        title:'',
        optimalLine:null,
        completed:false,
      }
    }
}

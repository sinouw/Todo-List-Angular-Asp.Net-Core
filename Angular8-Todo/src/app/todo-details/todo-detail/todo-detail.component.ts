import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TodoServiceService } from 'src/app/shared/todoService.service';
import { format } from 'url';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styles: []
})
export class TodoDetailComponent implements OnInit {
  constructor( private service : TodoServiceService,
    private toastr: ToastrService) { }
  checkIt : boolean = false;
  formdisabled : boolean
  ngOnInit() {
    this.service.ResetForm();
  }


  Undo(){
    this.service.formData={
      todoId : 0,
      title:'',
      optimalLine:null,
      completed:false,
    }
    this.service.Disable=true;
  }

  onSubmit(form : NgForm)
  {

   if(this.service.formData.title!='' && this.service.formData.optimalLine!=null){ 
    if(this.service.formData.todoId==0)
    {
      this.addTodo(form);
      this.service.Disable=true;
    }
    else
    this.putTodo(form)
  }
  if(this.service.formData.title=='' || this.service.formData.optimalLine==null){ 
    this.toastr.error('Form Error', 'Verify Your Form');
  }
  
   
}

  addTodo(form : NgForm){
     this.service.postTodo()
     //.subscribe(
    //   res=>{
    //     this.ResetForm(form);
    //     this.toastr.success('Todo Was Added Successfully', 'Todo Adding');
    // },
    // err=>{
    //   console.log(err)
    // });
    // this.service.refreshList(this.service.filtre);
  }

  putTodo(form :NgForm){
    this.service.putTodo().subscribe(
      res=>{
        this.service.ResetForm(form)
        this.toastr.info('Todo Was Updated successfully', 'Todo Updating');
        this.service.refreshList(this.service.filtre);
        this.service.Disable=true;
      },
      err=>{
        console.log(err)
      }
    )
    
  }

  checkedd(){
    this.service.formData.completed = ! this.service.formData.completed 
  }


  

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodoDetailComponent } from './todo-details/todo-detail/todo-detail.component';
import { TodoDetailListComponent } from './todo-details/todo-detail-list/todo-detail-list.component';
import { TodoServiceService } from './shared/todoService.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ServiceProvider } from 'src/providers/service/service';





@NgModule({
  declarations: [
    AppComponent,
    TodoDetailsComponent,
    TodoDetailComponent,
    TodoDetailListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [TodoServiceService, ServiceProvider ],
  bootstrap: [AppComponent]
})
export class AppModule { }

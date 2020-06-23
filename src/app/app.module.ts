import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudBasicComponent } from './UI/crud-basic/crud-basic.component';
import { ShowTableComponent } from './UI/show-table/show-table.component';
import { ModifyObjectComponent } from './UI/modify-object/modify-object.component';
import { CrudStatementComponent } from './UI/crud-statement/crud-statement.component';
import { ProducerComponent } from './ModelCRUD/producer/producer.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateObjectComponent } from './UI/create-object/create-object.component';
import { AuthorizationInterceptorService } from './Service/Authorization/authorization-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CrudBasicComponent,
    ShowTableComponent,
    ModifyObjectComponent,
    CrudStatementComponent,
    ProducerComponent,
    CreateObjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

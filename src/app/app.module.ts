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
import { DeleteObjectComponent } from './UI/delete-object/delete-object.component';
import { ProviderComponent } from './ModelCRUD/provider/provider.component';
import { CategoryComponent } from './ModelCRUD/category/category.component';
import { NavbarComponent } from './UI/navbar/navbar.component';
import { NotFoundComponent } from './Wildcards/not-found/not-found.component';
import { ItemComponent } from './ModelCRUD/item/item.component';
import { ItemCreateComponent } from './ModelCRUD/CRUD/item-create/item-create.component';
import { SelectObjectComponent } from './UI/select-object/select-object.component';
import { ItemModifyComponent } from './ModelCRUD/CRUD/item-modify/item-modify.component';
import { ItemDeleteComponent } from './ModelCRUD/CRUD/item-delete/item-delete.component';
import { LoginComponent } from './UI/login/login.component';
import { LoginErrorComponent } from './UI/login-error/login-error.component';
import { FilterArrayComponent } from './ModelCRUD/CRUD/filter-array/filter-array.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudBasicComponent,
    ShowTableComponent,
    ModifyObjectComponent,
    CrudStatementComponent,
    ProducerComponent,
    CreateObjectComponent,
    DeleteObjectComponent,
    ProviderComponent,
    CategoryComponent,
    NavbarComponent,
    NotFoundComponent,
    ItemComponent,
    ItemCreateComponent,
    SelectObjectComponent,
    ItemModifyComponent,
    ItemDeleteComponent,
    LoginComponent,
    LoginErrorComponent,
    FilterArrayComponent,
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

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CrudBasicComponent} from './UI/crud-basic/crud-basic.component';
import {ShowTableComponent} from './UI/show-table/show-table.component';
import {ModifyObjectComponent} from './UI/modify-object/modify-object.component';
import {CrudStatementComponent} from './UI/crud-statement/crud-statement.component';
import {ProducerComponent} from './ModelCRUD/producer/producer.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CreateObjectComponent} from './UI/create-object/create-object.component';
import {AuthorizationInterceptorService} from './Service/Authorization/authorization-interceptor.service';
import {DeleteObjectComponent} from './UI/delete-object/delete-object.component';
import {ProviderComponent} from './ModelCRUD/provider/provider.component';
import {CategoryComponent} from './ModelCRUD/category/category.component';
import {NavbarComponent} from './UI/navbar/navbar.component';
import {NotFoundComponent} from './Wildcards/not-found/not-found.component';
import {ItemComponent} from './ModelCRUD/item/item.component';
import {ItemCreateComponent} from './ModelCRUD/CRUD/item-create/item-create.component';
import {SelectObjectComponent} from './UI/select-object/select-object.component';
import {ItemModifyComponent} from './ModelCRUD/CRUD/item-modify/item-modify.component';
import {ItemDeleteComponent} from './ModelCRUD/CRUD/item-delete/item-delete.component';
import {LoginComponent} from './UI/login/login.component';
import {LoginErrorComponent} from './UI/login-error/login-error.component';
import {FilterArrayComponent} from './ModelCRUD/CRUD/filter-array/filter-array.component';
import {OrderNewComponent} from './ModelCRUD/order-new/order-new.component';
import {OrderCreateComponent} from './ModelCRUD/CRUD/order-create/order-create.component';
import {RegisterComponent} from './UI/register/register.component';
import {OrderNewListComponent} from './ModelCRUD/CRUD/order-new-list/order-new-list.component';
import {OrderCurrentComponent} from './ModelCRUD/order-current/order-current.component';
import {OrderDetailsComponent} from './ModelCRUD/order-details/order-details.component';
import {OrderDetailsFrameComponent} from './UI/order-details-frame/order-details-frame.component';
import {OrderDetailsItemListComponent} from './UI/order-details-item-list/order-details-item-list.component';
import {OrderDetailAddListComponent} from './UI/order-detail-add-list/order-detail-add-list.component';
import {OrderFinishedComponent} from './ModelCRUD/order-finished/order-finished.component';
import {OrderSuperuserComponent} from './ModelCRUD/order-superuser/order-superuser.component';
import {NotEnoughPermissionsComponent} from './Wildcards/not-enough-permissions/not-enough-permissions.component';
import {OrderSuperuserDetailsComponent} from './ModelCRUD/order-superuser-details/order-superuser-details.component';
import {OrderSuperuserDetailsInfoComponent} from './UI/order-superuser-details-info/order-superuser-details-info.component';
import {ItemDetailsComponent} from './ModelCRUD/item-details/item-details.component';
import {SortItemsInOrderComponent} from './UI/sort-items-in-order/sort-items-in-order.component';
import {AdminPanelComponent} from './ModelCRUD/admin-panel/admin-panel.component';
import {UploadFileComponent} from './UI/upload-file/upload-file.component';
import {ShowTableItemComponent} from './UI/show-table-item/show-table-item.component';
import {ToDoListComponent} from './ModelCRUD/to-do-list/to-do-list.component';

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
    OrderNewComponent,
    OrderCreateComponent,
    RegisterComponent,
    OrderNewListComponent,
    OrderCurrentComponent,
    OrderDetailsComponent,
    OrderDetailsFrameComponent,
    OrderDetailsItemListComponent,
    OrderDetailAddListComponent,
    OrderFinishedComponent,
    OrderSuperuserComponent,
    NotEnoughPermissionsComponent,
    OrderSuperuserDetailsComponent,
    OrderSuperuserDetailsInfoComponent,
    ItemDetailsComponent,
    SortItemsInOrderComponent,
    AdminPanelComponent,
    UploadFileComponent,
    ShowTableItemComponent,
    ToDoListComponent,
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
export class AppModule {
}

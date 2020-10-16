import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProducerComponent} from './ModelCRUD/producer/producer.component';
import {CategoryComponent} from './ModelCRUD/category/category.component';
import {ProviderComponent} from './ModelCRUD/provider/provider.component';
import {NotFoundComponent} from './Wildcards/not-found/not-found.component';
import {ItemComponent} from './ModelCRUD/item/item.component';
import {LoginComponent} from './UI/login/login.component';
import {AuthorizationGuardService} from './Service/Authorization/authorization-guard.service';
import {LoginErrorComponent} from './UI/login-error/login-error.component';
import {OrderNewComponent} from './ModelCRUD/order-new/order-new.component';
import {RegisterComponent} from './UI/register/register.component';
import {OrderCurrentComponent} from './ModelCRUD/order-current/order-current.component';
import {OrderDetailsComponent} from './ModelCRUD/order-details/order-details.component';
import {OrderFinishedComponent} from './ModelCRUD/order-finished/order-finished.component';
import {OrderSuperuserComponent} from './ModelCRUD/order-superuser/order-superuser.component';
import {NotEnoughPermissionsComponent} from './Wildcards/not-enough-permissions/not-enough-permissions.component';
import {SuperuserGuardService} from './Service/Utilities/superuser-guard.service';
import {OrderSuperuserDetailsComponent} from './ModelCRUD/order-superuser-details/order-superuser-details.component';
import {ItemDetailsComponent} from './ModelCRUD/item-details/item-details.component';
import {AdminPanelComponent} from './ModelCRUD/admin-panel/admin-panel.component';
import {AdminGuardService} from './Service/Utilities/admin-guard.service';
import {ToDoListComponent} from './ModelCRUD/to-do-list/to-do-list.component';
import {ItemBorrowedComponent} from './ModelCRUD/item-borrowed/item-borrowed.component';
import { OrderAllComponent } from './ModelCRUD/order-all/order-all.component';


const routes: Routes = [
  {path: 'producer', component: ProducerComponent, canActivate: [AuthorizationGuardService]},
  {path: 'provider', component: ProviderComponent, canActivate: [AuthorizationGuardService]},
  {path: 'category', component: CategoryComponent, canActivate: [AuthorizationGuardService]},
  {path: 'not-found', component: NotFoundComponent, canActivate: [AuthorizationGuardService]},
  {path: 'item', component: ItemComponent, canActivate: [AuthorizationGuardService]},
  {path: 'order-new', component: OrderNewComponent, canActivate: [AuthorizationGuardService]},
  {path: 'order-current', component: OrderCurrentComponent, canActivate: [AuthorizationGuardService]},
  {path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [AuthorizationGuardService], },
  {
    path: 'order-superuser-details/:id',
    component: OrderSuperuserDetailsComponent,
    canActivate: [AuthorizationGuardService, SuperuserGuardService]
  },
  {path: 'order-finished', component: OrderFinishedComponent, canActivate: [AuthorizationGuardService]},
  {path: 'order-superuser', component: OrderSuperuserComponent, canActivate: [AuthorizationGuardService, SuperuserGuardService]},
  {path: 'item-details/:id', component: ItemDetailsComponent, canActivate: [AuthorizationGuardService]},
  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthorizationGuardService, AdminGuardService]},
  {path: 'item-borrowed', component: ItemBorrowedComponent, canActivate: [AuthorizationGuardService]},
  {path: 'order-all', component:OrderAllComponent, canActivate: [AuthorizationGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login-error', component: LoginErrorComponent},
  {path: 'not-enough-permissions', component: NotEnoughPermissionsComponent},
  {path: 'to-do-list', component: ToDoListComponent, canActivate: [AuthorizationGuardService]},
  {path: '', redirectTo: '/item', pathMatch: 'full', canActivate: [AuthorizationGuardService]},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

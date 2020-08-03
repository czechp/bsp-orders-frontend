import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProducerComponent } from './ModelCRUD/producer/producer.component';
import { CategoryComponent } from './ModelCRUD/category/category.component';
import { ProviderComponent } from './ModelCRUD/provider/provider.component';
import { NotFoundComponent } from './Wildcards/not-found/not-found.component';
import { AppComponent } from './app.component';
import { ItemComponent } from './ModelCRUD/item/item.component';
import { LoginComponent } from './UI/login/login.component';
import { AuthorizationGuardService } from './Service/Authorization/authorization-guard.service';
import { LoginErrorComponent } from './UI/login-error/login-error.component';
import { OrderNewComponent } from './ModelCRUD/order-new/order-new.component';
import { RegisterComponent } from './UI/register/register.component';
import { OrderCurrentComponent } from './ModelCRUD/order-current/order-current.component';
import { OrderDetailsComponent } from './ModelCRUD/order-details/order-details.component';
import { OrderFinishedComponent } from './ModelCRUD/order-finished/order-finished.component';


const routes: Routes = [
  { path: "producer", component: ProducerComponent, canActivate: [AuthorizationGuardService] },
  { path: "provider", component: ProviderComponent, canActivate: [AuthorizationGuardService] },
  { path: "category", component: CategoryComponent, canActivate: [AuthorizationGuardService] },
  { path: "not-found", component: NotFoundComponent, canActivate: [AuthorizationGuardService] },
  { path: "item", component: ItemComponent, canActivate: [AuthorizationGuardService] },
  { path: "order-new", component: OrderNewComponent, canActivate: [AuthorizationGuardService] },
  { path: "order-current", component: OrderCurrentComponent, canActivate: [AuthorizationGuardService] },
  { path: "order-details/:id", component: OrderDetailsComponent, canActivate: [AuthorizationGuardService] },
  {path: "order-finished", component: OrderFinishedComponent, canActivate: [AuthorizationGuardService]},
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "login-error", component: LoginErrorComponent },
  { path: "", redirectTo: "/item", pathMatch: "full", canActivate: [AuthorizationGuardService] },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

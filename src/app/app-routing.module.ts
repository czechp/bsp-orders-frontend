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


const routes: Routes = [
  { path: "producer", component: ProducerComponent, canActivate: [AuthorizationGuardService] },
  { path: "provider", component: ProviderComponent, canActivate: [AuthorizationGuardService] },
  { path: "category", component: CategoryComponent, canActivate: [AuthorizationGuardService] },
  { path: "not-found", component: NotFoundComponent, canActivate: [AuthorizationGuardService] },
  { path: "item", component: ItemComponent, canActivate: [AuthorizationGuardService] },
  { path: "login", component: LoginComponent },
  { path: "login-error", component: LoginErrorComponent },
  { path: "", redirectTo: "/item", pathMatch: "full", canActivate: [AuthorizationGuardService] },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

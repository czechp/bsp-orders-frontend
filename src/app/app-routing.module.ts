import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProducerComponent } from './ModelCRUD/producer/producer.component';
import { CategoryComponent } from './ModelCRUD/category/category.component';
import { ProviderComponent } from './ModelCRUD/provider/provider.component';
import { NotFoundComponent } from './Wildcards/not-found/not-found.component';
import { AppComponent } from './app.component';
import { ItemComponent } from './ModelCRUD/item/item.component';


const routes: Routes = [
  { path: "producer", component: ProducerComponent },
  { path: "provider", component: ProviderComponent },
  { path: "category", component: CategoryComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "item", component: ItemComponent },
  { path: "", redirectTo: "/item", pathMatch: "full"},
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

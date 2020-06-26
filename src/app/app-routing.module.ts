import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProducerComponent } from './ModelCRUD/producer/producer.component';
import { CategoryComponent } from './ModelCRUD/category/category.component';
import { ProviderComponent } from './ModelCRUD/provider/provider.component';


const routes: Routes = [
  {path: "producer", component: ProducerComponent },
  {path: "provider", component: ProviderComponent},
  {path: "category", component: CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

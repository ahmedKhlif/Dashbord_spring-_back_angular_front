import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatiqueComponent } from './statique/statique.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  { path: 'statistique/see', component: StatiqueComponent },
  {  path:"", component: DashboardComponent },
  {  path:"addProduct", component:AjoutProduitComponent  },
  {  path:"Products", component:ProductsComponent  },
  {  path:"AddCategory", component:AddCategoryComponent  },
  {  path:"category", component:CategoryComponent  },

  
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

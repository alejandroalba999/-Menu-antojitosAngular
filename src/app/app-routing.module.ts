import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './component/categoria/categoria.component';
import {PlatilloComponent} from './component/platillo/platillo.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "categoria" },
  { path: "categoria", component: CategoriaComponent },
  {path: "platillo", component: PlatilloComponent},
{ path: "**", pathMatch: "full", redirectTo: "categoria" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

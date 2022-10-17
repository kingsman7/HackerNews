import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavesComponent } from './pages/faves/faves.component';

const routes: Routes = [
  {
    path:"",
    component:FavesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavesRoutingModule { }

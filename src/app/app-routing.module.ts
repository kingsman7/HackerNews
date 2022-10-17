import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "main",
    loadChildren: () => import('./main/main.module')
      .then((module) => module.MainModule)
  },
  {
    path: "faves",
    loadChildren: () => import('./faves/faves.module')
      .then((module) => module.FavesModule)
  },
  {
    path: "**",
    redirectTo: "main"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

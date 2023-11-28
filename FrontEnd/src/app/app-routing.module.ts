import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthAppComponent} from './auth-app/auth-app.component';

const routes: Routes = [
  {
    path: 'auth-app',
    loadChildren: () => import('./auth-app/auth-app.module').then(m => m.AuthAppModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

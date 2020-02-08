import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'dashboard'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

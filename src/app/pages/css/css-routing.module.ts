import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CssPage } from './css.page';

const routes: Routes = [
  {
    path: '',
    component: CssPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CssPageRoutingModule {}

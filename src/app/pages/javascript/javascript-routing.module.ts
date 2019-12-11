import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JavascriptPage } from './javascript.page';

const routes: Routes = [
  {
    path: '',
    component: JavascriptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JavascriptPageRoutingModule {}

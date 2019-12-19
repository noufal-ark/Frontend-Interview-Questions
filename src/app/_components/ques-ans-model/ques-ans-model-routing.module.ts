import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuesAnsModelPage } from './ques-ans-model.page';

const routes: Routes = [
  {
    path: '',
    component: QuesAnsModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuesAnsModelPageRoutingModule {}

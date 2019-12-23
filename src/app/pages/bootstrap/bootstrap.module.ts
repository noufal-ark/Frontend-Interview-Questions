import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BootstrapPageRoutingModule } from './bootstrap-routing.module';

import { BootstrapPage } from './bootstrap.page';
import { QuesAnsModelPageModule } from 'src/app/_components/ques-ans-model/ques-ans-model.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BootstrapPageRoutingModule,
    QuesAnsModelPageModule
  ],
  declarations: [BootstrapPage]
})
export class BootstrapPageModule {}

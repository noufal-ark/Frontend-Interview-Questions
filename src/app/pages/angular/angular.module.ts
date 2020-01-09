import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AngularPageRoutingModule } from './angular-routing.module';

import { AngularPage } from './angular.page';
import { QuesAnsModelPageModule } from 'src/app/_components/ques-ans-model/ques-ans-model.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularPageRoutingModule,
    QuesAnsModelPageModule
  ],
  declarations: [AngularPage]
})
export class AngularPageModule {}

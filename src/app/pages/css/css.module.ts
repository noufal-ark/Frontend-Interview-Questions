import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CssPageRoutingModule } from './css-routing.module';

import { CssPage } from './css.page';
import { QuesAnsModelPageModule } from 'src/app/_components/ques-ans-model/ques-ans-model.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CssPageRoutingModule,
    QuesAnsModelPageModule
  ],
  declarations: [CssPage]
})
export class CssPageModule {}

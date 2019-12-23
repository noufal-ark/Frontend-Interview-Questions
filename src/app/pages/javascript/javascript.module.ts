import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JavascriptPageRoutingModule } from './javascript-routing.module';

import { JavascriptPage } from './javascript.page';
import { QuesAnsModelPageModule } from 'src/app/_components/ques-ans-model/ques-ans-model.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JavascriptPageRoutingModule,
    QuesAnsModelPageModule
  ],
  declarations: [JavascriptPage]
})
export class JavascriptPageModule {}

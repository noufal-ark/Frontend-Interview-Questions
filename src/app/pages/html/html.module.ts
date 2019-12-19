import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HtmlPageRoutingModule } from './html-routing.module';

import { HtmlPage } from './html.page';
import { QuesAnsModelPageModule } from 'src/app/_components/ques-ans-model/ques-ans-model.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HtmlPageRoutingModule,
    QuesAnsModelPageModule
  ],
  declarations: [HtmlPage]
})
export class HtmlPageModule { }

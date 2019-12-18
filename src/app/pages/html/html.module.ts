import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HtmlPageRoutingModule } from './html-routing.module';

import { HtmlPage } from './html.page';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HtmlPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [HtmlPage]
})
export class HtmlPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JavascriptPageRoutingModule } from './javascript-routing.module';

import { JavascriptPage } from './javascript.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JavascriptPageRoutingModule
  ],
  declarations: [JavascriptPage]
})
export class JavascriptPageModule {}

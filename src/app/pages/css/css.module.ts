import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CssPageRoutingModule } from './css-routing.module';

import { CssPage } from './css.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CssPageRoutingModule
  ],
  declarations: [CssPage]
})
export class CssPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuesAnsModelPageRoutingModule } from './ques-ans-model-routing.module';

import { QuesAnsModelPage } from './ques-ans-model.page';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuesAnsModelPageRoutingModule,
    MatExpansionModule,
    MatCardModule
  ],
  declarations: [QuesAnsModelPage],
  exports: [QuesAnsModelPage]
})
export class QuesAnsModelPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ProfilePageModule } from '../profile/profile.module';
import { ProfilePageRoutingModule } from '../profile/profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ProfilePageModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}

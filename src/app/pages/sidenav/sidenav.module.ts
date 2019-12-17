import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SidenavPageRoutingModule } from './sidenav-routing.module';

import { SidenavPage } from './sidenav.page';
import { ProfilePageModule } from '../profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidenavPageRoutingModule,
    ProfilePageModule
  ],
  declarations: [SidenavPage]
})
export class SidenavPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavPage } from './sidenav.page';
import { Labels } from 'src/app/constants/labels';

const routes: Routes = [
  {
    path: 'menu',
    component: SidenavPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'css',
        loadChildren: () => import('../css/css.module').then(m => m.CssPageModule)
      },
      {
        path: 'html',
        loadChildren: () => import('../html/html.module').then(m => m.HtmlPageModule)
      },
      {
        path: 'javascript',
        loadChildren: () => import('../javascript/javascript.module').then( m => m.JavascriptPageModule)
      },
      {
        path: 'bootstrap',
        loadChildren: () => import('../bootstrap/bootstrap.module').then( m => m.BootstrapPageModule)
      },
      {
        path: 'angular',
        loadChildren: () => import('../angular/angular.module').then( m => m.AngularPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'menu/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidenavPageRoutingModule { }

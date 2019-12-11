import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})

export class SidenavPage implements OnInit {
  selectedPath = '';

  pages = [
    {
      title: 'Home',
      url: 'dashboard'
    },
    {
      title: 'CSS',
      url: 'css'
    },
    {
      title: 'HTML',
      url: 'html'
    },
    {
      title: 'JavaScript',
      url: 'javascript'
    },
    {
      title: 'Bootstrap',
      url: 'bootstrap'
    },
    {
      title: 'Angular',
      url: 'angular'
    }
  ];



  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = isNullOrUndefined(event.url) ? this.selectedPath : event.url;
    });
  }

  ngOnInit() {
  }

}
